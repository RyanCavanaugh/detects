/// <reference path="typings/node/node.d.ts" />
var fs = require('fs');
var Patterns = require('./patterns');
var StructuralMatch = require('./matcher');
var esprima = require('esprima');
var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node tester.js filename1 [filename2] [filename3...]');
} else {
    var matchedPatterns = [];

    var doneCount = 0;
    args.forEach(function (file) {
        console.log('Test ' + file);
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err)
                throw err;

            var ast = esprima.parse(data, { tolerant: true });

            Object.keys(Patterns).sort().forEach(function (p) {
                var result;
                try  {
                    var result = StructuralMatch.isMatchDeep(ast.body, Patterns[p]);
                } catch (e) {
                    console.log('Error - ' + e);
                    result = false;
                }

                if (result) {
                    if (matchedPatterns.indexOf(p) < 0) {
                        matchedPatterns.push(p);
                    }
                }
            });

            doneCount++;
            if (doneCount === args.length) {
                console.log('Matched patterns: ' + matchedPatterns.join(', '));
                process.exit(1);
            } else {
                console.log('Matched no patterns');
                process.exit(0);
            }
        });
    });
}
