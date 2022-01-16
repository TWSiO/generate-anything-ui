import * as _ from "lodash/fp";

export type GeneratorReference<T> = {
    kind: "reference";
    name: string;
}

function referencedGeneratorToJson<T>(referencedGenerator): GeneratorReference<T> {
    return {
        kind: "reference",
        name: referencedGenerator.name,
    }
}

function generatorToJson(generator) {
    const clone = _.clone(generator);

    switch(generator.kind) {
        case "table":
            clone.table = clone.table.map(value => {
                if ((typeof value === "object") && ("kind" in value)) {
                    return referencedGeneratorToJson(value);
                } else {
                    return value
                }
            });

            return clone;
        case "entity":
            clone.attributes = _.mapValues(clone.attributes, referencedGeneratorToJson);
            return clone;
        default:
            throw new Error();
    }
}

export const generatorsToJson = _.compose([JSON.stringify, _.flip(_.mapValues)(generatorToJson)]);

const dereferenceGenerator = _.curry((all, ref) => {

    if ((typeof ref === "object") && ("kind" in ref) && ref.kind === "reference") {
        if (!(ref.name in all)) {
            // TODO
            throw new Error("Invalid generator JSON");
        }

        return all[ref.name];
    }

    return ref;
});

function jsonToGenerator(all, generator) {
    if (!(generator.name in all)) {
        // TODO
        throw new Error("Invalid generator JSON");
    }
    switch(generator.kind) {
        case "table":
            generator.table = generator.table.map(dereferenceGenerator(all));

            return generator;
        case "entity":
            generator.attributes = _.mapValues(generators.attributes, attr => {
                return all[attr.name]
            });
            return generator;
        default:
            throw new Error();
    }
}

export function jsonToGenerators(jsonString) {
    const deserialized = JSON.parse(jsonString);

    if (typeof deserialized !== "object") {
        // TODO Invalid
        throw new Error("Invalid generator JSON");
    }

    // TODO
    //return _.mapValues(deserialized, val => _.curry(jsonToGenerator)(deserialized)(val));
    for (const foo in deserialized) {
        deserialized[foo] = jsonToGenerator(deserialized, deserialized[foo]);
    }

    return deserialized;
}
