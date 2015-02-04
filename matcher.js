/// <reference path="esprima.d.ts" />
/// <reference path="jquery.d.ts" />
var StructuralMatch;
(function (StructuralMatch) {
    function read(value, key) {
        if (value === undefined || value === null)
            return [];

        var matches;

        var keyParts = key.split('.');
        switch (keyParts[0]) {
            case '*':
                // Any property
                matches = Object.keys(value).map(function (k) {
                    return value[k];
                });
                break;
            case '$last':
                // Index at length - 1
                matches = [value[value.length - 1]];
                break;
            case '%':
                // Numerically-named properties
                matches = Object.keys(value).filter(function (k) {
                    return !isNaN(parseInt(k));
                }).map(function (k) {
                    return value[k];
                });
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
            var recursiveMatches = [];
            matches.forEach(function (m) {
                recursiveMatches = recursiveMatches.concat(read(m, keyRest));
            });
            return recursiveMatches;
        }
    }

    function isMatchDeep(node, structure) {
        function traverse(n, func) {
            if (func(n))
                return true;

            var result = false;
            if (typeof n === 'object' && n !== null) {
                result = Object.keys(n).some(function (k) {
                    return traverse(n[k], func);
                });
            }
            return result;
        }

        return traverse(node, function (x) {
            return isMatch(x, structure);
        });
    }
    StructuralMatch.isMatchDeep = isMatchDeep;

    function isMatch(node, structure) {
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
                    if (matchingProps.every(function (m) {
                        return m !== expectedValue;
                    }))
                        return false;
                } else {
                    if (matchingProps.every(function (m) {
                        return !isMatch(m, expectedValue);
                    })) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    StructuralMatch.isMatch = isMatch;
})(StructuralMatch || (StructuralMatch = {}));

module.exports = StructuralMatch;
