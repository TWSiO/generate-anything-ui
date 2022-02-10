import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AboutPage() {
    return (<main className="container">
        <h1>About Generate Anything</h1>
        <p>This site gives you the tools to generate anything! Generating entire worlds is at your fingertips!</p>

        <p>Well, okay it&apos;s not quite that sophisticated yet, but it&apos;s meant to be a tool to build generators which you can reference with other generators and which can generate infinitely many related values.</p>

        <p>This can be useful for generating random values for many different applications such as while playing Dungeons & Dragons and other Tabletop Roleplaying Games. For example, with the right generators, you could instantly generate an infinite amount of related Non-playable characters (NPCs). A Barbarian elf with green eyes whose name is Galwin Broadleaf whose mentor was a Warrior half-orc named Brimsum Torchstone whose mentor is... so on and so forth in an infinite chain of past mentors. You can then create a relationship between that generator and another generator and automatically generate detailed characters in another generator like a dungeon creator, random party creator, or many other possibilities.</p>

        <p>They&apos;re like the tables of magical items, food, NPCs, etc. that are often used in tabletop roleplaying games, but with the ability to generate complex infinite relationships and infinitely detailed entities.</p>

        <h2>How to use the site</h2>

        <p>The two main things you can do on this site are creating generators and running those generators to create values.</p>

        <h3>Creating Generators</h3>

        <p>To create a generator go to the <a>create generator page</a>. From there you can currently either create a &quot;table generator&quot; or an &quot;entity generator&quot;.</p>

        <h4>Table Generator</h4>

        <p>A table generator is a generator that you define by giving it a table of values. When you run it, it will randomly produce one of the values from the generator's table.</p>

        <p>Those values can be regular words or numbers like names or they can be other generators. If the table generator generates another generator you can then generate a value with that generator.</p>

        <p>Say you have a table of types of tools that you want to pick from randomly, you might want each of the entries in the table to be generators which give a particular tool of that type. For example an entry in a table of types of tools that might come up might be saws, and if that generator came up it might generate a value like a jigsaw, or a bandsaw. This can be useful, but it is more useful in conjunction with the entity generator.</p>

        <p>The page to create a table generator has you enter a list that has static values (words and numbers) and generator values which you can pick from a list of generators you&apos;ve already created.</p>

        <h4>Entity Generator</h4>

        <p>The entity generator represents an &quot;entity&quot; and has a bunch of &quot;attributes&quot; that, that entity would have.</p>

        <p>For example, an &quot;elf&quot; entity generator might have a &quot;first name&quot; attribute, a &quot;last name&quot; ttribute, &quot;eye color&quot; attribute, etc. Each of these attributes has a name, and each also has a corresponding generator associated with them. For example, the first name attribute might have a table generator with a list of names associated with it, and the eye color attribute might have a table generator with a list of eye colors like &quot;blue&quot;, &quot;green&quot;, etc. associated with it. This lets us randomly generate a collection of different related things about an &quot;entity&quot;.</p>

        <p>The page to create an entity allows you to add attributes which you can assign a name to and associate a previously created generator.</p>

        <hr />

        <p>With these two generators you can generate an infinite amount of related things with complex relationships.</p>

        <h3>Exporting and Importing Generators</h3>

        <p>Once you've created generators you can export them from the home page as JSON text which you can copy and paste to save in a text file. If you want to recreate those generators later you can go to the home page and paste the previously exported JSON text into the box and select the import/merge button. This will import the previously created generators and merge them with any generators you may have currently created.</p>

        <p>Due to current limitations of the site it's a good idea to do this frequently if you want to make sure your generators are saved. If you refresh or close the page it won't remember your generators and will lose any generators you may have been using. I'm currently working on some potential ways to have a more convenient method to save the generators.</p>

        <h3>Running Generators</h3>

        <p>To actually run and get the values the generators generate, you can go to the home page, and select the generator you want to run out of your list of generators. On that page you can edit that generator, as well as run it by entering a &quot;seed&quot; and running it.</p>

        <p>The seed influences the values generated by the generators. If you run a generator twice with the same seed it should generate the same values. The actual value of the seed itself doesn&apos;t have any meaning, but saving it will allow you to consistantly recreate the same values you&apos;ve run before if you want to see them again.</p>

        <Alert variant={"warning"}>If any of the of the generators involved with generating the values created when running this generator is changed, the generator may generate different values with the same seed.</Alert>

        <p>When you run the generator you should be taken to a page with the values generated by the generator. It will show the &quot;top level&quot; values related to that generator, but won&apos;t show the values generated by other generators which may be related to whatever the initial generator generated (other than table values in some cases, but that was just for convenience). This is because the generators related to the result of another generator can create an infinite chain of generators and values, and the web app isn&apos;t able to display infinitely many values on screen at once (I&apos;d be impressed if any web app could). The page for the values will have a link to the values of any generated generator which you can follow and see the value generated by that generator. You can follow the chain of values and generators for as many values as you want. You can go back to the value that generated the current value by selecting the link to go back to the &quot;parent&quot;.</p>

        <p>(While we can&apos;t show infinitely many values at once, I&apos;ll admit that the current interface could be improved a bit. I&apos;ll hopefully be working on that in a future version)</p>

        <h3>Limitations</h3>

        <p>While I have admittedly hyped the site up a bit because I think it is genuinely pretty useful and neat, there are some current limitations to the ways that things are currently generated.</p>

        <p>One example is that generators currently aren&apos;t effected by other values generated by related generators. For example, if you wanted to have a generator generate characters with mentors, and you wanted elves to be able to mentor any other race, but only elves mentoring other elves, that wouldn&apos;t be possible with one generator. You could approximate it by creating and combining some table generators, but it wouldn&apos;t be as clean and it would affect the distribution of how many times an elf vs. a non-elf would be selected as a mentor.</p>

        <p>Due to that limitation as well as others, the values generated by the generator may need to be &quot;massaged&quot; a little. If you have a single or handful of cases where you want to limit the mentor to be an elf you can maybe create an &quot;elf&quot; table and just pull from that for those particular cases. Other situations might require other massaging. That&apos;s admittedly the sort of work the generators are supposed to alleviate, however they bring you most of the way there and do a lot more than just plain tables which require a lot of manual work. There are improvements that I intend to make, though, which leads me to...</p>

        <h2>The Future</h2>

        <p>I have plans for improvements in the future such as a generator which generates a random number of values and the ability to affect the distribution of randomized choices such as with a ratio. However, this is a personal hobby project that I&apos;ve been creating in my spare time, which I have precious little of nowadays, so it might take a while.</p>

        <p>If you&apos;d like to help and submit a pull request or if you notice an issue you can do both at the project&apos;s github pages: </p>

        <ul>
            <li>The code for the user interface. The place you'll probably want to submit an issue to: <a href="https://github.com/TWSiO/generate-anything-ui">https://github.com/TWSiO/generate-anything-ui</a></li>
            <li>The library for the logic of the generators: <a href="https://github.com/TWSiO/generate-anything">https://github.com/TWSiO/generate-anything</a></li>
        </ul>

    </main>);
}
