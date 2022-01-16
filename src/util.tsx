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
