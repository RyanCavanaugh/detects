/// <reference path="..\typings\typescriptServices.d.ts" />

// Adapted from src\harness\harness.ts#192
function isNodeOrArray(a: any): boolean {
    return a !== undefined && typeof a.pos === "number";
}

export function sourceFileToJSON(file: ts.SourceFile): string {
    return JSON.stringify(file,(k, v) => {
        return isNodeOrArray(v) ? serializeNode(v) : v;
    }, "    ");

    function getKindName(k: number): string {
        return (<any>ts).SyntaxKind[k]
    }

    function getFlagName(flags: any, f: number): any {
        if (f === 0) {
            return 0;
        }

        var result = "";
        Object.getOwnPropertyNames(flags).forEach((v: any) => {
            if (isFinite(v)) {
                v = +v;
                if (f === +v) {
                    result = flags[v];
                    return true;
                }
                else if ((f & v) > 0) {
                    if (result.length)
                        result += " | ";
                    result += flags[v];
                    return false;
                }
            }
        });
        return result;
    }

    function getNodeFlagName(f: number) { return getFlagName((<any>ts).NodeFlags, f); }
    function getParserContextFlagName(f: number) { return getFlagName((<any>ts).ParserContextFlags, f); }

    function serializeNode(n: ts.Node): any {
        var o: any = { kind: getKindName(n.kind) };

        Object.getOwnPropertyNames(n).forEach(propertyName => {
            switch (propertyName) {
                case "parent":
                case "symbol":
                case "locals":
                case "localSymbol":
                case "kind":
                case "semanticDiagnostics":
                case "id":
                case "nodeCount":
                case "symbolCount":
                case "identifierCount":
                case "scriptSnapshot":
                case "pos":
                case "end":
                case "referenceDiagnostics":
                case "parseDiagnostics":
                case "identifiers":
                    // Blacklist of items we never put in the baseline file.
                    break;

                case "flags":
                    // Print out flags with their enum names.
                    o[propertyName] = getNodeFlagName(n.flags);
                    break;

                case "operator":
                    o[propertyName] = getKindName(+n[propertyName]);
                    break;

                case "parserContextFlags":
                    // Clear the flag that are produced by aggregating child values..  That is ephemeral 
                    // data we don't care about in the dump.  We only care what the parser set directly
                    // on the ast.
                    var value = n.parserContextFlags & ts.ParserContextFlags.ParserGeneratedFlags;
                    if (value) {
                        o[propertyName] = getParserContextFlagName(value);
                    }
                    break;

                // Unneeded in this case
                //case "referenceDiagnostics":
                //case "parseDiagnostics":
                //    o[propertyName] = Utils.convertDiagnostics((<any>n)[propertyName]);
                //    break;

                case "nextContainer":
                    if (n.nextContainer) {
                        o[propertyName] = { kind: n.nextContainer.kind, pos: n.nextContainer.pos, end: n.nextContainer.end };
                    }
                    break;

                case "text":
                    // Include 'text' field for identifiers/literals, but not for source files.
                    if (n.kind !== ts.SyntaxKind.SourceFile) {
                        o[propertyName] = (<any>n)[propertyName];
                    }
                    break;

                default:
                    o[propertyName] = (<any>n)[propertyName];
            }

            return undefined;
        });

        return o;
    }
}
