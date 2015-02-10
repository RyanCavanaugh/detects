/// <reference path="../typings/node/node.d.ts" />

import fs = require('fs');
import Patterns = require('./patterns');
import StructuralMatch = require('./matcher');
import esprima = require('esprima');
var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node tester.js filename1 [filename2] [filename3...]');
} else {
    var matchedPatterns: string[] = [];

    var doneCount = 0;
    args.forEach(file => {
        console.log('Test ' + file);
        fs.readFile(file, 'utf-8',(err, data) => {
            if (err) throw err;

            var ast = esprima.parse(data, { tolerant: true });

            Object.keys(Patterns).sort().forEach(p => {
                var result: boolean;
                try {
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
