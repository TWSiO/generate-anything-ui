import * as _ from "lodash/fp";

function referencedGeneratorToJson(referencedGenerator): GeneratorReference {
    return {
        kind: "reference",
        name: referencedGenerator.name,
    }
}

function generatorToJson(generator) {
    const clone = _.clone(generator);

    switch(generator.kind) {
        case "table": {
            const justGenToJson = value => {
                if ((typeof value === "object") && ("kind" in value)) {
                    return referencedGeneratorToJson(value);
                } else {
                    return value
                }
            };

            clone.table = clone.table.map(justGenToJson);

            return clone;
        }
        case "entity":
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
            throw new Error("Invalid generator JSON");
        }

        return all[ref.name];
    }

    return ref;
});

function jsonToGenerator(all, generator) {
    if (!(generator.name in all)) {
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
        throw new Error("Invalid generator JSON");
    }

    return _.mapValues(val => _.curry(jsonToGenerator)(deserialized)(val))(deserialized);
}
