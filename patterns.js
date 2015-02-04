var Patterns;
(function (Patterns) {
    Patterns.standardModule = {
        'type': 'ExpressionStatement',
        'expression': {
            'type': 'CallExpression',
            'arguments.length': 1,
            'arguments.0': {
                'type': 'LogicalExpression',
                'operator': '||',
                'right': {
                    'type': 'AssignmentExpression',
                    'right': {
                        'type': 'ObjectExpression',
                        'properties.length': 0
                    }
                }
            }
        }
    };

    Patterns.thisCapture = {
        "type": "VariableDeclarator",
        "id": {
            "name": "_this"
        },
        "init": {
            "type": "ThisExpression"
        }
    };

    Patterns.nestedModule = {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "FunctionExpression",
                "params": {
                    "0": {
                        "type": "Identifier"
                    }
                },
                "body": {
                    "body": {
                        "0": {
                            "type": "VariableDeclaration"
                        },
                        "1": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "arguments": {
                                    "0": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "type": "LogicalExpression",
                                            "operator": "||",
                                            "left": {
                                                "type": "MemberExpression"
                                            },
                                            "right": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression"
                                                },
                                                "right": {
                                                    "type": "ObjectExpression"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "arguments": {
                "0": {
                    "type": "LogicalExpression",
                    "operator": "||",
                    "left": {
                        "type": "Identifier"
                    },
                    "right": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier"
                        },
                        "right": {
                            "type": "ObjectExpression"
                        }
                    }
                }
            }
        }
    };

    Patterns.uglifiedClass1 = {
        "type": "VariableDeclaration",
        "declarations": {
            "0": {
                "type": "VariableDeclarator",
                "init": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "FunctionExpression",
                        "body": {
                            "type": "BlockStatement",
                            "body": {
                                "%": {
                                    "type": "FunctionDeclaration"
                                },
                                "$last": {
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "SequenceExpression",
                                        "expressions": {
                                            "%": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "MemberExpression",
                                                        "property": {
                                                            "name": "prototype"
                                                        }
                                                    }
                                                }
                                            },
                                            "$last": {
                                                "type": "Identifier"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    Patterns.standardExtends = { "type": "VariableDeclaration", "declarations": { "0": { "type": "VariableDeclarator", "id": { "name": "__extends" }, "init": { "type": "LogicalExpression", "right": { "body": { "body": { "1": { "type": "FunctionDeclaration", "body": { "body": { "0": { "expression": { "operator": "=", "left": { "object": { "type": "ThisExpression" }, "property": { "name": "constructor" } } } } } } }, "2": { "expression": { "type": "AssignmentExpression", "left": { "property": { "name": "prototype" } }, "right": { "property": { "name": "prototype" } } } }, "3": { "expression": { "right": { "callee": { "name": "__" } } } } } } } } } } };

    Patterns.uglifiedExtends1 = { "type": "VariableDeclaration", "declarations": { "0": { "type": "VariableDeclarator", "init": { "type": "LogicalExpression", "operator": "||", "left": { "type": "MemberExpression", "object": { "type": "ThisExpression" }, "property": { "type": "Identifier" } }, "right": { "type": "FunctionExpression", "params": { "0": { "type": "Identifier" }, "1": { "type": "Identifier" } }, "body": { "body": { "0": { "type": "FunctionDeclaration", "body": { "type": "BlockStatement", "body": { "0": { "type": "ExpressionStatement", "expression": { "left": { "object": { "type": "ThisExpression" }, "property": { "name": "constructor" } } } } } } }, "1": { "type": "ForInStatement", "body": { "expression": { "operator": "&&", "left": { "type": "CallExpression" } } } }, "2": { "expression": { "expressions": { "0": { "type": "AssignmentExpression", "left": { "property": { "name": "prototype" } } }, "1": { "left": { "property": { "name": "prototype" } } } } } } } } } } } } };

    Patterns.uglifiedExtends2 = {
        "type": "FunctionExpression",
        "params": {
            "0": {},
            "1": {}
        },
        "body": {
            "body": {
                "0": {
                    "type": "FunctionDeclaration",
                    "body": {
                        "body": {
                            "0": {
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "left": {
                                        "type": "MemberExpression",
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "name": "constructor"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "1": {
                    "type": "ForInStatement",
                    "body": {
                        "expression": {
                            "left": {
                                "type": "CallExpression",
                                "callee": {
                                    "property": {
                                        "name": "hasOwnProperty"
                                    }
                                }
                            }
                        }
                    }
                },
                "2": {
                    "expression": {
                        "expressions": {
                            "0": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "property": {
                                        "name": "prototype"
                                    }
                                },
                                "right": {
                                    "property": {
                                        "name": "prototype"
                                    }
                                }
                            },
                            "1": {
                                "type": "AssignmentExpression",
                                "left": {
                                    "property": {
                                        "name": "prototype"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    Patterns.standardClass = { "type": "VariableDeclaration", "declarations": { "%": { "init": { "type": "CallExpression", "callee": { "type": "FunctionExpression", "body": { "body": { "%": { "expression": { "type": "AssignmentExpression", "left": { "object": { "object": { "type": "Identifier" }, "property": { "name": "prototype" } } } } }, "$last": { "type": "ReturnStatement" } } } } } } } };

    Patterns.uglifiedModule = {
        "type": "ExpressionStatement",
        "expression": {
            "argument": {
                "type": "CallExpression",
                "callee": {
                    "type": "FunctionExpression",
                    "params": {
                        "0": {
                            "type": "Identifier"
                        }
                    }
                },
                "arguments": {
                    "0": {
                        "type": "LogicalExpression",
                        "operator": "||",
                        "left": {
                            "type": "Identifier"
                        },
                        "right": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier"
                            },
                            "right": {
                                "type": "ObjectExpression"
                            }
                        }
                    }
                }
            }
        }
    };

    Patterns.uglifiedClass2 = {
        "type": "CallExpression",
        "callee": {
            "type": "FunctionExpression",
            "body": {
                "body": {
                    "$last": {
                        "type": "ReturnStatement",
                        "argument": {
                            "type": "SequenceExpression",
                            "expressions": {
                                "%": {
                                    "type": "AssignmentExpression",
                                    "left": {
                                        "object": {
                                            "property": {
                                                "name": "prototype"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
})(Patterns || (Patterns = {}));

module.exports = Patterns;
