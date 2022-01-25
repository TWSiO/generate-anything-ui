import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AboutPage() {
    return (<main className="container">
        <h1>About Generate Anything</h1>
        <p>This site gives you the tools to generate anything! Generating entire worlds is at your fingertips!</p>

        <p>Well, okay it's not quite that sophisticated yet, but it's meant to be a tool to build generators which you can reference with other generators and which can generate infinitely many related values.</p>

        <p>This can be useful for generating random values for many different applications such as while playing Dungeons & Dragons and other Tabletop Roleplaying Games. For example, with the right generators, you could instantly generate an infinite amount of related Non-playable characters (NPCs). A Barbarian elf with green eyes whose name is Galwin Broadleaf whose mentor was a Warrior half-orc named Brimsum Torchstone whose mentor is... so on and so forth in an infinite chain of past mentors. You can then create a relationship between that generator and another generator and automatically generate detailed characters in another generator like a dungeon creator, random party creator, or many other possibilities.</p>

        <p>They're like the tables of magical items, food, NPCs, etc. that are often used in tabletop roleplaying games, but with the ability to generate complex infinite relationships and infinitely detailed entities.</p>

        <h2>How to use the site</h2>

        <p>The two main pieces of functionality of the site are creating generators and running those generators to create values.</p>

        <p>The seed influences the values generated by the generators. If you run a generator twice with the same seed it should generate the same values.</p>

        <p>If any of the of the generators involved with generating the values created when running this generator is changed, the generator may generate different values with the same seed.</p>

        <Alert variant={"danger"}>If you close or refresh the page generators and everything will be lost. Make sure to copy and save the exported JSON of any generators you want to save as well as any seeds you want to save.</Alert>

        <h3>Limitations</h3>

        <p>While I have admittedly hyped the site up a bit because I think it is genuinely very useful, there are some current limitations to the ways that things are currently generated.</p>

        <p>One example is that generators currently aren't effected by other values generated by related generators. For example, if you wanted to have a generator generate characters with mentors, and you wanted elves to be able to mentor any other race, but only elves mentoring other elves, that wouldn't be possible with one generator. You could approximate it by creating and combining some table generators, but it wouldn't be as clean and it would affect the distribution of how many times an elf vs. a non-elf would be selected as a mentor.</p>

        <p>In other words, the values generated by the generator may need a little "massaging". If you have a single or handful of cases where you want to limit the mentor to be an elf you can maybe create an "elf" table and just pull from that for those particular cases. Other situations might require other massaging. That's admittedly the sort of work the generators are supposed to alleviate, however they bring you most of the way there and require a little bit of manual work rather than just plain tables which require a lot of manual work. There are improvements that I intend to make on the tools, though, which leads me to...</p>

        <h2>The Future</h2>

        <p>I have plans for improvements in the future such as a generator which generates a random number of values and the ability to affect the distribution of randomized choices such as with a ratio. However, this is a personal hobby project that I've been creating in my spare time, which I have precious little of nowadays, so it might take a while.</p>

        <p>If you'd like to help and submit a pull request or if you notice an issue you can do both at the project's github pages...<a>PLACEHOLDER</a></p>

    </main>);
}
