/// <reference path="../typings/esprima/esprima.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

module StructuralMatch {
    function read(value: any, key: string): any[] {
        if (value === undefined || value === null) return [];

        var matches: any[];

        var keyParts = key.split('.');
        switch (keyParts[0]) {
            case '*':
                // Any property
                matches = Object.keys(value).map(k => value[k]);
                break;
            case '$last':
                // Index at length - 1
                matches = [value[value.length - 1]];
                break;
            case '%':
                // Numerically-named properties
                matches = Object.keys(value).filter(k => !isNaN(parseInt(k))).map(k => value[k]);
                break;
            default:
                // Regular property access
                if (value.hasOwnProperty(keyParts[0])) {
                    matches = [value[keyParts[0]]];
                }
                break;
        }

        if (keyParts.length === 1) {
            return matches;
        } else {
            var keyRest = keyParts.slice(1).join('.');
            var recursiveMatches: any[] = [];
            matches.forEach(m => {
                recursiveMatches = recursiveMatches.concat(read(m, keyRest));
            });
            return recursiveMatches;
        }
    }

    export function isMatchDeep(node: any, structure: any) {
        function traverse(n: any, func: (x: any) => boolean) {
            if (func(n)) return true;

            var result = false;
            if (typeof n === 'object' && n !== null) {
                result = Object.keys(n).some(k => {
                    return traverse(n[k], func);
                });
            }
            return result;
        }

        return traverse(node, x => isMatch(x, structure));
    }

    export function isMatch(node: any, structure: any) {
        var keys = Object.keys(structure);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var expectedValue = structure[key];
            var matchingProps = read(node, key);
            if (!matchingProps || matchingProps.length === 0) {
                return false;
            } else {
                // See if any of the matched values is a hit
                if (typeof expectedValue === 'string' || typeof expectedValue === 'number') {
                    if (matchingProps.every(m => m !== expectedValue)) return false;
                } else {
                    if (matchingProps.every(m => !isMatch(m, expectedValue))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

export = StructuralMatch;