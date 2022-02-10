import React from "react";
import * as _ from "lodash/fp";

// _.flip(_.get) doesn't quite work like this.
export const getObjKey = obj => key => obj[key];

export type GeneratorReference = {
    kind: "reference";
    name: string;
}

export const hasDuplicates = list => (new Set(list)).size !== list.length;

// Could use null or throw exception, but wanted to try this out. If other people collaborate on this codebase, should probably change to something more conventional.
export const duplicateNames: unique symbol = Symbol("Has duplicate names");

export function mergeGeneratorSets(setA, setB) {
    const hasMatchingNames = hasDuplicates(_.concat(Object.keys(setA), Object.keys(setB)));

    if (hasMatchingNames) {
        return duplicateNames;
    }

    return {...setA, ...setB};
}

export const getEventValue = _.get("target.value");

export const passEventValue = fn => event => _.compose(fn, getEventValue)(event);

export function NotFound() {
    return (<main className="container">
                <h1>Generator Not Found</h1>
                <p>Generator wasn&apos;t found for this URL. Generators disappear when the page is refreshed so the generator may have disappeared. Make sure to frequently export generators to save them.</p>
            </main>);
}
