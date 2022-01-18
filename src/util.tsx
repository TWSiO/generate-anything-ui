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
            console.log(clone.attributes);
            clone.attributes = _.mapValues(referencedGeneratorToJson)(clone.attributes);
            return clone;
        default:
            throw new Error();
    }
}

export const generatorsToJson = _.compose([JSON.stringify, _.mapValues(generatorToJson)]);

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
            generator.attributes = _.mapValues(attr => {
                return all[attr.name]
            })(generator.attributes);

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

    return _.mapValues(val => _.curry(jsonToGenerator)(deserialized)(val))(deserialized);
}

export const hasDuplicates = list => (new Set(list)).size !== list.length;
