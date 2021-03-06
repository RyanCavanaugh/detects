/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Manifest gfx
console.time("Load Shared Dependencies");
var jsGlobal = (function () {
    return this || (1, eval)('this');
})();
var inBrowser = typeof window !== 'undefined' && 'document' in window && 'plugins' in window.document;
var release = false;
var profile = false;
function dumpLine(line) {
    if (typeof dump !== "undefined") {
        dump(line + "\n");
    }
}
if (!jsGlobal.performance) {
    jsGlobal.performance = {};
}
if (!jsGlobal.performance.now) {
    jsGlobal.performance.now = typeof dateNow !== 'undefined' ? dateNow : Date.now;
}
var START_TIME = performance.now();
var Shumway;
(function (Shumway) {
    (function (CharacterCodes) {
        CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
        CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
        CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
        CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
        CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
        CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
        CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
        CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
        CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
        CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
    })(Shumway.CharacterCodes || (Shumway.CharacterCodes = {}));
    var CharacterCodes = Shumway.CharacterCodes;
    Shumway.UINT32_CHAR_BUFFER_LENGTH = 10;
    Shumway.UINT32_MAX = 0xFFFFFFFF;
    Shumway.UINT32_MAX_DIV_10 = 0x19999999;
    Shumway.UINT32_MAX_MOD_10 = 0x5;
    function isString(value) {
        return typeof value === "string";
    }
    Shumway.isString = isString;
    function isFunction(value) {
        return typeof value === "function";
    }
    Shumway.isFunction = isFunction;
    function isNumber(value) {
        return typeof value === "number";
    }
    Shumway.isNumber = isNumber;
    function isInteger(value) {
        return (value | 0) === value;
    }
    Shumway.isInteger = isInteger;
    function isArray(value) {
        return value instanceof Array;
    }
    Shumway.isArray = isArray;
    function isNumberOrString(value) {
        return typeof value === "number" || typeof value === "string";
    }
    Shumway.isNumberOrString = isNumberOrString;
    function isObject(value) {
        return typeof value === "object" || typeof value === 'function';
    }
    Shumway.isObject = isObject;
    function toNumber(x) {
        return +x;
    }
    Shumway.toNumber = toNumber;
    function isNumericString(value) {
        return String(Number(value)) === value;
    }
    Shumway.isNumericString = isNumericString;
    function isNumeric(value) {
        if (typeof value === "number") {
            return true;
        }
        if (typeof value === "string") {
            var c = value.charCodeAt(0);
            if ((65 <= c && c <= 90) || (97 <= c && c <= 122) || (c === 36) || (c === 95)) {
                return false;
            }
            return isIndex(value) || isNumericString(value);
        }
        return false;
    }
    Shumway.isNumeric = isNumeric;
    function isIndex(value) {
        var index = 0;
        if (typeof value === "number") {
            index = (value | 0);
            if (value === index && index >= 0) {
                return true;
            }
            return value >>> 0 === value;
        }
        if (typeof value !== "string") {
            return false;
        }
        var length = value.length;
        if (length === 0) {
            return false;
        }
        if (value === "0") {
            return true;
        }
        if (length > Shumway.UINT32_CHAR_BUFFER_LENGTH) {
            return false;
        }
        var i = 0;
        index = value.charCodeAt(i++) - 48 /* _0 */;
        if (index < 1 || index > 9) {
            return false;
        }
        var oldIndex = 0;
        var c = 0;
        while (i < length) {
            c = value.charCodeAt(i++) - 48 /* _0 */;
            if (c < 0 || c > 9) {
                return false;
            }
            oldIndex = index;
            index = 10 * index + c;
        }
        if ((oldIndex < Shumway.UINT32_MAX_DIV_10) || (oldIndex === Shumway.UINT32_MAX_DIV_10 && c <= Shumway.UINT32_MAX_MOD_10)) {
            return true;
        }
        return false;
    }
    Shumway.isIndex = isIndex;
    function isNullOrUndefined(value) {
        return value == undefined;
    }
    Shumway.isNullOrUndefined = isNullOrUndefined;
    var Debug;
    (function (Debug) {
        function backtrace() {
            return "Uncomment Debug.backtrace();";
        }
        Debug.backtrace = backtrace;
        function error(message) {
            console.error(message);
            throw new Error(message);
        }
        Debug.error = error;
        function assert(condition, message) {
            if (message === void 0) { message = "assertion failed"; }
            if (condition === "") {
                condition = true;
            }
            if (!condition) {
                if (typeof console !== 'undefined' && 'assert' in console) {
                    console.assert(false, message);
                    throw new Error(message);
                }
                else {
                    Debug.error(message.toString());
                }
            }
        }
        Debug.assert = assert;
        function assertUnreachable(msg) {
            var location = new Error().stack.split('\n')[1];
            throw new Error("Reached unreachable location " + location + msg);
        }
        Debug.assertUnreachable = assertUnreachable;
        function assertNotImplemented(condition, message) {
            if (!condition) {
                Debug.error("notImplemented: " + message);
            }
        }
        Debug.assertNotImplemented = assertNotImplemented;
        function warning() {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i - 0] = arguments[_i];
            }
            release || console.warn.apply(console, messages);
        }
        Debug.warning = warning;
        function notUsed(message) {
            release || Debug.assert(false, "Not Used " + message);
        }
        Debug.notUsed = notUsed;
        function notImplemented(message) {
            release || Debug.assert(false, "Not Implemented " + message);
        }
        Debug.notImplemented = notImplemented;
        function dummyConstructor(message) {
            release || Debug.assert(false, "Dummy Constructor: " + message);
        }
        Debug.dummyConstructor = dummyConstructor;
        function abstractMethod(message) {
            release || Debug.assert(false, "Abstract Method " + message);
        }
        Debug.abstractMethod = abstractMethod;
        var somewhatImplementedCache = {};
        function somewhatImplemented(message) {
            if (somewhatImplementedCache[message]) {
                return;
            }
            somewhatImplementedCache[message] = true;
            Debug.warning("somewhatImplemented: " + message);
        }
        Debug.somewhatImplemented = somewhatImplemented;
        function unexpected(message) {
            Debug.assert(false, "Unexpected: " + message);
        }
        Debug.unexpected = unexpected;
        function unexpectedCase(message) {
            Debug.assert(false, "Unexpected Case: " + message);
        }
        Debug.unexpectedCase = unexpectedCase;
    })(Debug = Shumway.Debug || (Shumway.Debug = {}));
    function getTicks() {
        return performance.now();
    }
    Shumway.getTicks = getTicks;
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var assert = Shumway.Debug.assert;
        function popManyInto(src, count, dst) {
            release || assert(src.length >= count);
            for (var i = count - 1; i >= 0; i--) {
                dst[i] = src.pop();
            }
            dst.length = count;
        }
        ArrayUtilities.popManyInto = popManyInto;
        function popMany(array, count) {
            release || assert(array.length >= count);
            var start = array.length - count;
            var result = array.slice(start, this.length);
            array.length = start;
            return result;
        }
        ArrayUtilities.popMany = popMany;
        function popManyIntoVoid(array, count) {
            release || assert(array.length >= count);
            array.length = array.length - count;
        }
        ArrayUtilities.popManyIntoVoid = popManyIntoVoid;
        function pushMany(dst, src) {
            for (var i = 0; i < src.length; i++) {
                dst.push(src[i]);
            }
        }
        ArrayUtilities.pushMany = pushMany;
        function top(array) {
            return array.length && array[array.length - 1];
        }
        ArrayUtilities.top = top;
        function last(array) {
            return array.length && array[array.length - 1];
        }
        ArrayUtilities.last = last;
        function peek(array) {
            release || assert(array.length > 0);
            return array[array.length - 1];
        }
        ArrayUtilities.peek = peek;
        function indexOf(array, value) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        ArrayUtilities.indexOf = indexOf;
        function equals(a, b) {
            if (a.length !== b.length) {
                return false;
            }
            for (var i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        ArrayUtilities.equals = equals;
        function pushUnique(array, value) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            array.push(value);
            return array.length - 1;
        }
        ArrayUtilities.pushUnique = pushUnique;
        function unique(array) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                pushUnique(result, array[i]);
            }
            return result;
        }
        ArrayUtilities.unique = unique;
        function copyFrom(dst, src) {
            dst.length = 0;
            ArrayUtilities.pushMany(dst, src);
        }
        ArrayUtilities.copyFrom = copyFrom;
        function ensureTypedArrayCapacity(array, capacity) {
            if (array.length < capacity) {
                var oldArray = array;
                array = new array.constructor(Shumway.IntegerUtilities.nearestPowerOfTwo(capacity));
                array.set(oldArray, 0);
            }
            return array;
        }
        ArrayUtilities.ensureTypedArrayCapacity = ensureTypedArrayCapacity;
        var ArrayWriter = (function () {
            function ArrayWriter(initialCapacity) {
                if (initialCapacity === void 0) { initialCapacity = 16; }
                this._u8 = null;
                this._u16 = null;
                this._i32 = null;
                this._f32 = null;
                this._offset = 0;
                this.ensureCapacity(initialCapacity);
            }
            ArrayWriter.prototype.reset = function () {
                this._offset = 0;
            };
            Object.defineProperty(ArrayWriter.prototype, "offset", {
                get: function () {
                    return this._offset;
                },
                enumerable: true,
                configurable: true
            });
            ArrayWriter.prototype.getIndex = function (size) {
                release || assert(size === 1 || size === 2 || size === 4 || size === 8 || size === 16);
                var index = this._offset / size;
                release || assert((index | 0) === index);
                return index;
            };
            ArrayWriter.prototype.ensureAdditionalCapacity = function (size) {
                this.ensureCapacity(this._offset + size);
            };
            ArrayWriter.prototype.ensureCapacity = function (minCapacity) {
                if (!this._u8) {
                    this._u8 = new Uint8Array(minCapacity);
                }
                else if (this._u8.length > minCapacity) {
                    return;
                }
                var oldCapacity = this._u8.length;
                var newCapacity = oldCapacity * 2;
                if (newCapacity < minCapacity) {
                    newCapacity = minCapacity;
                }
                var u8 = new Uint8Array(newCapacity);
                u8.set(this._u8, 0);
                this._u8 = u8;
                this._u16 = new Uint16Array(u8.buffer);
                this._i32 = new Int32Array(u8.buffer);
                this._f32 = new Float32Array(u8.buffer);
            };
            ArrayWriter.prototype.writeInt = function (v) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 4);
                this.writeIntUnsafe(v);
            };
            ArrayWriter.prototype.writeIntAt = function (v, offset) {
                release || assert(offset >= 0 && offset <= this._offset);
                release || assert((offset & 0x3) === 0);
                this.ensureCapacity(offset + 4);
                var index = offset >> 2;
                this._i32[index] = v;
            };
            ArrayWriter.prototype.writeIntUnsafe = function (v) {
                var index = this._offset >> 2;
                this._i32[index] = v;
                this._offset += 4;
            };
            ArrayWriter.prototype.writeFloat = function (v) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 4);
                this.writeFloatUnsafe(v);
            };
            ArrayWriter.prototype.writeFloatUnsafe = function (v) {
                var index = this._offset >> 2;
                this._f32[index] = v;
                this._offset += 4;
            };
            ArrayWriter.prototype.write4Floats = function (a, b, c, d) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 16);
                this.write4FloatsUnsafe(a, b, c, d);
            };
            ArrayWriter.prototype.write4FloatsUnsafe = function (a, b, c, d) {
                var index = this._offset >> 2;
                this._f32[index + 0] = a;
                this._f32[index + 1] = b;
                this._f32[index + 2] = c;
                this._f32[index + 3] = d;
                this._offset += 16;
            };
            ArrayWriter.prototype.write6Floats = function (a, b, c, d, e, f) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 24);
                this.write6FloatsUnsafe(a, b, c, d, e, f);
            };
            ArrayWriter.prototype.write6FloatsUnsafe = function (a, b, c, d, e, f) {
                var index = this._offset >> 2;
                this._f32[index + 0] = a;
                this._f32[index + 1] = b;
                this._f32[index + 2] = c;
                this._f32[index + 3] = d;
                this._f32[index + 4] = e;
                this._f32[index + 5] = f;
                this._offset += 24;
            };
            ArrayWriter.prototype.subF32View = function () {
                return this._f32.subarray(0, this._offset >> 2);
            };
            ArrayWriter.prototype.subI32View = function () {
                return this._i32.subarray(0, this._offset >> 2);
            };
            ArrayWriter.prototype.subU16View = function () {
                return this._u16.subarray(0, this._offset >> 1);
            };
            ArrayWriter.prototype.subU8View = function () {
                return this._u8.subarray(0, this._offset);
            };
            ArrayWriter.prototype.hashWords = function (hash, offset, length) {
                var i32 = this._i32;
                for (var i = 0; i < length; i++) {
                    hash = (((31 * hash) | 0) + i32[i]) | 0;
                }
                return hash;
            };
            ArrayWriter.prototype.reserve = function (size) {
                size = (size + 3) & ~0x3;
                this.ensureCapacity(this._offset + size);
                this._offset += size;
            };
            return ArrayWriter;
        })();
        ArrayUtilities.ArrayWriter = ArrayWriter;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
    var ArrayReader = (function () {
        function ArrayReader(buffer) {
            this._u8 = new Uint8Array(buffer);
            this._u16 = new Uint16Array(buffer);
            this._i32 = new Int32Array(buffer);
            this._f32 = new Float32Array(buffer);
            this._offset = 0;
        }
        Object.defineProperty(ArrayReader.prototype, "offset", {
            get: function () {
                return this._offset;
            },
            enumerable: true,
            configurable: true
        });
        ArrayReader.prototype.isEmpty = function () {
            return this._offset === this._u8.length;
        };
        ArrayReader.prototype.readInt = function () {
            release || Debug.assert((this._offset & 0x3) === 0);
            release || Debug.assert(this._offset <= this._u8.length - 4);
            var v = this._i32[this._offset >> 2];
            this._offset += 4;
            return v;
        };
        ArrayReader.prototype.readFloat = function () {
            release || Debug.assert((this._offset & 0x3) === 0);
            release || Debug.assert(this._offset <= this._u8.length - 4);
            var v = this._f32[this._offset >> 2];
            this._offset += 4;
            return v;
        };
        return ArrayReader;
    })();
    Shumway.ArrayReader = ArrayReader;
    var ObjectUtilities;
    (function (ObjectUtilities) {
        function boxValue(value) {
            if (isNullOrUndefined(value) || isObject(value)) {
                return value;
            }
            return Object(value);
        }
        ObjectUtilities.boxValue = boxValue;
        function toKeyValueArray(object) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var array = [];
            for (var k in object) {
                if (hasOwnProperty.call(object, k)) {
                    array.push([k, object[k]]);
                }
            }
            return array;
        }
        ObjectUtilities.toKeyValueArray = toKeyValueArray;
        function isPrototypeWriteable(object) {
            return Object.getOwnPropertyDescriptor(object, "prototype").writable;
        }
        ObjectUtilities.isPrototypeWriteable = isPrototypeWriteable;
        function hasOwnProperty(object, name) {
            return Object.prototype.hasOwnProperty.call(object, name);
        }
        ObjectUtilities.hasOwnProperty = hasOwnProperty;
        function propertyIsEnumerable(object, name) {
            return Object.prototype.propertyIsEnumerable.call(object, name);
        }
        ObjectUtilities.propertyIsEnumerable = propertyIsEnumerable;
        function getOwnPropertyDescriptor(object, name) {
            return Object.getOwnPropertyDescriptor(object, name);
        }
        ObjectUtilities.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
        function hasOwnGetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return !!(d && d.get);
        }
        ObjectUtilities.hasOwnGetter = hasOwnGetter;
        function getOwnGetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return d ? d.get : null;
        }
        ObjectUtilities.getOwnGetter = getOwnGetter;
        function hasOwnSetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return !!(d && !!d.set);
        }
        ObjectUtilities.hasOwnSetter = hasOwnSetter;
        function createMap() {
            return Object.create(null);
        }
        ObjectUtilities.createMap = createMap;
        function createArrayMap() {
            return [];
        }
        ObjectUtilities.createArrayMap = createArrayMap;
        function defineReadOnlyProperty(object, name, value) {
            Object.defineProperty(object, name, {
                value: value,
                writable: false,
                configurable: true,
                enumerable: false
            });
        }
        ObjectUtilities.defineReadOnlyProperty = defineReadOnlyProperty;
        function getOwnPropertyDescriptors(object) {
            var o = ObjectUtilities.createMap();
            var properties = Object.getOwnPropertyNames(object);
            for (var i = 0; i < properties.length; i++) {
                o[properties[i]] = Object.getOwnPropertyDescriptor(object, properties[i]);
            }
            return o;
        }
        ObjectUtilities.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
        function cloneObject(object) {
            var clone = Object.create(Object.getPrototypeOf(object));
            copyOwnProperties(clone, object);
            return clone;
        }
        ObjectUtilities.cloneObject = cloneObject;
        function copyProperties(object, template) {
            for (var property in template) {
                object[property] = template[property];
            }
        }
        ObjectUtilities.copyProperties = copyProperties;
        function copyOwnProperties(object, template) {
            for (var property in template) {
                if (hasOwnProperty(template, property)) {
                    object[property] = template[property];
                }
            }
        }
        ObjectUtilities.copyOwnProperties = copyOwnProperties;
        function copyOwnPropertyDescriptors(object, template, overwrite) {
            if (overwrite === void 0) { overwrite = true; }
            for (var property in template) {
                if (hasOwnProperty(template, property)) {
                    var descriptor = Object.getOwnPropertyDescriptor(template, property);
                    if (!overwrite && hasOwnProperty(object, property)) {
                        continue;
                    }
                    release || Debug.assert(descriptor);
                    try {
                        Object.defineProperty(object, property, descriptor);
                    }
                    catch (e) {
                    }
                }
            }
        }
        ObjectUtilities.copyOwnPropertyDescriptors = copyOwnPropertyDescriptors;
        function getLatestGetterOrSetterPropertyDescriptor(object, name) {
            var descriptor = {};
            while (object) {
                var tmp = Object.getOwnPropertyDescriptor(object, name);
                if (tmp) {
                    descriptor.get = descriptor.get || tmp.get;
                    descriptor.set = descriptor.set || tmp.set;
                }
                if (descriptor.get && descriptor.set) {
                    break;
                }
                object = Object.getPrototypeOf(object);
            }
            return descriptor;
        }
        ObjectUtilities.getLatestGetterOrSetterPropertyDescriptor = getLatestGetterOrSetterPropertyDescriptor;
        function defineNonEnumerableGetterOrSetter(obj, name, value, isGetter) {
            var descriptor = ObjectUtilities.getLatestGetterOrSetterPropertyDescriptor(obj, name);
            descriptor.configurable = true;
            descriptor.enumerable = false;
            if (isGetter) {
                descriptor.get = value;
            }
            else {
                descriptor.set = value;
            }
            Object.defineProperty(obj, name, descriptor);
        }
        ObjectUtilities.defineNonEnumerableGetterOrSetter = defineNonEnumerableGetterOrSetter;
        function defineNonEnumerableGetter(obj, name, getter) {
            Object.defineProperty(obj, name, { get: getter, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableGetter = defineNonEnumerableGetter;
        function defineNonEnumerableSetter(obj, name, setter) {
            Object.defineProperty(obj, name, { set: setter, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableSetter = defineNonEnumerableSetter;
        function defineNonEnumerableProperty(obj, name, value) {
            Object.defineProperty(obj, name, { value: value, writable: true, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableProperty = defineNonEnumerableProperty;
        function defineNonEnumerableForwardingProperty(obj, name, otherName) {
            Object.defineProperty(obj, name, {
                get: FunctionUtilities.makeForwardingGetter(otherName),
                set: FunctionUtilities.makeForwardingSetter(otherName),
                writable: true,
                configurable: true,
                enumerable: false
            });
        }
        ObjectUtilities.defineNonEnumerableForwardingProperty = defineNonEnumerableForwardingProperty;
        function defineNewNonEnumerableProperty(obj, name, value) {
            release || Debug.assert(!Object.prototype.hasOwnProperty.call(obj, name), "Property: " + name + " already exits.");
            ObjectUtilities.defineNonEnumerableProperty(obj, name, value);
        }
        ObjectUtilities.defineNewNonEnumerableProperty = defineNewNonEnumerableProperty;
        function createPublicAliases(obj, names) {
            var prop = {
                value: null,
                writable: true,
                configurable: true,
                enumerable: false
            };
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                prop.value = obj[name];
                Object.defineProperty(obj, '$Bg' + name, prop);
            }
        }
        ObjectUtilities.createPublicAliases = createPublicAliases;
    })(ObjectUtilities = Shumway.ObjectUtilities || (Shumway.ObjectUtilities = {}));
    var FunctionUtilities;
    (function (FunctionUtilities) {
        function makeForwardingGetter(target) {
            return new Function("return this[\"" + target + "\"]");
        }
        FunctionUtilities.makeForwardingGetter = makeForwardingGetter;
        function makeForwardingSetter(target) {
            return new Function("value", "this[\"" + target + "\"] = value;");
        }
        FunctionUtilities.makeForwardingSetter = makeForwardingSetter;
        function bindSafely(fn, object) {
            release || Debug.assert(!fn.boundTo && object);
            var f = fn.bind(object);
            f.boundTo = object;
            return f;
        }
        FunctionUtilities.bindSafely = bindSafely;
    })(FunctionUtilities = Shumway.FunctionUtilities || (Shumway.FunctionUtilities = {}));
    var StringUtilities;
    (function (StringUtilities) {
        var assert = Shumway.Debug.assert;
        function repeatString(c, n) {
            var s = "";
            for (var i = 0; i < n; i++) {
                s += c;
            }
            return s;
        }
        StringUtilities.repeatString = repeatString;
        function memorySizeToString(value) {
            value |= 0;
            var K = 1024;
            var M = K * K;
            if (value < K) {
                return value + " B";
            }
            else if (value < M) {
                return (value / K).toFixed(2) + "KB";
            }
            else {
                return (value / M).toFixed(2) + "MB";
            }
        }
        StringUtilities.memorySizeToString = memorySizeToString;
        function toSafeString(value) {
            if (typeof value === "string") {
                return "\"" + value + "\"";
            }
            if (typeof value === "number" || typeof value === "boolean") {
                return String(value);
            }
            if (value instanceof Array) {
                return "[] " + value.length;
            }
            return typeof value;
        }
        StringUtilities.toSafeString = toSafeString;
        function toSafeArrayString(array) {
            var str = [];
            for (var i = 0; i < array.length; i++) {
                str.push(toSafeString(array[i]));
            }
            return str.join(", ");
        }
        StringUtilities.toSafeArrayString = toSafeArrayString;
        function utf8decode(str) {
            var bytes = new Uint8Array(str.length * 4);
            var b = 0;
            for (var i = 0, j = str.length; i < j; i++) {
                var code = str.charCodeAt(i);
                if (code <= 0x7f) {
                    bytes[b++] = code;
                    continue;
                }
                if (0xD800 <= code && code <= 0xDBFF) {
                    var codeLow = str.charCodeAt(i + 1);
                    if (0xDC00 <= codeLow && codeLow <= 0xDFFF) {
                        code = ((code & 0x3FF) << 10) + (codeLow & 0x3FF) + 0x10000;
                        ++i;
                    }
                }
                if ((code & 0xFFE00000) !== 0) {
                    bytes[b++] = 0xF8 | ((code >>> 24) & 0x03);
                    bytes[b++] = 0x80 | ((code >>> 18) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 12) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else if ((code & 0xFFFF0000) !== 0) {
                    bytes[b++] = 0xF0 | ((code >>> 18) & 0x07);
                    bytes[b++] = 0x80 | ((code >>> 12) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else if ((code & 0xFFFFF800) !== 0) {
                    bytes[b++] = 0xE0 | ((code >>> 12) & 0x0F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else {
                    bytes[b++] = 0xC0 | ((code >>> 6) & 0x1F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
            }
            return bytes.subarray(0, b);
        }
        StringUtilities.utf8decode = utf8decode;
        function utf8encode(bytes) {
            var j = 0, str = "";
            while (j < bytes.length) {
                var b1 = bytes[j++] & 0xFF;
                if (b1 <= 0x7F) {
                    str += String.fromCharCode(b1);
                }
                else {
                    var currentPrefix = 0xC0;
                    var validBits = 5;
                    do {
                        var mask = (currentPrefix >> 1) | 0x80;
                        if ((b1 & mask) === currentPrefix)
                            break;
                        currentPrefix = (currentPrefix >> 1) | 0x80;
                        --validBits;
                    } while (validBits >= 0);
                    if (validBits <= 0) {
                        str += String.fromCharCode(b1);
                        continue;
                    }
                    var code = (b1 & ((1 << validBits) - 1));
                    var invalid = false;
                    for (var i = 5; i >= validBits; --i) {
                        var bi = bytes[j++];
                        if ((bi & 0xC0) != 0x80) {
                            invalid = true;
                            break;
                        }
                        code = (code << 6) | (bi & 0x3F);
                    }
                    if (invalid) {
                        for (var k = j - (7 - i); k < j; ++k) {
                            str += String.fromCharCode(bytes[k] & 255);
                        }
                        continue;
                    }
                    if (code >= 0x10000) {
                        str += String.fromCharCode((((code - 0x10000) >> 10) & 0x3FF) | 0xD800, (code & 0x3FF) | 0xDC00);
                    }
                    else {
                        str += String.fromCharCode(code);
                    }
                }
            }
            return str;
        }
        StringUtilities.utf8encode = utf8encode;
        function base64ArrayBuffer(arrayBuffer) {
            var base64 = '';
            var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var bytes = new Uint8Array(arrayBuffer);
            var byteLength = bytes.byteLength;
            var byteRemainder = byteLength % 3;
            var mainLength = byteLength - byteRemainder;
            var a, b, c, d;
            var chunk;
            for (var i = 0; i < mainLength; i = i + 3) {
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                a = (chunk & 16515072) >> 18;
                b = (chunk & 258048) >> 12;
                c = (chunk & 4032) >> 6;
                d = chunk & 63;
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
            }
            if (byteRemainder == 1) {
                chunk = bytes[mainLength];
                a = (chunk & 252) >> 2;
                b = (chunk & 3) << 4;
                base64 += encodings[a] + encodings[b] + '==';
            }
            else if (byteRemainder == 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                a = (chunk & 64512) >> 10;
                b = (chunk & 1008) >> 4;
                c = (chunk & 15) << 2;
                base64 += encodings[a] + encodings[b] + encodings[c] + '=';
            }
            return base64;
        }
        StringUtilities.base64ArrayBuffer = base64ArrayBuffer;
        function escapeString(str) {
            if (str !== undefined) {
                str = str.replace(/[^\w$]/gi, "$");
                if (/^\d/.test(str)) {
                    str = '$' + str;
                }
            }
            return str;
        }
        StringUtilities.escapeString = escapeString;
        function fromCharCodeArray(buffer) {
            var str = "", SLICE = 1024 * 16;
            for (var i = 0; i < buffer.length; i += SLICE) {
                var chunk = Math.min(buffer.length - i, SLICE);
                str += String.fromCharCode.apply(null, buffer.subarray(i, i + chunk));
            }
            return str;
        }
        StringUtilities.fromCharCodeArray = fromCharCodeArray;
        var _encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_';
        function variableLengthEncodeInt32(n) {
            var e = _encoding;
            var bitCount = (32 - Math.clz32(n));
            release || assert(bitCount <= 32, bitCount);
            var l = Math.ceil(bitCount / 6);
            var s = e[l];
            for (var i = l - 1; i >= 0; i--) {
                var offset = (i * 6);
                s += e[(n >> offset) & 0x3F];
            }
            release || assert(StringUtilities.variableLengthDecodeInt32(s) === n, n + " : " + s + " - " + l + " bits: " + bitCount);
            return s;
        }
        StringUtilities.variableLengthEncodeInt32 = variableLengthEncodeInt32;
        function toEncoding(n) {
            return _encoding[n];
        }
        StringUtilities.toEncoding = toEncoding;
        function fromEncoding(s) {
            var c = s.charCodeAt(0);
            var e = 0;
            if (c >= 65 && c <= 90) {
                return c - 65;
            }
            else if (c >= 97 && c <= 122) {
                return c - 71;
            }
            else if (c >= 48 && c <= 57) {
                return c + 4;
            }
            else if (c === 36) {
                return 62;
            }
            else if (c === 95) {
                return 63;
            }
            release || assert(false, "Invalid Encoding");
        }
        StringUtilities.fromEncoding = fromEncoding;
        function variableLengthDecodeInt32(s) {
            var l = StringUtilities.fromEncoding(s[0]);
            var n = 0;
            for (var i = 0; i < l; i++) {
                var offset = ((l - i - 1) * 6);
                n |= StringUtilities.fromEncoding(s[1 + i]) << offset;
            }
            return n;
        }
        StringUtilities.variableLengthDecodeInt32 = variableLengthDecodeInt32;
        function trimMiddle(s, maxLength) {
            if (s.length <= maxLength) {
                return s;
            }
            var leftHalf = maxLength >> 1;
            var rightHalf = maxLength - leftHalf - 1;
            return s.substr(0, leftHalf) + "\u2026" + s.substr(s.length - rightHalf, rightHalf);
        }
        StringUtilities.trimMiddle = trimMiddle;
        function multiple(s, count) {
            var o = "";
            for (var i = 0; i < count; i++) {
                o += s;
            }
            return o;
        }
        StringUtilities.multiple = multiple;
        function indexOfAny(s, chars, position) {
            var index = s.length;
            for (var i = 0; i < chars.length; i++) {
                var j = s.indexOf(chars[i], position);
                if (j >= 0) {
                    index = Math.min(index, j);
                }
            }
            return index === s.length ? -1 : index;
        }
        StringUtilities.indexOfAny = indexOfAny;
        var _concat3array = new Array(3);
        var _concat4array = new Array(4);
        var _concat5array = new Array(5);
        var _concat6array = new Array(6);
        var _concat7array = new Array(7);
        var _concat8array = new Array(8);
        var _concat9array = new Array(9);
        function concat3(s0, s1, s2) {
            _concat3array[0] = s0;
            _concat3array[1] = s1;
            _concat3array[2] = s2;
            return _concat3array.join('');
        }
        StringUtilities.concat3 = concat3;
        function concat4(s0, s1, s2, s3) {
            _concat4array[0] = s0;
            _concat4array[1] = s1;
            _concat4array[2] = s2;
            _concat4array[3] = s3;
            return _concat4array.join('');
        }
        StringUtilities.concat4 = concat4;
        function concat5(s0, s1, s2, s3, s4) {
            _concat5array[0] = s0;
            _concat5array[1] = s1;
            _concat5array[2] = s2;
            _concat5array[3] = s3;
            _concat5array[4] = s4;
            return _concat5array.join('');
        }
        StringUtilities.concat5 = concat5;
        function concat6(s0, s1, s2, s3, s4, s5) {
            _concat6array[0] = s0;
            _concat6array[1] = s1;
            _concat6array[2] = s2;
            _concat6array[3] = s3;
            _concat6array[4] = s4;
            _concat6array[5] = s5;
            return _concat6array.join('');
        }
        StringUtilities.concat6 = concat6;
        function concat7(s0, s1, s2, s3, s4, s5, s6) {
            _concat7array[0] = s0;
            _concat7array[1] = s1;
            _concat7array[2] = s2;
            _concat7array[3] = s3;
            _concat7array[4] = s4;
            _concat7array[5] = s5;
            _concat7array[6] = s6;
            return _concat7array.join('');
        }
        StringUtilities.concat7 = concat7;
        function concat8(s0, s1, s2, s3, s4, s5, s6, s7) {
            _concat8array[0] = s0;
            _concat8array[1] = s1;
            _concat8array[2] = s2;
            _concat8array[3] = s3;
            _concat8array[4] = s4;
            _concat8array[5] = s5;
            _concat8array[6] = s6;
            _concat8array[7] = s7;
            return _concat8array.join('');
        }
        StringUtilities.concat8 = concat8;
        function concat9(s0, s1, s2, s3, s4, s5, s6, s7, s8) {
            _concat9array[0] = s0;
            _concat9array[1] = s1;
            _concat9array[2] = s2;
            _concat9array[3] = s3;
            _concat9array[4] = s4;
            _concat9array[5] = s5;
            _concat9array[6] = s6;
            _concat9array[7] = s7;
            _concat9array[8] = s8;
            return _concat9array.join('');
        }
        StringUtilities.concat9 = concat9;
    })(StringUtilities = Shumway.StringUtilities || (Shumway.StringUtilities = {}));
    var HashUtilities;
    (function (HashUtilities) {
        var _md5R = new Uint8Array([
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21
        ]);
        var _md5K = new Int32Array([
            -680876936,
            -389564586,
            606105819,
            -1044525330,
            -176418897,
            1200080426,
            -1473231341,
            -45705983,
            1770035416,
            -1958414417,
            -42063,
            -1990404162,
            1804603682,
            -40341101,
            -1502002290,
            1236535329,
            -165796510,
            -1069501632,
            643717713,
            -373897302,
            -701558691,
            38016083,
            -660478335,
            -405537848,
            568446438,
            -1019803690,
            -187363961,
            1163531501,
            -1444681467,
            -51403784,
            1735328473,
            -1926607734,
            -378558,
            -2022574463,
            1839030562,
            -35309556,
            -1530992060,
            1272893353,
            -155497632,
            -1094730640,
            681279174,
            -358537222,
            -722521979,
            76029189,
            -640364487,
            -421815835,
            530742520,
            -995338651,
            -198630844,
            1126891415,
            -1416354905,
            -57434055,
            1700485571,
            -1894986606,
            -1051523,
            -2054922799,
            1873313359,
            -30611744,
            -1560198380,
            1309151649,
            -145523070,
            -1120210379,
            718787259,
            -343485551
        ]);
        function hashBytesTo32BitsMD5(data, offset, length) {
            var r = _md5R;
            var k = _md5K;
            var h0 = 1732584193, h1 = -271733879, h2 = -1732584194, h3 = 271733878;
            var paddedLength = (length + 72) & ~63;
            var padded = new Uint8Array(paddedLength);
            var i, j, n;
            for (i = 0; i < length; ++i) {
                padded[i] = data[offset++];
            }
            padded[i++] = 0x80;
            n = paddedLength - 8;
            while (i < n) {
                padded[i++] = 0;
            }
            padded[i++] = (length << 3) & 0xFF;
            padded[i++] = (length >> 5) & 0xFF;
            padded[i++] = (length >> 13) & 0xFF;
            padded[i++] = (length >> 21) & 0xFF;
            padded[i++] = (length >>> 29) & 0xFF;
            padded[i++] = 0;
            padded[i++] = 0;
            padded[i++] = 0;
            var w = new Int32Array(16);
            for (i = 0; i < paddedLength;) {
                for (j = 0; j < 16; ++j, i += 4) {
                    w[j] = (padded[i] | (padded[i + 1] << 8) | (padded[i + 2] << 16) | (padded[i + 3] << 24));
                }
                var a = h0, b = h1, c = h2, d = h3, f, g;
                for (j = 0; j < 64; ++j) {
                    if (j < 16) {
                        f = (b & c) | ((~b) & d);
                        g = j;
                    }
                    else if (j < 32) {
                        f = (d & b) | ((~d) & c);
                        g = (5 * j + 1) & 15;
                    }
                    else if (j < 48) {
                        f = b ^ c ^ d;
                        g = (3 * j + 5) & 15;
                    }
                    else {
                        f = c ^ (b | (~d));
                        g = (7 * j) & 15;
                    }
                    var tmp = d, rotateArg = (a + f + k[j] + w[g]) | 0, rotate = r[j];
                    d = c;
                    c = b;
                    b = (b + ((rotateArg << rotate) | (rotateArg >>> (32 - rotate)))) | 0;
                    a = tmp;
                }
                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
            }
            return h0;
        }
        HashUtilities.hashBytesTo32BitsMD5 = hashBytesTo32BitsMD5;
        function hashBytesTo32BitsAdler(data, offset, length) {
            var a = 1;
            var b = 0;
            var end = offset + length;
            for (var i = offset; i < end; ++i) {
                a = (a + (data[i] & 0xff)) % 65521;
                b = (b + a) % 65521;
            }
            return (b << 16) | a;
        }
        HashUtilities.hashBytesTo32BitsAdler = hashBytesTo32BitsAdler;
    })(HashUtilities = Shumway.HashUtilities || (Shumway.HashUtilities = {}));
    var Random = (function () {
        function Random() {
        }
        Random.seed = function (seed) {
            Random._state[0] = seed;
            Random._state[1] = seed;
        };
        Random.next = function () {
            var s = this._state;
            var r0 = (Math.imul(18273, s[0] & 0xFFFF) + (s[0] >>> 16)) | 0;
            s[0] = r0;
            var r1 = (Math.imul(36969, s[1] & 0xFFFF) + (s[1] >>> 16)) | 0;
            s[1] = r1;
            var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
            return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
        };
        Random._state = new Uint32Array([0xDEAD, 0xBEEF]);
        return Random;
    })();
    Shumway.Random = Random;
    Math.random = function random() {
        return Random.next();
    };
    function polyfillWeakMap() {
        if (typeof jsGlobal.WeakMap === 'function') {
            return;
        }
        var id = 0;
        function WeakMap() {
            this.id = '$weakmap' + (id++);
        }
        ;
        WeakMap.prototype = {
            has: function (obj) {
                return obj.hasOwnProperty(this.id);
            },
            get: function (obj, defaultValue) {
                return obj.hasOwnProperty(this.id) ? obj[this.id] : defaultValue;
            },
            set: function (obj, value) {
                Object.defineProperty(obj, this.id, {
                    value: value,
                    enumerable: false,
                    configurable: true
                });
            }
        };
        jsGlobal.WeakMap = WeakMap;
    }
    polyfillWeakMap();
    var useReferenceCounting = true;
    var WeakList = (function () {
        function WeakList() {
            if (typeof netscape !== "undefined" && netscape.security.PrivilegeManager) {
                this._map = new WeakMap();
            }
            else {
                this._list = [];
            }
        }
        WeakList.prototype.clear = function () {
            if (this._map) {
                this._map.clear();
            }
            else {
                this._list.length = 0;
            }
        };
        WeakList.prototype.push = function (value) {
            if (this._map) {
                this._map.set(value, null);
            }
            else {
                this._list.push(value);
            }
        };
        WeakList.prototype.forEach = function (callback) {
            if (this._map) {
                if (typeof netscape !== "undefined") {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                Components.utils.nondeterministicGetWeakMapKeys(this._map).forEach(function (value) {
                    if (value._referenceCount !== 0) {
                        callback(value);
                    }
                });
                return;
            }
            var list = this._list;
            var zeroCount = 0;
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                if (useReferenceCounting && value._referenceCount === 0) {
                    zeroCount++;
                }
                else {
                    callback(value);
                }
            }
            if (zeroCount > 16 && zeroCount > (list.length >> 2)) {
                var newList = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i]._referenceCount > 0) {
                        newList.push(list[i]);
                    }
                }
                this._list = newList;
            }
        };
        Object.defineProperty(WeakList.prototype, "length", {
            get: function () {
                if (this._map) {
                    return -1;
                }
                else {
                    return this._list.length;
                }
            },
            enumerable: true,
            configurable: true
        });
        return WeakList;
    })();
    Shumway.WeakList = WeakList;
    var NumberUtilities;
    (function (NumberUtilities) {
        function pow2(exponent) {
            if (exponent === (exponent | 0)) {
                if (exponent < 0) {
                    return 1 / (1 << -exponent);
                }
                return 1 << exponent;
            }
            return Math.pow(2, exponent);
        }
        NumberUtilities.pow2 = pow2;
        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
        NumberUtilities.clamp = clamp;
        function roundHalfEven(value) {
            if (Math.abs(value % 1) === 0.5) {
                var floor = Math.floor(value);
                return floor % 2 === 0 ? floor : Math.ceil(value);
            }
            return Math.round(value);
        }
        NumberUtilities.roundHalfEven = roundHalfEven;
        function epsilonEquals(value, other) {
            return Math.abs(value - other) < 0.0000001;
        }
        NumberUtilities.epsilonEquals = epsilonEquals;
    })(NumberUtilities = Shumway.NumberUtilities || (Shumway.NumberUtilities = {}));
    (function (Numbers) {
        Numbers[Numbers["MaxU16"] = 0xFFFF] = "MaxU16";
        Numbers[Numbers["MaxI16"] = 0x7FFF] = "MaxI16";
        Numbers[Numbers["MinI16"] = -0x8000] = "MinI16";
    })(Shumway.Numbers || (Shumway.Numbers = {}));
    var Numbers = Shumway.Numbers;
    var IntegerUtilities;
    (function (IntegerUtilities) {
        var sharedBuffer = new ArrayBuffer(8);
        IntegerUtilities.i8 = new Int8Array(sharedBuffer);
        IntegerUtilities.u8 = new Uint8Array(sharedBuffer);
        IntegerUtilities.i32 = new Int32Array(sharedBuffer);
        IntegerUtilities.f32 = new Float32Array(sharedBuffer);
        IntegerUtilities.f64 = new Float64Array(sharedBuffer);
        IntegerUtilities.nativeLittleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
        function floatToInt32(v) {
            IntegerUtilities.f32[0] = v;
            return IntegerUtilities.i32[0];
        }
        IntegerUtilities.floatToInt32 = floatToInt32;
        function int32ToFloat(i) {
            IntegerUtilities.i32[0] = i;
            return IntegerUtilities.f32[0];
        }
        IntegerUtilities.int32ToFloat = int32ToFloat;
        function swap16(i) {
            return ((i & 0xFF) << 8) | ((i >> 8) & 0xFF);
        }
        IntegerUtilities.swap16 = swap16;
        function swap32(i) {
            return ((i & 0xFF) << 24) | ((i & 0xFF00) << 8) | ((i >> 8) & 0xFF00) | ((i >> 24) & 0xFF);
        }
        IntegerUtilities.swap32 = swap32;
        function toS8U8(v) {
            return ((v * 256) << 16) >> 16;
        }
        IntegerUtilities.toS8U8 = toS8U8;
        function fromS8U8(i) {
            return i / 256;
        }
        IntegerUtilities.fromS8U8 = fromS8U8;
        function clampS8U8(v) {
            return fromS8U8(toS8U8(v));
        }
        IntegerUtilities.clampS8U8 = clampS8U8;
        function toS16(v) {
            return (v << 16) >> 16;
        }
        IntegerUtilities.toS16 = toS16;
        function bitCount(i) {
            i = i - ((i >> 1) & 0x55555555);
            i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
            return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
        }
        IntegerUtilities.bitCount = bitCount;
        function ones(i) {
            i = i - ((i >> 1) & 0x55555555);
            i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
            return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
        }
        IntegerUtilities.ones = ones;
        function trailingZeros(i) {
            return IntegerUtilities.ones((i & -i) - 1);
        }
        IntegerUtilities.trailingZeros = trailingZeros;
        function getFlags(i, flags) {
            var str = "";
            for (var i = 0; i < flags.length; i++) {
                if (i & (1 << i)) {
                    str += flags[i] + " ";
                }
            }
            if (str.length === 0) {
                return "";
            }
            return str.trim();
        }
        IntegerUtilities.getFlags = getFlags;
        function isPowerOfTwo(x) {
            return x && ((x & (x - 1)) === 0);
        }
        IntegerUtilities.isPowerOfTwo = isPowerOfTwo;
        function roundToMultipleOfFour(x) {
            return (x + 3) & ~0x3;
        }
        IntegerUtilities.roundToMultipleOfFour = roundToMultipleOfFour;
        function nearestPowerOfTwo(x) {
            x--;
            x |= x >> 1;
            x |= x >> 2;
            x |= x >> 4;
            x |= x >> 8;
            x |= x >> 16;
            x++;
            return x;
        }
        IntegerUtilities.nearestPowerOfTwo = nearestPowerOfTwo;
        function roundToMultipleOfPowerOfTwo(i, powerOfTwo) {
            var x = (1 << powerOfTwo) - 1;
            return (i + x) & ~x;
        }
        IntegerUtilities.roundToMultipleOfPowerOfTwo = roundToMultipleOfPowerOfTwo;
        if (!Math.imul) {
            Math.imul = function imul(a, b) {
                var ah = (a >>> 16) & 0xffff;
                var al = a & 0xffff;
                var bh = (b >>> 16) & 0xffff;
                var bl = b & 0xffff;
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
            };
        }
        if (!Math.clz32) {
            Math.clz32 = function clz32(i) {
                i |= (i >> 1);
                i |= (i >> 2);
                i |= (i >> 4);
                i |= (i >> 8);
                i |= (i >> 16);
                return 32 - IntegerUtilities.ones(i);
            };
        }
    })(IntegerUtilities = Shumway.IntegerUtilities || (Shumway.IntegerUtilities = {}));
    var GeometricUtilities;
    (function (GeometricUtilities) {
        function pointInPolygon(x, y, polygon) {
            var crosses = 0;
            var n = polygon.length - 2;
            var p = polygon;
            for (var i = 0; i < n; i += 2) {
                var x0 = p[i + 0];
                var y0 = p[i + 1];
                var x1 = p[i + 2];
                var y1 = p[i + 3];
                if (((y0 <= y) && (y1 > y)) || ((y0 > y) && (y1 <= y))) {
                    var t = (y - y0) / (y1 - y0);
                    if (x < x0 + t * (x1 - x0)) {
                        crosses++;
                    }
                }
            }
            return (crosses & 1) === 1;
        }
        GeometricUtilities.pointInPolygon = pointInPolygon;
        function signedArea(x0, y0, x1, y1, x2, y2) {
            return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
        }
        GeometricUtilities.signedArea = signedArea;
        function counterClockwise(x0, y0, x1, y1, x2, y2) {
            return signedArea(x0, y0, x1, y1, x2, y2) > 0;
        }
        GeometricUtilities.counterClockwise = counterClockwise;
        function clockwise(x0, y0, x1, y1, x2, y2) {
            return signedArea(x0, y0, x1, y1, x2, y2) < 0;
        }
        GeometricUtilities.clockwise = clockwise;
        function pointInPolygonInt32(x, y, polygon) {
            x = x | 0;
            y = y | 0;
            var crosses = 0;
            var n = polygon.length - 2;
            var p = polygon;
            for (var i = 0; i < n; i += 2) {
                var x0 = p[i + 0];
                var y0 = p[i + 1];
                var x1 = p[i + 2];
                var y1 = p[i + 3];
                if (((y0 <= y) && (y1 > y)) || ((y0 > y) && (y1 <= y))) {
                    var t = (y - y0) / (y1 - y0);
                    if (x < x0 + t * (x1 - x0)) {
                        crosses++;
                    }
                }
            }
            return (crosses & 1) === 1;
        }
        GeometricUtilities.pointInPolygonInt32 = pointInPolygonInt32;
    })(GeometricUtilities = Shumway.GeometricUtilities || (Shumway.GeometricUtilities = {}));
    (function (LogLevel) {
        LogLevel[LogLevel["Error"] = 0x1] = "Error";
        LogLevel[LogLevel["Warn"] = 0x2] = "Warn";
        LogLevel[LogLevel["Debug"] = 0x4] = "Debug";
        LogLevel[LogLevel["Log"] = 0x8] = "Log";
        LogLevel[LogLevel["Info"] = 0x10] = "Info";
        LogLevel[LogLevel["All"] = 0x1f] = "All";
    })(Shumway.LogLevel || (Shumway.LogLevel = {}));
    var LogLevel = Shumway.LogLevel;
    var IndentingWriter = (function () {
        function IndentingWriter(suppressOutput, out) {
            if (suppressOutput === void 0) { suppressOutput = false; }
            this._tab = "  ";
            this._padding = "";
            this._suppressOutput = suppressOutput;
            this._out = out || IndentingWriter._consoleOut;
            this._outNoNewline = out || IndentingWriter._consoleOutNoNewline;
        }
        IndentingWriter.prototype.write = function (str, writePadding) {
            if (str === void 0) { str = ""; }
            if (writePadding === void 0) { writePadding = false; }
            if (!this._suppressOutput) {
                this._outNoNewline((writePadding ? this._padding : "") + str);
            }
        };
        IndentingWriter.prototype.writeLn = function (str) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + str);
            }
        };
        IndentingWriter.prototype.writeObject = function (str, object) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + str, object);
            }
        };
        IndentingWriter.prototype.writeTimeLn = function (str) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + performance.now().toFixed(2) + " " + str);
            }
        };
        IndentingWriter.prototype.writeComment = function (str) {
            var lines = str.split("\n");
            if (lines.length === 1) {
                this.writeLn("// " + lines[0]);
            }
            else {
                this.writeLn("/**");
                for (var i = 0; i < lines.length; i++) {
                    this.writeLn(" * " + lines[i]);
                }
                this.writeLn(" */");
            }
        };
        IndentingWriter.prototype.writeLns = function (str) {
            var lines = str.split("\n");
            for (var i = 0; i < lines.length; i++) {
                this.writeLn(lines[i]);
            }
        };
        IndentingWriter.prototype.errorLn = function (str) {
            if (IndentingWriter.logLevel & 1 /* Error */) {
                this.boldRedLn(str);
            }
        };
        IndentingWriter.prototype.warnLn = function (str) {
            if (IndentingWriter.logLevel & 2 /* Warn */) {
                this.yellowLn(str);
            }
        };
        IndentingWriter.prototype.debugLn = function (str) {
            if (IndentingWriter.logLevel & 4 /* Debug */) {
                this.purpleLn(str);
            }
        };
        IndentingWriter.prototype.logLn = function (str) {
            if (IndentingWriter.logLevel & 8 /* Log */) {
                this.writeLn(str);
            }
        };
        IndentingWriter.prototype.infoLn = function (str) {
            if (IndentingWriter.logLevel & 16 /* Info */) {
                this.writeLn(str);
            }
        };
        IndentingWriter.prototype.yellowLn = function (str) {
            this.colorLn(IndentingWriter.YELLOW, str);
        };
        IndentingWriter.prototype.greenLn = function (str) {
            this.colorLn(IndentingWriter.GREEN, str);
        };
        IndentingWriter.prototype.boldRedLn = function (str) {
            this.colorLn(IndentingWriter.BOLD_RED, str);
        };
        IndentingWriter.prototype.redLn = function (str) {
            this.colorLn(IndentingWriter.RED, str);
        };
        IndentingWriter.prototype.purpleLn = function (str) {
            this.colorLn(IndentingWriter.PURPLE, str);
        };
        IndentingWriter.prototype.colorLn = function (color, str) {
            if (!this._suppressOutput) {
                if (!inBrowser) {
                    this._out(this._padding + color + str + IndentingWriter.ENDC);
                }
                else {
                    this._out(this._padding + str);
                }
            }
        };
        IndentingWriter.prototype.redLns = function (str) {
            this.colorLns(IndentingWriter.RED, str);
        };
        IndentingWriter.prototype.colorLns = function (color, str) {
            var lines = str.split("\n");
            for (var i = 0; i < lines.length; i++) {
                this.colorLn(color, lines[i]);
            }
        };
        IndentingWriter.prototype.enter = function (str) {
            if (!this._suppressOutput) {
                this._out(this._padding + str);
            }
            this.indent();
        };
        IndentingWriter.prototype.leaveAndEnter = function (str) {
            this.leave(str);
            this.indent();
        };
        IndentingWriter.prototype.leave = function (str) {
            this.outdent();
            if (!this._suppressOutput) {
                this._out(this._padding + str);
            }
        };
        IndentingWriter.prototype.indent = function () {
            this._padding += this._tab;
        };
        IndentingWriter.prototype.outdent = function () {
            if (this._padding.length > 0) {
                this._padding = this._padding.substring(0, this._padding.length - this._tab.length);
            }
        };
        IndentingWriter.prototype.writeArray = function (arr, detailed, noNumbers) {
            if (detailed === void 0) { detailed = false; }
            if (noNumbers === void 0) { noNumbers = false; }
            detailed = detailed || false;
            for (var i = 0, j = arr.length; i < j; i++) {
                var prefix = "";
                if (detailed) {
                    if (arr[i] === null) {
                        prefix = "null";
                    }
                    else if (arr[i] === undefined) {
                        prefix = "undefined";
                    }
                    else {
                        prefix = arr[i].constructor.name;
                    }
                    prefix += " ";
                }
                var number = noNumbers ? "" : ("" + i).padRight(' ', 4);
                this.writeLn(number + prefix + arr[i]);
            }
        };
        IndentingWriter.PURPLE = '\033[94m';
        IndentingWriter.YELLOW = '\033[93m';
        IndentingWriter.GREEN = '\033[92m';
        IndentingWriter.RED = '\033[91m';
        IndentingWriter.BOLD_RED = '\033[1;91m';
        IndentingWriter.ENDC = '\033[0m';
        IndentingWriter.logLevel = 31 /* All */;
        IndentingWriter._consoleOut = console.info.bind(console);
        IndentingWriter._consoleOutNoNewline = console.info.bind(console);
        return IndentingWriter;
    })();
    Shumway.IndentingWriter = IndentingWriter;
    var SortedListNode = (function () {
        function SortedListNode(value, next) {
            this.value = value;
            this.next = next;
        }
        return SortedListNode;
    })();
    var SortedList = (function () {
        function SortedList(compare) {
            release || Debug.assert(compare);
            this._compare = compare;
            this._head = null;
            this._length = 0;
        }
        SortedList.prototype.push = function (value) {
            release || Debug.assert(value !== undefined);
            this._length++;
            if (!this._head) {
                this._head = new SortedListNode(value, null);
                return;
            }
            var curr = this._head;
            var prev = null;
            var node = new SortedListNode(value, null);
            var compare = this._compare;
            while (curr) {
                if (compare(curr.value, node.value) > 0) {
                    if (prev) {
                        node.next = curr;
                        prev.next = node;
                    }
                    else {
                        node.next = this._head;
                        this._head = node;
                    }
                    return;
                }
                prev = curr;
                curr = curr.next;
            }
            prev.next = node;
        };
        SortedList.prototype.forEach = function (visitor) {
            var curr = this._head;
            var last = null;
            while (curr) {
                var result = visitor(curr.value);
                if (result === SortedList.RETURN) {
                    return;
                }
                else if (result === SortedList.DELETE) {
                    if (!last) {
                        curr = this._head = this._head.next;
                    }
                    else {
                        curr = last.next = curr.next;
                    }
                }
                else {
                    last = curr;
                    curr = curr.next;
                }
            }
        };
        SortedList.prototype.isEmpty = function () {
            return !this._head;
        };
        SortedList.prototype.pop = function () {
            if (!this._head) {
                return undefined;
            }
            this._length--;
            var ret = this._head;
            this._head = this._head.next;
            return ret.value;
        };
        SortedList.prototype.contains = function (value) {
            var curr = this._head;
            while (curr) {
                if (curr.value === value) {
                    return true;
                }
                curr = curr.next;
            }
            return false;
        };
        SortedList.prototype.toString = function () {
            var str = "[";
            var curr = this._head;
            while (curr) {
                str += curr.value.toString();
                curr = curr.next;
                if (curr) {
                    str += ",";
                }
            }
            str += "]";
            return str;
        };
        SortedList.RETURN = 1;
        SortedList.DELETE = 2;
        return SortedList;
    })();
    Shumway.SortedList = SortedList;
    var CircularBuffer = (function () {
        function CircularBuffer(Type, sizeInBits) {
            if (sizeInBits === void 0) { sizeInBits = 12; }
            this.index = 0;
            this.start = 0;
            this._size = 1 << sizeInBits;
            this._mask = this._size - 1;
            this.array = new Type(this._size);
        }
        CircularBuffer.prototype.get = function (i) {
            return this.array[i];
        };
        CircularBuffer.prototype.forEachInReverse = function (visitor) {
            if (this.isEmpty()) {
                return;
            }
            var i = this.index === 0 ? this._size - 1 : this.index - 1;
            var end = (this.start - 1) & this._mask;
            while (i !== end) {
                if (visitor(this.array[i], i)) {
                    break;
                }
                i = i === 0 ? this._size - 1 : i - 1;
            }
        };
        CircularBuffer.prototype.write = function (value) {
            this.array[this.index] = value;
            this.index = (this.index + 1) & this._mask;
            if (this.index === this.start) {
                this.start = (this.start + 1) & this._mask;
            }
        };
        CircularBuffer.prototype.isFull = function () {
            return ((this.index + 1) & this._mask) === this.start;
        };
        CircularBuffer.prototype.isEmpty = function () {
            return this.index === this.start;
        };
        CircularBuffer.prototype.reset = function () {
            this.index = 0;
            this.start = 0;
        };
        return CircularBuffer;
    })();
    Shumway.CircularBuffer = CircularBuffer;
    var BitSets;
    (function (BitSets) {
        var assert = Shumway.Debug.assert;
        BitSets.ADDRESS_BITS_PER_WORD = 5;
        BitSets.BITS_PER_WORD = 1 << BitSets.ADDRESS_BITS_PER_WORD;
        BitSets.BIT_INDEX_MASK = BitSets.BITS_PER_WORD - 1;
        function getSize(length) {
            return ((length + (BitSets.BITS_PER_WORD - 1)) >> BitSets.ADDRESS_BITS_PER_WORD) << BitSets.ADDRESS_BITS_PER_WORD;
        }
        function toBitString(on, off) {
            var self = this;
            on = on || "1";
            off = off || "0";
            var str = "";
            for (var i = 0; i < length; i++) {
                str += self.get(i) ? on : off;
            }
            return str;
        }
        function toString(names) {
            var self = this;
            var set = [];
            for (var i = 0; i < length; i++) {
                if (self.get(i)) {
                    set.push(names ? names[i] : i);
                }
            }
            return set.join(", ");
        }
        var Uint32ArrayBitSet = (function () {
            function Uint32ArrayBitSet(length) {
                this.size = getSize(length);
                this.count = 0;
                this.dirty = 0;
                this.length = length;
                this.bits = new Uint32Array(this.size >> BitSets.ADDRESS_BITS_PER_WORD);
            }
            Uint32ArrayBitSet.prototype.recount = function () {
                if (!this.dirty) {
                    return;
                }
                var bits = this.bits;
                var c = 0;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var v = bits[i];
                    v = v - ((v >> 1) & 0x55555555);
                    v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
                    c += ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
                }
                this.count = c;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype.set = function (i) {
                var n = i >> BitSets.ADDRESS_BITS_PER_WORD;
                var old = this.bits[n];
                var b = old | (1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits[n] = b;
                this.dirty |= old ^ b;
            };
            Uint32ArrayBitSet.prototype.setAll = function () {
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    bits[i] = 0xFFFFFFFF;
                }
                this.count = this.size;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype.assign = function (set) {
                this.count = set.count;
                this.dirty = set.dirty;
                this.size = set.size;
                for (var i = 0, j = this.bits.length; i < j; i++) {
                    this.bits[i] = set.bits[i];
                }
            };
            Uint32ArrayBitSet.prototype.clear = function (i) {
                var n = i >> BitSets.ADDRESS_BITS_PER_WORD;
                var old = this.bits[n];
                var b = old & ~(1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits[n] = b;
                this.dirty |= old ^ b;
            };
            Uint32ArrayBitSet.prototype.get = function (i) {
                var word = this.bits[i >> BitSets.ADDRESS_BITS_PER_WORD];
                return ((word & 1 << (i & BitSets.BIT_INDEX_MASK))) !== 0;
            };
            Uint32ArrayBitSet.prototype.clearAll = function () {
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    bits[i] = 0;
                }
                this.count = 0;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype._union = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old | otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.intersect = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old & otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.subtract = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old & ~otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.negate = function () {
                var dirty = this.dirty;
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = ~old;
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.forEach = function (fn) {
                release || assert(fn);
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var word = bits[i];
                    if (word) {
                        for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                            if (word & (1 << k)) {
                                fn(i * BitSets.BITS_PER_WORD + k);
                            }
                        }
                    }
                }
            };
            Uint32ArrayBitSet.prototype.toArray = function () {
                var set = [];
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var word = bits[i];
                    if (word) {
                        for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                            if (word & (1 << k)) {
                                set.push(i * BitSets.BITS_PER_WORD + k);
                            }
                        }
                    }
                }
                return set;
            };
            Uint32ArrayBitSet.prototype.equals = function (other) {
                if (this.size !== other.size) {
                    return false;
                }
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    if (bits[i] !== otherBits[i]) {
                        return false;
                    }
                }
                return true;
            };
            Uint32ArrayBitSet.prototype.contains = function (other) {
                if (this.size !== other.size) {
                    return false;
                }
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    if ((bits[i] | otherBits[i]) !== bits[i]) {
                        return false;
                    }
                }
                return true;
            };
            Uint32ArrayBitSet.prototype.isEmpty = function () {
                this.recount();
                return this.count === 0;
            };
            Uint32ArrayBitSet.prototype.clone = function () {
                var set = new Uint32ArrayBitSet(this.length);
                set._union(this);
                return set;
            };
            return Uint32ArrayBitSet;
        })();
        BitSets.Uint32ArrayBitSet = Uint32ArrayBitSet;
        var Uint32BitSet = (function () {
            function Uint32BitSet(length) {
                this.count = 0;
                this.dirty = 0;
                this.size = getSize(length);
                this.bits = 0;
                this.singleWord = true;
                this.length = length;
            }
            Uint32BitSet.prototype.recount = function () {
                if (!this.dirty) {
                    return;
                }
                var c = 0;
                var v = this.bits;
                v = v - ((v >> 1) & 0x55555555);
                v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
                c += ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
                this.count = c;
                this.dirty = 0;
            };
            Uint32BitSet.prototype.set = function (i) {
                var old = this.bits;
                var b = old | (1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits = b;
                this.dirty |= old ^ b;
            };
            Uint32BitSet.prototype.setAll = function () {
                this.bits = 0xFFFFFFFF;
                this.count = this.size;
                this.dirty = 0;
            };
            Uint32BitSet.prototype.assign = function (set) {
                this.count = set.count;
                this.dirty = set.dirty;
                this.size = set.size;
                this.bits = set.bits;
            };
            Uint32BitSet.prototype.clear = function (i) {
                var old = this.bits;
                var b = old & ~(1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits = b;
                this.dirty |= old ^ b;
            };
            Uint32BitSet.prototype.get = function (i) {
                return ((this.bits & 1 << (i & BitSets.BIT_INDEX_MASK))) !== 0;
            };
            Uint32BitSet.prototype.clearAll = function () {
                this.bits = 0;
                this.count = 0;
                this.dirty = 0;
            };
            Uint32BitSet.prototype._union = function (other) {
                var old = this.bits;
                var b = old | other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.intersect = function (other) {
                var old = this.bits;
                var b = old & other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.subtract = function (other) {
                var old = this.bits;
                var b = old & ~other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.negate = function () {
                var old = this.bits;
                var b = ~old;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.forEach = function (fn) {
                release || assert(fn);
                var word = this.bits;
                if (word) {
                    for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                        if (word & (1 << k)) {
                            fn(k);
                        }
                    }
                }
            };
            Uint32BitSet.prototype.toArray = function () {
                var set = [];
                var word = this.bits;
                if (word) {
                    for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                        if (word & (1 << k)) {
                            set.push(k);
                        }
                    }
                }
                return set;
            };
            Uint32BitSet.prototype.equals = function (other) {
                return this.bits === other.bits;
            };
            Uint32BitSet.prototype.contains = function (other) {
                var bits = this.bits;
                return (bits | other.bits) === bits;
            };
            Uint32BitSet.prototype.isEmpty = function () {
                this.recount();
                return this.count === 0;
            };
            Uint32BitSet.prototype.clone = function () {
                var set = new Uint32BitSet(this.length);
                set._union(this);
                return set;
            };
            return Uint32BitSet;
        })();
        BitSets.Uint32BitSet = Uint32BitSet;
        Uint32BitSet.prototype.toString = toString;
        Uint32BitSet.prototype.toBitString = toBitString;
        Uint32ArrayBitSet.prototype.toString = toString;
        Uint32ArrayBitSet.prototype.toBitString = toBitString;
        function BitSetFunctor(length) {
            var shouldUseSingleWord = (getSize(length) >> BitSets.ADDRESS_BITS_PER_WORD) === 1;
            var type = (shouldUseSingleWord ? Uint32BitSet : Uint32ArrayBitSet);
            return function () {
                return new type(length);
            };
        }
        BitSets.BitSetFunctor = BitSetFunctor;
    })(BitSets = Shumway.BitSets || (Shumway.BitSets = {}));
    var ColorStyle = (function () {
        function ColorStyle() {
        }
        ColorStyle.randomStyle = function () {
            if (!ColorStyle._randomStyleCache) {
                ColorStyle._randomStyleCache = [
                    "#ff5e3a",
                    "#ff9500",
                    "#ffdb4c",
                    "#87fc70",
                    "#52edc7",
                    "#1ad6fd",
                    "#c644fc",
                    "#ef4db6",
                    "#4a4a4a",
                    "#dbddde",
                    "#ff3b30",
                    "#ff9500",
                    "#ffcc00",
                    "#4cd964",
                    "#34aadc",
                    "#007aff",
                    "#5856d6",
                    "#ff2d55",
                    "#8e8e93",
                    "#c7c7cc",
                    "#5ad427",
                    "#c86edf",
                    "#d1eefc",
                    "#e0f8d8",
                    "#fb2b69",
                    "#f7f7f7",
                    "#1d77ef",
                    "#d6cec3",
                    "#55efcb",
                    "#ff4981",
                    "#ffd3e0",
                    "#f7f7f7",
                    "#ff1300",
                    "#1f1f21",
                    "#bdbec2",
                    "#ff3a2d"
                ];
            }
            return ColorStyle._randomStyleCache[(ColorStyle._nextStyle++) % ColorStyle._randomStyleCache.length];
        };
        ColorStyle.gradientColor = function (value) {
            return ColorStyle._gradient[ColorStyle._gradient.length * NumberUtilities.clamp(value, 0, 1) | 0];
        };
        ColorStyle.contrastStyle = function (rgb) {
            var c = parseInt(rgb.substr(1), 16);
            var yiq = (((c >> 16) * 299) + (((c >> 8) & 0xff) * 587) + ((c & 0xff) * 114)) / 1000;
            return (yiq >= 128) ? '#000000' : '#ffffff';
        };
        ColorStyle.reset = function () {
            ColorStyle._nextStyle = 0;
        };
        ColorStyle.TabToolbar = "#252c33";
        ColorStyle.Toolbars = "#343c45";
        ColorStyle.HighlightBlue = "#1d4f73";
        ColorStyle.LightText = "#f5f7fa";
        ColorStyle.ForegroundText = "#b6babf";
        ColorStyle.Black = "#000000";
        ColorStyle.VeryDark = "#14171a";
        ColorStyle.Dark = "#181d20";
        ColorStyle.Light = "#a9bacb";
        ColorStyle.Grey = "#8fa1b2";
        ColorStyle.DarkGrey = "#5f7387";
        ColorStyle.Blue = "#46afe3";
        ColorStyle.Purple = "#6b7abb";
        ColorStyle.Pink = "#df80ff";
        ColorStyle.Red = "#eb5368";
        ColorStyle.Orange = "#d96629";
        ColorStyle.LightOrange = "#d99b28";
        ColorStyle.Green = "#70bf53";
        ColorStyle.BlueGrey = "#5e88b0";
        ColorStyle._nextStyle = 0;
        ColorStyle._gradient = [
            "#FF0000",
            "#FF1100",
            "#FF2300",
            "#FF3400",
            "#FF4600",
            "#FF5700",
            "#FF6900",
            "#FF7B00",
            "#FF8C00",
            "#FF9E00",
            "#FFAF00",
            "#FFC100",
            "#FFD300",
            "#FFE400",
            "#FFF600",
            "#F7FF00",
            "#E5FF00",
            "#D4FF00",
            "#C2FF00",
            "#B0FF00",
            "#9FFF00",
            "#8DFF00",
            "#7CFF00",
            "#6AFF00",
            "#58FF00",
            "#47FF00",
            "#35FF00",
            "#24FF00",
            "#12FF00",
            "#00FF00"
        ];
        return ColorStyle;
    })();
    Shumway.ColorStyle = ColorStyle;
    var Bounds = (function () {
        function Bounds(xMin, yMin, xMax, yMax) {
            this.xMin = xMin | 0;
            this.yMin = yMin | 0;
            this.xMax = xMax | 0;
            this.yMax = yMax | 0;
        }
        Bounds.FromUntyped = function (source) {
            return new Bounds(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        Bounds.FromRectangle = function (source) {
            return new Bounds(source.x * 20 | 0, source.y * 20 | 0, (source.x + source.width) * 20 | 0, (source.y + source.height) * 20 | 0);
        };
        Bounds.prototype.setElements = function (xMin, yMin, xMax, yMax) {
            this.xMin = xMin;
            this.yMin = yMin;
            this.xMax = xMax;
            this.yMax = yMax;
        };
        Bounds.prototype.copyFrom = function (source) {
            this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        Bounds.prototype.contains = function (x, y) {
            return x < this.xMin !== x < this.xMax && y < this.yMin !== y < this.yMax;
        };
        Bounds.prototype.unionInPlace = function (other) {
            this.extendByPoint(other.xMin, other.yMin);
            this.extendByPoint(other.xMax, other.yMax);
        };
        Bounds.prototype.extendByPoint = function (x, y) {
            this.extendByX(x);
            this.extendByY(y);
        };
        Bounds.prototype.extendByX = function (x) {
            if (this.xMin === 0x8000000) {
                this.xMin = this.xMax = x;
                return;
            }
            this.xMin = Math.min(this.xMin, x);
            this.xMax = Math.max(this.xMax, x);
        };
        Bounds.prototype.extendByY = function (y) {
            if (this.yMin === 0x8000000) {
                this.yMin = this.yMax = y;
                return;
            }
            this.yMin = Math.min(this.yMin, y);
            this.yMax = Math.max(this.yMax, y);
        };
        Bounds.prototype.intersects = function (toIntersect) {
            return this.contains(toIntersect.xMin, toIntersect.yMin) || this.contains(toIntersect.xMax, toIntersect.yMax);
        };
        Bounds.prototype.isEmpty = function () {
            return this.xMax <= this.xMin || this.yMax <= this.yMin;
        };
        Object.defineProperty(Bounds.prototype, "width", {
            get: function () {
                return this.xMax - this.xMin;
            },
            set: function (value) {
                this.xMax = this.xMin + value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bounds.prototype, "height", {
            get: function () {
                return this.yMax - this.yMin;
            },
            set: function (value) {
                this.yMax = this.yMin + value;
            },
            enumerable: true,
            configurable: true
        });
        Bounds.prototype.getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * (this.xMax - this.xMin) + v * (this.yMax - this.yMin);
        };
        Bounds.prototype.getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * (this.xMax - this.xMin) + u * (this.yMax - this.yMin);
        };
        Bounds.prototype.setEmpty = function () {
            this.xMin = this.yMin = this.xMax = this.yMax = 0;
        };
        Bounds.prototype.setToSentinels = function () {
            this.xMin = this.yMin = this.xMax = this.yMax = 0x8000000;
        };
        Bounds.prototype.clone = function () {
            return new Bounds(this.xMin, this.yMin, this.xMax, this.yMax);
        };
        Bounds.prototype.toString = function () {
            return "{ " + "xMin: " + this.xMin + ", " + "xMin: " + this.yMin + ", " + "xMax: " + this.xMax + ", " + "xMax: " + this.yMax + " }";
        };
        return Bounds;
    })();
    Shumway.Bounds = Bounds;
    var DebugBounds = (function () {
        function DebugBounds(xMin, yMin, xMax, yMax) {
            Debug.assert(isInteger(xMin));
            Debug.assert(isInteger(yMin));
            Debug.assert(isInteger(xMax));
            Debug.assert(isInteger(yMax));
            this._xMin = xMin | 0;
            this._yMin = yMin | 0;
            this._xMax = xMax | 0;
            this._yMax = yMax | 0;
            this.assertValid();
        }
        DebugBounds.FromUntyped = function (source) {
            return new DebugBounds(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        DebugBounds.FromRectangle = function (source) {
            return new DebugBounds(source.x * 20 | 0, source.y * 20 | 0, (source.x + source.width) * 20 | 0, (source.y + source.height) * 20 | 0);
        };
        DebugBounds.prototype.setElements = function (xMin, yMin, xMax, yMax) {
            this.xMin = xMin;
            this.yMin = yMin;
            this.xMax = xMax;
            this.yMax = yMax;
        };
        DebugBounds.prototype.copyFrom = function (source) {
            this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        DebugBounds.prototype.contains = function (x, y) {
            return x < this.xMin !== x < this.xMax && y < this.yMin !== y < this.yMax;
        };
        DebugBounds.prototype.unionInPlace = function (other) {
            this.extendByPoint(other.xMin, other.yMin);
            this.extendByPoint(other.xMax, other.yMax);
        };
        DebugBounds.prototype.extendByPoint = function (x, y) {
            this.extendByX(x);
            this.extendByY(y);
        };
        DebugBounds.prototype.extendByX = function (x) {
            if (this.xMin === 0x8000000) {
                this.xMin = this.xMax = x;
                return;
            }
            this.xMin = Math.min(this.xMin, x);
            this.xMax = Math.max(this.xMax, x);
        };
        DebugBounds.prototype.extendByY = function (y) {
            if (this.yMin === 0x8000000) {
                this.yMin = this.yMax = y;
                return;
            }
            this.yMin = Math.min(this.yMin, y);
            this.yMax = Math.max(this.yMax, y);
        };
        DebugBounds.prototype.intersects = function (toIntersect) {
            return this.contains(toIntersect._xMin, toIntersect._yMin) || this.contains(toIntersect._xMax, toIntersect._yMax);
        };
        DebugBounds.prototype.isEmpty = function () {
            return this._xMax <= this._xMin || this._yMax <= this._yMin;
        };
        Object.defineProperty(DebugBounds.prototype, "xMin", {
            get: function () {
                return this._xMin;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._xMin = value;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "yMin", {
            get: function () {
                return this._yMin;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._yMin = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "xMax", {
            get: function () {
                return this._xMax;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._xMax = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "width", {
            get: function () {
                return this._xMax - this._xMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "yMax", {
            get: function () {
                return this._yMax;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._yMax = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "height", {
            get: function () {
                return this._yMax - this._yMin;
            },
            enumerable: true,
            configurable: true
        });
        DebugBounds.prototype.getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * (this._xMax - this._xMin) + v * (this._yMax - this._yMin);
        };
        DebugBounds.prototype.getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * (this._xMax - this._xMin) + u * (this._yMax - this._yMin);
        };
        DebugBounds.prototype.setEmpty = function () {
            this._xMin = this._yMin = this._xMax = this._yMax = 0;
        };
        DebugBounds.prototype.clone = function () {
            return new DebugBounds(this.xMin, this.yMin, this.xMax, this.yMax);
        };
        DebugBounds.prototype.toString = function () {
            return "{ " + "xMin: " + this._xMin + ", " + "xMin: " + this._yMin + ", " + "xMax: " + this._xMax + ", " + "yMax: " + this._yMax + " }";
        };
        DebugBounds.prototype.assertValid = function () {
        };
        return DebugBounds;
    })();
    Shumway.DebugBounds = DebugBounds;
    var Color = (function () {
        function Color(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.FromARGB = function (argb) {
            return new Color((argb >> 16 & 0xFF) / 255, (argb >> 8 & 0xFF) / 255, (argb >> 0 & 0xFF) / 255, (argb >> 24 & 0xFF) / 255);
        };
        Color.FromRGBA = function (rgba) {
            return Color.FromARGB(ColorUtilities.RGBAToARGB(rgba));
        };
        Color.prototype.toRGBA = function () {
            return (this.r * 255) << 24 | (this.g * 255) << 16 | (this.b * 255) << 8 | (this.a * 255);
        };
        Color.prototype.toCSSStyle = function () {
            return ColorUtilities.rgbaToCSSStyle(this.toRGBA());
        };
        Color.prototype.set = function (other) {
            this.r = other.r;
            this.g = other.g;
            this.b = other.b;
            this.a = other.a;
        };
        Color.randomColor = function (alpha) {
            if (alpha === void 0) { alpha = 1; }
            return new Color(Math.random(), Math.random(), Math.random(), alpha);
        };
        Color.parseColor = function (color) {
            if (!Color.colorCache) {
                Color.colorCache = Object.create(null);
            }
            if (Color.colorCache[color]) {
                return Color.colorCache[color];
            }
            var span = document.createElement('span');
            document.body.appendChild(span);
            span.style.backgroundColor = color;
            var rgb = getComputedStyle(span).backgroundColor;
            document.body.removeChild(span);
            var m = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(rgb);
            if (!m)
                m = /^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/.exec(rgb);
            var result = new Color(0, 0, 0, 0);
            result.r = parseFloat(m[1]) / 255;
            result.g = parseFloat(m[2]) / 255;
            result.b = parseFloat(m[3]) / 255;
            result.a = m[4] ? parseFloat(m[4]) / 255 : 1;
            return Color.colorCache[color] = result;
        };
        Color.Red = new Color(1, 0, 0, 1);
        Color.Green = new Color(0, 1, 0, 1);
        Color.Blue = new Color(0, 0, 1, 1);
        Color.None = new Color(0, 0, 0, 0);
        Color.White = new Color(1, 1, 1, 1);
        Color.Black = new Color(0, 0, 0, 1);
        Color.colorCache = {};
        return Color;
    })();
    Shumway.Color = Color;
    var ColorUtilities;
    (function (ColorUtilities) {
        function RGBAToARGB(rgba) {
            return ((rgba >> 8) & 0x00ffffff) | ((rgba & 0xff) << 24);
        }
        ColorUtilities.RGBAToARGB = RGBAToARGB;
        function ARGBToRGBA(argb) {
            return argb << 8 | ((argb >> 24) & 0xff);
        }
        ColorUtilities.ARGBToRGBA = ARGBToRGBA;
        function rgbaToCSSStyle(color) {
            return Shumway.StringUtilities.concat9('rgba(', color >> 24 & 0xff, ',', color >> 16 & 0xff, ',', color >> 8 & 0xff, ',', (color & 0xff) / 0xff, ')');
        }
        ColorUtilities.rgbaToCSSStyle = rgbaToCSSStyle;
        function cssStyleToRGBA(style) {
            if (style[0] === "#") {
                if (style.length === 7) {
                    var value = parseInt(style.substring(1), 16);
                    return (value << 8) | 0xff;
                }
            }
            else if (style[0] === "r") {
                var values = style.substring(5, style.length - 1).split(",");
                var r = parseInt(values[0]);
                var g = parseInt(values[1]);
                var b = parseInt(values[2]);
                var a = parseFloat(values[3]);
                return (r & 0xff) << 24 | (g & 0xff) << 16 | (b & 0xff) << 8 | ((a * 255) & 0xff);
            }
            return 0xff0000ff;
        }
        ColorUtilities.cssStyleToRGBA = cssStyleToRGBA;
        function hexToRGB(color) {
            return parseInt(color.slice(1), 16);
        }
        ColorUtilities.hexToRGB = hexToRGB;
        function rgbToHex(color) {
            return '#' + ('000000' + (color >>> 0).toString(16)).slice(-6);
        }
        ColorUtilities.rgbToHex = rgbToHex;
        function isValidHexColor(value) {
            return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
        }
        ColorUtilities.isValidHexColor = isValidHexColor;
        function clampByte(value) {
            return Math.max(0, Math.min(255, value));
        }
        ColorUtilities.clampByte = clampByte;
        function unpremultiplyARGB(pARGB) {
            var b = (pARGB >> 0) & 0xff;
            var g = (pARGB >> 8) & 0xff;
            var r = (pARGB >> 16) & 0xff;
            var a = (pARGB >> 24) & 0xff;
            r = Math.imul(255, r) / a & 0xff;
            g = Math.imul(255, g) / a & 0xff;
            b = Math.imul(255, b) / a & 0xff;
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.unpremultiplyARGB = unpremultiplyARGB;
        function premultiplyARGB(uARGB) {
            var b = (uARGB >> 0) & 0xff;
            var g = (uARGB >> 8) & 0xff;
            var r = (uARGB >> 16) & 0xff;
            var a = (uARGB >> 24) & 0xff;
            r = ((Math.imul(r, a) + 127) / 255) | 0;
            g = ((Math.imul(g, a) + 127) / 255) | 0;
            b = ((Math.imul(b, a) + 127) / 255) | 0;
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.premultiplyARGB = premultiplyARGB;
        var premultiplyTable;
        var unpremultiplyTable;
        function ensureUnpremultiplyTable() {
            if (!unpremultiplyTable) {
                unpremultiplyTable = new Uint8Array(256 * 256);
                for (var c = 0; c < 256; c++) {
                    for (var a = 0; a < 256; a++) {
                        unpremultiplyTable[(a << 8) + c] = Math.imul(255, c) / a;
                    }
                }
            }
        }
        ColorUtilities.ensureUnpremultiplyTable = ensureUnpremultiplyTable;
        function tableLookupUnpremultiplyARGB(pARGB) {
            pARGB = pARGB | 0;
            var a = (pARGB >> 24) & 0xff;
            if (a === 0) {
                return 0;
            }
            else if (a === 0xff) {
                return pARGB;
            }
            var b = (pARGB >> 0) & 0xff;
            var g = (pARGB >> 8) & 0xff;
            var r = (pARGB >> 16) & 0xff;
            var o = a << 8;
            var T = unpremultiplyTable;
            r = T[o + r];
            g = T[o + g];
            b = T[o + b];
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.tableLookupUnpremultiplyARGB = tableLookupUnpremultiplyARGB;
        function blendPremultipliedBGRA(tpBGRA, spBGRA) {
            var sA = spBGRA & 0xff;
            var sGA = spBGRA & 0x00ff00ff;
            var sBR = spBGRA >> 8 & 0x00ff00ff;
            var tGA = tpBGRA & 0x00ff00ff;
            var tBR = tpBGRA >> 8 & 0x00ff00ff;
            var A = 256 - sA;
            tGA = Math.imul(tGA, A) >> 8;
            tBR = Math.imul(tBR, A) >> 8;
            return ((sBR + tBR & 0x00ff00ff) << 8) | (sGA + tGA & 0x00ff00ff);
        }
        ColorUtilities.blendPremultipliedBGRA = blendPremultipliedBGRA;
        var swap32 = IntegerUtilities.swap32;
        function convertImage(sourceFormat, targetFormat, source, target) {
            if (source !== target) {
                release || Debug.assert(source.buffer !== target.buffer, "Can't handle overlapping views.");
            }
            var length = source.length;
            if (sourceFormat === targetFormat) {
                if (source === target) {
                    return;
                }
                for (var i = 0; i < length; i++) {
                    target[i] = source[i];
                }
                return;
            }
            if (sourceFormat === 1 /* PremultipliedAlphaARGB */ && targetFormat === 3 /* StraightAlphaRGBA */) {
                Shumway.ColorUtilities.ensureUnpremultiplyTable();
                for (var i = 0; i < length; i++) {
                    var pBGRA = source[i];
                    var a = pBGRA & 0xff;
                    if (a === 0) {
                        target[i] = 0;
                    }
                    else if (a === 0xff) {
                        target[i] = (pBGRA & 0xff) << 24 | ((pBGRA >> 8) & 0x00ffffff);
                    }
                    else {
                        var b = (pBGRA >> 24) & 0xff;
                        var g = (pBGRA >> 16) & 0xff;
                        var r = (pBGRA >> 8) & 0xff;
                        var o = a << 8;
                        var T = unpremultiplyTable;
                        r = T[o + r];
                        g = T[o + g];
                        b = T[o + b];
                        target[i] = a << 24 | b << 16 | g << 8 | r;
                    }
                }
            }
            else if (sourceFormat === 2 /* StraightAlphaARGB */ && targetFormat === 3 /* StraightAlphaRGBA */) {
                for (var i = 0; i < length; i++) {
                    target[i] = swap32(source[i]);
                }
            }
            else if (sourceFormat === 3 /* StraightAlphaRGBA */ && targetFormat === 1 /* PremultipliedAlphaARGB */) {
                for (var i = 0; i < length; i++) {
                    var uABGR = source[i];
                    var uARGB = (uABGR & 0xFF00FF00) | (uABGR >> 16) & 0xff | (uABGR & 0xff) << 16;
                    target[i] = swap32(premultiplyARGB(uARGB));
                }
            }
            else {
                Debug.somewhatImplemented("Image Format Conversion: " + ImageType[sourceFormat] + " -> " + ImageType[targetFormat]);
                for (var i = 0; i < length; i++) {
                    target[i] = source[i];
                }
            }
        }
        ColorUtilities.convertImage = convertImage;
    })(ColorUtilities = Shumway.ColorUtilities || (Shumway.ColorUtilities = {}));
    var ArrayBufferPool = (function () {
        function ArrayBufferPool(maxSize) {
            if (maxSize === void 0) { maxSize = 32; }
            this._list = [];
            this._maxSize = maxSize;
        }
        ArrayBufferPool.prototype.acquire = function (length) {
            if (ArrayBufferPool._enabled) {
                var list = this._list;
                for (var i = 0; i < list.length; i++) {
                    var buffer = list[i];
                    if (buffer.byteLength >= length) {
                        list.splice(i, 1);
                        return buffer;
                    }
                }
            }
            return new ArrayBuffer(length);
        };
        ArrayBufferPool.prototype.release = function (buffer) {
            if (ArrayBufferPool._enabled) {
                var list = this._list;
                release || Debug.assert(ArrayUtilities.indexOf(list, buffer) < 0);
                if (list.length === this._maxSize) {
                    list.shift();
                }
                list.push(buffer);
            }
        };
        ArrayBufferPool.prototype.ensureUint8ArrayLength = function (array, length) {
            if (array.length >= length) {
                return array;
            }
            var newLength = Math.max(array.length + length, ((array.length * 3) >> 1) + 1);
            var newArray = new Uint8Array(this.acquire(newLength), 0, newLength);
            newArray.set(array);
            this.release(array.buffer);
            return newArray;
        };
        ArrayBufferPool.prototype.ensureFloat64ArrayLength = function (array, length) {
            if (array.length >= length) {
                return array;
            }
            var newLength = Math.max(array.length + length, ((array.length * 3) >> 1) + 1);
            var newArray = new Float64Array(this.acquire(newLength * Float64Array.BYTES_PER_ELEMENT), 0, newLength);
            newArray.set(array);
            this.release(array.buffer);
            return newArray;
        };
        ArrayBufferPool._enabled = true;
        return ArrayBufferPool;
    })();
    Shumway.ArrayBufferPool = ArrayBufferPool;
    var Telemetry;
    (function (Telemetry) {
        (function (Feature) {
            Feature[Feature["EXTERNAL_INTERFACE_FEATURE"] = 1] = "EXTERNAL_INTERFACE_FEATURE";
            Feature[Feature["CLIPBOARD_FEATURE"] = 2] = "CLIPBOARD_FEATURE";
            Feature[Feature["SHAREDOBJECT_FEATURE"] = 3] = "SHAREDOBJECT_FEATURE";
            Feature[Feature["VIDEO_FEATURE"] = 4] = "VIDEO_FEATURE";
            Feature[Feature["SOUND_FEATURE"] = 5] = "SOUND_FEATURE";
            Feature[Feature["NETCONNECTION_FEATURE"] = 6] = "NETCONNECTION_FEATURE";
        })(Telemetry.Feature || (Telemetry.Feature = {}));
        var Feature = Telemetry.Feature;
        (function (ErrorTypes) {
            ErrorTypes[ErrorTypes["AVM1_ERROR"] = 1] = "AVM1_ERROR";
            ErrorTypes[ErrorTypes["AVM2_ERROR"] = 2] = "AVM2_ERROR";
        })(Telemetry.ErrorTypes || (Telemetry.ErrorTypes = {}));
        var ErrorTypes = Telemetry.ErrorTypes;
        Telemetry.instance;
    })(Telemetry = Shumway.Telemetry || (Shumway.Telemetry = {}));
    var FileLoadingService;
    (function (FileLoadingService) {
        FileLoadingService.instance;
    })(FileLoadingService = Shumway.FileLoadingService || (Shumway.FileLoadingService = {}));
    function registerCSSFont(id, buffer, forceFontInit) {
        if (!inBrowser) {
            Debug.warning('Cannot register CSS font outside the browser');
            return;
        }
        var head = document.head;
        head.insertBefore(document.createElement('style'), head.firstChild);
        var style = document.styleSheets[0];
        var rule = '@font-face{font-family:swffont' + id + ';src:url(data:font/opentype;base64,' + Shumway.StringUtilities.base64ArrayBuffer(buffer) + ')' + '}';
        style.insertRule(rule, style.cssRules.length);
        if (forceFontInit) {
            var node = document.createElement('div');
            node.style.fontFamily = 'swffont' + id;
            node.innerHTML = 'hello';
            document.body.appendChild(node);
            var dummyHeight = node.clientHeight;
            document.body.removeChild(node);
        }
    }
    Shumway.registerCSSFont = registerCSSFont;
    var ExternalInterfaceService;
    (function (ExternalInterfaceService) {
        ExternalInterfaceService.instance = {
            enabled: false,
            initJS: function (callback) {
            },
            registerCallback: function (functionName) {
            },
            unregisterCallback: function (functionName) {
            },
            eval: function (expression) {
            },
            call: function (request) {
            },
            getId: function () {
                return null;
            }
        };
    })(ExternalInterfaceService = Shumway.ExternalInterfaceService || (Shumway.ExternalInterfaceService = {}));
    var ClipboardService = (function () {
        function ClipboardService() {
        }
        ClipboardService.prototype.setClipboard = function (data) {
            Debug.abstractMethod("public ClipboardService::setClipboard");
        };
        ClipboardService.instance = null;
        return ClipboardService;
    })();
    Shumway.ClipboardService = ClipboardService;
    var Callback = (function () {
        function Callback() {
            this._queues = {};
        }
        Callback.prototype.register = function (type, callback) {
            Debug.assert(type);
            Debug.assert(callback);
            var queue = this._queues[type];
            if (queue) {
                if (queue.indexOf(callback) > -1) {
                    return;
                }
            }
            else {
                queue = this._queues[type] = [];
            }
            queue.push(callback);
        };
        Callback.prototype.unregister = function (type, callback) {
            Debug.assert(type);
            Debug.assert(callback);
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            var i = queue.indexOf(callback);
            if (i !== -1) {
                queue.splice(i, 1);
            }
            if (queue.length === 0) {
                this._queues[type] = null;
            }
        };
        Callback.prototype.notify = function (type, args) {
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            queue = queue.slice();
            var args = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < queue.length; i++) {
                var callback = queue[i];
                callback.apply(null, args);
            }
        };
        Callback.prototype.notify1 = function (type, value) {
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            queue = queue.slice();
            for (var i = 0; i < queue.length; i++) {
                var callback = queue[i];
                callback(type, value);
            }
        };
        return Callback;
    })();
    Shumway.Callback = Callback;
    (function (ImageType) {
        ImageType[ImageType["None"] = 0] = "None";
        ImageType[ImageType["PremultipliedAlphaARGB"] = 1] = "PremultipliedAlphaARGB";
        ImageType[ImageType["StraightAlphaARGB"] = 2] = "StraightAlphaARGB";
        ImageType[ImageType["StraightAlphaRGBA"] = 3] = "StraightAlphaRGBA";
        ImageType[ImageType["JPEG"] = 4] = "JPEG";
        ImageType[ImageType["PNG"] = 5] = "PNG";
        ImageType[ImageType["GIF"] = 6] = "GIF";
    })(Shumway.ImageType || (Shumway.ImageType = {}));
    var ImageType = Shumway.ImageType;
    function getMIMETypeForImageType(type) {
        switch (type) {
            case 4 /* JPEG */:
                return "image/jpeg";
            case 5 /* PNG */:
                return "image/png";
            case 6 /* GIF */:
                return "image/gif";
            default:
                return "text/plain";
        }
    }
    Shumway.getMIMETypeForImageType = getMIMETypeForImageType;
    var UI;
    (function (UI) {
        function toCSSCursor(mouseCursor) {
            switch (mouseCursor) {
                case 0:
                    return 'auto';
                case 2:
                    return 'pointer';
                case 3:
                    return 'grab';
                case 4:
                    return 'text';
                case 1:
                default:
                    return 'default';
            }
        }
        UI.toCSSCursor = toCSSCursor;
    })(UI = Shumway.UI || (Shumway.UI = {}));
    var PromiseWrapper = (function () {
        function PromiseWrapper() {
            this.promise = new Promise(function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
            }.bind(this));
        }
        PromiseWrapper.prototype.then = function (onFulfilled, onRejected) {
            return this.promise.then(onFulfilled, onRejected);
        };
        return PromiseWrapper;
    })();
    Shumway.PromiseWrapper = PromiseWrapper;
})(Shumway || (Shumway = {}));
(function PromiseClosure() {
    var global = Function("return this")();
    if (global.Promise) {
        if (typeof global.Promise.all !== 'function') {
            global.Promise.all = function (iterable) {
                var count = 0, results = [], resolve, reject;
                var promise = new global.Promise(function (resolve_, reject_) {
                    resolve = resolve_;
                    reject = reject_;
                });
                iterable.forEach(function (p, i) {
                    count++;
                    p.then(function (result) {
                        results[i] = result;
                        count--;
                        if (count === 0) {
                            resolve(results);
                        }
                    }, reject);
                });
                if (count === 0) {
                    resolve(results);
                }
                return promise;
            };
        }
        if (typeof global.Promise.resolve !== 'function') {
            global.Promise.resolve = function (x) {
                return new global.Promise(function (resolve) {
                    resolve(x);
                });
            };
        }
        return;
    }
    function getDeferred(C) {
        if (typeof C !== 'function') {
            throw new TypeError('Invalid deferred constructor');
        }
        var resolver = createDeferredConstructionFunctions();
        var promise = new C(resolver);
        var resolve = resolver.resolve;
        if (typeof resolve !== 'function') {
            throw new TypeError('Invalid resolve construction function');
        }
        var reject = resolver.reject;
        if (typeof reject !== 'function') {
            throw new TypeError('Invalid reject construction function');
        }
        return { promise: promise, resolve: resolve, reject: reject };
    }
    function updateDeferredFromPotentialThenable(x, deferred) {
        if (typeof x !== 'object' || x === null) {
            return false;
        }
        try {
            var then = x.then;
            if (typeof then !== 'function') {
                return false;
            }
            var thenCallResult = then.call(x, deferred.resolve, deferred.reject);
        }
        catch (e) {
            var reject = deferred.reject;
            reject(e);
        }
        return true;
    }
    function isPromise(x) {
        return typeof x === 'object' && x !== null && typeof x.promiseStatus !== 'undefined';
    }
    function rejectPromise(promise, reason) {
        if (promise.promiseStatus !== 'unresolved') {
            return;
        }
        var reactions = promise.rejectReactions;
        promise.result = reason;
        promise.resolveReactions = undefined;
        promise.rejectReactions = undefined;
        promise.promiseStatus = 'has-rejection';
        triggerPromiseReactions(reactions, reason);
    }
    function resolvePromise(promise, resolution) {
        if (promise.promiseStatus !== 'unresolved') {
            return;
        }
        var reactions = promise.resolveReactions;
        promise.result = resolution;
        promise.resolveReactions = undefined;
        promise.rejectReactions = undefined;
        promise.promiseStatus = 'has-resolution';
        triggerPromiseReactions(reactions, resolution);
    }
    function triggerPromiseReactions(reactions, argument) {
        for (var i = 0; i < reactions.length; i++) {
            queueMicrotask({ reaction: reactions[i], argument: argument });
        }
    }
    function queueMicrotask(task) {
        if (microtasksQueue.length === 0) {
            setTimeout(handleMicrotasksQueue, 0);
        }
        microtasksQueue.push(task);
    }
    function executePromiseReaction(reaction, argument) {
        var deferred = reaction.deferred;
        var handler = reaction.handler;
        var handlerResult, updateResult;
        try {
            handlerResult = handler(argument);
        }
        catch (e) {
            var reject = deferred.reject;
            return reject(e);
        }
        if (handlerResult === deferred.promise) {
            var reject = deferred.reject;
            return reject(new TypeError('Self resolution'));
        }
        try {
            updateResult = updateDeferredFromPotentialThenable(handlerResult, deferred);
            if (!updateResult) {
                var resolve = deferred.resolve;
                return resolve(handlerResult);
            }
        }
        catch (e) {
            var reject = deferred.reject;
            return reject(e);
        }
    }
    var microtasksQueue = [];
    function handleMicrotasksQueue() {
        while (microtasksQueue.length > 0) {
            var task = microtasksQueue[0];
            try {
                executePromiseReaction(task.reaction, task.argument);
            }
            catch (e) {
                if (typeof Promise.onerror === 'function') {
                    Promise.onerror(e);
                }
            }
            microtasksQueue.shift();
        }
    }
    function throwerFunction(e) {
        throw e;
    }
    function identityFunction(x) {
        return x;
    }
    function createRejectPromiseFunction(promise) {
        return function (reason) {
            rejectPromise(promise, reason);
        };
    }
    function createResolvePromiseFunction(promise) {
        return function (resolution) {
            resolvePromise(promise, resolution);
        };
    }
    function createDeferredConstructionFunctions() {
        var fn = function (resolve, reject) {
            fn.resolve = resolve;
            fn.reject = reject;
        };
        return fn;
    }
    function createPromiseResolutionHandlerFunctions(promise, fulfillmentHandler, rejectionHandler) {
        return function (x) {
            if (x === promise) {
                return rejectionHandler(new TypeError('Self resolution'));
            }
            var cstr = promise.promiseConstructor;
            if (isPromise(x)) {
                var xConstructor = x.promiseConstructor;
                if (xConstructor === cstr) {
                    return x.then(fulfillmentHandler, rejectionHandler);
                }
            }
            var deferred = getDeferred(cstr);
            var updateResult = updateDeferredFromPotentialThenable(x, deferred);
            if (updateResult) {
                var deferredPromise = deferred.promise;
                return deferredPromise.then(fulfillmentHandler, rejectionHandler);
            }
            return fulfillmentHandler(x);
        };
    }
    function createPromiseAllCountdownFunction(index, values, deferred, countdownHolder) {
        return function (x) {
            values[index] = x;
            countdownHolder.countdown--;
            if (countdownHolder.countdown === 0) {
                deferred.resolve(values);
            }
        };
    }
    function Promise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError('resolver is not a function');
        }
        var promise = this;
        if (typeof promise !== 'object') {
            throw new TypeError('Promise to initialize is not an object');
        }
        promise.promiseStatus = 'unresolved';
        promise.resolveReactions = [];
        promise.rejectReactions = [];
        promise.result = undefined;
        var resolve = createResolvePromiseFunction(promise);
        var reject = createRejectPromiseFunction(promise);
        try {
            var result = resolver(resolve, reject);
        }
        catch (e) {
            rejectPromise(promise, e);
        }
        promise.promiseConstructor = Promise;
        return promise;
    }
    Promise.all = function (iterable) {
        var deferred = getDeferred(this);
        var values = [];
        var countdownHolder = { countdown: 0 };
        var index = 0;
        iterable.forEach(function (nextValue) {
            var nextPromise = this.cast(nextValue);
            var fn = createPromiseAllCountdownFunction(index, values, deferred, countdownHolder);
            nextPromise.then(fn, deferred.reject);
            index++;
            countdownHolder.countdown++;
        }, this);
        if (index === 0) {
            deferred.resolve(values);
        }
        return deferred.promise;
    };
    Promise.cast = function (x) {
        if (isPromise(x)) {
            return x;
        }
        var deferred = getDeferred(this);
        deferred.resolve(x);
        return deferred.promise;
    };
    Promise.reject = function (r) {
        var deferred = getDeferred(this);
        var rejectResult = deferred.reject(r);
        return deferred.promise;
    };
    Promise.resolve = function (x) {
        var deferred = getDeferred(this);
        var rejectResult = deferred.resolve(x);
        return deferred.promise;
    };
    Promise.prototype = {
        'catch': function (onRejected) {
            this.then(undefined, onRejected);
        },
        then: function (onFulfilled, onRejected) {
            var promise = this;
            if (!isPromise(promise)) {
                throw new TypeError('this is not a Promises');
            }
            var cstr = promise.promiseConstructor;
            var deferred = getDeferred(cstr);
            var rejectionHandler = typeof onRejected === 'function' ? onRejected : throwerFunction;
            var fulfillmentHandler = typeof onFulfilled === 'function' ? onFulfilled : identityFunction;
            var resolutionHandler = createPromiseResolutionHandlerFunctions(promise, fulfillmentHandler, rejectionHandler);
            var resolveReaction = { deferred: deferred, handler: resolutionHandler };
            var rejectReaction = { deferred: deferred, handler: rejectionHandler };
            switch (promise.promiseStatus) {
                case 'unresolved':
                    promise.resolveReactions.push(resolveReaction);
                    promise.rejectReactions.push(rejectReaction);
                    break;
                case 'has-resolution':
                    var resolution = promise.result;
                    queueMicrotask({ reaction: resolveReaction, argument: resolution });
                    break;
                case 'has-rejection':
                    var rejection = promise.result;
                    queueMicrotask({ reaction: rejectReaction, argument: rejection });
                    break;
            }
            return deferred.promise;
        }
    };
    global.Promise = Promise;
})();
if (typeof exports !== "undefined") {
    exports["Shumway"] = Shumway;
}
(function () {
    function extendBuiltin(prototype, property, value) {
        if (!prototype[property]) {
            Object.defineProperty(prototype, property, { value: value, writable: true, configurable: true, enumerable: false });
        }
    }
    function removeColors(s) {
        return s.replace(/\033\[[0-9]*m/g, "");
    }
    extendBuiltin(String.prototype, "padRight", function (c, n) {
        var str = this;
        var length = removeColors(str).length;
        if (!c || length >= n) {
            return str;
        }
        var max = (n - length) / c.length;
        for (var i = 0; i < max; i++) {
            str += c;
        }
        return str;
    });
    extendBuiltin(String.prototype, "padLeft", function (c, n) {
        var str = this;
        var length = str.length;
        if (!c || length >= n) {
            return str;
        }
        var max = (n - length) / c.length;
        for (var i = 0; i < max; i++) {
            str = c + str;
        }
        return str;
    });
    extendBuiltin(String.prototype, "trim", function () {
        return this.replace(/^\s+|\s+$/g, "");
    });
    extendBuiltin(String.prototype, "endsWith", function (str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    });
    extendBuiltin(Array.prototype, "replace", function (x, y) {
        if (x === y) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < this.length; i++) {
            if (this[i] === x) {
                this[i] = y;
                count++;
            }
        }
        return count;
    });
})();
var Shumway;
(function (Shumway) {
    var Options;
    (function (Options) {
        var isObject = Shumway.isObject;
        var assert = Shumway.Debug.assert;
        var Argument = (function () {
            function Argument(shortName, longName, type, options) {
                this.shortName = shortName;
                this.longName = longName;
                this.type = type;
                options = options || {};
                this.positional = options.positional;
                this.parseFn = options.parse;
                this.value = options.defaultValue;
            }
            Argument.prototype.parse = function (value) {
                if (this.type === "boolean") {
                    release || assert(typeof value === "boolean");
                    this.value = value;
                }
                else if (this.type === "number") {
                    release || assert(!isNaN(value), value + " is not a number");
                    this.value = parseInt(value, 10);
                }
                else {
                    this.value = value;
                }
                if (this.parseFn) {
                    this.parseFn(this.value);
                }
            };
            return Argument;
        })();
        Options.Argument = Argument;
        var ArgumentParser = (function () {
            function ArgumentParser() {
                this.args = [];
            }
            ArgumentParser.prototype.addArgument = function (shortName, longName, type, options) {
                var argument = new Argument(shortName, longName, type, options);
                this.args.push(argument);
                return argument;
            };
            ArgumentParser.prototype.addBoundOption = function (option) {
                var options = { parse: function (x) {
                    option.value = x;
                } };
                this.args.push(new Argument(option.shortName, option.longName, option.type, options));
            };
            ArgumentParser.prototype.addBoundOptionSet = function (optionSet) {
                var self = this;
                optionSet.options.forEach(function (x) {
                    if (x instanceof OptionSet) {
                        self.addBoundOptionSet(x);
                    }
                    else {
                        release || assert(x instanceof Option);
                        self.addBoundOption(x);
                    }
                });
            };
            ArgumentParser.prototype.getUsage = function () {
                var str = "";
                this.args.forEach(function (x) {
                    if (!x.positional) {
                        str += "[-" + x.shortName + "|--" + x.longName + (x.type === "boolean" ? "" : " " + x.type[0].toUpperCase()) + "]";
                    }
                    else {
                        str += x.longName;
                    }
                    str += " ";
                });
                return str;
            };
            ArgumentParser.prototype.parse = function (args) {
                var nonPositionalArgumentMap = {};
                var positionalArgumentList = [];
                this.args.forEach(function (x) {
                    if (x.positional) {
                        positionalArgumentList.push(x);
                    }
                    else {
                        nonPositionalArgumentMap["-" + x.shortName] = x;
                        nonPositionalArgumentMap["--" + x.longName] = x;
                    }
                });
                var leftoverArguments = [];
                while (args.length) {
                    var argString = args.shift();
                    var argument = null, value = argString;
                    if (argString == '--') {
                        leftoverArguments = leftoverArguments.concat(args);
                        break;
                    }
                    else if (argString.slice(0, 1) == '-' || argString.slice(0, 2) == '--') {
                        argument = nonPositionalArgumentMap[argString];
                        if (!argument) {
                            continue;
                        }
                        if (argument.type !== "boolean") {
                            value = args.shift();
                            release || assert(value !== "-" && value !== "--", "Argument " + argString + " must have a value.");
                        }
                        else {
                            value = true;
                        }
                    }
                    else if (positionalArgumentList.length) {
                        argument = positionalArgumentList.shift();
                    }
                    else {
                        leftoverArguments.push(value);
                    }
                    if (argument) {
                        argument.parse(value);
                    }
                }
                release || assert(positionalArgumentList.length === 0, "Missing positional arguments.");
                return leftoverArguments;
            };
            return ArgumentParser;
        })();
        Options.ArgumentParser = ArgumentParser;
        var OptionSet = (function () {
            function OptionSet(name, settings) {
                if (settings === void 0) { settings = null; }
                this.open = false;
                this.name = name;
                this.settings = settings || {};
                this.options = [];
            }
            OptionSet.prototype.register = function (option) {
                if (option instanceof OptionSet) {
                    for (var i = 0; i < this.options.length; i++) {
                        var optionSet = this.options[i];
                        if (optionSet instanceof OptionSet && optionSet.name === option.name) {
                            return optionSet;
                        }
                    }
                }
                this.options.push(option);
                if (this.settings) {
                    if (option instanceof OptionSet) {
                        var optionSettings = this.settings[option.name];
                        if (isObject(optionSettings)) {
                            option.settings = optionSettings.settings;
                            option.open = optionSettings.open;
                        }
                    }
                    else {
                        if (typeof this.settings[option.longName] !== "undefined") {
                            switch (option.type) {
                                case "boolean":
                                    option.value = !!this.settings[option.longName];
                                    break;
                                case "number":
                                    option.value = +this.settings[option.longName];
                                    break;
                                default:
                                    option.value = this.settings[option.longName];
                                    break;
                            }
                        }
                    }
                }
                return option;
            };
            OptionSet.prototype.trace = function (writer) {
                writer.enter(this.name + " {");
                this.options.forEach(function (option) {
                    option.trace(writer);
                });
                writer.leave("}");
            };
            OptionSet.prototype.getSettings = function () {
                var settings = {};
                this.options.forEach(function (option) {
                    if (option instanceof OptionSet) {
                        settings[option.name] = {
                            settings: option.getSettings(),
                            open: option.open
                        };
                    }
                    else {
                        settings[option.longName] = option.value;
                    }
                });
                return settings;
            };
            OptionSet.prototype.setSettings = function (settings) {
                if (!settings) {
                    return;
                }
                this.options.forEach(function (option) {
                    if (option instanceof OptionSet) {
                        if (option.name in settings) {
                            option.setSettings(settings[option.name].settings);
                        }
                    }
                    else {
                        if (option.longName in settings) {
                            option.value = settings[option.longName];
                        }
                    }
                });
            };
            return OptionSet;
        })();
        Options.OptionSet = OptionSet;
        var Option = (function () {
            function Option(shortName, longName, type, defaultValue, description, config) {
                if (config === void 0) { config = null; }
                this.longName = longName;
                this.shortName = shortName;
                this.type = type;
                this.defaultValue = defaultValue;
                this.value = defaultValue;
                this.description = description;
                this.config = config;
            }
            Option.prototype.parse = function (value) {
                this.value = value;
            };
            Option.prototype.trace = function (writer) {
                writer.writeLn(("-" + this.shortName + "|--" + this.longName).padRight(" ", 30) + " = " + this.type + " " + this.value + " [" + this.defaultValue + "]" + " (" + this.description + ")");
            };
            return Option;
        })();
        Options.Option = Option;
    })(Options = Shumway.Options || (Shumway.Options = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Settings;
    (function (Settings) {
        Settings.ROOT = "Shumway Options";
        Settings.shumwayOptions = new Shumway.Options.OptionSet(Settings.ROOT, load());
        function isStorageSupported() {
            try {
                return typeof window !== 'undefined' && "localStorage" in window && window["localStorage"] !== null;
            }
            catch (e) {
                return false;
            }
        }
        Settings.isStorageSupported = isStorageSupported;
        function load(key) {
            if (key === void 0) { key = Settings.ROOT; }
            var settings = {};
            if (isStorageSupported()) {
                var lsValue = window.localStorage[key];
                if (lsValue) {
                    try {
                        settings = JSON.parse(lsValue);
                    }
                    catch (e) {
                    }
                }
            }
            return settings;
        }
        Settings.load = load;
        function save(settings, key) {
            if (settings === void 0) { settings = null; }
            if (key === void 0) { key = Settings.ROOT; }
            if (isStorageSupported()) {
                try {
                    window.localStorage[key] = JSON.stringify(settings ? settings : Settings.shumwayOptions.getSettings());
                }
                catch (e) {
                }
            }
        }
        Settings.save = save;
        function setSettings(settings) {
            Settings.shumwayOptions.setSettings(settings);
        }
        Settings.setSettings = setSettings;
        function getSettings(settings) {
            return Settings.shumwayOptions.getSettings();
        }
        Settings.getSettings = getSettings;
    })(Settings = Shumway.Settings || (Shumway.Settings = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Metrics;
    (function (Metrics) {
        var Timer = (function () {
            function Timer(parent, name) {
                this._parent = parent;
                this._timers = Shumway.ObjectUtilities.createMap();
                this._name = name;
                this._begin = 0;
                this._last = 0;
                this._total = 0;
                this._count = 0;
            }
            Timer.time = function (name, fn) {
                Timer.start(name);
                fn();
                Timer.stop();
            };
            Timer.start = function (name) {
                Timer._top = Timer._top._timers[name] || (Timer._top._timers[name] = new Timer(Timer._top, name));
                Timer._top.start();
                var tmp = Timer._flat._timers[name] || (Timer._flat._timers[name] = new Timer(Timer._flat, name));
                tmp.start();
                Timer._flatStack.push(tmp);
            };
            Timer.stop = function () {
                Timer._top.stop();
                Timer._top = Timer._top._parent;
                Timer._flatStack.pop().stop();
            };
            Timer.stopStart = function (name) {
                Timer.stop();
                Timer.start(name);
            };
            Timer.prototype.start = function () {
                this._begin = Shumway.getTicks();
            };
            Timer.prototype.stop = function () {
                this._last = Shumway.getTicks() - this._begin;
                this._total += this._last;
                this._count += 1;
            };
            Timer.prototype.toJSON = function () {
                return { name: this._name, total: this._total, timers: this._timers };
            };
            Timer.prototype.trace = function (writer) {
                writer.enter(this._name + ": " + this._total.toFixed(2) + " ms" + ", count: " + this._count + ", average: " + (this._total / this._count).toFixed(2) + " ms");
                for (var name in this._timers) {
                    this._timers[name].trace(writer);
                }
                writer.outdent();
            };
            Timer.trace = function (writer) {
                Timer._base.trace(writer);
                Timer._flat.trace(writer);
            };
            Timer._base = new Timer(null, "Total");
            Timer._top = Timer._base;
            Timer._flat = new Timer(null, "Flat");
            Timer._flatStack = [];
            return Timer;
        })();
        Metrics.Timer = Timer;
        var Counter = (function () {
            function Counter(enabled) {
                this._enabled = enabled;
                this.clear();
            }
            Object.defineProperty(Counter.prototype, "counts", {
                get: function () {
                    return this._counts;
                },
                enumerable: true,
                configurable: true
            });
            Counter.prototype.setEnabled = function (enabled) {
                this._enabled = enabled;
            };
            Counter.prototype.clear = function () {
                this._counts = Shumway.ObjectUtilities.createMap();
                this._times = Shumway.ObjectUtilities.createMap();
            };
            Counter.prototype.toJSON = function () {
                return {
                    counts: this._counts,
                    times: this._times
                };
            };
            Counter.prototype.count = function (name, increment, time) {
                if (increment === void 0) { increment = 1; }
                if (time === void 0) { time = 0; }
                if (!this._enabled) {
                    return;
                }
                if (this._counts[name] === undefined) {
                    this._counts[name] = 0;
                    this._times[name] = 0;
                }
                this._counts[name] += increment;
                this._times[name] += time;
                return this._counts[name];
            };
            Counter.prototype.trace = function (writer) {
                for (var name in this._counts) {
                    writer.writeLn(name + ": " + this._counts[name]);
                }
            };
            Counter.prototype._pairToString = function (times, pair) {
                var name = pair[0];
                var count = pair[1];
                var time = times[name];
                var line = name + ": " + count;
                if (time) {
                    line += ", " + time.toFixed(4);
                    if (count > 1) {
                        line += " (" + (time / count).toFixed(4) + ")";
                    }
                }
                return line;
            };
            Counter.prototype.toStringSorted = function () {
                var self = this;
                var times = this._times;
                var pairs = [];
                for (var name in this._counts) {
                    pairs.push([name, this._counts[name]]);
                }
                pairs.sort(function (a, b) {
                    return b[1] - a[1];
                });
                return (pairs.map(function (pair) {
                    return self._pairToString(times, pair);
                }).join(", "));
            };
            Counter.prototype.traceSorted = function (writer, inline) {
                if (inline === void 0) { inline = false; }
                var self = this;
                var times = this._times;
                var pairs = [];
                for (var name in this._counts) {
                    pairs.push([name, this._counts[name]]);
                }
                pairs.sort(function (a, b) {
                    return b[1] - a[1];
                });
                if (inline) {
                    writer.writeLn(pairs.map(function (pair) {
                        return self._pairToString(times, pair);
                    }).join(", "));
                }
                else {
                    pairs.forEach(function (pair) {
                        writer.writeLn(self._pairToString(times, pair));
                    });
                }
            };
            Counter.instance = new Counter(true);
            return Counter;
        })();
        Metrics.Counter = Counter;
        var Average = (function () {
            function Average(max) {
                this._samples = new Float64Array(max);
                this._count = 0;
                this._index = 0;
            }
            Average.prototype.push = function (sample) {
                if (this._count < this._samples.length) {
                    this._count++;
                }
                this._index++;
                this._samples[this._index % this._samples.length] = sample;
            };
            Average.prototype.average = function () {
                var sum = 0;
                for (var i = 0; i < this._count; i++) {
                    sum += this._samples[i];
                }
                return sum / this._count;
            };
            return Average;
        })();
        Metrics.Average = Average;
    })(Metrics = Shumway.Metrics || (Shumway.Metrics = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var InflateState;
        (function (InflateState) {
            InflateState[InflateState["INIT"] = 0] = "INIT";
            InflateState[InflateState["BLOCK_0"] = 1] = "BLOCK_0";
            InflateState[InflateState["BLOCK_1"] = 2] = "BLOCK_1";
            InflateState[InflateState["BLOCK_2_PRE"] = 3] = "BLOCK_2_PRE";
            InflateState[InflateState["BLOCK_2"] = 4] = "BLOCK_2";
            InflateState[InflateState["DONE"] = 5] = "DONE";
            InflateState[InflateState["ERROR"] = 6] = "ERROR";
            InflateState[InflateState["VERIFY_HEADER"] = 7] = "VERIFY_HEADER";
        })(InflateState || (InflateState = {}));
        var WINDOW_SIZE = 32768;
        var WINDOW_SHIFT_POSITION = 65536;
        var MAX_WINDOW_SIZE = WINDOW_SHIFT_POSITION + 258;
        var Inflate = (function () {
            function Inflate(verifyHeader) {
                this._buffer = null;
                this._bufferSize = 0;
                this._bufferPosition = 0;
                this._bitBuffer = 0;
                this._bitLength = 0;
                this._window = new Uint8Array(MAX_WINDOW_SIZE);
                this._windowPosition = 0;
                this._state = verifyHeader ? 7 /* VERIFY_HEADER */ : 0 /* INIT */;
                this._isFinalBlock = false;
                this._literalTable = null;
                this._distanceTable = null;
                this._block0Read = 0;
                this._block2State = null;
                this._copyState = {
                    state: 0,
                    len: 0,
                    lenBits: 0,
                    dist: 0,
                    distBits: 0
                };
                this._error = undefined;
                if (!areTablesInitialized) {
                    initializeTables();
                    areTablesInitialized = true;
                }
            }
            Object.defineProperty(Inflate.prototype, "error", {
                get: function () {
                    return this._error;
                },
                enumerable: true,
                configurable: true
            });
            Inflate.prototype.push = function (data, takeOwnership) {
                if (takeOwnership === void 0) { takeOwnership = false; }
                if (takeOwnership && this._bufferSize === 0) {
                    this._buffer = data;
                }
                else {
                    if (!this._buffer || this._buffer.length < this._bufferSize + data.length) {
                        var newBuffer = new Uint8Array(this._bufferSize + data.length);
                        if (this._buffer) {
                            newBuffer.set(this._buffer);
                        }
                        this._buffer = newBuffer;
                    }
                    this._buffer.set(data, this._bufferSize);
                }
                this._bufferSize += data.length;
                this._bufferPosition = 0;
                var incomplete = false;
                do {
                    var lastPosition = this._windowPosition;
                    if (this._state === 0 /* INIT */) {
                        incomplete = this._decodeInitState();
                        if (incomplete) {
                            break;
                        }
                    }
                    switch (this._state) {
                        case 1 /* BLOCK_0 */:
                            incomplete = this._decodeBlock0();
                            break;
                        case 3 /* BLOCK_2_PRE */:
                            incomplete = this._decodeBlock2Pre();
                            if (incomplete) {
                                break;
                            }
                        case 2 /* BLOCK_1 */:
                        case 4 /* BLOCK_2 */:
                            incomplete = this._decodeBlock();
                            break;
                        case 6 /* ERROR */:
                        case 5 /* DONE */:
                            this._bufferPosition = this._bufferSize;
                            break;
                        case 7 /* VERIFY_HEADER */:
                            incomplete = this._verifyZlibHeader();
                            break;
                    }
                    var decoded = this._windowPosition - lastPosition;
                    if (decoded > 0) {
                        this.onData(this._window.subarray(lastPosition, this._windowPosition));
                    }
                    if (this._windowPosition >= WINDOW_SHIFT_POSITION) {
                        if ('copyWithin' in this._buffer) {
                            this._window['copyWithin'](0, this._windowPosition - WINDOW_SIZE, this._windowPosition);
                        }
                        else {
                            this._window.set(this._window.subarray(this._windowPosition - WINDOW_SIZE, this._windowPosition));
                        }
                        this._windowPosition = WINDOW_SIZE;
                    }
                } while (!incomplete && this._bufferPosition < this._bufferSize);
                if (this._bufferPosition < this._bufferSize) {
                    if ('copyWithin' in this._buffer) {
                        this._buffer['copyWithin'](0, this._bufferPosition, this._bufferSize);
                    }
                    else {
                        this._buffer.set(this._buffer.subarray(this._bufferPosition, this._bufferSize));
                    }
                    this._bufferSize -= this._bufferPosition;
                }
                else {
                    this._bufferSize = 0;
                }
            };
            Inflate.prototype._verifyZlibHeader = function () {
                var position = this._bufferPosition;
                if (position + 2 > this._bufferSize) {
                    return true;
                }
                var buffer = this._buffer;
                var header = (buffer[position] << 8) | buffer[position + 1];
                this._bufferPosition = position + 2;
                var error = null;
                if ((header & 0x0f00) !== 0x0800) {
                    error = 'inflate: unknown compression method';
                }
                else if ((header % 31) !== 0) {
                    error = 'inflate: bad FCHECK';
                }
                else if ((header & 0x20) !== 0) {
                    error = 'inflate: FDICT bit set';
                }
                if (error) {
                    this._error = error;
                    this._state = 6 /* ERROR */;
                }
                else {
                    this._state = 0 /* INIT */;
                }
                return false;
            };
            Inflate.prototype._decodeInitState = function () {
                if (this._isFinalBlock) {
                    this._state = 5 /* DONE */;
                    return false;
                }
                var buffer = this._buffer, bufferSize = this._bufferSize;
                var bitBuffer = this._bitBuffer, bitLength = this._bitLength;
                var state;
                var position = this._bufferPosition;
                if (((bufferSize - position) << 3) + bitLength < 3) {
                    return true;
                }
                if (bitLength < 3) {
                    bitBuffer |= buffer[position++] << bitLength;
                    bitLength += 8;
                }
                var type = bitBuffer & 7;
                bitBuffer >>= 3;
                bitLength -= 3;
                switch (type >> 1) {
                    case 0:
                        bitBuffer = 0;
                        bitLength = 0;
                        if (bufferSize - position < 4) {
                            return true;
                        }
                        var length = buffer[position] | (buffer[position + 1] << 8);
                        var length2 = buffer[position + 2] | (buffer[position + 3] << 8);
                        position += 4;
                        if ((length ^ length2) !== 0xFFFF) {
                            this._error = 'inflate: invalid block 0 length';
                            state = 6 /* ERROR */;
                            break;
                        }
                        if (length === 0) {
                            state = 0 /* INIT */;
                        }
                        else {
                            this._block0Read = length;
                            state = 1 /* BLOCK_0 */;
                        }
                        break;
                    case 1:
                        state = 2 /* BLOCK_1 */;
                        this._literalTable = fixedLiteralTable;
                        this._distanceTable = fixedDistanceTable;
                        break;
                    case 2:
                        if (((bufferSize - position) << 3) + bitLength < 14 + 3 * 4) {
                            return true;
                        }
                        while (bitLength < 14) {
                            bitBuffer |= buffer[position++] << bitLength;
                            bitLength += 8;
                        }
                        var numLengthCodes = ((bitBuffer >> 10) & 15) + 4;
                        if (((bufferSize - position) << 3) + bitLength < 14 + 3 * numLengthCodes) {
                            return true;
                        }
                        var block2State = {
                            numLiteralCodes: (bitBuffer & 31) + 257,
                            numDistanceCodes: ((bitBuffer >> 5) & 31) + 1,
                            codeLengthTable: undefined,
                            bitLengths: undefined,
                            codesRead: 0,
                            dupBits: 0
                        };
                        bitBuffer >>= 14;
                        bitLength -= 14;
                        var codeLengths = new Uint8Array(19);
                        for (var i = 0; i < numLengthCodes; ++i) {
                            if (bitLength < 3) {
                                bitBuffer |= buffer[position++] << bitLength;
                                bitLength += 8;
                            }
                            codeLengths[codeLengthOrder[i]] = bitBuffer & 7;
                            bitBuffer >>= 3;
                            bitLength -= 3;
                        }
                        for (; i < 19; i++) {
                            codeLengths[codeLengthOrder[i]] = 0;
                        }
                        block2State.bitLengths = new Uint8Array(block2State.numLiteralCodes + block2State.numDistanceCodes);
                        block2State.codeLengthTable = makeHuffmanTable(codeLengths);
                        this._block2State = block2State;
                        state = 3 /* BLOCK_2_PRE */;
                        break;
                    default:
                        this._error = 'inflate: unsupported block type';
                        state = 6 /* ERROR */;
                        return false;
                }
                this._isFinalBlock = !!(type & 1);
                this._state = state;
                this._bufferPosition = position;
                this._bitBuffer = bitBuffer;
                this._bitLength = bitLength;
                return false;
            };
            Inflate.prototype._decodeBlock0 = function () {
                var position = this._bufferPosition;
                var windowPosition = this._windowPosition;
                var toRead = this._block0Read;
                var leftInWindow = MAX_WINDOW_SIZE - windowPosition;
                var leftInBuffer = this._bufferSize - position;
                var incomplete = leftInBuffer < toRead;
                var canFit = Math.min(leftInWindow, leftInBuffer, toRead);
                this._window.set(this._buffer.subarray(position, position + canFit), windowPosition);
                this._windowPosition = windowPosition + canFit;
                this._bufferPosition = position + canFit;
                this._block0Read = toRead - canFit;
                if (toRead === canFit) {
                    this._state = 0 /* INIT */;
                    return false;
                }
                return incomplete && leftInWindow < leftInBuffer;
            };
            Inflate.prototype._readBits = function (size) {
                var bitBuffer = this._bitBuffer;
                var bitLength = this._bitLength;
                if (size > bitLength) {
                    var pos = this._bufferPosition;
                    var end = this._bufferSize;
                    do {
                        if (pos >= end) {
                            this._bufferPosition = pos;
                            this._bitBuffer = bitBuffer;
                            this._bitLength = bitLength;
                            return -1;
                        }
                        bitBuffer |= this._buffer[pos++] << bitLength;
                        bitLength += 8;
                    } while (size > bitLength);
                    this._bufferPosition = pos;
                }
                this._bitBuffer = bitBuffer >> size;
                this._bitLength = bitLength - size;
                return bitBuffer & ((1 << size) - 1);
            };
            Inflate.prototype._readCode = function (codeTable) {
                var bitBuffer = this._bitBuffer;
                var bitLength = this._bitLength;
                var maxBits = codeTable.maxBits;
                if (maxBits > bitLength) {
                    var pos = this._bufferPosition;
                    var end = this._bufferSize;
                    do {
                        if (pos >= end) {
                            this._bufferPosition = pos;
                            this._bitBuffer = bitBuffer;
                            this._bitLength = bitLength;
                            return -1;
                        }
                        bitBuffer |= this._buffer[pos++] << bitLength;
                        bitLength += 8;
                    } while (maxBits > bitLength);
                    this._bufferPosition = pos;
                }
                var code = codeTable.codes[bitBuffer & ((1 << maxBits) - 1)];
                var len = code >> 16;
                if ((code & 0x8000)) {
                    this._error = 'inflate: invalid encoding';
                    this._state = 6 /* ERROR */;
                    return -1;
                }
                this._bitBuffer = bitBuffer >> len;
                this._bitLength = bitLength - len;
                return code & 0xffff;
            };
            Inflate.prototype._decodeBlock2Pre = function () {
                var block2State = this._block2State;
                var numCodes = block2State.numLiteralCodes + block2State.numDistanceCodes;
                var bitLengths = block2State.bitLengths;
                var i = block2State.codesRead;
                var prev = i > 0 ? bitLengths[i - 1] : 0;
                var codeLengthTable = block2State.codeLengthTable;
                var j;
                if (block2State.dupBits > 0) {
                    j = this._readBits(block2State.dupBits);
                    if (j < 0) {
                        return true;
                    }
                    while (j--) {
                        bitLengths[i++] = prev;
                    }
                    block2State.dupBits = 0;
                }
                while (i < numCodes) {
                    var sym = this._readCode(codeLengthTable);
                    if (sym < 0) {
                        block2State.codesRead = i;
                        return true;
                    }
                    else if (sym < 16) {
                        bitLengths[i++] = (prev = sym);
                        continue;
                    }
                    var j, dupBits;
                    switch (sym) {
                        case 16:
                            dupBits = 2;
                            j = 3;
                            sym = prev;
                            break;
                        case 17:
                            dupBits = 3;
                            j = 3;
                            sym = 0;
                            break;
                        case 18:
                            dupBits = 7;
                            j = 11;
                            sym = 0;
                            break;
                    }
                    while (j--) {
                        bitLengths[i++] = sym;
                    }
                    j = this._readBits(dupBits);
                    if (j < 0) {
                        block2State.codesRead = i;
                        block2State.dupBits = dupBits;
                        return true;
                    }
                    while (j--) {
                        bitLengths[i++] = sym;
                    }
                    prev = sym;
                }
                this._literalTable = makeHuffmanTable(bitLengths.subarray(0, block2State.numLiteralCodes));
                this._distanceTable = makeHuffmanTable(bitLengths.subarray(block2State.numLiteralCodes));
                this._state = 4 /* BLOCK_2 */;
                this._block2State = null;
                return false;
            };
            Inflate.prototype._decodeBlock = function () {
                var literalTable = this._literalTable, distanceTable = this._distanceTable;
                var output = this._window, pos = this._windowPosition;
                var copyState = this._copyState;
                var i, j, sym;
                var len, lenBits, dist, distBits;
                if (copyState.state !== 0) {
                    switch (copyState.state) {
                        case 1:
                            j = 0;
                            if ((j = this._readBits(copyState.lenBits)) < 0) {
                                return true;
                            }
                            copyState.len += j;
                            copyState.state = 2;
                        case 2:
                            if ((sym = this._readCode(distanceTable)) < 0) {
                                return true;
                            }
                            copyState.distBits = distanceExtraBits[sym];
                            copyState.dist = distanceCodes[sym];
                            copyState.state = 3;
                        case 3:
                            j = 0;
                            if (copyState.distBits > 0 && (j = this._readBits(copyState.distBits)) < 0) {
                                return true;
                            }
                            dist = copyState.dist + j;
                            len = copyState.len;
                            i = pos - dist;
                            while (len--) {
                                output[pos++] = output[i++];
                            }
                            copyState.state = 0;
                            if (pos >= WINDOW_SHIFT_POSITION) {
                                this._windowPosition = pos;
                                return false;
                            }
                            break;
                    }
                }
                do {
                    sym = this._readCode(literalTable);
                    if (sym < 0) {
                        this._windowPosition = pos;
                        return true;
                    }
                    else if (sym < 256) {
                        output[pos++] = sym;
                    }
                    else if (sym > 256) {
                        this._windowPosition = pos;
                        sym -= 257;
                        lenBits = lengthExtraBits[sym];
                        len = lengthCodes[sym];
                        j = lenBits === 0 ? 0 : this._readBits(lenBits);
                        if (j < 0) {
                            copyState.state = 1;
                            copyState.len = len;
                            copyState.lenBits = lenBits;
                            return true;
                        }
                        len += j;
                        sym = this._readCode(distanceTable);
                        if (sym < 0) {
                            copyState.state = 2;
                            copyState.len = len;
                            return true;
                        }
                        distBits = distanceExtraBits[sym];
                        dist = distanceCodes[sym];
                        j = distBits === 0 ? 0 : this._readBits(distBits);
                        if (j < 0) {
                            copyState.state = 3;
                            copyState.len = len;
                            copyState.dist = dist;
                            copyState.distBits = distBits;
                            return true;
                        }
                        dist += j;
                        i = pos - dist;
                        while (len--) {
                            output[pos++] = output[i++];
                        }
                    }
                    else {
                        this._state = 0 /* INIT */;
                        break;
                    }
                } while (pos < WINDOW_SHIFT_POSITION);
                this._windowPosition = pos;
                return false;
            };
            Inflate.inflate = function (data, expectedLength, zlibHeader) {
                var output = new Uint8Array(expectedLength);
                var position = 0;
                var inflate = new Inflate(zlibHeader);
                inflate.onData = function (data) {
                    output.set(data, position);
                    position += data.length;
                };
                inflate.push(data);
                return output;
            };
            return Inflate;
        })();
        ArrayUtilities.Inflate = Inflate;
        var codeLengthOrder;
        var distanceCodes;
        var distanceExtraBits;
        var fixedDistanceTable;
        var lengthCodes;
        var lengthExtraBits;
        var fixedLiteralTable;
        var areTablesInitialized = false;
        function initializeTables() {
            codeLengthOrder = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
            distanceCodes = new Uint16Array(30);
            distanceExtraBits = new Uint8Array(30);
            for (var i = 0, j = 0, code = 1; i < 30; ++i) {
                distanceCodes[i] = code;
                code += 1 << (distanceExtraBits[i] = ~~((j += (i > 2 ? 1 : 0)) / 2));
            }
            var bitLengths = new Uint8Array(288);
            for (var i = 0; i < 32; ++i) {
                bitLengths[i] = 5;
            }
            fixedDistanceTable = makeHuffmanTable(bitLengths.subarray(0, 32));
            lengthCodes = new Uint16Array(29);
            lengthExtraBits = new Uint8Array(29);
            for (var i = 0, j = 0, code = 3; i < 29; ++i) {
                lengthCodes[i] = code - (i == 28 ? 1 : 0);
                code += 1 << (lengthExtraBits[i] = ~~(((j += (i > 4 ? 1 : 0)) / 4) % 6));
            }
            for (var i = 0; i < 288; ++i) {
                bitLengths[i] = i < 144 || i > 279 ? 8 : (i < 256 ? 9 : 7);
            }
            fixedLiteralTable = makeHuffmanTable(bitLengths);
        }
        function makeHuffmanTable(bitLengths) {
            var maxBits = Math.max.apply(null, bitLengths);
            var numLengths = bitLengths.length;
            var size = 1 << maxBits;
            var codes = new Uint32Array(size);
            var dummyCode = (maxBits << 16) | 0xFFFF;
            for (var j = 0; j < size; j++) {
                codes[j] = dummyCode;
            }
            for (var code = 0, len = 1, skip = 2; len <= maxBits; code <<= 1, ++len, skip <<= 1) {
                for (var val = 0; val < numLengths; ++val) {
                    if (bitLengths[val] === len) {
                        var lsb = 0;
                        for (var i = 0; i < len; ++i)
                            lsb = (lsb * 2) + ((code >> i) & 1);
                        for (var i = lsb; i < size; i += skip)
                            codes[i] = (len << 16) | val;
                        ++code;
                    }
                }
            }
            return { codes: codes, maxBits: maxBits };
        }
        var DeflateState;
        (function (DeflateState) {
            DeflateState[DeflateState["WRITE"] = 0] = "WRITE";
            DeflateState[DeflateState["DONE"] = 1] = "DONE";
            DeflateState[DeflateState["ZLIB_HEADER"] = 2] = "ZLIB_HEADER";
        })(DeflateState || (DeflateState = {}));
        var Adler32 = (function () {
            function Adler32() {
                this.a = 1;
                this.b = 0;
            }
            Adler32.prototype.update = function (data, start, end) {
                var a = this.a;
                var b = this.b;
                for (var i = start; i < end; ++i) {
                    a = (a + (data[i] & 0xff)) % 65521;
                    b = (b + a) % 65521;
                }
                this.a = a;
                this.b = b;
            };
            Adler32.prototype.getChecksum = function () {
                return (this.b << 16) | this.a;
            };
            return Adler32;
        })();
        ArrayUtilities.Adler32 = Adler32;
        var Deflate = (function () {
            function Deflate(writeZlibHeader) {
                this._writeZlibHeader = writeZlibHeader;
                this._state = writeZlibHeader ? 2 /* ZLIB_HEADER */ : 0 /* WRITE */;
                this._adler32 = writeZlibHeader ? new Adler32() : null;
            }
            Deflate.prototype.push = function (data) {
                if (this._state === 2 /* ZLIB_HEADER */) {
                    this.onData(new Uint8Array([0x78, 0x9C]));
                    this._state = 0 /* WRITE */;
                }
                var len = data.length;
                var outputSize = len + Math.ceil(len / 0xFFFF) * 5;
                var output = new Uint8Array(outputSize);
                var outputPos = 0;
                var pos = 0;
                while (len > 0xFFFF) {
                    output.set(new Uint8Array([
                        0x00,
                        0xFF,
                        0xFF,
                        0x00,
                        0x00
                    ]), outputPos);
                    outputPos += 5;
                    output.set(data.subarray(pos, pos + 0xFFFF), outputPos);
                    pos += 0xFFFF;
                    outputPos += 0xFFFF;
                    len -= 0xFFFF;
                }
                output.set(new Uint8Array([
                    0x00,
                    (len & 0xff),
                    ((len >> 8) & 0xff),
                    ((~len) & 0xff),
                    (((~len) >> 8) & 0xff)
                ]), outputPos);
                outputPos += 5;
                output.set(data.subarray(pos, len), outputPos);
                this.onData(output);
                if (this._adler32) {
                    this._adler32.update(data, 0, len);
                }
            };
            Deflate.prototype.finish = function () {
                this._state = 1 /* DONE */;
                this.onData(new Uint8Array([
                    0x01,
                    0x00,
                    0x00,
                    0xFF,
                    0xFF
                ]));
                if (this._adler32) {
                    var checksum = this._adler32.getChecksum();
                    this.onData(new Uint8Array([
                        checksum & 0xff,
                        (checksum >> 8) & 0xff,
                        (checksum >> 16) & 0xff,
                        (checksum >>> 24) & 0xff
                    ]));
                }
            };
            return Deflate;
        })();
        ArrayUtilities.Deflate = Deflate;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var notImplemented = Shumway.Debug.notImplemented;
        var utf8decode = Shumway.StringUtilities.utf8decode;
        var utf8encode = Shumway.StringUtilities.utf8encode;
        var clamp = Shumway.NumberUtilities.clamp;
        function checkRange(x, min, max) {
            if (x !== clamp(x, min, max)) {
                throwError('RangeError', Errors.ParamRangeError);
            }
        }
        function asCoerceString(x) {
            if (typeof x === "string") {
                return x;
            }
            else if (x == undefined) {
                return null;
            }
            return x + '';
        }
        var PlainObjectDataBuffer = (function () {
            function PlainObjectDataBuffer(buffer, length, littleEndian) {
                this.buffer = buffer;
                this.length = length;
                this.littleEndian = littleEndian;
            }
            return PlainObjectDataBuffer;
        })();
        ArrayUtilities.PlainObjectDataBuffer = PlainObjectDataBuffer;
        var bitMasks = new Uint32Array(33);
        for (var i = 1, mask = 0; i <= 32; i++) {
            bitMasks[i] = mask = (mask << 1) | 1;
        }
        var TypedArrayViewFlags;
        (function (TypedArrayViewFlags) {
            TypedArrayViewFlags[TypedArrayViewFlags["U8"] = 1] = "U8";
            TypedArrayViewFlags[TypedArrayViewFlags["I32"] = 2] = "I32";
            TypedArrayViewFlags[TypedArrayViewFlags["F32"] = 4] = "F32";
        })(TypedArrayViewFlags || (TypedArrayViewFlags = {}));
        var DataBuffer = (function () {
            function DataBuffer(initialSize) {
                if (initialSize === void 0) { initialSize = DataBuffer.INITIAL_SIZE; }
                if (this._buffer) {
                    return;
                }
                this._buffer = new ArrayBuffer(initialSize);
                this._length = 0;
                this._position = 0;
                this._resetViews();
                this._littleEndian = DataBuffer._nativeLittleEndian;
                this._bitBuffer = 0;
                this._bitLength = 0;
            }
            DataBuffer.FromArrayBuffer = function (buffer, length) {
                if (length === void 0) { length = -1; }
                var dataBuffer = Object.create(DataBuffer.prototype);
                dataBuffer._buffer = buffer;
                dataBuffer._length = length === -1 ? buffer.byteLength : length;
                dataBuffer._position = 0;
                dataBuffer._resetViews();
                dataBuffer._littleEndian = DataBuffer._nativeLittleEndian;
                dataBuffer._bitBuffer = 0;
                dataBuffer._bitLength = 0;
                return dataBuffer;
            };
            DataBuffer.FromPlainObject = function (source) {
                var dataBuffer = DataBuffer.FromArrayBuffer(source.buffer, source.length);
                dataBuffer._littleEndian = source.littleEndian;
                return dataBuffer;
            };
            DataBuffer.prototype.toPlainObject = function () {
                return new PlainObjectDataBuffer(this._buffer, this._length, this._littleEndian);
            };
            DataBuffer.prototype._resetViews = function () {
                this._u8 = new Uint8Array(this._buffer);
                this._i32 = null;
                this._f32 = null;
            };
            DataBuffer.prototype._requestViews = function (flags) {
                if ((this._buffer.byteLength & 0x3) === 0) {
                    if (this._i32 === null && flags & 2 /* I32 */) {
                        this._i32 = new Int32Array(this._buffer);
                    }
                    if (this._f32 === null && flags & 4 /* F32 */) {
                        this._f32 = new Float32Array(this._buffer);
                    }
                }
            };
            DataBuffer.prototype.getBytes = function () {
                return new Uint8Array(this._buffer, 0, this._length);
            };
            DataBuffer.prototype._ensureCapacity = function (length) {
                var currentBuffer = this._buffer;
                if (currentBuffer.byteLength < length) {
                    var newLength = Math.max(currentBuffer.byteLength, 1);
                    while (newLength < length) {
                        newLength *= 2;
                    }
                    var newBuffer = DataBuffer._arrayBufferPool.acquire(newLength);
                    var curentView = this._u8;
                    this._buffer = newBuffer;
                    this._resetViews();
                    this._u8.set(curentView);
                    DataBuffer._arrayBufferPool.release(currentBuffer);
                }
            };
            DataBuffer.prototype.clear = function () {
                this._length = 0;
                this._position = 0;
            };
            DataBuffer.prototype.readBoolean = function () {
                return this.readUnsignedByte() !== 0;
            };
            DataBuffer.prototype.readByte = function () {
                return this.readUnsignedByte() << 24 >> 24;
            };
            DataBuffer.prototype.readUnsignedByte = function () {
                if (this._position + 1 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                return this._u8[this._position++];
            };
            DataBuffer.prototype.readBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                var position = this._position;
                if (!offset) {
                    offset = 0;
                }
                if (!length) {
                    length = this._length - position;
                }
                if (position + length > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                if (bytes.length < offset + length) {
                    bytes._ensureCapacity(offset + length);
                    bytes.length = offset + length;
                }
                bytes._u8.set(new Uint8Array(this._buffer, position, length), offset);
                this._position += length;
            };
            DataBuffer.prototype.readShort = function () {
                return this.readUnsignedShort() << 16 >> 16;
            };
            DataBuffer.prototype.readUnsignedShort = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 2 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var a = u8[position + 0];
                var b = u8[position + 1];
                this._position = position + 2;
                return this._littleEndian ? (b << 8) | a : (a << 8) | b;
            };
            DataBuffer.prototype.readInt = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 4 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var a = u8[position + 0];
                var b = u8[position + 1];
                var c = u8[position + 2];
                var d = u8[position + 3];
                this._position = position + 4;
                return this._littleEndian ? (d << 24) | (c << 16) | (b << 8) | a : (a << 24) | (b << 16) | (c << 8) | d;
            };
            DataBuffer.prototype.readUnsignedInt = function () {
                return this.readInt() >>> 0;
            };
            DataBuffer.prototype.readFloat = function () {
                var position = this._position;
                if (position + 4 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                this._position = position + 4;
                this._requestViews(4 /* F32 */);
                if (this._littleEndian && (position & 0x3) === 0 && this._f32) {
                    return this._f32[position >> 2];
                }
                else {
                    var u8 = this._u8;
                    var t8 = Shumway.IntegerUtilities.u8;
                    if (this._littleEndian) {
                        t8[0] = u8[position + 0];
                        t8[1] = u8[position + 1];
                        t8[2] = u8[position + 2];
                        t8[3] = u8[position + 3];
                    }
                    else {
                        t8[3] = u8[position + 0];
                        t8[2] = u8[position + 1];
                        t8[1] = u8[position + 2];
                        t8[0] = u8[position + 3];
                    }
                    return Shumway.IntegerUtilities.f32[0];
                }
            };
            DataBuffer.prototype.readDouble = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 8 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var t8 = Shumway.IntegerUtilities.u8;
                if (this._littleEndian) {
                    t8[0] = u8[position + 0];
                    t8[1] = u8[position + 1];
                    t8[2] = u8[position + 2];
                    t8[3] = u8[position + 3];
                    t8[4] = u8[position + 4];
                    t8[5] = u8[position + 5];
                    t8[6] = u8[position + 6];
                    t8[7] = u8[position + 7];
                }
                else {
                    t8[0] = u8[position + 7];
                    t8[1] = u8[position + 6];
                    t8[2] = u8[position + 5];
                    t8[3] = u8[position + 4];
                    t8[4] = u8[position + 3];
                    t8[5] = u8[position + 2];
                    t8[6] = u8[position + 1];
                    t8[7] = u8[position + 0];
                }
                this._position = position + 8;
                return Shumway.IntegerUtilities.f64[0];
            };
            DataBuffer.prototype.writeBoolean = function (value) {
                this.writeByte(!!value ? 1 : 0);
            };
            DataBuffer.prototype.writeByte = function (value) {
                var length = this._position + 1;
                this._ensureCapacity(length);
                this._u8[this._position++] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeUnsignedByte = function (value) {
                var length = this._position + 1;
                this._ensureCapacity(length);
                this._u8[this._position++] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeRawBytes = function (bytes) {
                var length = this._position + bytes.length;
                this._ensureCapacity(length);
                this._u8.set(bytes, this._position);
                this._position = length;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                if (Shumway.isNullOrUndefined(bytes)) {
                    throwError('TypeError', Errors.NullPointerError, 'bytes');
                }
                if (arguments.length < 2) {
                    offset = 0;
                }
                if (arguments.length < 3) {
                    length = 0;
                }
                checkRange(offset, 0, bytes.length);
                checkRange(offset + length, 0, bytes.length);
                if (length === 0) {
                    length = bytes.length - offset;
                }
                this.writeRawBytes(new Int8Array(bytes._buffer, offset, length));
            };
            DataBuffer.prototype.writeShort = function (value) {
                this.writeUnsignedShort(value);
            };
            DataBuffer.prototype.writeUnsignedShort = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 2);
                var u8 = this._u8;
                if (this._littleEndian) {
                    u8[position + 0] = value;
                    u8[position + 1] = value >> 8;
                }
                else {
                    u8[position + 0] = value >> 8;
                    u8[position + 1] = value;
                }
                position += 2;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.writeInt = function (value) {
                this.writeUnsignedInt(value);
            };
            DataBuffer.prototype.write2Ints = function (a, b) {
                this.write2UnsignedInts(a, b);
            };
            DataBuffer.prototype.write4Ints = function (a, b, c, d) {
                this.write4UnsignedInts(a, b, c, d);
            };
            DataBuffer.prototype.writeUnsignedInt = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 4);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[position >> 2] = value;
                }
                else {
                    var u8 = this._u8;
                    if (this._littleEndian) {
                        u8[position + 0] = value;
                        u8[position + 1] = value >> 8;
                        u8[position + 2] = value >> 16;
                        u8[position + 3] = value >> 24;
                    }
                    else {
                        u8[position + 0] = value >> 24;
                        u8[position + 1] = value >> 16;
                        u8[position + 2] = value >> 8;
                        u8[position + 3] = value;
                    }
                }
                position += 4;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.write2UnsignedInts = function (a, b) {
                var position = this._position;
                this._ensureCapacity(position + 8);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[(position >> 2) + 0] = a;
                    this._i32[(position >> 2) + 1] = b;
                    position += 8;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeUnsignedInt(a);
                    this.writeUnsignedInt(b);
                }
            };
            DataBuffer.prototype.write4UnsignedInts = function (a, b, c, d) {
                var position = this._position;
                this._ensureCapacity(position + 16);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[(position >> 2) + 0] = a;
                    this._i32[(position >> 2) + 1] = b;
                    this._i32[(position >> 2) + 2] = c;
                    this._i32[(position >> 2) + 3] = d;
                    position += 16;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeUnsignedInt(a);
                    this.writeUnsignedInt(b);
                    this.writeUnsignedInt(c);
                    this.writeUnsignedInt(d);
                }
            };
            DataBuffer.prototype.writeFloat = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 4);
                this._requestViews(4 /* F32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._f32) {
                    this._f32[position >> 2] = value;
                }
                else {
                    var u8 = this._u8;
                    Shumway.IntegerUtilities.f32[0] = value;
                    var t8 = Shumway.IntegerUtilities.u8;
                    if (this._littleEndian) {
                        u8[position + 0] = t8[0];
                        u8[position + 1] = t8[1];
                        u8[position + 2] = t8[2];
                        u8[position + 3] = t8[3];
                    }
                    else {
                        u8[position + 0] = t8[3];
                        u8[position + 1] = t8[2];
                        u8[position + 2] = t8[1];
                        u8[position + 3] = t8[0];
                    }
                }
                position += 4;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.write6Floats = function (a, b, c, d, e, f) {
                var position = this._position;
                this._ensureCapacity(position + 24);
                this._requestViews(4 /* F32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._f32) {
                    this._f32[(position >> 2) + 0] = a;
                    this._f32[(position >> 2) + 1] = b;
                    this._f32[(position >> 2) + 2] = c;
                    this._f32[(position >> 2) + 3] = d;
                    this._f32[(position >> 2) + 4] = e;
                    this._f32[(position >> 2) + 5] = f;
                    position += 24;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeFloat(a);
                    this.writeFloat(b);
                    this.writeFloat(c);
                    this.writeFloat(d);
                    this.writeFloat(e);
                    this.writeFloat(f);
                }
            };
            DataBuffer.prototype.writeDouble = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 8);
                var u8 = this._u8;
                Shumway.IntegerUtilities.f64[0] = value;
                var t8 = Shumway.IntegerUtilities.u8;
                if (this._littleEndian) {
                    u8[position + 0] = t8[0];
                    u8[position + 1] = t8[1];
                    u8[position + 2] = t8[2];
                    u8[position + 3] = t8[3];
                    u8[position + 4] = t8[4];
                    u8[position + 5] = t8[5];
                    u8[position + 6] = t8[6];
                    u8[position + 7] = t8[7];
                }
                else {
                    u8[position + 0] = t8[7];
                    u8[position + 1] = t8[6];
                    u8[position + 2] = t8[5];
                    u8[position + 3] = t8[4];
                    u8[position + 4] = t8[3];
                    u8[position + 5] = t8[2];
                    u8[position + 6] = t8[1];
                    u8[position + 7] = t8[0];
                }
                position += 8;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.readRawBytes = function () {
                return new Int8Array(this._buffer, 0, this._length);
            };
            DataBuffer.prototype.writeUTF = function (value) {
                value = asCoerceString(value);
                var bytes = utf8decode(value);
                this.writeShort(bytes.length);
                this.writeRawBytes(bytes);
            };
            DataBuffer.prototype.writeUTFBytes = function (value) {
                value = asCoerceString(value);
                var bytes = utf8decode(value);
                this.writeRawBytes(bytes);
            };
            DataBuffer.prototype.readUTF = function () {
                return this.readUTFBytes(this.readShort());
            };
            DataBuffer.prototype.readUTFBytes = function (length) {
                length = length >>> 0;
                var pos = this._position;
                if (pos + length > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                this._position += length;
                return utf8encode(new Int8Array(this._buffer, pos, length));
            };
            Object.defineProperty(DataBuffer.prototype, "length", {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    value = value >>> 0;
                    var capacity = this._buffer.byteLength;
                    if (value > capacity) {
                        this._ensureCapacity(value);
                    }
                    this._length = value;
                    this._position = clamp(this._position, 0, this._length);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "bytesAvailable", {
                get: function () {
                    return this._length - this._position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "position", {
                get: function () {
                    return this._position;
                },
                set: function (position) {
                    this._position = position >>> 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "buffer", {
                get: function () {
                    return this._buffer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "bytes", {
                get: function () {
                    return this._u8;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "ints", {
                get: function () {
                    this._requestViews(2 /* I32 */);
                    return this._i32;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "objectEncoding", {
                get: function () {
                    return this._objectEncoding;
                },
                set: function (version) {
                    version = version >>> 0;
                    this._objectEncoding = version;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "endian", {
                get: function () {
                    return this._littleEndian ? "littleEndian" : "bigEndian";
                },
                set: function (type) {
                    type = asCoerceString(type);
                    if (type === "auto") {
                        this._littleEndian = DataBuffer._nativeLittleEndian;
                    }
                    else {
                        this._littleEndian = type === "littleEndian";
                    }
                },
                enumerable: true,
                configurable: true
            });
            DataBuffer.prototype.toString = function () {
                return utf8encode(new Int8Array(this._buffer, 0, this._length));
            };
            DataBuffer.prototype.toBlob = function (type) {
                return new Blob([new Int8Array(this._buffer, this._position, this._length)], { type: type });
            };
            DataBuffer.prototype.writeMultiByte = function (value, charSet) {
                value = asCoerceString(value);
                charSet = asCoerceString(charSet);
                notImplemented("packageInternal flash.utils.ObjectOutput::writeMultiByte");
                return;
            };
            DataBuffer.prototype.readMultiByte = function (length, charSet) {
                length = length >>> 0;
                charSet = asCoerceString(charSet);
                notImplemented("packageInternal flash.utils.ObjectInput::readMultiByte");
                return;
            };
            DataBuffer.prototype.getValue = function (name) {
                name = name | 0;
                if (name >= this._length) {
                    return undefined;
                }
                return this._u8[name];
            };
            DataBuffer.prototype.setValue = function (name, value) {
                name = name | 0;
                var length = name + 1;
                this._ensureCapacity(length);
                this._u8[name] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.readFixed = function () {
                return this.readInt() / 65536;
            };
            DataBuffer.prototype.readFixed8 = function () {
                return this.readShort() / 256;
            };
            DataBuffer.prototype.readFloat16 = function () {
                var uint16 = this.readUnsignedShort();
                var sign = uint16 >> 15 ? -1 : 1;
                var exponent = (uint16 & 0x7c00) >> 10;
                var fraction = uint16 & 0x03ff;
                if (!exponent) {
                    return sign * Math.pow(2, -14) * (fraction / 1024);
                }
                if (exponent === 0x1f) {
                    return fraction ? NaN : sign * Infinity;
                }
                return sign * Math.pow(2, exponent - 15) * (1 + (fraction / 1024));
            };
            DataBuffer.prototype.readEncodedU32 = function () {
                var value = this.readUnsignedByte();
                if (!(value & 0x080)) {
                    return value;
                }
                value = (value & 0x7f) | this.readUnsignedByte() << 7;
                if (!(value & 0x4000)) {
                    return value;
                }
                value = (value & 0x3fff) | this.readUnsignedByte() << 14;
                if (!(value & 0x200000)) {
                    return value;
                }
                value = (value & 0x1FFFFF) | this.readUnsignedByte() << 21;
                if (!(value & 0x10000000)) {
                    return value;
                }
                return (value & 0xFFFFFFF) | (this.readUnsignedByte() << 28);
            };
            DataBuffer.prototype.readBits = function (size) {
                return (this.readUnsignedBits(size) << (32 - size)) >> (32 - size);
            };
            DataBuffer.prototype.readUnsignedBits = function (size) {
                var buffer = this._bitBuffer;
                var length = this._bitLength;
                while (size > length) {
                    buffer = (buffer << 8) | this.readUnsignedByte();
                    length += 8;
                }
                length -= size;
                var value = (buffer >>> length) & bitMasks[size];
                this._bitBuffer = buffer;
                this._bitLength = length;
                return value;
            };
            DataBuffer.prototype.readFixedBits = function (size) {
                return this.readBits(size) / 65536;
            };
            DataBuffer.prototype.readString = function (length) {
                var position = this._position;
                if (length) {
                    if (position + length > this._length) {
                        throwError('EOFError', Errors.EOFError);
                    }
                    this._position += length;
                }
                else {
                    length = 0;
                    for (var i = position; i < this._length && this._u8[i]; i++) {
                        length++;
                    }
                    this._position += length + 1;
                }
                return utf8encode(new Int8Array(this._buffer, position, length));
            };
            DataBuffer.prototype.align = function () {
                this._bitBuffer = 0;
                this._bitLength = 0;
            };
            DataBuffer.prototype._compress = function (algorithm) {
                algorithm = asCoerceString(algorithm);
                var deflate;
                switch (algorithm) {
                    case 'zlib':
                        deflate = new ArrayUtilities.Deflate(true);
                        break;
                    case 'deflate':
                        deflate = new ArrayUtilities.Deflate(false);
                        break;
                    default:
                        return;
                }
                var output = new DataBuffer();
                deflate.onData = output.writeRawBytes.bind(output);
                deflate.push(this._u8.subarray(0, this._length));
                deflate.finish();
                this._ensureCapacity(output._u8.length);
                this._u8.set(output._u8);
                this.length = output.length;
                this._position = 0;
            };
            DataBuffer.prototype._uncompress = function (algorithm) {
                algorithm = asCoerceString(algorithm);
                var inflate;
                switch (algorithm) {
                    case 'zlib':
                        inflate = new ArrayUtilities.Inflate(true);
                        break;
                    case 'deflate':
                        inflate = new ArrayUtilities.Inflate(false);
                        break;
                    default:
                        return;
                }
                var output = new DataBuffer();
                inflate.onData = output.writeRawBytes.bind(output);
                inflate.push(this._u8.subarray(0, this._length));
                if (inflate.error) {
                    throwError('IOError', Errors.CompressedDataError);
                }
                this._ensureCapacity(output._u8.length);
                this._u8.set(output._u8);
                this.length = output.length;
                this._position = 0;
            };
            DataBuffer._nativeLittleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
            DataBuffer.INITIAL_SIZE = 128;
            DataBuffer._arrayBufferPool = new Shumway.ArrayBufferPool();
            return DataBuffer;
        })();
        ArrayUtilities.DataBuffer = DataBuffer;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
    var ensureTypedArrayCapacity = Shumway.ArrayUtilities.ensureTypedArrayCapacity;
    var assert = Shumway.Debug.assert;
    (function (PathCommand) {
        PathCommand[PathCommand["BeginSolidFill"] = 1] = "BeginSolidFill";
        PathCommand[PathCommand["BeginGradientFill"] = 2] = "BeginGradientFill";
        PathCommand[PathCommand["BeginBitmapFill"] = 3] = "BeginBitmapFill";
        PathCommand[PathCommand["EndFill"] = 4] = "EndFill";
        PathCommand[PathCommand["LineStyleSolid"] = 5] = "LineStyleSolid";
        PathCommand[PathCommand["LineStyleGradient"] = 6] = "LineStyleGradient";
        PathCommand[PathCommand["LineStyleBitmap"] = 7] = "LineStyleBitmap";
        PathCommand[PathCommand["LineEnd"] = 8] = "LineEnd";
        PathCommand[PathCommand["MoveTo"] = 9] = "MoveTo";
        PathCommand[PathCommand["LineTo"] = 10] = "LineTo";
        PathCommand[PathCommand["CurveTo"] = 11] = "CurveTo";
        PathCommand[PathCommand["CubicCurveTo"] = 12] = "CubicCurveTo";
    })(Shumway.PathCommand || (Shumway.PathCommand = {}));
    var PathCommand = Shumway.PathCommand;
    (function (GradientType) {
        GradientType[GradientType["Linear"] = 0x10] = "Linear";
        GradientType[GradientType["Radial"] = 0x12] = "Radial";
    })(Shumway.GradientType || (Shumway.GradientType = {}));
    var GradientType = Shumway.GradientType;
    (function (GradientSpreadMethod) {
        GradientSpreadMethod[GradientSpreadMethod["Pad"] = 0] = "Pad";
        GradientSpreadMethod[GradientSpreadMethod["Reflect"] = 1] = "Reflect";
        GradientSpreadMethod[GradientSpreadMethod["Repeat"] = 2] = "Repeat";
    })(Shumway.GradientSpreadMethod || (Shumway.GradientSpreadMethod = {}));
    var GradientSpreadMethod = Shumway.GradientSpreadMethod;
    (function (GradientInterpolationMethod) {
        GradientInterpolationMethod[GradientInterpolationMethod["RGB"] = 0] = "RGB";
        GradientInterpolationMethod[GradientInterpolationMethod["LinearRGB"] = 1] = "LinearRGB";
    })(Shumway.GradientInterpolationMethod || (Shumway.GradientInterpolationMethod = {}));
    var GradientInterpolationMethod = Shumway.GradientInterpolationMethod;
    (function (LineScaleMode) {
        LineScaleMode[LineScaleMode["None"] = 0] = "None";
        LineScaleMode[LineScaleMode["Normal"] = 1] = "Normal";
        LineScaleMode[LineScaleMode["Vertical"] = 2] = "Vertical";
        LineScaleMode[LineScaleMode["Horizontal"] = 3] = "Horizontal";
    })(Shumway.LineScaleMode || (Shumway.LineScaleMode = {}));
    var LineScaleMode = Shumway.LineScaleMode;
    var PlainObjectShapeData = (function () {
        function PlainObjectShapeData(commands, commandsPosition, coordinates, morphCoordinates, coordinatesPosition, styles, stylesLength, morphStyles, morphStylesLength, hasFills, hasLines) {
            this.commands = commands;
            this.commandsPosition = commandsPosition;
            this.coordinates = coordinates;
            this.morphCoordinates = morphCoordinates;
            this.coordinatesPosition = coordinatesPosition;
            this.styles = styles;
            this.stylesLength = stylesLength;
            this.morphStyles = morphStyles;
            this.morphStylesLength = morphStylesLength;
            this.hasFills = hasFills;
            this.hasLines = hasLines;
        }
        return PlainObjectShapeData;
    })();
    Shumway.PlainObjectShapeData = PlainObjectShapeData;
    var DefaultSize;
    (function (DefaultSize) {
        DefaultSize[DefaultSize["Commands"] = 32] = "Commands";
        DefaultSize[DefaultSize["Coordinates"] = 128] = "Coordinates";
        DefaultSize[DefaultSize["Styles"] = 16] = "Styles";
    })(DefaultSize || (DefaultSize = {}));
    var ShapeData = (function () {
        function ShapeData(initialize) {
            if (initialize === void 0) { initialize = true; }
            if (initialize) {
                this.clear();
            }
        }
        ShapeData.FromPlainObject = function (source) {
            var data = new ShapeData(false);
            data.commands = source.commands;
            data.coordinates = source.coordinates;
            data.morphCoordinates = source.morphCoordinates;
            data.commandsPosition = source.commandsPosition;
            data.coordinatesPosition = source.coordinatesPosition;
            data.styles = DataBuffer.FromArrayBuffer(source.styles, source.stylesLength);
            data.styles.endian = 'auto';
            if (source.morphStyles) {
                data.morphStyles = DataBuffer.FromArrayBuffer(source.morphStyles, source.morphStylesLength);
                data.morphStyles.endian = 'auto';
            }
            data.hasFills = source.hasFills;
            data.hasLines = source.hasLines;
            return data;
        };
        ShapeData.prototype.moveTo = function (x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = 9 /* MoveTo */;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.lineTo = function (x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = 10 /* LineTo */;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
            this.ensurePathCapacities(1, 4);
            this.commands[this.commandsPosition++] = 11 /* CurveTo */;
            this.coordinates[this.coordinatesPosition++] = controlX;
            this.coordinates[this.coordinatesPosition++] = controlY;
            this.coordinates[this.coordinatesPosition++] = anchorX;
            this.coordinates[this.coordinatesPosition++] = anchorY;
        };
        ShapeData.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
            this.ensurePathCapacities(1, 6);
            this.commands[this.commandsPosition++] = 12 /* CubicCurveTo */;
            this.coordinates[this.coordinatesPosition++] = controlX1;
            this.coordinates[this.coordinatesPosition++] = controlY1;
            this.coordinates[this.coordinatesPosition++] = controlX2;
            this.coordinates[this.coordinatesPosition++] = controlY2;
            this.coordinates[this.coordinatesPosition++] = anchorX;
            this.coordinates[this.coordinatesPosition++] = anchorY;
        };
        ShapeData.prototype.beginFill = function (color) {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 1 /* BeginSolidFill */;
            this.styles.writeUnsignedInt(color);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphFill = function (color) {
            this.morphStyles.writeUnsignedInt(color);
        };
        ShapeData.prototype.endFill = function () {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 4 /* EndFill */;
        };
        ShapeData.prototype.endLine = function () {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 8 /* LineEnd */;
        };
        ShapeData.prototype.lineStyle = function (thickness, color, pixelHinting, scaleMode, caps, joints, miterLimit) {
            release || assert(thickness === (thickness | 0), thickness >= 0 && thickness <= 0xff * 20);
            this.ensurePathCapacities(2, 0);
            this.commands[this.commandsPosition++] = 5 /* LineStyleSolid */;
            this.coordinates[this.coordinatesPosition++] = thickness;
            var styles = this.styles;
            styles.writeUnsignedInt(color);
            styles.writeBoolean(pixelHinting);
            styles.writeUnsignedByte(scaleMode);
            styles.writeUnsignedByte(caps);
            styles.writeUnsignedByte(joints);
            styles.writeUnsignedByte(miterLimit);
            this.hasLines = true;
        };
        ShapeData.prototype.writeMorphLineStyle = function (thickness, color) {
            this.morphCoordinates[this.coordinatesPosition - 1] = thickness;
            this.morphStyles.writeUnsignedInt(color);
        };
        ShapeData.prototype.beginBitmap = function (pathCommand, bitmapId, matrix, repeat, smooth) {
            release || assert(pathCommand === 3 /* BeginBitmapFill */ || pathCommand === 7 /* LineStyleBitmap */);
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = pathCommand;
            var styles = this.styles;
            styles.writeUnsignedInt(bitmapId);
            this._writeStyleMatrix(matrix, false);
            styles.writeBoolean(repeat);
            styles.writeBoolean(smooth);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphBitmap = function (matrix) {
            this._writeStyleMatrix(matrix, true);
        };
        ShapeData.prototype.beginGradient = function (pathCommand, colors, ratios, gradientType, matrix, spread, interpolation, focalPointRatio) {
            release || assert(pathCommand === 2 /* BeginGradientFill */ || pathCommand === 6 /* LineStyleGradient */);
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = pathCommand;
            var styles = this.styles;
            styles.writeUnsignedByte(gradientType);
            release || assert(focalPointRatio === (focalPointRatio | 0));
            styles.writeShort(focalPointRatio);
            this._writeStyleMatrix(matrix, false);
            var colorStops = colors.length;
            styles.writeByte(colorStops);
            for (var i = 0; i < colorStops; i++) {
                styles.writeUnsignedByte(ratios[i]);
                styles.writeUnsignedInt(colors[i]);
            }
            styles.writeUnsignedByte(spread);
            styles.writeUnsignedByte(interpolation);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphGradient = function (colors, ratios, matrix) {
            this._writeStyleMatrix(matrix, true);
            var styles = this.morphStyles;
            for (var i = 0; i < colors.length; i++) {
                styles.writeUnsignedByte(ratios[i]);
                styles.writeUnsignedInt(colors[i]);
            }
        };
        ShapeData.prototype.writeCommandAndCoordinates = function (command, x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = command;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.writeCoordinates = function (x, y) {
            this.ensurePathCapacities(0, 2);
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.writeMorphCoordinates = function (x, y) {
            this.morphCoordinates = ensureTypedArrayCapacity(this.morphCoordinates, this.coordinatesPosition);
            this.morphCoordinates[this.coordinatesPosition - 2] = x;
            this.morphCoordinates[this.coordinatesPosition - 1] = y;
        };
        ShapeData.prototype.clear = function () {
            this.commandsPosition = this.coordinatesPosition = 0;
            this.commands = new Uint8Array(32 /* Commands */);
            this.coordinates = new Int32Array(128 /* Coordinates */);
            this.styles = new DataBuffer(16 /* Styles */);
            this.styles.endian = 'auto';
            this.hasFills = this.hasLines = false;
        };
        ShapeData.prototype.isEmpty = function () {
            return this.commandsPosition === 0;
        };
        ShapeData.prototype.clone = function () {
            var copy = new ShapeData(false);
            copy.commands = new Uint8Array(this.commands);
            copy.commandsPosition = this.commandsPosition;
            copy.coordinates = new Int32Array(this.coordinates);
            copy.coordinatesPosition = this.coordinatesPosition;
            copy.styles = new DataBuffer(this.styles.length);
            copy.styles.writeRawBytes(this.styles.bytes);
            if (this.morphStyles) {
                copy.morphStyles = new DataBuffer(this.morphStyles.length);
                copy.morphStyles.writeRawBytes(this.morphStyles.bytes);
            }
            copy.hasFills = this.hasFills;
            copy.hasLines = this.hasLines;
            return copy;
        };
        ShapeData.prototype.toPlainObject = function () {
            return new PlainObjectShapeData(this.commands, this.commandsPosition, this.coordinates, this.morphCoordinates, this.coordinatesPosition, this.styles.buffer, this.styles.length, this.morphStyles && this.morphStyles.buffer, this.morphStyles ? this.morphStyles.length : 0, this.hasFills, this.hasLines);
        };
        Object.defineProperty(ShapeData.prototype, "buffers", {
            get: function () {
                var buffers = [this.commands.buffer, this.coordinates.buffer, this.styles.buffer];
                if (this.morphCoordinates) {
                    buffers.push(this.morphCoordinates.buffer);
                }
                if (this.morphStyles) {
                    buffers.push(this.morphStyles.buffer);
                }
                return buffers;
            },
            enumerable: true,
            configurable: true
        });
        ShapeData.prototype._writeStyleMatrix = function (matrix, isMorph) {
            var styles = isMorph ? this.morphStyles : this.styles;
            styles.write6Floats(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        };
        ShapeData.prototype.ensurePathCapacities = function (numCommands, numCoordinates) {
            this.commands = ensureTypedArrayCapacity(this.commands, this.commandsPosition + numCommands);
            this.coordinates = ensureTypedArrayCapacity(this.coordinates, this.coordinatesPosition + numCoordinates);
        };
        return ShapeData;
    })();
    Shumway.ShapeData = ShapeData;
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var SWF;
    (function (SWF) {
        var Parser;
        (function (Parser) {
            (function (SwfTag) {
                SwfTag[SwfTag["CODE_END"] = 0] = "CODE_END";
                SwfTag[SwfTag["CODE_SHOW_FRAME"] = 1] = "CODE_SHOW_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE"] = 2] = "CODE_DEFINE_SHAPE";
                SwfTag[SwfTag["CODE_FREE_CHARACTER"] = 3] = "CODE_FREE_CHARACTER";
                SwfTag[SwfTag["CODE_PLACE_OBJECT"] = 4] = "CODE_PLACE_OBJECT";
                SwfTag[SwfTag["CODE_REMOVE_OBJECT"] = 5] = "CODE_REMOVE_OBJECT";
                SwfTag[SwfTag["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON"] = 7] = "CODE_DEFINE_BUTTON";
                SwfTag[SwfTag["CODE_JPEG_TABLES"] = 8] = "CODE_JPEG_TABLES";
                SwfTag[SwfTag["CODE_SET_BACKGROUND_COLOR"] = 9] = "CODE_SET_BACKGROUND_COLOR";
                SwfTag[SwfTag["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                SwfTag[SwfTag["CODE_DEFINE_TEXT"] = 11] = "CODE_DEFINE_TEXT";
                SwfTag[SwfTag["CODE_DO_ACTION"] = 12] = "CODE_DO_ACTION";
                SwfTag[SwfTag["CODE_DEFINE_FONT_INFO"] = 13] = "CODE_DEFINE_FONT_INFO";
                SwfTag[SwfTag["CODE_DEFINE_SOUND"] = 14] = "CODE_DEFINE_SOUND";
                SwfTag[SwfTag["CODE_START_SOUND"] = 15] = "CODE_START_SOUND";
                SwfTag[SwfTag["CODE_STOP_SOUND"] = 16] = "CODE_STOP_SOUND";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON_SOUND"] = 17] = "CODE_DEFINE_BUTTON_SOUND";
                SwfTag[SwfTag["CODE_SOUND_STREAM_HEAD"] = 18] = "CODE_SOUND_STREAM_HEAD";
                SwfTag[SwfTag["CODE_SOUND_STREAM_BLOCK"] = 19] = "CODE_SOUND_STREAM_BLOCK";
                SwfTag[SwfTag["CODE_DEFINE_BITS_LOSSLESS"] = 20] = "CODE_DEFINE_BITS_LOSSLESS";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE2"] = 22] = "CODE_DEFINE_SHAPE2";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON_CXFORM"] = 23] = "CODE_DEFINE_BUTTON_CXFORM";
                SwfTag[SwfTag["CODE_PROTECT"] = 24] = "CODE_PROTECT";
                SwfTag[SwfTag["CODE_PATHS_ARE_POSTSCRIPT"] = 25] = "CODE_PATHS_ARE_POSTSCRIPT";
                SwfTag[SwfTag["CODE_PLACE_OBJECT2"] = 26] = "CODE_PLACE_OBJECT2";
                SwfTag[SwfTag["CODE_REMOVE_OBJECT2"] = 28] = "CODE_REMOVE_OBJECT2";
                SwfTag[SwfTag["CODE_SYNC_FRAME"] = 29] = "CODE_SYNC_FRAME";
                SwfTag[SwfTag["CODE_FREE_ALL"] = 31] = "CODE_FREE_ALL";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE3"] = 32] = "CODE_DEFINE_SHAPE3";
                SwfTag[SwfTag["CODE_DEFINE_TEXT2"] = 33] = "CODE_DEFINE_TEXT2";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON2"] = 34] = "CODE_DEFINE_BUTTON2";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                SwfTag[SwfTag["CODE_DEFINE_BITS_LOSSLESS2"] = 36] = "CODE_DEFINE_BITS_LOSSLESS2";
                SwfTag[SwfTag["CODE_DEFINE_EDIT_TEXT"] = 37] = "CODE_DEFINE_EDIT_TEXT";
                SwfTag[SwfTag["CODE_DEFINE_VIDEO"] = 38] = "CODE_DEFINE_VIDEO";
                SwfTag[SwfTag["CODE_DEFINE_SPRITE"] = 39] = "CODE_DEFINE_SPRITE";
                SwfTag[SwfTag["CODE_NAME_CHARACTER"] = 40] = "CODE_NAME_CHARACTER";
                SwfTag[SwfTag["CODE_PRODUCT_INFO"] = 41] = "CODE_PRODUCT_INFO";
                SwfTag[SwfTag["CODE_DEFINE_TEXT_FORMAT"] = 42] = "CODE_DEFINE_TEXT_FORMAT";
                SwfTag[SwfTag["CODE_FRAME_LABEL"] = 43] = "CODE_FRAME_LABEL";
                SwfTag[SwfTag["CODE_DEFINE_BEHAVIOUR"] = 44] = "CODE_DEFINE_BEHAVIOUR";
                SwfTag[SwfTag["CODE_SOUND_STREAM_HEAD2"] = 45] = "CODE_SOUND_STREAM_HEAD2";
                SwfTag[SwfTag["CODE_DEFINE_MORPH_SHAPE"] = 46] = "CODE_DEFINE_MORPH_SHAPE";
                SwfTag[SwfTag["CODE_GENERATE_FRAME"] = 47] = "CODE_GENERATE_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                SwfTag[SwfTag["CODE_GEN_COMMAND"] = 49] = "CODE_GEN_COMMAND";
                SwfTag[SwfTag["CODE_DEFINE_COMMAND_OBJECT"] = 50] = "CODE_DEFINE_COMMAND_OBJECT";
                SwfTag[SwfTag["CODE_CHARACTER_SET"] = 51] = "CODE_CHARACTER_SET";
                SwfTag[SwfTag["CODE_EXTERNAL_FONT"] = 52] = "CODE_EXTERNAL_FONT";
                SwfTag[SwfTag["CODE_DEFINE_FUNCTION"] = 53] = "CODE_DEFINE_FUNCTION";
                SwfTag[SwfTag["CODE_PLACE_FUNCTION"] = 54] = "CODE_PLACE_FUNCTION";
                SwfTag[SwfTag["CODE_GEN_TAG_OBJECTS"] = 55] = "CODE_GEN_TAG_OBJECTS";
                SwfTag[SwfTag["CODE_EXPORT_ASSETS"] = 56] = "CODE_EXPORT_ASSETS";
                SwfTag[SwfTag["CODE_IMPORT_ASSETS"] = 57] = "CODE_IMPORT_ASSETS";
                SwfTag[SwfTag["CODE_ENABLE_DEBUGGER"] = 58] = "CODE_ENABLE_DEBUGGER";
                SwfTag[SwfTag["CODE_DO_INIT_ACTION"] = 59] = "CODE_DO_INIT_ACTION";
                SwfTag[SwfTag["CODE_DEFINE_VIDEO_STREAM"] = 60] = "CODE_DEFINE_VIDEO_STREAM";
                SwfTag[SwfTag["CODE_VIDEO_FRAME"] = 61] = "CODE_VIDEO_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_FONT_INFO2"] = 62] = "CODE_DEFINE_FONT_INFO2";
                SwfTag[SwfTag["CODE_DEBUG_ID"] = 63] = "CODE_DEBUG_ID";
                SwfTag[SwfTag["CODE_ENABLE_DEBUGGER2"] = 64] = "CODE_ENABLE_DEBUGGER2";
                SwfTag[SwfTag["CODE_SCRIPT_LIMITS"] = 65] = "CODE_SCRIPT_LIMITS";
                SwfTag[SwfTag["CODE_SET_TAB_INDEX"] = 66] = "CODE_SET_TAB_INDEX";
                SwfTag[SwfTag["CODE_FILE_ATTRIBUTES"] = 69] = "CODE_FILE_ATTRIBUTES";
                SwfTag[SwfTag["CODE_PLACE_OBJECT3"] = 70] = "CODE_PLACE_OBJECT3";
                SwfTag[SwfTag["CODE_IMPORT_ASSETS2"] = 71] = "CODE_IMPORT_ASSETS2";
                SwfTag[SwfTag["CODE_DO_ABC_DEFINE"] = 72] = "CODE_DO_ABC_DEFINE";
                SwfTag[SwfTag["CODE_DEFINE_FONT_ALIGN_ZONES"] = 73] = "CODE_DEFINE_FONT_ALIGN_ZONES";
                SwfTag[SwfTag["CODE_CSM_TEXT_SETTINGS"] = 74] = "CODE_CSM_TEXT_SETTINGS";
                SwfTag[SwfTag["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                SwfTag[SwfTag["CODE_SYMBOL_CLASS"] = 76] = "CODE_SYMBOL_CLASS";
                SwfTag[SwfTag["CODE_METADATA"] = 77] = "CODE_METADATA";
                SwfTag[SwfTag["CODE_DEFINE_SCALING_GRID"] = 78] = "CODE_DEFINE_SCALING_GRID";
                SwfTag[SwfTag["CODE_DO_ABC"] = 82] = "CODE_DO_ABC";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE4"] = 83] = "CODE_DEFINE_SHAPE4";
                SwfTag[SwfTag["CODE_DEFINE_MORPH_SHAPE2"] = 84] = "CODE_DEFINE_MORPH_SHAPE2";
                SwfTag[SwfTag["CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA"] = 86] = "CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA";
                SwfTag[SwfTag["CODE_DEFINE_BINARY_DATA"] = 87] = "CODE_DEFINE_BINARY_DATA";
                SwfTag[SwfTag["CODE_DEFINE_FONT_NAME"] = 88] = "CODE_DEFINE_FONT_NAME";
                SwfTag[SwfTag["CODE_START_SOUND2"] = 89] = "CODE_START_SOUND2";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
                SwfTag[SwfTag["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.SwfTag || (Parser.SwfTag = {}));
            var SwfTag = Parser.SwfTag;
            (function (DefinitionTags) {
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE"] = 2] = "CODE_DEFINE_SHAPE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BUTTON"] = 7] = "CODE_DEFINE_BUTTON";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_TEXT"] = 11] = "CODE_DEFINE_TEXT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SOUND"] = 14] = "CODE_DEFINE_SOUND";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_LOSSLESS"] = 20] = "CODE_DEFINE_BITS_LOSSLESS";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE2"] = 22] = "CODE_DEFINE_SHAPE2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE3"] = 32] = "CODE_DEFINE_SHAPE3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_TEXT2"] = 33] = "CODE_DEFINE_TEXT2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BUTTON2"] = 34] = "CODE_DEFINE_BUTTON2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_LOSSLESS2"] = 36] = "CODE_DEFINE_BITS_LOSSLESS2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_EDIT_TEXT"] = 37] = "CODE_DEFINE_EDIT_TEXT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SPRITE"] = 39] = "CODE_DEFINE_SPRITE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_MORPH_SHAPE"] = 46] = "CODE_DEFINE_MORPH_SHAPE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_VIDEO_STREAM"] = 60] = "CODE_DEFINE_VIDEO_STREAM";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE4"] = 83] = "CODE_DEFINE_SHAPE4";
                DefinitionTags[DefinitionTags["CODE_DEFINE_MORPH_SHAPE2"] = 84] = "CODE_DEFINE_MORPH_SHAPE2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BINARY_DATA"] = 87] = "CODE_DEFINE_BINARY_DATA";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.DefinitionTags || (Parser.DefinitionTags = {}));
            var DefinitionTags = Parser.DefinitionTags;
            (function (ImageDefinitionTags) {
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
            })(Parser.ImageDefinitionTags || (Parser.ImageDefinitionTags = {}));
            var ImageDefinitionTags = Parser.ImageDefinitionTags;
            (function (FontDefinitionTags) {
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.FontDefinitionTags || (Parser.FontDefinitionTags = {}));
            var FontDefinitionTags = Parser.FontDefinitionTags;
            (function (ControlTags) {
                ControlTags[ControlTags["CODE_PLACE_OBJECT"] = 4] = "CODE_PLACE_OBJECT";
                ControlTags[ControlTags["CODE_PLACE_OBJECT2"] = 26] = "CODE_PLACE_OBJECT2";
                ControlTags[ControlTags["CODE_PLACE_OBJECT3"] = 70] = "CODE_PLACE_OBJECT3";
                ControlTags[ControlTags["CODE_REMOVE_OBJECT"] = 5] = "CODE_REMOVE_OBJECT";
                ControlTags[ControlTags["CODE_REMOVE_OBJECT2"] = 28] = "CODE_REMOVE_OBJECT2";
                ControlTags[ControlTags["CODE_START_SOUND"] = 15] = "CODE_START_SOUND";
                ControlTags[ControlTags["CODE_START_SOUND2"] = 89] = "CODE_START_SOUND2";
                ControlTags[ControlTags["CODE_VIDEO_FRAME"] = 61] = "CODE_VIDEO_FRAME";
            })(Parser.ControlTags || (Parser.ControlTags = {}));
            var ControlTags = Parser.ControlTags;
            (function (PlaceObjectFlags) {
                PlaceObjectFlags[PlaceObjectFlags["Move"] = 0x0001] = "Move";
                PlaceObjectFlags[PlaceObjectFlags["HasCharacter"] = 0x0002] = "HasCharacter";
                PlaceObjectFlags[PlaceObjectFlags["HasMatrix"] = 0x0004] = "HasMatrix";
                PlaceObjectFlags[PlaceObjectFlags["HasColorTransform"] = 0x0008] = "HasColorTransform";
                PlaceObjectFlags[PlaceObjectFlags["HasRatio"] = 0x0010] = "HasRatio";
                PlaceObjectFlags[PlaceObjectFlags["HasName"] = 0x0020] = "HasName";
                PlaceObjectFlags[PlaceObjectFlags["HasClipDepth"] = 0x0040] = "HasClipDepth";
                PlaceObjectFlags[PlaceObjectFlags["HasClipActions"] = 0x0080] = "HasClipActions";
                PlaceObjectFlags[PlaceObjectFlags["HasFilterList"] = 0x0100] = "HasFilterList";
                PlaceObjectFlags[PlaceObjectFlags["HasBlendMode"] = 0x0200] = "HasBlendMode";
                PlaceObjectFlags[PlaceObjectFlags["HasCacheAsBitmap"] = 0x0400] = "HasCacheAsBitmap";
                PlaceObjectFlags[PlaceObjectFlags["HasClassName"] = 0x0800] = "HasClassName";
                PlaceObjectFlags[PlaceObjectFlags["HasImage"] = 0x1000] = "HasImage";
                PlaceObjectFlags[PlaceObjectFlags["HasVisible"] = 0x2000] = "HasVisible";
                PlaceObjectFlags[PlaceObjectFlags["OpaqueBackground"] = 0x4000] = "OpaqueBackground";
                PlaceObjectFlags[PlaceObjectFlags["Reserved"] = 0x8000] = "Reserved";
            })(Parser.PlaceObjectFlags || (Parser.PlaceObjectFlags = {}));
            var PlaceObjectFlags = Parser.PlaceObjectFlags;
            (function (AVM1ClipEvents) {
                AVM1ClipEvents[AVM1ClipEvents["Load"] = 0x00001] = "Load";
                AVM1ClipEvents[AVM1ClipEvents["EnterFrame"] = 0x00002] = "EnterFrame";
                AVM1ClipEvents[AVM1ClipEvents["Unload"] = 0x00004] = "Unload";
                AVM1ClipEvents[AVM1ClipEvents["MouseMove"] = 0x00008] = "MouseMove";
                AVM1ClipEvents[AVM1ClipEvents["MouseDown"] = 0x00010] = "MouseDown";
                AVM1ClipEvents[AVM1ClipEvents["MouseUp"] = 0x00020] = "MouseUp";
                AVM1ClipEvents[AVM1ClipEvents["KeyDown"] = 0x00040] = "KeyDown";
                AVM1ClipEvents[AVM1ClipEvents["KeyUp"] = 0x00080] = "KeyUp";
                AVM1ClipEvents[AVM1ClipEvents["Data"] = 0x00100] = "Data";
                AVM1ClipEvents[AVM1ClipEvents["Initialize"] = 0x00200] = "Initialize";
                AVM1ClipEvents[AVM1ClipEvents["Press"] = 0x00400] = "Press";
                AVM1ClipEvents[AVM1ClipEvents["Release"] = 0x00800] = "Release";
                AVM1ClipEvents[AVM1ClipEvents["ReleaseOutside"] = 0x01000] = "ReleaseOutside";
                AVM1ClipEvents[AVM1ClipEvents["RollOver"] = 0x02000] = "RollOver";
                AVM1ClipEvents[AVM1ClipEvents["RollOut"] = 0x04000] = "RollOut";
                AVM1ClipEvents[AVM1ClipEvents["DragOver"] = 0x08000] = "DragOver";
                AVM1ClipEvents[AVM1ClipEvents["DragOut"] = 0x10000] = "DragOut";
                AVM1ClipEvents[AVM1ClipEvents["KeyPress"] = 0x20000] = "KeyPress";
                AVM1ClipEvents[AVM1ClipEvents["Construct"] = 0x40000] = "Construct";
            })(Parser.AVM1ClipEvents || (Parser.AVM1ClipEvents = {}));
            var AVM1ClipEvents = Parser.AVM1ClipEvents;
        })(Parser = SWF.Parser || (SWF.Parser = {}));
    })(SWF = Shumway.SWF || (Shumway.SWF = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var unexpected = Shumway.Debug.unexpected;
    var BinaryFileReader = (function () {
        function BinaryFileReader(url, method, mimeType, data) {
            this.url = url;
            this.method = method;
            this.mimeType = mimeType;
            this.data = data;
        }
        BinaryFileReader.prototype.readAll = function (progress, complete) {
            var url = this.url;
            var xhr = new XMLHttpRequest({ mozSystem: true });
            var async = true;
            xhr.open(this.method || "GET", this.url, async);
            xhr.responseType = "arraybuffer";
            if (progress) {
                xhr.onprogress = function (event) {
                    progress(xhr.response, event.loaded, event.total);
                };
            }
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null) {
                        unexpected("Path: " + url + " not found.");
                        complete(null, xhr.statusText);
                        return;
                    }
                    complete(xhr.response);
                }
            };
            if (this.mimeType) {
                xhr.setRequestHeader("Content-Type", this.mimeType);
            }
            xhr.send(this.data || null);
        };
        BinaryFileReader.prototype.readChunked = function (chunkSize, ondata, onerror, onopen, oncomplete, onhttpstatus) {
            if (chunkSize <= 0) {
                this.readAsync(ondata, onerror, onopen, oncomplete, onhttpstatus);
                return;
            }
            var position = 0;
            var buffer = new Uint8Array(chunkSize);
            var read = 0, total;
            this.readAsync(function (data, progress) {
                total = progress.total;
                var left = data.length, offset = 0;
                while (position + left >= chunkSize) {
                    var tailSize = chunkSize - position;
                    buffer.set(data.subarray(offset, offset + tailSize), position);
                    offset += tailSize;
                    left -= tailSize;
                    read += chunkSize;
                    ondata(buffer, { loaded: read, total: total });
                    position = 0;
                }
                buffer.set(data.subarray(offset), position);
                position += left;
            }, onerror, onopen, function () {
                if (position > 0) {
                    read += position;
                    ondata(buffer.subarray(0, position), { loaded: read, total: total });
                    position = 0;
                }
                oncomplete && oncomplete();
            }, onhttpstatus);
        };
        BinaryFileReader.prototype.readAsync = function (ondata, onerror, onopen, oncomplete, onhttpstatus) {
            var xhr = new XMLHttpRequest({ mozSystem: true });
            var url = this.url;
            var loaded = 0;
            var total = 0;
            xhr.open(this.method || "GET", url, true);
            xhr.responseType = 'moz-chunked-arraybuffer';
            var isNotProgressive = xhr.responseType !== 'moz-chunked-arraybuffer';
            if (isNotProgressive) {
                xhr.responseType = 'arraybuffer';
            }
            xhr.onprogress = function (e) {
                if (isNotProgressive)
                    return;
                loaded = e.loaded;
                total = e.total;
                ondata(new Uint8Array(xhr.response), { loaded: loaded, total: total });
            };
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState === 2 && onhttpstatus) {
                    onhttpstatus(url, xhr.status, xhr.getAllResponseHeaders());
                }
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null && (total === 0 || loaded !== total)) {
                        onerror(xhr.statusText);
                        return;
                    }
                    if (isNotProgressive) {
                        var buffer = xhr.response;
                        ondata(new Uint8Array(buffer), { loaded: 0, total: buffer.byteLength });
                    }
                    if (oncomplete) {
                        oncomplete();
                    }
                }
            };
            if (this.mimeType) {
                xhr.setRequestHeader("Content-Type", this.mimeType);
            }
            xhr.send(this.data || null);
            if (onopen) {
                onopen();
            }
        };
        return BinaryFileReader;
    })();
    Shumway.BinaryFileReader = BinaryFileReader;
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Remoting;
    (function (Remoting) {
        (function (RemotingPhase) {
            RemotingPhase[RemotingPhase["Objects"] = 0] = "Objects";
            RemotingPhase[RemotingPhase["References"] = 1] = "References";
        })(Remoting.RemotingPhase || (Remoting.RemotingPhase = {}));
        var RemotingPhase = Remoting.RemotingPhase;
        (function (MessageBits) {
            MessageBits[MessageBits["HasMatrix"] = 0x0001] = "HasMatrix";
            MessageBits[MessageBits["HasBounds"] = 0x0002] = "HasBounds";
            MessageBits[MessageBits["HasChildren"] = 0x0004] = "HasChildren";
            MessageBits[MessageBits["HasColorTransform"] = 0x0008] = "HasColorTransform";
            MessageBits[MessageBits["HasClipRect"] = 0x0010] = "HasClipRect";
            MessageBits[MessageBits["HasMiscellaneousProperties"] = 0x0020] = "HasMiscellaneousProperties";
            MessageBits[MessageBits["HasMask"] = 0x0040] = "HasMask";
            MessageBits[MessageBits["HasClip"] = 0x0080] = "HasClip";
        })(Remoting.MessageBits || (Remoting.MessageBits = {}));
        var MessageBits = Remoting.MessageBits;
        (function (IDMask) {
            IDMask[IDMask["None"] = 0x00000000] = "None";
            IDMask[IDMask["Asset"] = 0x08000000] = "Asset";
        })(Remoting.IDMask || (Remoting.IDMask = {}));
        var IDMask = Remoting.IDMask;
        (function (MessageTag) {
            MessageTag[MessageTag["EOF"] = 0] = "EOF";
            MessageTag[MessageTag["UpdateFrame"] = 100] = "UpdateFrame";
            MessageTag[MessageTag["UpdateGraphics"] = 101] = "UpdateGraphics";
            MessageTag[MessageTag["UpdateBitmapData"] = 102] = "UpdateBitmapData";
            MessageTag[MessageTag["UpdateTextContent"] = 103] = "UpdateTextContent";
            MessageTag[MessageTag["UpdateStage"] = 104] = "UpdateStage";
            MessageTag[MessageTag["UpdateNetStream"] = 105] = "UpdateNetStream";
            MessageTag[MessageTag["RequestBitmapData"] = 106] = "RequestBitmapData";
            MessageTag[MessageTag["DecodeImage"] = 107] = "DecodeImage";
            MessageTag[MessageTag["DecodeImageResponse"] = 108] = "DecodeImageResponse";
            MessageTag[MessageTag["RegisterFont"] = 200] = "RegisterFont";
            MessageTag[MessageTag["DrawToBitmap"] = 201] = "DrawToBitmap";
            MessageTag[MessageTag["MouseEvent"] = 300] = "MouseEvent";
            MessageTag[MessageTag["KeyboardEvent"] = 301] = "KeyboardEvent";
            MessageTag[MessageTag["FocusEvent"] = 302] = "FocusEvent";
        })(Remoting.MessageTag || (Remoting.MessageTag = {}));
        var MessageTag = Remoting.MessageTag;
        (function (FilterType) {
            FilterType[FilterType["Blur"] = 0] = "Blur";
            FilterType[FilterType["DropShadow"] = 1] = "DropShadow";
        })(Remoting.FilterType || (Remoting.FilterType = {}));
        var FilterType = Remoting.FilterType;
        (function (ColorTransformEncoding) {
            ColorTransformEncoding[ColorTransformEncoding["Identity"] = 0] = "Identity";
            ColorTransformEncoding[ColorTransformEncoding["AlphaMultiplierOnly"] = 1] = "AlphaMultiplierOnly";
            ColorTransformEncoding[ColorTransformEncoding["All"] = 2] = "All";
        })(Remoting.ColorTransformEncoding || (Remoting.ColorTransformEncoding = {}));
        var ColorTransformEncoding = Remoting.ColorTransformEncoding;
        (function (VideoPlaybackEvent) {
            VideoPlaybackEvent[VideoPlaybackEvent["Initialized"] = 0] = "Initialized";
            VideoPlaybackEvent[VideoPlaybackEvent["PlayStart"] = 1] = "PlayStart";
            VideoPlaybackEvent[VideoPlaybackEvent["PlayStop"] = 2] = "PlayStop";
            VideoPlaybackEvent[VideoPlaybackEvent["BufferFull"] = 3] = "BufferFull";
            VideoPlaybackEvent[VideoPlaybackEvent["Progress"] = 4] = "Progress";
            VideoPlaybackEvent[VideoPlaybackEvent["BufferEmpty"] = 5] = "BufferEmpty";
            VideoPlaybackEvent[VideoPlaybackEvent["Error"] = 6] = "Error";
            VideoPlaybackEvent[VideoPlaybackEvent["Metadata"] = 7] = "Metadata";
            VideoPlaybackEvent[VideoPlaybackEvent["Seeking"] = 8] = "Seeking";
        })(Remoting.VideoPlaybackEvent || (Remoting.VideoPlaybackEvent = {}));
        var VideoPlaybackEvent = Remoting.VideoPlaybackEvent;
        (function (VideoControlEvent) {
            VideoControlEvent[VideoControlEvent["Pause"] = 1] = "Pause";
            VideoControlEvent[VideoControlEvent["Seek"] = 2] = "Seek";
            VideoControlEvent[VideoControlEvent["GetTime"] = 3] = "GetTime";
            VideoControlEvent[VideoControlEvent["GetBufferLength"] = 4] = "GetBufferLength";
            VideoControlEvent[VideoControlEvent["SetSoundLevels"] = 5] = "SetSoundLevels";
            VideoControlEvent[VideoControlEvent["GetBytesLoaded"] = 6] = "GetBytesLoaded";
            VideoControlEvent[VideoControlEvent["GetBytesTotal"] = 7] = "GetBytesTotal";
        })(Remoting.VideoControlEvent || (Remoting.VideoControlEvent = {}));
        var VideoControlEvent = Remoting.VideoControlEvent;
        (function (StageScaleMode) {
            StageScaleMode[StageScaleMode["ShowAll"] = 0] = "ShowAll";
            StageScaleMode[StageScaleMode["ExactFit"] = 1] = "ExactFit";
            StageScaleMode[StageScaleMode["NoBorder"] = 2] = "NoBorder";
            StageScaleMode[StageScaleMode["NoScale"] = 4] = "NoScale";
        })(Remoting.StageScaleMode || (Remoting.StageScaleMode = {}));
        var StageScaleMode = Remoting.StageScaleMode;
        (function (StageAlignFlags) {
            StageAlignFlags[StageAlignFlags["None"] = 0] = "None";
            StageAlignFlags[StageAlignFlags["Top"] = 1] = "Top";
            StageAlignFlags[StageAlignFlags["Bottom"] = 2] = "Bottom";
            StageAlignFlags[StageAlignFlags["Left"] = 4] = "Left";
            StageAlignFlags[StageAlignFlags["Right"] = 8] = "Right";
            StageAlignFlags[StageAlignFlags["TopLeft"] = StageAlignFlags.Top | StageAlignFlags.Left] = "TopLeft";
            StageAlignFlags[StageAlignFlags["BottomLeft"] = StageAlignFlags.Bottom | StageAlignFlags.Left] = "BottomLeft";
            StageAlignFlags[StageAlignFlags["BottomRight"] = StageAlignFlags.Bottom | StageAlignFlags.Right] = "BottomRight";
            StageAlignFlags[StageAlignFlags["TopRight"] = StageAlignFlags.Top | StageAlignFlags.Right] = "TopRight";
        })(Remoting.StageAlignFlags || (Remoting.StageAlignFlags = {}));
        var StageAlignFlags = Remoting.StageAlignFlags;
        Remoting.MouseEventNames = [
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseover',
            'mouseout'
        ];
        Remoting.KeyboardEventNames = [
            'keydown',
            'keypress',
            'keyup'
        ];
        (function (KeyboardEventFlags) {
            KeyboardEventFlags[KeyboardEventFlags["CtrlKey"] = 0x0001] = "CtrlKey";
            KeyboardEventFlags[KeyboardEventFlags["AltKey"] = 0x0002] = "AltKey";
            KeyboardEventFlags[KeyboardEventFlags["ShiftKey"] = 0x0004] = "ShiftKey";
        })(Remoting.KeyboardEventFlags || (Remoting.KeyboardEventFlags = {}));
        var KeyboardEventFlags = Remoting.KeyboardEventFlags;
        (function (FocusEventType) {
            FocusEventType[FocusEventType["DocumentHidden"] = 0] = "DocumentHidden";
            FocusEventType[FocusEventType["DocumentVisible"] = 1] = "DocumentVisible";
            FocusEventType[FocusEventType["WindowBlur"] = 2] = "WindowBlur";
            FocusEventType[FocusEventType["WindowFocus"] = 3] = "WindowFocus";
        })(Remoting.FocusEventType || (Remoting.FocusEventType = {}));
        var FocusEventType = Remoting.FocusEventType;
    })(Remoting = Shumway.Remoting || (Shumway.Remoting = {}));
})(Shumway || (Shumway = {}));
var throwError;
var Errors;
//# sourceMappingURL=base.js.map
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Theme;
        (function (Theme) {
            var UI = (function () {
                function UI() {
                }
                UI.toRGBA = function (r, g, b, a) {
                    if (a === void 0) { a = 1; }
                    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
                };
                return UI;
            })();
            Theme.UI = UI;
            var UIThemeDark = (function () {
                function UIThemeDark() {
                }
                UIThemeDark.prototype.tabToolbar = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(37, 44, 51, a);
                };
                UIThemeDark.prototype.toolbars = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(52, 60, 69, a);
                };
                UIThemeDark.prototype.selectionBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(29, 79, 115, a);
                };
                UIThemeDark.prototype.selectionText = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(245, 247, 250, a);
                };
                UIThemeDark.prototype.splitters = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(0, 0, 0, a);
                };
                UIThemeDark.prototype.bodyBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(17, 19, 21, a);
                };
                UIThemeDark.prototype.sidebarBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(24, 29, 32, a);
                };
                UIThemeDark.prototype.attentionBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(161, 134, 80, a);
                };
                UIThemeDark.prototype.bodyText = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(143, 161, 178, a);
                };
                UIThemeDark.prototype.foregroundTextGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(182, 186, 191, a);
                };
                UIThemeDark.prototype.contentTextHighContrast = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(169, 186, 203, a);
                };
                UIThemeDark.prototype.contentTextGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(143, 161, 178, a);
                };
                UIThemeDark.prototype.contentTextDarkGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(95, 115, 135, a);
                };
                UIThemeDark.prototype.blueHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(70, 175, 227, a);
                };
                UIThemeDark.prototype.purpleHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(107, 122, 187, a);
                };
                UIThemeDark.prototype.pinkHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(223, 128, 255, a);
                };
                UIThemeDark.prototype.redHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(235, 83, 104, a);
                };
                UIThemeDark.prototype.orangeHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(217, 102, 41, a);
                };
                UIThemeDark.prototype.lightOrangeHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(217, 155, 40, a);
                };
                UIThemeDark.prototype.greenHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(112, 191, 83, a);
                };
                UIThemeDark.prototype.blueGreyHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(94, 136, 176, a);
                };
                return UIThemeDark;
            })();
            Theme.UIThemeDark = UIThemeDark;
            var UIThemeLight = (function () {
                function UIThemeLight() {
                }
                UIThemeLight.prototype.tabToolbar = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(235, 236, 237, a);
                };
                UIThemeLight.prototype.toolbars = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(240, 241, 242, a);
                };
                UIThemeLight.prototype.selectionBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(76, 158, 217, a);
                };
                UIThemeLight.prototype.selectionText = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(245, 247, 250, a);
                };
                UIThemeLight.prototype.splitters = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(170, 170, 170, a);
                };
                UIThemeLight.prototype.bodyBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(252, 252, 252, a);
                };
                UIThemeLight.prototype.sidebarBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(247, 247, 247, a);
                };
                UIThemeLight.prototype.attentionBackground = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(161, 134, 80, a);
                };
                UIThemeLight.prototype.bodyText = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(24, 25, 26, a);
                };
                UIThemeLight.prototype.foregroundTextGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(88, 89, 89, a);
                };
                UIThemeLight.prototype.contentTextHighContrast = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(41, 46, 51, a);
                };
                UIThemeLight.prototype.contentTextGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(143, 161, 178, a);
                };
                UIThemeLight.prototype.contentTextDarkGrey = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(102, 115, 128, a);
                };
                UIThemeLight.prototype.blueHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(0, 136, 204, a);
                };
                UIThemeLight.prototype.purpleHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(91, 95, 255, a);
                };
                UIThemeLight.prototype.pinkHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(184, 46, 229, a);
                };
                UIThemeLight.prototype.redHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(237, 38, 85, a);
                };
                UIThemeLight.prototype.orangeHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(241, 60, 0, a);
                };
                UIThemeLight.prototype.lightOrangeHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(217, 126, 0, a);
                };
                UIThemeLight.prototype.greenHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(44, 187, 15, a);
                };
                UIThemeLight.prototype.blueGreyHighlight = function (a) {
                    if (a === void 0) { a = 1; }
                    return UI.toRGBA(95, 136, 176, a);
                };
                return UIThemeLight;
            })();
            Theme.UIThemeLight = UIThemeLight;
        })(Theme = Tools.Theme || (Tools.Theme = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var Profile = (function () {
                function Profile(buffers) {
                    this._buffers = buffers || [];
                    this._snapshots = [];
                    this._maxDepth = 0;
                }
                Profile.prototype.addBuffer = function (buffer) {
                    this._buffers.push(buffer);
                };
                Profile.prototype.getSnapshotAt = function (index) {
                    return this._snapshots[index];
                };
                Object.defineProperty(Profile.prototype, "hasSnapshots", {
                    get: function () {
                        return (this.snapshotCount > 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "snapshotCount", {
                    get: function () {
                        return this._snapshots.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "startTime", {
                    get: function () {
                        return this._startTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "endTime", {
                    get: function () {
                        return this._endTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "totalTime", {
                    get: function () {
                        return this.endTime - this.startTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "windowStart", {
                    get: function () {
                        return this._windowStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "windowEnd", {
                    get: function () {
                        return this._windowEnd;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "windowLength", {
                    get: function () {
                        return this.windowEnd - this.windowStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "maxDepth", {
                    get: function () {
                        return this._maxDepth;
                    },
                    enumerable: true,
                    configurable: true
                });
                Profile.prototype.forEachSnapshot = function (visitor) {
                    for (var i = 0, n = this.snapshotCount; i < n; i++) {
                        visitor(this._snapshots[i], i);
                    }
                };
                Profile.prototype.createSnapshots = function () {
                    var startTime = Number.MAX_VALUE;
                    var endTime = Number.MIN_VALUE;
                    var maxDepth = 0;
                    this._snapshots = [];
                    while (this._buffers.length > 0) {
                        var buffer = this._buffers.shift();
                        var snapshot = buffer.createSnapshot();
                        if (snapshot) {
                            if (startTime > snapshot.startTime) {
                                startTime = snapshot.startTime;
                            }
                            if (endTime < snapshot.endTime) {
                                endTime = snapshot.endTime;
                            }
                            if (maxDepth < snapshot.maxDepth) {
                                maxDepth = snapshot.maxDepth;
                            }
                            this._snapshots.push(snapshot);
                        }
                    }
                    this._startTime = startTime;
                    this._endTime = endTime;
                    this._windowStart = startTime;
                    this._windowEnd = endTime;
                    this._maxDepth = maxDepth;
                };
                Profile.prototype.setWindow = function (start, end) {
                    if (start > end) {
                        var tmp = start;
                        start = end;
                        end = tmp;
                    }
                    var length = Math.min(end - start, this.totalTime);
                    if (start < this._startTime) {
                        start = this._startTime;
                        end = this._startTime + length;
                    }
                    else if (end > this._endTime) {
                        start = this._endTime - length;
                        end = this._endTime;
                    }
                    this._windowStart = start;
                    this._windowEnd = end;
                };
                Profile.prototype.moveWindowTo = function (time) {
                    this.setWindow(time - this.windowLength / 2, time + this.windowLength / 2);
                };
                return Profile;
            })();
            Profiler.Profile = Profile;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var TimelineFrameStatistics = (function () {
                function TimelineFrameStatistics(kind) {
                    this.kind = kind;
                    this.count = 0;
                    this.selfTime = 0;
                    this.totalTime = 0;
                }
                return TimelineFrameStatistics;
            })();
            Profiler.TimelineFrameStatistics = TimelineFrameStatistics;
            var TimelineFrame = (function () {
                function TimelineFrame(parent, kind, startData, endData, startTime, endTime) {
                    this.parent = parent;
                    this.kind = kind;
                    this.startData = startData;
                    this.endData = endData;
                    this.startTime = startTime;
                    this.endTime = endTime;
                    this.maxDepth = 0;
                }
                Object.defineProperty(TimelineFrame.prototype, "totalTime", {
                    get: function () {
                        return this.endTime - this.startTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimelineFrame.prototype, "selfTime", {
                    get: function () {
                        var selfTime = this.totalTime;
                        if (this.children) {
                            for (var i = 0, n = this.children.length; i < n; i++) {
                                var child = this.children[i];
                                selfTime -= (child.endTime - child.startTime);
                            }
                        }
                        return selfTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimelineFrame.prototype.getChildIndex = function (time) {
                    var children = this.children;
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (child.endTime > time) {
                            return i;
                        }
                    }
                    return 0;
                };
                TimelineFrame.prototype.getChildRange = function (startTime, endTime) {
                    if (this.children && startTime <= this.endTime && endTime >= this.startTime && endTime >= startTime) {
                        var startIdx = this._getNearestChild(startTime);
                        var endIdx = this._getNearestChildReverse(endTime);
                        if (startIdx <= endIdx) {
                            var startTime = this.children[startIdx].startTime;
                            var endTime = this.children[endIdx].endTime;
                            return {
                                startIndex: startIdx,
                                endIndex: endIdx,
                                startTime: startTime,
                                endTime: endTime,
                                totalTime: endTime - startTime
                            };
                        }
                    }
                    return null;
                };
                TimelineFrame.prototype._getNearestChild = function (time) {
                    var children = this.children;
                    if (children && children.length) {
                        if (time <= children[0].endTime) {
                            return 0;
                        }
                        var imid;
                        var imin = 0;
                        var imax = children.length - 1;
                        while (imax > imin) {
                            imid = ((imin + imax) / 2) | 0;
                            var child = children[imid];
                            if (time >= child.startTime && time <= child.endTime) {
                                return imid;
                            }
                            else if (time > child.endTime) {
                                imin = imid + 1;
                            }
                            else {
                                imax = imid;
                            }
                        }
                        return Math.ceil((imin + imax) / 2);
                    }
                    else {
                        return 0;
                    }
                };
                TimelineFrame.prototype._getNearestChildReverse = function (time) {
                    var children = this.children;
                    if (children && children.length) {
                        var imax = children.length - 1;
                        if (time >= children[imax].startTime) {
                            return imax;
                        }
                        var imid;
                        var imin = 0;
                        while (imax > imin) {
                            imid = Math.ceil((imin + imax) / 2);
                            var child = children[imid];
                            if (time >= child.startTime && time <= child.endTime) {
                                return imid;
                            }
                            else if (time > child.endTime) {
                                imin = imid;
                            }
                            else {
                                imax = imid - 1;
                            }
                        }
                        return ((imin + imax) / 2) | 0;
                    }
                    else {
                        return 0;
                    }
                };
                TimelineFrame.prototype.query = function (time) {
                    if (time < this.startTime || time > this.endTime) {
                        return null;
                    }
                    var children = this.children;
                    if (children && children.length > 0) {
                        var child;
                        var imin = 0;
                        var imax = children.length - 1;
                        while (imax > imin) {
                            var imid = ((imin + imax) / 2) | 0;
                            child = children[imid];
                            if (time >= child.startTime && time <= child.endTime) {
                                return child.query(time);
                            }
                            else if (time > child.endTime) {
                                imin = imid + 1;
                            }
                            else {
                                imax = imid;
                            }
                        }
                        child = children[imax];
                        if (time >= child.startTime && time <= child.endTime) {
                            return child.query(time);
                        }
                    }
                    return this;
                };
                TimelineFrame.prototype.queryNext = function (time) {
                    var frame = this;
                    while (time > frame.endTime) {
                        if (frame.parent) {
                            frame = frame.parent;
                        }
                        else {
                            return frame.query(time);
                        }
                    }
                    return frame.query(time);
                };
                TimelineFrame.prototype.getDepth = function () {
                    var depth = 0;
                    var self = this;
                    while (self) {
                        depth++;
                        self = self.parent;
                    }
                    return depth;
                };
                TimelineFrame.prototype.calculateStatistics = function () {
                    var statistics = this.statistics = [];
                    function visit(frame) {
                        if (frame.kind) {
                            var s = statistics[frame.kind.id] || (statistics[frame.kind.id] = new TimelineFrameStatistics(frame.kind));
                            s.count++;
                            s.selfTime += frame.selfTime;
                            s.totalTime += frame.totalTime;
                        }
                        if (frame.children) {
                            frame.children.forEach(visit);
                        }
                    }
                    visit(this);
                };
                TimelineFrame.prototype.trace = function (writer) {
                    var s = (this.kind ? this.kind.name + ": " : "Profile: ") + (this.endTime - this.startTime).toFixed(2);
                    if (this.children && this.children.length) {
                        writer.enter(s);
                        for (var i = 0; i < this.children.length; i++) {
                            this.children[i].trace(writer);
                        }
                        writer.outdent();
                    }
                    else {
                        writer.writeLn(s);
                    }
                };
                return TimelineFrame;
            })();
            Profiler.TimelineFrame = TimelineFrame;
            var TimelineBufferSnapshot = (function (_super) {
                __extends(TimelineBufferSnapshot, _super);
                function TimelineBufferSnapshot(name) {
                    _super.call(this, null, null, null, null, NaN, NaN);
                    this.name = name;
                }
                return TimelineBufferSnapshot;
            })(TimelineFrame);
            Profiler.TimelineBufferSnapshot = TimelineBufferSnapshot;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var TimelineBuffer = (function () {
                function TimelineBuffer(name, startTime) {
                    if (name === void 0) { name = ""; }
                    this.name = name || "";
                    this._startTime = Shumway.isNullOrUndefined(startTime) ? jsGlobal.START_TIME : startTime;
                }
                TimelineBuffer.prototype.getKind = function (kind) {
                    return this._kinds[kind];
                };
                Object.defineProperty(TimelineBuffer.prototype, "kinds", {
                    get: function () {
                        return this._kinds.concat();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimelineBuffer.prototype, "depth", {
                    get: function () {
                        return this._depth;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimelineBuffer.prototype._initialize = function () {
                    this._depth = 0;
                    this._stack = [];
                    this._data = [];
                    this._kinds = [];
                    this._kindNameMap = Object.create(null);
                    this._marks = new Shumway.CircularBuffer(Int32Array, 20);
                    this._times = new Shumway.CircularBuffer(Float64Array, 20);
                };
                TimelineBuffer.prototype._getKindId = function (name) {
                    var kindId = TimelineBuffer.MAX_KINDID;
                    if (this._kindNameMap[name] === undefined) {
                        kindId = this._kinds.length;
                        if (kindId < TimelineBuffer.MAX_KINDID) {
                            var kind = {
                                id: kindId,
                                name: name,
                                visible: true
                            };
                            this._kinds.push(kind);
                            this._kindNameMap[name] = kind;
                        }
                        else {
                            kindId = TimelineBuffer.MAX_KINDID;
                        }
                    }
                    else {
                        kindId = this._kindNameMap[name].id;
                    }
                    return kindId;
                };
                TimelineBuffer.prototype._getMark = function (type, kindId, data) {
                    var dataId = TimelineBuffer.MAX_DATAID;
                    if (!Shumway.isNullOrUndefined(data) && kindId !== TimelineBuffer.MAX_KINDID) {
                        dataId = this._data.length;
                        if (dataId < TimelineBuffer.MAX_DATAID) {
                            this._data.push(data);
                        }
                        else {
                            dataId = TimelineBuffer.MAX_DATAID;
                        }
                    }
                    return type | (dataId << 16) | kindId;
                };
                TimelineBuffer.prototype.enter = function (name, data, time) {
                    time = (Shumway.isNullOrUndefined(time) ? performance.now() : time) - this._startTime;
                    if (!this._marks) {
                        this._initialize();
                    }
                    this._depth++;
                    var kindId = this._getKindId(name);
                    this._marks.write(this._getMark(TimelineBuffer.ENTER, kindId, data));
                    this._times.write(time);
                    this._stack.push(kindId);
                };
                TimelineBuffer.prototype.leave = function (name, data, time) {
                    time = (Shumway.isNullOrUndefined(time) ? performance.now() : time) - this._startTime;
                    var kindId = this._stack.pop();
                    if (name) {
                        kindId = this._getKindId(name);
                    }
                    this._marks.write(this._getMark(TimelineBuffer.LEAVE, kindId, data));
                    this._times.write(time);
                    this._depth--;
                };
                TimelineBuffer.prototype.count = function (name, value, data) {
                };
                TimelineBuffer.prototype.createSnapshot = function (count) {
                    if (count === void 0) { count = Number.MAX_VALUE; }
                    if (!this._marks) {
                        return null;
                    }
                    var times = this._times;
                    var kinds = this._kinds;
                    var datastore = this._data;
                    var snapshot = new Profiler.TimelineBufferSnapshot(this.name);
                    var stack = [snapshot];
                    var topLevelFrameCount = 0;
                    if (!this._marks) {
                        this._initialize();
                    }
                    this._marks.forEachInReverse(function (mark, i) {
                        var dataId = (mark >>> 16) & TimelineBuffer.MAX_DATAID;
                        var data = datastore[dataId];
                        var kindId = mark & TimelineBuffer.MAX_KINDID;
                        var kind = kinds[kindId];
                        if (Shumway.isNullOrUndefined(kind) || kind.visible) {
                            var action = mark & 0x80000000;
                            var time = times.get(i);
                            var stackLength = stack.length;
                            if (action === TimelineBuffer.LEAVE) {
                                if (stackLength === 1) {
                                    topLevelFrameCount++;
                                    if (topLevelFrameCount > count) {
                                        return true;
                                    }
                                }
                                stack.push(new Profiler.TimelineFrame(stack[stackLength - 1], kind, null, data, NaN, time));
                            }
                            else if (action === TimelineBuffer.ENTER) {
                                var node = stack.pop();
                                var top = stack[stack.length - 1];
                                if (top) {
                                    if (!top.children) {
                                        top.children = [node];
                                    }
                                    else {
                                        top.children.unshift(node);
                                    }
                                    var currentDepth = stack.length;
                                    node.depth = currentDepth;
                                    node.startData = data;
                                    node.startTime = time;
                                    while (node) {
                                        if (node.maxDepth < currentDepth) {
                                            node.maxDepth = currentDepth;
                                            node = node.parent;
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    });
                    if (snapshot.children && snapshot.children.length) {
                        snapshot.startTime = snapshot.children[0].startTime;
                        snapshot.endTime = snapshot.children[snapshot.children.length - 1].endTime;
                    }
                    return snapshot;
                };
                TimelineBuffer.prototype.reset = function (startTime) {
                    this._startTime = Shumway.isNullOrUndefined(startTime) ? performance.now() : startTime;
                    if (!this._marks) {
                        this._initialize();
                        return;
                    }
                    this._depth = 0;
                    this._data = [];
                    this._marks.reset();
                    this._times.reset();
                };
                TimelineBuffer.FromFirefoxProfile = function (profile, name) {
                    var samples = profile.profile.threads[0].samples;
                    var buffer = new TimelineBuffer(name, samples[0].time);
                    var currentStack = [];
                    var sample;
                    for (var i = 0; i < samples.length; i++) {
                        sample = samples[i];
                        var time = sample.time;
                        var stack = sample.frames;
                        var j = 0;
                        var minStackLen = Math.min(stack.length, currentStack.length);
                        while (j < minStackLen && stack[j].location === currentStack[j].location) {
                            j++;
                        }
                        var leaveCount = currentStack.length - j;
                        for (var k = 0; k < leaveCount; k++) {
                            sample = currentStack.pop();
                            buffer.leave(sample.location, null, time);
                        }
                        while (j < stack.length) {
                            sample = stack[j++];
                            buffer.enter(sample.location, null, time);
                        }
                        currentStack = stack;
                    }
                    while (sample = currentStack.pop()) {
                        buffer.leave(sample.location, null, time);
                    }
                    return buffer;
                };
                TimelineBuffer.FromChromeProfile = function (profile, name) {
                    var timestamps = profile.timestamps;
                    var samples = profile.samples;
                    var buffer = new TimelineBuffer(name, timestamps[0] / 1000);
                    var currentStack = [];
                    var idMap = {};
                    var sample;
                    TimelineBuffer._resolveIds(profile.head, idMap);
                    for (var i = 0; i < timestamps.length; i++) {
                        var time = timestamps[i] / 1000;
                        var stack = [];
                        sample = idMap[samples[i]];
                        while (sample) {
                            stack.unshift(sample);
                            sample = sample.parent;
                        }
                        var j = 0;
                        var minStackLen = Math.min(stack.length, currentStack.length);
                        while (j < minStackLen && stack[j] === currentStack[j]) {
                            j++;
                        }
                        var leaveCount = currentStack.length - j;
                        for (var k = 0; k < leaveCount; k++) {
                            sample = currentStack.pop();
                            buffer.leave(sample.functionName, null, time);
                        }
                        while (j < stack.length) {
                            sample = stack[j++];
                            buffer.enter(sample.functionName, null, time);
                        }
                        currentStack = stack;
                    }
                    while (sample = currentStack.pop()) {
                        buffer.leave(sample.functionName, null, time);
                    }
                    return buffer;
                };
                TimelineBuffer._resolveIds = function (parent, idMap) {
                    idMap[parent.id] = parent;
                    if (parent.children) {
                        for (var i = 0; i < parent.children.length; i++) {
                            parent.children[i].parent = parent;
                            TimelineBuffer._resolveIds(parent.children[i], idMap);
                        }
                    }
                };
                TimelineBuffer.ENTER = 0 << 31;
                TimelineBuffer.LEAVE = 1 << 31;
                TimelineBuffer.MAX_KINDID = 0xffff;
                TimelineBuffer.MAX_DATAID = 0x7fff;
                return TimelineBuffer;
            })();
            Profiler.TimelineBuffer = TimelineBuffer;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            (function (UIThemeType) {
                UIThemeType[UIThemeType["DARK"] = 0] = "DARK";
                UIThemeType[UIThemeType["LIGHT"] = 1] = "LIGHT";
            })(Profiler.UIThemeType || (Profiler.UIThemeType = {}));
            var UIThemeType = Profiler.UIThemeType;
            var Controller = (function () {
                function Controller(container, themeType) {
                    if (themeType === void 0) { themeType = 0 /* DARK */; }
                    this._container = container;
                    this._headers = [];
                    this._charts = [];
                    this._profiles = [];
                    this._activeProfile = null;
                    this.themeType = themeType;
                    this._tooltip = this._createTooltip();
                }
                Controller.prototype.createProfile = function (buffers, activate) {
                    if (activate === void 0) { activate = true; }
                    var profile = new Profiler.Profile(buffers);
                    profile.createSnapshots();
                    this._profiles.push(profile);
                    if (activate) {
                        this.activateProfile(profile);
                    }
                    return profile;
                };
                Controller.prototype.activateProfile = function (profile) {
                    this.deactivateProfile();
                    this._activeProfile = profile;
                    this._createViews();
                    this._initializeViews();
                };
                Controller.prototype.activateProfileAt = function (index) {
                    this.activateProfile(this.getProfileAt(index));
                };
                Controller.prototype.deactivateProfile = function () {
                    if (this._activeProfile) {
                        this._destroyViews();
                        this._activeProfile = null;
                    }
                };
                Controller.prototype.resize = function () {
                    this._onResize();
                };
                Controller.prototype.getProfileAt = function (index) {
                    return this._profiles[index];
                };
                Object.defineProperty(Controller.prototype, "activeProfile", {
                    get: function () {
                        return this._activeProfile;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "profileCount", {
                    get: function () {
                        return this._profiles.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "container", {
                    get: function () {
                        return this._container;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "themeType", {
                    get: function () {
                        return this._themeType;
                    },
                    set: function (value) {
                        switch (value) {
                            case 0 /* DARK */:
                                this._theme = new Tools.Theme.UIThemeDark();
                                break;
                            case 1 /* LIGHT */:
                                this._theme = new Tools.Theme.UIThemeLight();
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "theme", {
                    get: function () {
                        return this._theme;
                    },
                    enumerable: true,
                    configurable: true
                });
                Controller.prototype.getSnapshotAt = function (index) {
                    return this._activeProfile.getSnapshotAt(index);
                };
                Controller.prototype._createViews = function () {
                    if (this._activeProfile) {
                        var self = this;
                        this._overviewHeader = new Profiler.FlameChartHeader(this, 0 /* OVERVIEW */);
                        this._overview = new Profiler.FlameChartOverview(this, 0 /* OVERLAY */);
                        this._activeProfile.forEachSnapshot(function (snapshot, index) {
                            self._headers.push(new Profiler.FlameChartHeader(self, 1 /* CHART */));
                            self._charts.push(new Profiler.FlameChart(self, snapshot));
                        });
                        window.addEventListener("resize", this._onResize.bind(this));
                    }
                };
                Controller.prototype._destroyViews = function () {
                    if (this._activeProfile) {
                        this._overviewHeader.destroy();
                        this._overview.destroy();
                        while (this._headers.length) {
                            this._headers.pop().destroy();
                        }
                        while (this._charts.length) {
                            this._charts.pop().destroy();
                        }
                        window.removeEventListener("resize", this._onResize.bind(this));
                    }
                };
                Controller.prototype._initializeViews = function () {
                    if (this._activeProfile) {
                        var self = this;
                        var startTime = this._activeProfile.startTime;
                        var endTime = this._activeProfile.endTime;
                        this._overviewHeader.initialize(startTime, endTime);
                        this._overview.initialize(startTime, endTime);
                        this._activeProfile.forEachSnapshot(function (snapshot, index) {
                            self._headers[index].initialize(startTime, endTime);
                            self._charts[index].initialize(startTime, endTime);
                        });
                    }
                };
                Controller.prototype._onResize = function () {
                    if (this._activeProfile) {
                        var self = this;
                        var width = this._container.offsetWidth;
                        this._overviewHeader.setSize(width);
                        this._overview.setSize(width);
                        this._activeProfile.forEachSnapshot(function (snapshot, index) {
                            self._headers[index].setSize(width);
                            self._charts[index].setSize(width);
                        });
                    }
                };
                Controller.prototype._updateViews = function () {
                    if (this._activeProfile) {
                        var self = this;
                        var start = this._activeProfile.windowStart;
                        var end = this._activeProfile.windowEnd;
                        this._overviewHeader.setWindow(start, end);
                        this._overview.setWindow(start, end);
                        this._activeProfile.forEachSnapshot(function (snapshot, index) {
                            self._headers[index].setWindow(start, end);
                            self._charts[index].setWindow(start, end);
                        });
                    }
                };
                Controller.prototype._drawViews = function () {
                };
                Controller.prototype._createTooltip = function () {
                    var el = document.createElement("div");
                    el.classList.add("profiler-tooltip");
                    el.style.display = "none";
                    this._container.insertBefore(el, this._container.firstChild);
                    return el;
                };
                Controller.prototype.setWindow = function (start, end) {
                    this._activeProfile.setWindow(start, end);
                    this._updateViews();
                };
                Controller.prototype.moveWindowTo = function (time) {
                    this._activeProfile.moveWindowTo(time);
                    this._updateViews();
                };
                Controller.prototype.showTooltip = function (chart, frame, x, y) {
                    this.removeTooltipContent();
                    this._tooltip.appendChild(this.createTooltipContent(chart, frame));
                    this._tooltip.style.display = "block";
                    var elContent = this._tooltip.firstChild;
                    var tooltipWidth = elContent.clientWidth;
                    var tooltipHeight = elContent.clientHeight;
                    var totalWidth = chart.canvas.clientWidth;
                    x += (x + tooltipWidth >= totalWidth - 50) ? -(tooltipWidth + 20) : 25;
                    y += chart.canvas.offsetTop - tooltipHeight / 2;
                    this._tooltip.style.left = x + "px";
                    this._tooltip.style.top = y + "px";
                };
                Controller.prototype.hideTooltip = function () {
                    this._tooltip.style.display = "none";
                };
                Controller.prototype.createTooltipContent = function (chart, frame) {
                    var totalTime = Math.round(frame.totalTime * 100000) / 100000;
                    var selfTime = Math.round(frame.selfTime * 100000) / 100000;
                    var selfPercent = Math.round(frame.selfTime * 100 * 100 / frame.totalTime) / 100;
                    var elContent = document.createElement("div");
                    var elName = document.createElement("h1");
                    elName.textContent = frame.kind.name;
                    elContent.appendChild(elName);
                    var elTotalTime = document.createElement("p");
                    elTotalTime.textContent = "Total: " + totalTime + " ms";
                    elContent.appendChild(elTotalTime);
                    var elSelfTime = document.createElement("p");
                    elSelfTime.textContent = "Self: " + selfTime + " ms (" + selfPercent + "%)";
                    elContent.appendChild(elSelfTime);
                    var statistics = chart.getStatistics(frame.kind);
                    if (statistics) {
                        var elAllCount = document.createElement("p");
                        elAllCount.textContent = "Count: " + statistics.count;
                        elContent.appendChild(elAllCount);
                        var allTotalTime = Math.round(statistics.totalTime * 100000) / 100000;
                        var elAllTotalTime = document.createElement("p");
                        elAllTotalTime.textContent = "All Total: " + allTotalTime + " ms";
                        elContent.appendChild(elAllTotalTime);
                        var allSelfTime = Math.round(statistics.selfTime * 100000) / 100000;
                        var elAllSelfTime = document.createElement("p");
                        elAllSelfTime.textContent = "All Self: " + allSelfTime + " ms";
                        elContent.appendChild(elAllSelfTime);
                    }
                    this.appendDataElements(elContent, frame.startData);
                    this.appendDataElements(elContent, frame.endData);
                    return elContent;
                };
                Controller.prototype.appendDataElements = function (el, data) {
                    if (!Shumway.isNullOrUndefined(data)) {
                        el.appendChild(document.createElement("hr"));
                        var elData;
                        if (Shumway.isObject(data)) {
                            for (var key in data) {
                                elData = document.createElement("p");
                                elData.textContent = key + ": " + data[key];
                                el.appendChild(elData);
                            }
                        }
                        else {
                            elData = document.createElement("p");
                            elData.textContent = data.toString();
                            el.appendChild(elData);
                        }
                    }
                };
                Controller.prototype.removeTooltipContent = function () {
                    var el = this._tooltip;
                    while (el.firstChild) {
                        el.removeChild(el.firstChild);
                    }
                };
                return Controller;
            })();
            Profiler.Controller = Controller;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var clamp = Shumway.NumberUtilities.clamp;
            var MouseCursor = (function () {
                function MouseCursor(value) {
                    this.value = value;
                }
                MouseCursor.prototype.toString = function () {
                    return this.value;
                };
                MouseCursor.AUTO = new MouseCursor("auto");
                MouseCursor.DEFAULT = new MouseCursor("default");
                MouseCursor.NONE = new MouseCursor("none");
                MouseCursor.HELP = new MouseCursor("help");
                MouseCursor.POINTER = new MouseCursor("pointer");
                MouseCursor.PROGRESS = new MouseCursor("progress");
                MouseCursor.WAIT = new MouseCursor("wait");
                MouseCursor.CELL = new MouseCursor("cell");
                MouseCursor.CROSSHAIR = new MouseCursor("crosshair");
                MouseCursor.TEXT = new MouseCursor("text");
                MouseCursor.ALIAS = new MouseCursor("alias");
                MouseCursor.COPY = new MouseCursor("copy");
                MouseCursor.MOVE = new MouseCursor("move");
                MouseCursor.NO_DROP = new MouseCursor("no-drop");
                MouseCursor.NOT_ALLOWED = new MouseCursor("not-allowed");
                MouseCursor.ALL_SCROLL = new MouseCursor("all-scroll");
                MouseCursor.COL_RESIZE = new MouseCursor("col-resize");
                MouseCursor.ROW_RESIZE = new MouseCursor("row-resize");
                MouseCursor.N_RESIZE = new MouseCursor("n-resize");
                MouseCursor.E_RESIZE = new MouseCursor("e-resize");
                MouseCursor.S_RESIZE = new MouseCursor("s-resize");
                MouseCursor.W_RESIZE = new MouseCursor("w-resize");
                MouseCursor.NE_RESIZE = new MouseCursor("ne-resize");
                MouseCursor.NW_RESIZE = new MouseCursor("nw-resize");
                MouseCursor.SE_RESIZE = new MouseCursor("se-resize");
                MouseCursor.SW_RESIZE = new MouseCursor("sw-resize");
                MouseCursor.EW_RESIZE = new MouseCursor("ew-resize");
                MouseCursor.NS_RESIZE = new MouseCursor("ns-resize");
                MouseCursor.NESW_RESIZE = new MouseCursor("nesw-resize");
                MouseCursor.NWSE_RESIZE = new MouseCursor("nwse-resize");
                MouseCursor.ZOOM_IN = new MouseCursor("zoom-in");
                MouseCursor.ZOOM_OUT = new MouseCursor("zoom-out");
                MouseCursor.GRAB = new MouseCursor("grab");
                MouseCursor.GRABBING = new MouseCursor("grabbing");
                return MouseCursor;
            })();
            Profiler.MouseCursor = MouseCursor;
            var MouseController = (function () {
                function MouseController(target, eventTarget) {
                    this._target = target;
                    this._eventTarget = eventTarget;
                    this._wheelDisabled = false;
                    this._boundOnMouseDown = this._onMouseDown.bind(this);
                    this._boundOnMouseUp = this._onMouseUp.bind(this);
                    this._boundOnMouseOver = this._onMouseOver.bind(this);
                    this._boundOnMouseOut = this._onMouseOut.bind(this);
                    this._boundOnMouseMove = this._onMouseMove.bind(this);
                    this._boundOnMouseWheel = this._onMouseWheel.bind(this);
                    this._boundOnDrag = this._onDrag.bind(this);
                    eventTarget.addEventListener("mousedown", this._boundOnMouseDown, false);
                    eventTarget.addEventListener("mouseover", this._boundOnMouseOver, false);
                    eventTarget.addEventListener("mouseout", this._boundOnMouseOut, false);
                    eventTarget.addEventListener(("onwheel" in document ? "wheel" : "mousewheel"), this._boundOnMouseWheel, false);
                }
                MouseController.prototype.destroy = function () {
                    var eventTarget = this._eventTarget;
                    eventTarget.removeEventListener("mousedown", this._boundOnMouseDown);
                    eventTarget.removeEventListener("mouseover", this._boundOnMouseOver);
                    eventTarget.removeEventListener("mouseout", this._boundOnMouseOut);
                    eventTarget.removeEventListener(("onwheel" in document ? "wheel" : "mousewheel"), this._boundOnMouseWheel);
                    window.removeEventListener("mousemove", this._boundOnDrag);
                    window.removeEventListener("mouseup", this._boundOnMouseUp);
                    this._killHoverCheck();
                    this._eventTarget = null;
                    this._target = null;
                };
                MouseController.prototype.updateCursor = function (cursor) {
                    if (!MouseController._cursorOwner || MouseController._cursorOwner === this._target) {
                        var el = this._eventTarget.parentElement;
                        if (MouseController._cursor !== cursor) {
                            MouseController._cursor = cursor;
                            var self = this;
                            ["", "-moz-", "-webkit-"].forEach(function (prefix) {
                                el.style.cursor = prefix + cursor;
                            });
                        }
                        if (MouseController._cursor === MouseCursor.DEFAULT) {
                            MouseController._cursorOwner = null;
                        }
                        else {
                            MouseController._cursorOwner = this._target;
                        }
                    }
                };
                MouseController.prototype._onMouseDown = function (event) {
                    this._killHoverCheck();
                    if (event.button === 0) {
                        var pos = this._getTargetMousePos(event, (event.target));
                        this._dragInfo = {
                            start: pos,
                            current: pos,
                            delta: { x: 0, y: 0 },
                            hasMoved: false,
                            originalTarget: event.target
                        };
                        window.addEventListener("mousemove", this._boundOnDrag, false);
                        window.addEventListener("mouseup", this._boundOnMouseUp, false);
                        this._target.onMouseDown(pos.x, pos.y);
                    }
                };
                MouseController.prototype._onDrag = function (event) {
                    var dragInfo = this._dragInfo;
                    var current = this._getTargetMousePos(event, dragInfo.originalTarget);
                    var delta = {
                        x: current.x - dragInfo.start.x,
                        y: current.y - dragInfo.start.y
                    };
                    dragInfo.current = current;
                    dragInfo.delta = delta;
                    dragInfo.hasMoved = true;
                    this._target.onDrag(dragInfo.start.x, dragInfo.start.y, current.x, current.y, delta.x, delta.y);
                };
                MouseController.prototype._onMouseUp = function (event) {
                    window.removeEventListener("mousemove", this._boundOnDrag);
                    window.removeEventListener("mouseup", this._boundOnMouseUp);
                    var self = this;
                    var dragInfo = this._dragInfo;
                    if (dragInfo.hasMoved) {
                        this._target.onDragEnd(dragInfo.start.x, dragInfo.start.y, dragInfo.current.x, dragInfo.current.y, dragInfo.delta.x, dragInfo.delta.y);
                    }
                    else {
                        this._target.onClick(dragInfo.current.x, dragInfo.current.y);
                    }
                    this._dragInfo = null;
                    this._wheelDisabled = true;
                    setTimeout(function () {
                        self._wheelDisabled = false;
                    }, 500);
                };
                MouseController.prototype._onMouseOver = function (event) {
                    event.target.addEventListener("mousemove", this._boundOnMouseMove, false);
                    if (!this._dragInfo) {
                        var pos = this._getTargetMousePos(event, (event.target));
                        this._target.onMouseOver(pos.x, pos.y);
                        this._startHoverCheck(event);
                    }
                };
                MouseController.prototype._onMouseOut = function (event) {
                    event.target.removeEventListener("mousemove", this._boundOnMouseMove, false);
                    if (!this._dragInfo) {
                        this._target.onMouseOut();
                    }
                    this._killHoverCheck();
                };
                MouseController.prototype._onMouseMove = function (event) {
                    if (!this._dragInfo) {
                        var pos = this._getTargetMousePos(event, (event.target));
                        this._target.onMouseMove(pos.x, pos.y);
                        this._killHoverCheck();
                        this._startHoverCheck(event);
                    }
                };
                MouseController.prototype._onMouseWheel = function (event) {
                    if (!event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
                        event.preventDefault();
                        if (!this._dragInfo && !this._wheelDisabled) {
                            var pos = this._getTargetMousePos(event, (event.target));
                            var delta = clamp((typeof event.deltaY !== "undefined") ? event.deltaY / 16 : -event.wheelDelta / 40, -1, 1);
                            var zoom = Math.pow(1.2, delta) - 1;
                            this._target.onMouseWheel(pos.x, pos.y, zoom);
                        }
                    }
                };
                MouseController.prototype._startHoverCheck = function (event) {
                    this._hoverInfo = {
                        isHovering: false,
                        timeoutHandle: setTimeout(this._onMouseMoveIdleHandler.bind(this), MouseController.HOVER_TIMEOUT),
                        pos: this._getTargetMousePos(event, (event.target))
                    };
                };
                MouseController.prototype._killHoverCheck = function () {
                    if (this._hoverInfo) {
                        clearTimeout(this._hoverInfo.timeoutHandle);
                        if (this._hoverInfo.isHovering) {
                            this._target.onHoverEnd();
                        }
                        this._hoverInfo = null;
                    }
                };
                MouseController.prototype._onMouseMoveIdleHandler = function () {
                    var hoverInfo = this._hoverInfo;
                    hoverInfo.isHovering = true;
                    this._target.onHoverStart(hoverInfo.pos.x, hoverInfo.pos.y);
                };
                MouseController.prototype._getTargetMousePos = function (event, target) {
                    var rect = target.getBoundingClientRect();
                    return {
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top
                    };
                };
                MouseController.HOVER_TIMEOUT = 500;
                MouseController._cursor = MouseCursor.DEFAULT;
                return MouseController;
            })();
            Profiler.MouseController = MouseController;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            (function (FlameChartDragTarget) {
                FlameChartDragTarget[FlameChartDragTarget["NONE"] = 0] = "NONE";
                FlameChartDragTarget[FlameChartDragTarget["WINDOW"] = 1] = "WINDOW";
                FlameChartDragTarget[FlameChartDragTarget["HANDLE_LEFT"] = 2] = "HANDLE_LEFT";
                FlameChartDragTarget[FlameChartDragTarget["HANDLE_RIGHT"] = 3] = "HANDLE_RIGHT";
                FlameChartDragTarget[FlameChartDragTarget["HANDLE_BOTH"] = 4] = "HANDLE_BOTH";
            })(Profiler.FlameChartDragTarget || (Profiler.FlameChartDragTarget = {}));
            var FlameChartDragTarget = Profiler.FlameChartDragTarget;
            var FlameChartBase = (function () {
                function FlameChartBase(controller) {
                    this._controller = controller;
                    this._initialized = false;
                    this._canvas = document.createElement("canvas");
                    this._context = this._canvas.getContext("2d");
                    this._mouseController = new Profiler.MouseController(this, this._canvas);
                    var container = controller.container;
                    container.appendChild(this._canvas);
                    var rect = container.getBoundingClientRect();
                    this.setSize(rect.width);
                }
                Object.defineProperty(FlameChartBase.prototype, "canvas", {
                    get: function () {
                        return this._canvas;
                    },
                    enumerable: true,
                    configurable: true
                });
                FlameChartBase.prototype.setSize = function (width, height) {
                    if (height === void 0) { height = 20; }
                    this._width = width;
                    this._height = height;
                    this._resetCanvas();
                    this.draw();
                };
                FlameChartBase.prototype.initialize = function (rangeStart, rangeEnd) {
                    this._initialized = true;
                    this.setRange(rangeStart, rangeEnd, false);
                    this.setWindow(rangeStart, rangeEnd, false);
                    this.draw();
                };
                FlameChartBase.prototype.setWindow = function (start, end, draw) {
                    if (draw === void 0) { draw = true; }
                    this._windowStart = start;
                    this._windowEnd = end;
                    !draw || this.draw();
                };
                FlameChartBase.prototype.setRange = function (start, end, draw) {
                    if (draw === void 0) { draw = true; }
                    this._rangeStart = start;
                    this._rangeEnd = end;
                    !draw || this.draw();
                };
                FlameChartBase.prototype.destroy = function () {
                    this._mouseController.destroy();
                    this._mouseController = null;
                    this._controller.container.removeChild(this._canvas);
                    this._controller = null;
                };
                FlameChartBase.prototype._resetCanvas = function () {
                    var ratio = window.devicePixelRatio;
                    var canvas = this._canvas;
                    canvas.width = this._width * ratio;
                    canvas.height = this._height * ratio;
                    canvas.style.width = this._width + "px";
                    canvas.style.height = this._height + "px";
                };
                FlameChartBase.prototype.draw = function () {
                };
                FlameChartBase.prototype._almostEq = function (a, b, precision) {
                    if (precision === void 0) { precision = 10; }
                    var pow10 = Math.pow(10, precision);
                    return Math.abs(a - b) < (1 / pow10);
                };
                FlameChartBase.prototype._windowEqRange = function () {
                    return (this._almostEq(this._windowStart, this._rangeStart) && this._almostEq(this._windowEnd, this._rangeEnd));
                };
                FlameChartBase.prototype._decimalPlaces = function (value) {
                    return ((+value).toFixed(10)).replace(/^-?\d*\.?|0+$/g, '').length;
                };
                FlameChartBase.prototype._toPixelsRelative = function (time) {
                    return 0;
                };
                FlameChartBase.prototype._toPixels = function (time) {
                    return 0;
                };
                FlameChartBase.prototype._toTimeRelative = function (px) {
                    return 0;
                };
                FlameChartBase.prototype._toTime = function (px) {
                    return 0;
                };
                FlameChartBase.prototype.onMouseWheel = function (x, y, delta) {
                    var time = this._toTime(x);
                    var windowStart = this._windowStart;
                    var windowEnd = this._windowEnd;
                    var windowLen = windowEnd - windowStart;
                    var maxDelta = Math.max((FlameChartBase.MIN_WINDOW_LEN - windowLen) / windowLen, delta);
                    var start = windowStart + (windowStart - time) * maxDelta;
                    var end = windowEnd + (windowEnd - time) * maxDelta;
                    this._controller.setWindow(start, end);
                    this.onHoverEnd();
                };
                FlameChartBase.prototype.onMouseDown = function (x, y) {
                };
                FlameChartBase.prototype.onMouseMove = function (x, y) {
                };
                FlameChartBase.prototype.onMouseOver = function (x, y) {
                };
                FlameChartBase.prototype.onMouseOut = function () {
                };
                FlameChartBase.prototype.onDrag = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                };
                FlameChartBase.prototype.onDragEnd = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                };
                FlameChartBase.prototype.onClick = function (x, y) {
                };
                FlameChartBase.prototype.onHoverStart = function (x, y) {
                };
                FlameChartBase.prototype.onHoverEnd = function () {
                };
                FlameChartBase.DRAGHANDLE_WIDTH = 4;
                FlameChartBase.MIN_WINDOW_LEN = 0.1;
                return FlameChartBase;
            })();
            Profiler.FlameChartBase = FlameChartBase;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var trimMiddle = Shumway.StringUtilities.trimMiddle;
            var FlameChart = (function (_super) {
                __extends(FlameChart, _super);
                function FlameChart(controller, snapshot) {
                    _super.call(this, controller);
                    this._textWidth = {};
                    this._minFrameWidthInPixels = 1;
                    this._snapshot = snapshot;
                    this._kindStyle = Object.create(null);
                }
                FlameChart.prototype.setSize = function (width, height) {
                    _super.prototype.setSize.call(this, width, height || this._initialized ? this._maxDepth * 12.5 : 100);
                };
                FlameChart.prototype.initialize = function (rangeStart, rangeEnd) {
                    this._initialized = true;
                    this._maxDepth = this._snapshot.maxDepth;
                    this.setRange(rangeStart, rangeEnd, false);
                    this.setWindow(rangeStart, rangeEnd, false);
                    this.setSize(this._width, this._maxDepth * 12.5);
                };
                FlameChart.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);
                    this._snapshot = null;
                };
                FlameChart.prototype.draw = function () {
                    var context = this._context;
                    var ratio = window.devicePixelRatio;
                    Shumway.ColorStyle.reset();
                    context.save();
                    context.scale(ratio, ratio);
                    context.fillStyle = this._controller.theme.bodyBackground(1);
                    context.fillRect(0, 0, this._width, this._height);
                    if (this._initialized) {
                        this._drawChildren(this._snapshot);
                    }
                    context.restore();
                };
                FlameChart.prototype._drawChildren = function (parent, depth) {
                    if (depth === void 0) { depth = 0; }
                    var range = parent.getChildRange(this._windowStart, this._windowEnd);
                    if (range) {
                        for (var i = range.startIndex; i <= range.endIndex; i++) {
                            var child = parent.children[i];
                            if (this._drawFrame(child, depth)) {
                                this._drawChildren(child, depth + 1);
                            }
                        }
                    }
                };
                FlameChart.prototype._drawFrame = function (frame, depth) {
                    var context = this._context;
                    var frameHPadding = 0.5;
                    var left = this._toPixels(frame.startTime);
                    var right = this._toPixels(frame.endTime);
                    var width = right - left;
                    if (width <= this._minFrameWidthInPixels) {
                        context.fillStyle = this._controller.theme.tabToolbar(1);
                        context.fillRect(left, depth * (12 + frameHPadding), this._minFrameWidthInPixels, 12 + (frame.maxDepth - frame.depth) * 12.5);
                        return false;
                    }
                    if (left < 0) {
                        right = width + left;
                        left = 0;
                    }
                    var adjustedWidth = right - left;
                    var style = this._kindStyle[frame.kind.id];
                    if (!style) {
                        var background = Shumway.ColorStyle.randomStyle();
                        style = this._kindStyle[frame.kind.id] = {
                            bgColor: background,
                            textColor: Shumway.ColorStyle.contrastStyle(background)
                        };
                    }
                    context.save();
                    context.fillStyle = style.bgColor;
                    context.fillRect(left, depth * (12 + frameHPadding), adjustedWidth, 12);
                    if (width > 12) {
                        var label = frame.kind.name;
                        if (label && label.length) {
                            var labelHPadding = 2;
                            label = this._prepareText(context, label, adjustedWidth - labelHPadding * 2);
                            if (label.length) {
                                context.fillStyle = style.textColor;
                                context.textBaseline = "bottom";
                                context.fillText(label, left + labelHPadding, (depth + 1) * (12 + frameHPadding) - 1);
                            }
                        }
                    }
                    context.restore();
                    return true;
                };
                FlameChart.prototype._prepareText = function (context, title, maxSize) {
                    var titleWidth = this._measureWidth(context, title);
                    if (maxSize > titleWidth) {
                        return title;
                    }
                    var l = 3;
                    var r = title.length;
                    while (l < r) {
                        var m = (l + r) >> 1;
                        if (this._measureWidth(context, trimMiddle(title, m)) < maxSize) {
                            l = m + 1;
                        }
                        else {
                            r = m;
                        }
                    }
                    title = trimMiddle(title, r - 1);
                    titleWidth = this._measureWidth(context, title);
                    if (titleWidth <= maxSize) {
                        return title;
                    }
                    return "";
                };
                FlameChart.prototype._measureWidth = function (context, text) {
                    var width = this._textWidth[text];
                    if (!width) {
                        width = context.measureText(text).width;
                        this._textWidth[text] = width;
                    }
                    return width;
                };
                FlameChart.prototype._toPixelsRelative = function (time) {
                    return time * this._width / (this._windowEnd - this._windowStart);
                };
                FlameChart.prototype._toPixels = function (time) {
                    return this._toPixelsRelative(time - this._windowStart);
                };
                FlameChart.prototype._toTimeRelative = function (px) {
                    return px * (this._windowEnd - this._windowStart) / this._width;
                };
                FlameChart.prototype._toTime = function (px) {
                    return this._toTimeRelative(px) + this._windowStart;
                };
                FlameChart.prototype._getFrameAtPosition = function (x, y) {
                    var time = this._toTime(x);
                    var depth = 1 + (y / 12.5) | 0;
                    var frame = this._snapshot.query(time);
                    if (frame && frame.depth >= depth) {
                        while (frame && frame.depth > depth) {
                            frame = frame.parent;
                        }
                        return frame;
                    }
                    return null;
                };
                FlameChart.prototype.onMouseDown = function (x, y) {
                    if (!this._windowEqRange()) {
                        this._mouseController.updateCursor(Profiler.MouseCursor.ALL_SCROLL);
                        this._dragInfo = {
                            windowStartInitial: this._windowStart,
                            windowEndInitial: this._windowEnd,
                            target: 1 /* WINDOW */
                        };
                    }
                };
                FlameChart.prototype.onMouseMove = function (x, y) {
                };
                FlameChart.prototype.onMouseOver = function (x, y) {
                };
                FlameChart.prototype.onMouseOut = function () {
                };
                FlameChart.prototype.onDrag = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    var dragInfo = this._dragInfo;
                    if (dragInfo) {
                        var delta = this._toTimeRelative(-deltaX);
                        var windowStart = dragInfo.windowStartInitial + delta;
                        var windowEnd = dragInfo.windowEndInitial + delta;
                        this._controller.setWindow(windowStart, windowEnd);
                    }
                };
                FlameChart.prototype.onDragEnd = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    this._dragInfo = null;
                    this._mouseController.updateCursor(Profiler.MouseCursor.DEFAULT);
                };
                FlameChart.prototype.onClick = function (x, y) {
                    this._dragInfo = null;
                    this._mouseController.updateCursor(Profiler.MouseCursor.DEFAULT);
                };
                FlameChart.prototype.onHoverStart = function (x, y) {
                    var frame = this._getFrameAtPosition(x, y);
                    if (frame) {
                        this._hoveredFrame = frame;
                        this._controller.showTooltip(this, frame, x, y);
                    }
                };
                FlameChart.prototype.onHoverEnd = function () {
                    if (this._hoveredFrame) {
                        this._hoveredFrame = null;
                        this._controller.hideTooltip();
                    }
                };
                FlameChart.prototype.getStatistics = function (kind) {
                    var snapshot = this._snapshot;
                    if (!snapshot.statistics) {
                        snapshot.calculateStatistics();
                    }
                    return snapshot.statistics[kind.id];
                };
                return FlameChart;
            })(Profiler.FlameChartBase);
            Profiler.FlameChart = FlameChart;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var clamp = Shumway.NumberUtilities.clamp;
            (function (FlameChartOverviewMode) {
                FlameChartOverviewMode[FlameChartOverviewMode["OVERLAY"] = 0] = "OVERLAY";
                FlameChartOverviewMode[FlameChartOverviewMode["STACK"] = 1] = "STACK";
                FlameChartOverviewMode[FlameChartOverviewMode["UNION"] = 2] = "UNION";
            })(Profiler.FlameChartOverviewMode || (Profiler.FlameChartOverviewMode = {}));
            var FlameChartOverviewMode = Profiler.FlameChartOverviewMode;
            var FlameChartOverview = (function (_super) {
                __extends(FlameChartOverview, _super);
                function FlameChartOverview(controller, mode) {
                    if (mode === void 0) { mode = 1 /* STACK */; }
                    this._mode = mode;
                    this._overviewCanvasDirty = true;
                    this._overviewCanvas = document.createElement("canvas");
                    this._overviewContext = this._overviewCanvas.getContext("2d");
                    _super.call(this, controller);
                }
                FlameChartOverview.prototype.setSize = function (width, height) {
                    _super.prototype.setSize.call(this, width, height || 64);
                };
                Object.defineProperty(FlameChartOverview.prototype, "mode", {
                    set: function (value) {
                        this._mode = value;
                        this.draw();
                    },
                    enumerable: true,
                    configurable: true
                });
                FlameChartOverview.prototype._resetCanvas = function () {
                    _super.prototype._resetCanvas.call(this);
                    this._overviewCanvas.width = this._canvas.width;
                    this._overviewCanvas.height = this._canvas.height;
                    this._overviewCanvasDirty = true;
                };
                FlameChartOverview.prototype.draw = function () {
                    var context = this._context;
                    var ratio = window.devicePixelRatio;
                    var width = this._width;
                    var height = this._height;
                    context.save();
                    context.scale(ratio, ratio);
                    context.fillStyle = this._controller.theme.bodyBackground(1);
                    context.fillRect(0, 0, width, height);
                    context.restore();
                    if (this._initialized) {
                        if (this._overviewCanvasDirty) {
                            this._drawChart();
                            this._overviewCanvasDirty = false;
                        }
                        context.drawImage(this._overviewCanvas, 0, 0);
                        this._drawSelection();
                    }
                };
                FlameChartOverview.prototype._drawSelection = function () {
                    var context = this._context;
                    var height = this._height;
                    var ratio = window.devicePixelRatio;
                    var left = this._selection ? this._selection.left : this._toPixels(this._windowStart);
                    var right = this._selection ? this._selection.right : this._toPixels(this._windowEnd);
                    var theme = this._controller.theme;
                    context.save();
                    context.scale(ratio, ratio);
                    if (this._selection) {
                        context.fillStyle = theme.selectionText(0.15);
                        context.fillRect(left, 1, right - left, height - 1);
                        context.fillStyle = "rgba(133, 0, 0, 1)";
                        context.fillRect(left + 0.5, 0, right - left - 1, 4);
                        context.fillRect(left + 0.5, height - 4, right - left - 1, 4);
                    }
                    else {
                        context.fillStyle = theme.bodyBackground(0.4);
                        context.fillRect(0, 1, left, height - 1);
                        context.fillRect(right, 1, this._width, height - 1);
                    }
                    context.beginPath();
                    context.moveTo(left, 0);
                    context.lineTo(left, height);
                    context.moveTo(right, 0);
                    context.lineTo(right, height);
                    context.lineWidth = 0.5;
                    context.strokeStyle = theme.foregroundTextGrey(1);
                    context.stroke();
                    var start = this._selection ? this._toTime(this._selection.left) : this._windowStart;
                    var end = this._selection ? this._toTime(this._selection.right) : this._windowEnd;
                    var time = Math.abs(end - start);
                    context.fillStyle = theme.selectionText(0.5);
                    context.font = '8px sans-serif';
                    context.textBaseline = "alphabetic";
                    context.textAlign = "end";
                    context.fillText(time.toFixed(2), Math.min(left, right) - 4, 10);
                    context.fillText((time / 60).toFixed(2), Math.min(left, right) - 4, 20);
                    context.restore();
                };
                FlameChartOverview.prototype._drawChart = function () {
                    var ratio = window.devicePixelRatio;
                    var width = this._width;
                    var height = this._height;
                    var profile = this._controller.activeProfile;
                    var samplesPerPixel = 4;
                    var samplesCount = width * samplesPerPixel;
                    var sampleTimeInterval = profile.totalTime / samplesCount;
                    var contextOverview = this._overviewContext;
                    var overviewChartColor = this._controller.theme.blueHighlight(1);
                    contextOverview.save();
                    contextOverview.translate(0, ratio * height);
                    var yScale = -ratio * height / (profile.maxDepth - 1);
                    contextOverview.scale(ratio / samplesPerPixel, yScale);
                    contextOverview.clearRect(0, 0, samplesCount, profile.maxDepth - 1);
                    if (this._mode == 1 /* STACK */) {
                        contextOverview.scale(1, 1 / profile.snapshotCount);
                    }
                    for (var i = 0, n = profile.snapshotCount; i < n; i++) {
                        var snapshot = profile.getSnapshotAt(i);
                        if (snapshot) {
                            var deepestFrame = null;
                            var depth = 0;
                            contextOverview.beginPath();
                            contextOverview.moveTo(0, 0);
                            for (var x = 0; x < samplesCount; x++) {
                                var time = profile.startTime + x * sampleTimeInterval;
                                if (!deepestFrame) {
                                    deepestFrame = snapshot.query(time);
                                }
                                else {
                                    deepestFrame = deepestFrame.queryNext(time);
                                }
                                depth = deepestFrame ? deepestFrame.getDepth() - 1 : 0;
                                contextOverview.lineTo(x, depth);
                            }
                            contextOverview.lineTo(x, 0);
                            contextOverview.fillStyle = overviewChartColor;
                            contextOverview.fill();
                            if (this._mode == 1 /* STACK */) {
                                contextOverview.translate(0, -height * ratio / yScale);
                            }
                        }
                    }
                    contextOverview.restore();
                };
                FlameChartOverview.prototype._toPixelsRelative = function (time) {
                    return time * this._width / (this._rangeEnd - this._rangeStart);
                };
                FlameChartOverview.prototype._toPixels = function (time) {
                    return this._toPixelsRelative(time - this._rangeStart);
                };
                FlameChartOverview.prototype._toTimeRelative = function (px) {
                    return px * (this._rangeEnd - this._rangeStart) / this._width;
                };
                FlameChartOverview.prototype._toTime = function (px) {
                    return this._toTimeRelative(px) + this._rangeStart;
                };
                FlameChartOverview.prototype._getDragTargetUnderCursor = function (x, y) {
                    if (y >= 0 && y < this._height) {
                        var left = this._toPixels(this._windowStart);
                        var right = this._toPixels(this._windowEnd);
                        var radius = 2 + (Profiler.FlameChartBase.DRAGHANDLE_WIDTH) / 2;
                        var leftHandle = (x >= left - radius && x <= left + radius);
                        var rightHandle = (x >= right - radius && x <= right + radius);
                        if (leftHandle && rightHandle) {
                            return 4 /* HANDLE_BOTH */;
                        }
                        else if (leftHandle) {
                            return 2 /* HANDLE_LEFT */;
                        }
                        else if (rightHandle) {
                            return 3 /* HANDLE_RIGHT */;
                        }
                        else if (!this._windowEqRange() && x > left + radius && x < right - radius) {
                            return 1 /* WINDOW */;
                        }
                    }
                    return 0 /* NONE */;
                };
                FlameChartOverview.prototype.onMouseDown = function (x, y) {
                    var dragTarget = this._getDragTargetUnderCursor(x, y);
                    if (dragTarget === 0 /* NONE */) {
                        this._selection = { left: x, right: x };
                        this.draw();
                    }
                    else {
                        if (dragTarget === 1 /* WINDOW */) {
                            this._mouseController.updateCursor(Profiler.MouseCursor.GRABBING);
                        }
                        this._dragInfo = {
                            windowStartInitial: this._windowStart,
                            windowEndInitial: this._windowEnd,
                            target: dragTarget
                        };
                    }
                };
                FlameChartOverview.prototype.onMouseMove = function (x, y) {
                    var cursor = Profiler.MouseCursor.DEFAULT;
                    var dragTarget = this._getDragTargetUnderCursor(x, y);
                    if (dragTarget !== 0 /* NONE */ && !this._selection) {
                        cursor = (dragTarget === 1 /* WINDOW */) ? Profiler.MouseCursor.GRAB : Profiler.MouseCursor.EW_RESIZE;
                    }
                    this._mouseController.updateCursor(cursor);
                };
                FlameChartOverview.prototype.onMouseOver = function (x, y) {
                    this.onMouseMove(x, y);
                };
                FlameChartOverview.prototype.onMouseOut = function () {
                    this._mouseController.updateCursor(Profiler.MouseCursor.DEFAULT);
                };
                FlameChartOverview.prototype.onDrag = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    if (this._selection) {
                        this._selection = { left: startX, right: clamp(currentX, 0, this._width - 1) };
                        this.draw();
                    }
                    else {
                        var dragInfo = this._dragInfo;
                        if (dragInfo.target === 4 /* HANDLE_BOTH */) {
                            if (deltaX !== 0) {
                                dragInfo.target = (deltaX < 0) ? 2 /* HANDLE_LEFT */ : 3 /* HANDLE_RIGHT */;
                            }
                            else {
                                return;
                            }
                        }
                        var windowStart = this._windowStart;
                        var windowEnd = this._windowEnd;
                        var delta = this._toTimeRelative(deltaX);
                        switch (dragInfo.target) {
                            case 1 /* WINDOW */:
                                windowStart = dragInfo.windowStartInitial + delta;
                                windowEnd = dragInfo.windowEndInitial + delta;
                                break;
                            case 2 /* HANDLE_LEFT */:
                                windowStart = clamp(dragInfo.windowStartInitial + delta, this._rangeStart, windowEnd - Profiler.FlameChartBase.MIN_WINDOW_LEN);
                                break;
                            case 3 /* HANDLE_RIGHT */:
                                windowEnd = clamp(dragInfo.windowEndInitial + delta, windowStart + Profiler.FlameChartBase.MIN_WINDOW_LEN, this._rangeEnd);
                                break;
                            default:
                                return;
                        }
                        this._controller.setWindow(windowStart, windowEnd);
                    }
                };
                FlameChartOverview.prototype.onDragEnd = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    if (this._selection) {
                        this._selection = null;
                        this._controller.setWindow(this._toTime(startX), this._toTime(currentX));
                    }
                    this._dragInfo = null;
                    this.onMouseMove(currentX, currentY);
                };
                FlameChartOverview.prototype.onClick = function (x, y) {
                    this._dragInfo = null;
                    this._selection = null;
                    if (!this._windowEqRange()) {
                        var dragTarget = this._getDragTargetUnderCursor(x, y);
                        if (dragTarget === 0 /* NONE */) {
                            this._controller.moveWindowTo(this._toTime(x));
                        }
                        this.onMouseMove(x, y);
                    }
                    this.draw();
                };
                FlameChartOverview.prototype.onHoverStart = function (x, y) {
                };
                FlameChartOverview.prototype.onHoverEnd = function () {
                };
                return FlameChartOverview;
            })(Profiler.FlameChartBase);
            Profiler.FlameChartOverview = FlameChartOverview;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var clamp = Shumway.NumberUtilities.clamp;
            (function (FlameChartHeaderType) {
                FlameChartHeaderType[FlameChartHeaderType["OVERVIEW"] = 0] = "OVERVIEW";
                FlameChartHeaderType[FlameChartHeaderType["CHART"] = 1] = "CHART";
            })(Profiler.FlameChartHeaderType || (Profiler.FlameChartHeaderType = {}));
            var FlameChartHeaderType = Profiler.FlameChartHeaderType;
            var FlameChartHeader = (function (_super) {
                __extends(FlameChartHeader, _super);
                function FlameChartHeader(controller, type) {
                    this._type = type;
                    _super.call(this, controller);
                }
                FlameChartHeader.prototype.draw = function () {
                    var context = this._context;
                    var ratio = window.devicePixelRatio;
                    var width = this._width;
                    var height = this._height;
                    context.save();
                    context.scale(ratio, ratio);
                    context.fillStyle = this._controller.theme.tabToolbar(1);
                    context.fillRect(0, 0, width, height);
                    if (this._initialized) {
                        if (this._type == 0 /* OVERVIEW */) {
                            var left = this._toPixels(this._windowStart);
                            var right = this._toPixels(this._windowEnd);
                            context.fillStyle = this._controller.theme.bodyBackground(1);
                            context.fillRect(left, 0, right - left, height);
                            this._drawLabels(this._rangeStart, this._rangeEnd);
                            this._drawDragHandle(left);
                            this._drawDragHandle(right);
                        }
                        else {
                            this._drawLabels(this._windowStart, this._windowEnd);
                        }
                    }
                    context.restore();
                };
                FlameChartHeader.prototype._drawLabels = function (rangeStart, rangeEnd) {
                    var context = this._context;
                    var tickInterval = this._calculateTickInterval(rangeStart, rangeEnd);
                    var tick = Math.ceil(rangeStart / tickInterval) * tickInterval;
                    var showSeconds = (tickInterval >= 500);
                    var divisor = showSeconds ? 1000 : 1;
                    var precision = this._decimalPlaces(tickInterval / divisor);
                    var unit = showSeconds ? "s" : "ms";
                    var x = this._toPixels(tick);
                    var y = this._height / 2;
                    var theme = this._controller.theme;
                    context.lineWidth = 1;
                    context.strokeStyle = theme.contentTextDarkGrey(0.5);
                    context.fillStyle = theme.contentTextDarkGrey(1);
                    context.textAlign = "right";
                    context.textBaseline = "middle";
                    context.font = '11px sans-serif';
                    var maxWidth = this._width + FlameChartHeader.TICK_MAX_WIDTH;
                    while (x < maxWidth) {
                        var tickStr = (tick / divisor).toFixed(precision) + " " + unit;
                        context.fillText(tickStr, x - 7, y + 1);
                        context.beginPath();
                        context.moveTo(x, 0);
                        context.lineTo(x, this._height + 1);
                        context.closePath();
                        context.stroke();
                        tick += tickInterval;
                        x = this._toPixels(tick);
                    }
                };
                FlameChartHeader.prototype._calculateTickInterval = function (rangeStart, rangeEnd) {
                    var tickCount = this._width / FlameChartHeader.TICK_MAX_WIDTH;
                    var range = rangeEnd - rangeStart;
                    var minimum = range / tickCount;
                    var magnitude = Math.pow(10, Math.floor(Math.log(minimum) / Math.LN10));
                    var residual = minimum / magnitude;
                    if (residual > 5) {
                        return 10 * magnitude;
                    }
                    else if (residual > 2) {
                        return 5 * magnitude;
                    }
                    else if (residual > 1) {
                        return 2 * magnitude;
                    }
                    return magnitude;
                };
                FlameChartHeader.prototype._drawDragHandle = function (pos) {
                    var context = this._context;
                    context.lineWidth = 2;
                    context.strokeStyle = this._controller.theme.bodyBackground(1);
                    context.fillStyle = this._controller.theme.foregroundTextGrey(0.7);
                    this._drawRoundedRect(context, pos - Profiler.FlameChartBase.DRAGHANDLE_WIDTH / 2, 1, Profiler.FlameChartBase.DRAGHANDLE_WIDTH, this._height - 2, 2, true);
                };
                FlameChartHeader.prototype._drawRoundedRect = function (context, x, y, width, height, radius, stroke, fill) {
                    if (stroke === void 0) { stroke = true; }
                    if (fill === void 0) { fill = true; }
                    context.beginPath();
                    context.moveTo(x + radius, y);
                    context.lineTo(x + width - radius, y);
                    context.quadraticCurveTo(x + width, y, x + width, y + radius);
                    context.lineTo(x + width, y + height - radius);
                    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                    context.lineTo(x + radius, y + height);
                    context.quadraticCurveTo(x, y + height, x, y + height - radius);
                    context.lineTo(x, y + radius);
                    context.quadraticCurveTo(x, y, x + radius, y);
                    context.closePath();
                    if (stroke) {
                        context.stroke();
                    }
                    if (fill) {
                        context.fill();
                    }
                };
                FlameChartHeader.prototype._toPixelsRelative = function (time) {
                    var range = (this._type === 0 /* OVERVIEW */) ? this._rangeEnd - this._rangeStart : this._windowEnd - this._windowStart;
                    return time * this._width / range;
                };
                FlameChartHeader.prototype._toPixels = function (time) {
                    var start = (this._type === 0 /* OVERVIEW */) ? this._rangeStart : this._windowStart;
                    return this._toPixelsRelative(time - start);
                };
                FlameChartHeader.prototype._toTimeRelative = function (px) {
                    var range = (this._type === 0 /* OVERVIEW */) ? this._rangeEnd - this._rangeStart : this._windowEnd - this._windowStart;
                    return px * range / this._width;
                };
                FlameChartHeader.prototype._toTime = function (px) {
                    var start = (this._type === 0 /* OVERVIEW */) ? this._rangeStart : this._windowStart;
                    return this._toTimeRelative(px) + start;
                };
                FlameChartHeader.prototype._getDragTargetUnderCursor = function (x, y) {
                    if (y >= 0 && y < this._height) {
                        if (this._type === 0 /* OVERVIEW */) {
                            var left = this._toPixels(this._windowStart);
                            var right = this._toPixels(this._windowEnd);
                            var radius = 2 + (Profiler.FlameChartBase.DRAGHANDLE_WIDTH) / 2;
                            var leftHandle = (x >= left - radius && x <= left + radius);
                            var rightHandle = (x >= right - radius && x <= right + radius);
                            if (leftHandle && rightHandle) {
                                return 4 /* HANDLE_BOTH */;
                            }
                            else if (leftHandle) {
                                return 2 /* HANDLE_LEFT */;
                            }
                            else if (rightHandle) {
                                return 3 /* HANDLE_RIGHT */;
                            }
                            else if (!this._windowEqRange()) {
                                return 1 /* WINDOW */;
                            }
                        }
                        else if (!this._windowEqRange()) {
                            return 1 /* WINDOW */;
                        }
                    }
                    return 0 /* NONE */;
                };
                FlameChartHeader.prototype.onMouseDown = function (x, y) {
                    var dragTarget = this._getDragTargetUnderCursor(x, y);
                    if (dragTarget === 1 /* WINDOW */) {
                        this._mouseController.updateCursor(Profiler.MouseCursor.GRABBING);
                    }
                    this._dragInfo = {
                        windowStartInitial: this._windowStart,
                        windowEndInitial: this._windowEnd,
                        target: dragTarget
                    };
                };
                FlameChartHeader.prototype.onMouseMove = function (x, y) {
                    var cursor = Profiler.MouseCursor.DEFAULT;
                    var dragTarget = this._getDragTargetUnderCursor(x, y);
                    if (dragTarget !== 0 /* NONE */) {
                        if (dragTarget !== 1 /* WINDOW */) {
                            cursor = Profiler.MouseCursor.EW_RESIZE;
                        }
                        else if (dragTarget === 1 /* WINDOW */ && !this._windowEqRange()) {
                            cursor = Profiler.MouseCursor.GRAB;
                        }
                    }
                    this._mouseController.updateCursor(cursor);
                };
                FlameChartHeader.prototype.onMouseOver = function (x, y) {
                    this.onMouseMove(x, y);
                };
                FlameChartHeader.prototype.onMouseOut = function () {
                    this._mouseController.updateCursor(Profiler.MouseCursor.DEFAULT);
                };
                FlameChartHeader.prototype.onDrag = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    var dragInfo = this._dragInfo;
                    if (dragInfo.target === 4 /* HANDLE_BOTH */) {
                        if (deltaX !== 0) {
                            dragInfo.target = (deltaX < 0) ? 2 /* HANDLE_LEFT */ : 3 /* HANDLE_RIGHT */;
                        }
                        else {
                            return;
                        }
                    }
                    var windowStart = this._windowStart;
                    var windowEnd = this._windowEnd;
                    var delta = this._toTimeRelative(deltaX);
                    switch (dragInfo.target) {
                        case 1 /* WINDOW */:
                            var mult = (this._type === 0 /* OVERVIEW */) ? 1 : -1;
                            windowStart = dragInfo.windowStartInitial + mult * delta;
                            windowEnd = dragInfo.windowEndInitial + mult * delta;
                            break;
                        case 2 /* HANDLE_LEFT */:
                            windowStart = clamp(dragInfo.windowStartInitial + delta, this._rangeStart, windowEnd - Profiler.FlameChartBase.MIN_WINDOW_LEN);
                            break;
                        case 3 /* HANDLE_RIGHT */:
                            windowEnd = clamp(dragInfo.windowEndInitial + delta, windowStart + Profiler.FlameChartBase.MIN_WINDOW_LEN, this._rangeEnd);
                            break;
                        default:
                            return;
                    }
                    this._controller.setWindow(windowStart, windowEnd);
                };
                FlameChartHeader.prototype.onDragEnd = function (startX, startY, currentX, currentY, deltaX, deltaY) {
                    this._dragInfo = null;
                    this.onMouseMove(currentX, currentY);
                };
                FlameChartHeader.prototype.onClick = function (x, y) {
                    if (this._dragInfo.target === 1 /* WINDOW */) {
                        this._mouseController.updateCursor(Profiler.MouseCursor.GRAB);
                    }
                };
                FlameChartHeader.prototype.onHoverStart = function (x, y) {
                };
                FlameChartHeader.prototype.onHoverEnd = function () {
                };
                FlameChartHeader.TICK_MAX_WIDTH = 75;
                return FlameChartHeader;
            })(Profiler.FlameChartBase);
            Profiler.FlameChartHeader = FlameChartHeader;
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var TraceLogger;
            (function (_TraceLogger) {
                var TraceLoggerProgressInfo = (function () {
                    function TraceLoggerProgressInfo(pageLoaded, threadsTotal, threadsLoaded, threadFilesTotal, threadFilesLoaded) {
                        this.pageLoaded = pageLoaded;
                        this.threadsTotal = threadsTotal;
                        this.threadsLoaded = threadsLoaded;
                        this.threadFilesTotal = threadFilesTotal;
                        this.threadFilesLoaded = threadFilesLoaded;
                    }
                    TraceLoggerProgressInfo.prototype.toString = function () {
                        return "[" + ["pageLoaded", "threadsTotal", "threadsLoaded", "threadFilesTotal", "threadFilesLoaded"].map(function (value, i, arr) {
                            return value + ":" + this[value];
                        }, this).join(", ") + "]";
                    };
                    return TraceLoggerProgressInfo;
                })();
                _TraceLogger.TraceLoggerProgressInfo = TraceLoggerProgressInfo;
                var TraceLogger = (function () {
                    function TraceLogger(baseUrl) {
                        this._baseUrl = baseUrl;
                        this._threads = [];
                        this._progressInfo = null;
                    }
                    TraceLogger.prototype.loadPage = function (url, callback, progress) {
                        this._threads = [];
                        this._pageLoadCallback = callback;
                        this._pageLoadProgressCallback = progress;
                        this._progressInfo = new TraceLoggerProgressInfo(false, 0, 0, 0, 0);
                        this._loadData([url], this._onLoadPage.bind(this));
                    };
                    Object.defineProperty(TraceLogger.prototype, "buffers", {
                        get: function () {
                            var buffers = [];
                            for (var i = 0, n = this._threads.length; i < n; i++) {
                                buffers.push(this._threads[i].buffer);
                            }
                            return buffers;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    TraceLogger.prototype._onProgress = function () {
                        if (this._pageLoadProgressCallback) {
                            this._pageLoadProgressCallback.call(this, this._progressInfo);
                        }
                    };
                    TraceLogger.prototype._onLoadPage = function (result) {
                        if (result && result.length == 1) {
                            var self = this;
                            var count = 0;
                            var threads = result[0];
                            var threadCount = threads.length;
                            this._threads = Array(threadCount);
                            this._progressInfo.pageLoaded = true;
                            this._progressInfo.threadsTotal = threadCount;
                            for (var i = 0; i < threads.length; i++) {
                                var thread = threads[i];
                                var urls = [thread.dict, thread.tree];
                                if (thread.corrections) {
                                    urls.push(thread.corrections);
                                }
                                this._progressInfo.threadFilesTotal += urls.length;
                                this._loadData(urls, (function (index) {
                                    return function (result) {
                                        if (result) {
                                            var thread = new _TraceLogger.Thread(result);
                                            thread.buffer.name = "Thread " + index;
                                            self._threads[index] = thread;
                                        }
                                        count++;
                                        self._progressInfo.threadsLoaded++;
                                        self._onProgress();
                                        if (count === threadCount) {
                                            self._pageLoadCallback.call(self, null, self._threads);
                                        }
                                    };
                                })(i), function (count) {
                                    self._progressInfo.threadFilesLoaded++;
                                    self._onProgress();
                                });
                            }
                            this._onProgress();
                        }
                        else {
                            this._pageLoadCallback.call(this, "Error loading page.", null);
                        }
                    };
                    TraceLogger.prototype._loadData = function (urls, callback, progress) {
                        var count = 0;
                        var errors = 0;
                        var expected = urls.length;
                        var received = [];
                        received.length = expected;
                        for (var i = 0; i < expected; i++) {
                            var url = this._baseUrl + urls[i];
                            var isTL = /\.tl$/i.test(url);
                            var xhr = new XMLHttpRequest();
                            var responseType = isTL ? "arraybuffer" : "json";
                            xhr.open('GET', url, true);
                            xhr.responseType = responseType;
                            xhr.onload = (function (index, type) {
                                return function (event) {
                                    if (type === "json") {
                                        var json = this.response;
                                        if (typeof json === "string") {
                                            try {
                                                json = JSON.parse(json);
                                                received[index] = json;
                                            }
                                            catch (e) {
                                                errors++;
                                            }
                                        }
                                        else {
                                            received[index] = json;
                                        }
                                    }
                                    else {
                                        received[index] = this.response;
                                    }
                                    ++count;
                                    if (progress) {
                                        progress(count);
                                    }
                                    if (count === expected) {
                                        callback(received);
                                    }
                                };
                            })(i, responseType);
                            xhr.send();
                        }
                    };
                    TraceLogger.colors = [
                        "#0044ff",
                        "#8c4b00",
                        "#cc5c33",
                        "#ff80c4",
                        "#ffbfd9",
                        "#ff8800",
                        "#8c5e00",
                        "#adcc33",
                        "#b380ff",
                        "#bfd9ff",
                        "#ffaa00",
                        "#8c0038",
                        "#bf8f30",
                        "#f780ff",
                        "#cc99c9",
                        "#aaff00",
                        "#000073",
                        "#452699",
                        "#cc8166",
                        "#cca799",
                        "#000066",
                        "#992626",
                        "#cc6666",
                        "#ccc299",
                        "#ff6600",
                        "#526600",
                        "#992663",
                        "#cc6681",
                        "#99ccc2",
                        "#ff0066",
                        "#520066",
                        "#269973",
                        "#61994d",
                        "#739699",
                        "#ffcc00",
                        "#006629",
                        "#269199",
                        "#94994d",
                        "#738299",
                        "#ff0000",
                        "#590000",
                        "#234d8c",
                        "#8c6246",
                        "#7d7399",
                        "#ee00ff",
                        "#00474d",
                        "#8c2385",
                        "#8c7546",
                        "#7c8c69",
                        "#eeff00",
                        "#4d003d",
                        "#662e1a",
                        "#62468c",
                        "#8c6969",
                        "#6600ff",
                        "#4c2900",
                        "#1a6657",
                        "#8c464f",
                        "#8c6981",
                        "#44ff00",
                        "#401100",
                        "#1a2466",
                        "#663355",
                        "#567365",
                        "#d90074",
                        "#403300",
                        "#101d40",
                        "#59562d",
                        "#66614d",
                        "#cc0000",
                        "#002b40",
                        "#234010",
                        "#4c2626",
                        "#4d5e66",
                        "#00a3cc",
                        "#400011",
                        "#231040",
                        "#4c3626",
                        "#464359",
                        "#0000bf",
                        "#331b00",
                        "#80e6ff",
                        "#311a33",
                        "#4d3939",
                        "#a69b00",
                        "#003329",
                        "#80ffb2",
                        "#331a20",
                        "#40303d",
                        "#00a658",
                        "#40ffd9",
                        "#ffc480",
                        "#ffe1bf",
                        "#332b26",
                        "#8c2500",
                        "#9933cc",
                        "#80fff6",
                        "#ffbfbf",
                        "#303326",
                        "#005e8c",
                        "#33cc47",
                        "#b2ff80",
                        "#c8bfff",
                        "#263332",
                        "#00708c",
                        "#cc33ad",
                        "#ffe680",
                        "#f2ffbf",
                        "#262a33",
                        "#388c00",
                        "#335ccc",
                        "#8091ff",
                        "#bfffd9"
                    ];
                    return TraceLogger;
                })();
                _TraceLogger.TraceLogger = TraceLogger;
            })(TraceLogger = Profiler.TraceLogger || (Profiler.TraceLogger = {}));
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Profiler;
        (function (Profiler) {
            var TraceLogger;
            (function (TraceLogger) {
                var Offsets;
                (function (Offsets) {
                    Offsets[Offsets["START_HI"] = 0] = "START_HI";
                    Offsets[Offsets["START_LO"] = 4] = "START_LO";
                    Offsets[Offsets["STOP_HI"] = 8] = "STOP_HI";
                    Offsets[Offsets["STOP_LO"] = 12] = "STOP_LO";
                    Offsets[Offsets["TEXTID"] = 16] = "TEXTID";
                    Offsets[Offsets["NEXTID"] = 20] = "NEXTID";
                })(Offsets || (Offsets = {}));
                var Thread = (function () {
                    function Thread(data) {
                        if (data.length >= 2) {
                            this._text = data[0];
                            this._data = new DataView(data[1]);
                            this._buffer = new Profiler.TimelineBuffer();
                            this._walkTree(0);
                        }
                    }
                    Object.defineProperty(Thread.prototype, "buffer", {
                        get: function () {
                            return this._buffer;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Thread.prototype._walkTree = function (id) {
                        var data = this._data;
                        var buffer = this._buffer;
                        do {
                            var index = id * Thread.ITEM_SIZE;
                            var start = data.getUint32(index + 0 /* START_HI */) * 4294967295 + data.getUint32(index + 4 /* START_LO */);
                            var stop = data.getUint32(index + 8 /* STOP_HI */) * 4294967295 + data.getUint32(index + 12 /* STOP_LO */);
                            var textId = data.getUint32(index + 16 /* TEXTID */);
                            var nextId = data.getUint32(index + 20 /* NEXTID */);
                            var hasChildren = ((textId & 1) === 1);
                            textId >>>= 1;
                            var text = this._text[textId];
                            buffer.enter(text, null, start / 1000000);
                            if (hasChildren) {
                                this._walkTree(id + 1);
                            }
                            buffer.leave(text, null, stop / 1000000);
                            id = nextId;
                        } while (id !== 0);
                    };
                    Thread.ITEM_SIZE = 8 + 8 + 4 + 4;
                    return Thread;
                })();
                TraceLogger.Thread = Thread;
            })(TraceLogger = Profiler.TraceLogger || (Profiler.TraceLogger = {}));
        })(Profiler = Tools.Profiler || (Tools.Profiler = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Terminal;
        (function (_Terminal) {
            var clamp = Shumway.NumberUtilities.clamp;
            var Buffer = (function () {
                function Buffer() {
                    this.length = 0;
                    this.lines = [];
                    this.format = [];
                    this.time = [];
                    this.repeat = [];
                    this.length = 0;
                }
                Buffer.prototype.append = function (line, color) {
                    var lines = this.lines;
                    if (lines.length > 0 && lines[lines.length - 1] === line) {
                        this.repeat[lines.length - 1]++;
                        return;
                    }
                    this.lines.push(line);
                    this.repeat.push(1);
                    this.format.push(color ? { backgroundFillStyle: color } : undefined);
                    this.time.push(performance.now());
                    this.length++;
                };
                Buffer.prototype.get = function (i) {
                    return this.lines[i];
                };
                Buffer.prototype.getFormat = function (i) {
                    return this.format[i];
                };
                Buffer.prototype.getTime = function (i) {
                    return this.time[i];
                };
                Buffer.prototype.getRepeat = function (i) {
                    return this.repeat[i];
                };
                return Buffer;
            })();
            _Terminal.Buffer = Buffer;
            var Terminal = (function () {
                function Terminal(canvas) {
                    this.lineColor = "#2A2A2A";
                    this.alternateLineColor = "#262626";
                    this.textColor = "#FFFFFF";
                    this.selectionColor = "#96C9F3";
                    this.selectionTextColor = "#000000";
                    this.ratio = 1;
                    this.showLineNumbers = true;
                    this.showLineTime = false;
                    this.showLineCounter = false;
                    this.canvas = canvas;
                    this.canvas.focus();
                    this.context = canvas.getContext('2d', { original: true });
                    this.context.fillStyle = "#FFFFFF";
                    this.fontSize = 10;
                    this.lineIndex = 0;
                    this.pageIndex = 0;
                    this.columnIndex = 0;
                    this.selection = null;
                    this.lineHeight = 15;
                    this.hasFocus = false;
                    window.addEventListener('resize', this._resizeHandler.bind(this), false);
                    this._resizeHandler();
                    this.textMarginLeft = 4;
                    this.textMarginBottom = 4;
                    this.refreshFrequency = 0;
                    this.buffer = new Buffer();
                    canvas.addEventListener('keydown', onKeyDown.bind(this), false);
                    canvas.addEventListener('focus', onFocusIn.bind(this), false);
                    canvas.addEventListener('blur', onFocusOut.bind(this), false);
                    var PAGE_UP = 33;
                    var PAGE_DOWN = 34;
                    var HOME = 36;
                    var END = 35;
                    var UP = 38;
                    var DOWN = 40;
                    var LEFT = 37;
                    var RIGHT = 39;
                    var KEY_A = 65;
                    var KEY_C = 67;
                    var KEY_F = 70;
                    var ESCAPE = 27;
                    var KEY_N = 78;
                    var KEY_T = 84;
                    function onFocusIn(event) {
                        this.hasFocus = true;
                    }
                    function onFocusOut(event) {
                        this.hasFocus = false;
                    }
                    function onKeyDown(event) {
                        var delta = 0;
                        switch (event.keyCode) {
                            case KEY_N:
                                this.showLineNumbers = !this.showLineNumbers;
                                break;
                            case KEY_T:
                                this.showLineTime = !this.showLineTime;
                                break;
                            case UP:
                                delta = -1;
                                break;
                            case DOWN:
                                delta = +1;
                                break;
                            case PAGE_UP:
                                delta = -this.pageLineCount;
                                break;
                            case PAGE_DOWN:
                                delta = this.pageLineCount;
                                break;
                            case HOME:
                                delta = -this.lineIndex;
                                break;
                            case END:
                                delta = this.buffer.length - this.lineIndex;
                                break;
                            case LEFT:
                                this.columnIndex -= event.metaKey ? 10 : 1;
                                if (this.columnIndex < 0) {
                                    this.columnIndex = 0;
                                }
                                event.preventDefault();
                                break;
                            case RIGHT:
                                this.columnIndex += event.metaKey ? 10 : 1;
                                event.preventDefault();
                                break;
                            case KEY_A:
                                if (event.metaKey) {
                                    this.selection = { start: 0, end: this.buffer.length };
                                    event.preventDefault();
                                }
                                break;
                            case KEY_C:
                                if (event.metaKey) {
                                    var str = "";
                                    if (this.selection) {
                                        for (var i = this.selection.start; i <= this.selection.end; i++) {
                                            str += this.buffer.get(i) + "\n";
                                        }
                                    }
                                    else {
                                        str = this.buffer.get(this.lineIndex);
                                    }
                                    alert(str);
                                }
                                break;
                            default:
                                break;
                        }
                        if (event.metaKey) {
                            delta *= this.pageLineCount;
                        }
                        if (delta) {
                            this.scroll(delta);
                            event.preventDefault();
                        }
                        if (delta && event.shiftKey) {
                            if (!this.selection) {
                                if (delta > 0) {
                                    this.selection = { start: this.lineIndex - delta, end: this.lineIndex };
                                }
                                else if (delta < 0) {
                                    this.selection = { start: this.lineIndex, end: this.lineIndex - delta };
                                }
                            }
                            else {
                                if (this.lineIndex > this.selection.start) {
                                    this.selection.end = this.lineIndex;
                                }
                                else {
                                    this.selection.start = this.lineIndex;
                                }
                            }
                        }
                        else if (delta) {
                            this.selection = null;
                        }
                        this.paint();
                    }
                }
                Terminal.prototype.resize = function () {
                    this._resizeHandler();
                };
                Terminal.prototype._resizeHandler = function () {
                    var parent = this.canvas.parentElement;
                    var cw = parent.clientWidth;
                    var ch = parent.clientHeight - 1;
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStoreRatio = 1;
                    if (devicePixelRatio !== backingStoreRatio) {
                        this.ratio = devicePixelRatio / backingStoreRatio;
                        this.canvas.width = cw * this.ratio;
                        this.canvas.height = ch * this.ratio;
                        this.canvas.style.width = cw + 'px';
                        this.canvas.style.height = ch + 'px';
                    }
                    else {
                        this.ratio = 1;
                        this.canvas.width = cw;
                        this.canvas.height = ch;
                    }
                    this.pageLineCount = Math.floor(this.canvas.height / this.lineHeight);
                };
                Terminal.prototype.gotoLine = function (index) {
                    this.lineIndex = clamp(index, 0, this.buffer.length - 1);
                };
                Terminal.prototype.scrollIntoView = function () {
                    if (this.lineIndex < this.pageIndex) {
                        this.pageIndex = this.lineIndex;
                    }
                    else if (this.lineIndex >= this.pageIndex + this.pageLineCount) {
                        this.pageIndex = this.lineIndex - this.pageLineCount + 1;
                    }
                };
                Terminal.prototype.scroll = function (delta) {
                    this.gotoLine(this.lineIndex + delta);
                    this.scrollIntoView();
                };
                Terminal.prototype.paint = function () {
                    var lineCount = this.pageLineCount;
                    if (this.pageIndex + lineCount > this.buffer.length) {
                        lineCount = this.buffer.length - this.pageIndex;
                    }
                    var charSize = 5;
                    var lineNumberMargin = this.textMarginLeft;
                    var lineTimeMargin = lineNumberMargin + (this.showLineNumbers ? (String(this.buffer.length).length + 2) * charSize : 0);
                    var lineRepeatMargin = lineTimeMargin + (this.showLineTime ? charSize * 8 : 2 * charSize);
                    var lineMargin = lineRepeatMargin + charSize * 5;
                    this.context.font = this.fontSize + 'px Consolas, "Liberation Mono", Courier, monospace';
                    this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
                    var w = this.canvas.width;
                    var h = this.lineHeight;
                    for (var i = 0; i < lineCount; i++) {
                        var y = i * this.lineHeight;
                        var lineIndex = this.pageIndex + i;
                        var line = this.buffer.get(lineIndex);
                        var lineFormat = this.buffer.getFormat(lineIndex);
                        var lineRepeat = this.buffer.getRepeat(lineIndex);
                        var lineTimeDelta = lineIndex > 1 ? this.buffer.getTime(lineIndex) - this.buffer.getTime(0) : 0;
                        this.context.fillStyle = lineIndex % 2 ? this.lineColor : this.alternateLineColor;
                        if (lineFormat && lineFormat.backgroundFillStyle) {
                            this.context.fillStyle = lineFormat.backgroundFillStyle;
                        }
                        this.context.fillRect(0, y, w, h);
                        this.context.fillStyle = this.selectionTextColor;
                        this.context.fillStyle = this.textColor;
                        if (this.selection && lineIndex >= this.selection.start && lineIndex <= this.selection.end) {
                            this.context.fillStyle = this.selectionColor;
                            this.context.fillRect(0, y, w, h);
                            this.context.fillStyle = this.selectionTextColor;
                        }
                        if (this.hasFocus && lineIndex === this.lineIndex) {
                            this.context.fillStyle = this.selectionColor;
                            this.context.fillRect(0, y, w, h);
                            this.context.fillStyle = this.selectionTextColor;
                        }
                        if (this.columnIndex > 0) {
                            line = line.substring(this.columnIndex);
                        }
                        var marginTop = (i + 1) * this.lineHeight - this.textMarginBottom;
                        if (this.showLineNumbers) {
                            this.context.fillText(String(lineIndex), lineNumberMargin, marginTop);
                        }
                        if (this.showLineTime) {
                            this.context.fillText(lineTimeDelta.toFixed(1).padLeft(' ', 6), lineTimeMargin, marginTop);
                        }
                        if (lineRepeat > 1) {
                            this.context.fillText(String(lineRepeat).padLeft(' ', 3), lineRepeatMargin, marginTop);
                        }
                        this.context.fillText(line, lineMargin, marginTop);
                    }
                };
                Terminal.prototype.refreshEvery = function (ms) {
                    var that = this;
                    this.refreshFrequency = ms;
                    function refresh() {
                        that.paint();
                        if (that.refreshFrequency) {
                            setTimeout(refresh, that.refreshFrequency);
                        }
                    }
                    if (that.refreshFrequency) {
                        setTimeout(refresh, that.refreshFrequency);
                    }
                };
                Terminal.prototype.isScrolledToBottom = function () {
                    return this.lineIndex === this.buffer.length - 1;
                };
                return Terminal;
            })();
            _Terminal.Terminal = Terminal;
        })(Terminal = Tools.Terminal || (Tools.Terminal = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Tools;
    (function (Tools) {
        var Mini;
        (function (Mini) {
            var FPS = (function () {
                function FPS(container) {
                    this._index = 0;
                    this._lastTime = 0;
                    this._lastWeightedTime = 0;
                    this._gradient = [
                        "#FF0000",
                        "#FF1100",
                        "#FF2300",
                        "#FF3400",
                        "#FF4600",
                        "#FF5700",
                        "#FF6900",
                        "#FF7B00",
                        "#FF8C00",
                        "#FF9E00",
                        "#FFAF00",
                        "#FFC100",
                        "#FFD300",
                        "#FFE400",
                        "#FFF600",
                        "#F7FF00",
                        "#E5FF00",
                        "#D4FF00",
                        "#C2FF00",
                        "#B0FF00",
                        "#9FFF00",
                        "#8DFF00",
                        "#7CFF00",
                        "#6AFF00",
                        "#58FF00",
                        "#47FF00",
                        "#35FF00",
                        "#24FF00",
                        "#12FF00",
                        "#00FF00"
                    ];
                    this._container = container;
                    this._canvas = document.createElement("canvas");
                    this._container.appendChild(this._canvas);
                    this._context = this._canvas.getContext("2d");
                    this._listenForContainerSizeChanges();
                }
                FPS.prototype._listenForContainerSizeChanges = function () {
                    var pollInterval = 10;
                    var w = this._containerWidth;
                    var h = this._containerHeight;
                    this._onContainerSizeChanged();
                    var self = this;
                    setInterval(function () {
                        if (w !== self._containerWidth || h !== self._containerHeight) {
                            self._onContainerSizeChanged();
                            w = self._containerWidth;
                            h = self._containerHeight;
                        }
                    }, pollInterval);
                };
                FPS.prototype._onContainerSizeChanged = function () {
                    var cw = this._containerWidth;
                    var ch = this._containerHeight;
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStoreRatio = 1;
                    if (devicePixelRatio !== backingStoreRatio) {
                        this._ratio = devicePixelRatio / backingStoreRatio;
                        this._canvas.width = cw * this._ratio;
                        this._canvas.height = ch * this._ratio;
                        this._canvas.style.width = cw + 'px';
                        this._canvas.style.height = ch + 'px';
                    }
                    else {
                        this._ratio = 1;
                        this._canvas.width = cw;
                        this._canvas.height = ch;
                    }
                };
                Object.defineProperty(FPS.prototype, "_containerWidth", {
                    get: function () {
                        return this._container.clientWidth;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FPS.prototype, "_containerHeight", {
                    get: function () {
                        return this._container.clientHeight;
                    },
                    enumerable: true,
                    configurable: true
                });
                FPS.prototype.tickAndRender = function (idle, renderTime) {
                    if (idle === void 0) { idle = false; }
                    if (renderTime === void 0) { renderTime = 0; }
                    if (this._lastTime === 0) {
                        this._lastTime = performance.now();
                        return;
                    }
                    var elapsedTime = performance.now() - this._lastTime;
                    var weightRatio = 0;
                    var weightedTime = elapsedTime * (1 - weightRatio) + this._lastWeightedTime * weightRatio;
                    var context = this._context;
                    var w = 2 * this._ratio;
                    var wPadding = 1;
                    var fontSize = 8;
                    var tickOffset = this._ratio * 30;
                    var webkitPerformance = performance;
                    if (webkitPerformance.memory) {
                        tickOffset += this._ratio * 30;
                    }
                    var count = ((this._canvas.width - tickOffset) / (w + wPadding)) | 0;
                    var index = this._index++;
                    if (this._index > count) {
                        this._index = 0;
                    }
                    var canvasHeight = this._canvas.height;
                    context.globalAlpha = 1;
                    context.fillStyle = "black";
                    context.fillRect(tickOffset + index * (w + wPadding), 0, w * 4, this._canvas.height);
                    var r = Math.min((1000 / 60) / weightedTime, 1);
                    context.fillStyle = this._gradient[r * (this._gradient.length - 1) | 0];
                    context.globalAlpha = idle ? 0.5 : 1;
                    var v = canvasHeight / 2 * r | 0;
                    context.fillRect(tickOffset + index * (w + wPadding), canvasHeight - v, w, v);
                    if (renderTime) {
                        r = Math.min((1000 / 240) / renderTime, 1);
                        context.fillStyle = this._gradient[r * (this._gradient.length - 1) | 0];
                        var v = canvasHeight / 2 * r | 0;
                        context.fillRect(tickOffset + index * (w + wPadding), (canvasHeight / 2) - v, w, v);
                    }
                    if (index % 16 === 0) {
                        context.globalAlpha = 1;
                        context.fillStyle = "black";
                        context.fillRect(0, 0, tickOffset, this._canvas.height);
                        context.fillStyle = "white";
                        context.font = (this._ratio * fontSize) + "px Arial";
                        context.textBaseline = "middle";
                        var s = (1000 / weightedTime).toFixed(0);
                        if (renderTime) {
                            s += " " + renderTime.toFixed(0);
                        }
                        if (webkitPerformance.memory) {
                            s += " " + (webkitPerformance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                        }
                        context.fillText(s, 2 * this._ratio, this._containerHeight / 2 * this._ratio);
                    }
                    this._lastTime = performance.now();
                    this._lastWeightedTime = weightedTime;
                };
                return FPS;
            })();
            Mini.FPS = FPS;
        })(Mini = Tools.Mini || (Tools.Mini = {}));
    })(Tools = Shumway.Tools || (Shumway.Tools = {}));
})(Shumway || (Shumway = {}));
//# sourceMappingURL=tools.js.map
console.timeEnd("Load Shared Dependencies");
console.time("Load GFX Dependencies");
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var assert = Shumway.Debug.assert;
        var clamp = Shumway.NumberUtilities.clamp;
        (function (TraceLevel) {
            TraceLevel[TraceLevel["None"] = 0] = "None";
            TraceLevel[TraceLevel["Brief"] = 1] = "Brief";
            TraceLevel[TraceLevel["Verbose"] = 2] = "Verbose";
        })(GFX.TraceLevel || (GFX.TraceLevel = {}));
        var TraceLevel = GFX.TraceLevel;
        var counter = Shumway.Metrics.Counter.instance;
        GFX.frameCounter = new Shumway.Metrics.Counter(true);
        GFX.traceLevel = 2 /* Verbose */;
        GFX.writer = null;
        function frameCount(name) {
            counter.count(name);
            GFX.frameCounter.count(name);
        }
        GFX.frameCount = frameCount;
        GFX.timelineBuffer = new Shumway.Tools.Profiler.TimelineBuffer("GFX");
        function enterTimeline(name, data) {
            profile && GFX.timelineBuffer && GFX.timelineBuffer.enter(name, data);
        }
        GFX.enterTimeline = enterTimeline;
        function leaveTimeline(name, data) {
            profile && GFX.timelineBuffer && GFX.timelineBuffer.leave(name, data);
        }
        GFX.leaveTimeline = leaveTimeline;
        var nativeAddColorStop = null;
        var nativeCreateLinearGradient = null;
        var nativeCreateRadialGradient = null;
        function transformStyle(context, style, colorMatrix) {
            if (!polyfillColorTransform || !colorMatrix) {
                return style;
            }
            if (typeof style === "string") {
                var rgba = Shumway.ColorUtilities.cssStyleToRGBA(style);
                return Shumway.ColorUtilities.rgbaToCSSStyle(colorMatrix.transformRGBA(rgba));
            }
            else if (style instanceof CanvasGradient) {
                if (style._template) {
                    return style._template.createCanvasGradient(context, colorMatrix);
                }
            }
            return style;
        }
        var polyfillColorTransform = true;
        if (polyfillColorTransform && typeof CanvasRenderingContext2D !== 'undefined') {
            nativeAddColorStop = CanvasGradient.prototype.addColorStop;
            nativeCreateLinearGradient = CanvasRenderingContext2D.prototype.createLinearGradient;
            nativeCreateRadialGradient = CanvasRenderingContext2D.prototype.createRadialGradient;
            CanvasRenderingContext2D.prototype.createLinearGradient = function (x0, y0, x1, y1) {
                var gradient = new CanvasLinearGradient(x0, y0, x1, y1);
                return gradient.createCanvasGradient(this, null);
            };
            CanvasRenderingContext2D.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
                var gradient = new CanvasRadialGradient(x0, y0, r0, x1, y1, r1);
                return gradient.createCanvasGradient(this, null);
            };
            CanvasGradient.prototype.addColorStop = function (offset, color) {
                nativeAddColorStop.call(this, offset, color);
                this._template.addColorStop(offset, color);
            };
        }
        var ColorStop = (function () {
            function ColorStop(offset, color) {
                this.offset = offset;
                this.color = color;
            }
            return ColorStop;
        })();
        var CanvasLinearGradient = (function () {
            function CanvasLinearGradient(x0, y0, x1, y1) {
                this.x0 = x0;
                this.y0 = y0;
                this.x1 = x1;
                this.y1 = y1;
                this.colorStops = [];
            }
            CanvasLinearGradient.prototype.addColorStop = function (offset, color) {
                this.colorStops.push(new ColorStop(offset, color));
            };
            CanvasLinearGradient.prototype.createCanvasGradient = function (context, colorMatrix) {
                var gradient = nativeCreateLinearGradient.call(context, this.x0, this.y0, this.x1, this.y1);
                var colorStops = this.colorStops;
                for (var i = 0; i < colorStops.length; i++) {
                    var colorStop = colorStops[i];
                    var offset = colorStop.offset;
                    var color = colorStop.color;
                    color = colorMatrix ? transformStyle(context, color, colorMatrix) : color;
                    nativeAddColorStop.call(gradient, offset, color);
                }
                gradient._template = this;
                gradient._transform = this._transform;
                return gradient;
            };
            return CanvasLinearGradient;
        })();
        var CanvasRadialGradient = (function () {
            function CanvasRadialGradient(x0, y0, r0, x1, y1, r1) {
                this.x0 = x0;
                this.y0 = y0;
                this.r0 = r0;
                this.x1 = x1;
                this.y1 = y1;
                this.r1 = r1;
                this.colorStops = [];
            }
            CanvasRadialGradient.prototype.addColorStop = function (offset, color) {
                this.colorStops.push(new ColorStop(offset, color));
            };
            CanvasRadialGradient.prototype.createCanvasGradient = function (context, colorMatrix) {
                var gradient = nativeCreateRadialGradient.call(context, this.x0, this.y0, this.r0, this.x1, this.y1, this.r1);
                var colorStops = this.colorStops;
                for (var i = 0; i < colorStops.length; i++) {
                    var colorStop = colorStops[i];
                    var offset = colorStop.offset;
                    var color = colorStop.color;
                    color = colorMatrix ? transformStyle(context, color, colorMatrix) : color;
                    nativeAddColorStop.call(gradient, offset, color);
                }
                gradient._template = this;
                gradient._transform = this._transform;
                return gradient;
            };
            return CanvasRadialGradient;
        })();
        var PathCommand;
        (function (PathCommand) {
            PathCommand[PathCommand["ClosePath"] = 1] = "ClosePath";
            PathCommand[PathCommand["MoveTo"] = 2] = "MoveTo";
            PathCommand[PathCommand["LineTo"] = 3] = "LineTo";
            PathCommand[PathCommand["QuadraticCurveTo"] = 4] = "QuadraticCurveTo";
            PathCommand[PathCommand["BezierCurveTo"] = 5] = "BezierCurveTo";
            PathCommand[PathCommand["ArcTo"] = 6] = "ArcTo";
            PathCommand[PathCommand["Rect"] = 7] = "Rect";
            PathCommand[PathCommand["Arc"] = 8] = "Arc";
            PathCommand[PathCommand["Save"] = 9] = "Save";
            PathCommand[PathCommand["Restore"] = 10] = "Restore";
            PathCommand[PathCommand["Transform"] = 11] = "Transform";
        })(PathCommand || (PathCommand = {}));
        var Path = (function () {
            function Path(arg) {
                this._commands = new Uint8Array(Path._arrayBufferPool.acquire(8), 0, 8);
                this._commandPosition = 0;
                this._data = new Float64Array(Path._arrayBufferPool.acquire(8 * Float64Array.BYTES_PER_ELEMENT), 0, 8);
                this._dataPosition = 0;
                if (arg instanceof Path) {
                    this.addPath(arg);
                }
            }
            Path._apply = function (path, context) {
                var commands = path._commands;
                var d = path._data;
                var i = 0;
                var j = 0;
                context.beginPath();
                var commandPosition = path._commandPosition;
                while (i < commandPosition) {
                    switch (commands[i++]) {
                        case 1 /* ClosePath */:
                            context.closePath();
                            break;
                        case 2 /* MoveTo */:
                            context.moveTo(d[j++], d[j++]);
                            break;
                        case 3 /* LineTo */:
                            context.lineTo(d[j++], d[j++]);
                            break;
                        case 4 /* QuadraticCurveTo */:
                            context.quadraticCurveTo(d[j++], d[j++], d[j++], d[j++]);
                            break;
                        case 5 /* BezierCurveTo */:
                            context.bezierCurveTo(d[j++], d[j++], d[j++], d[j++], d[j++], d[j++]);
                            break;
                        case 6 /* ArcTo */:
                            context.arcTo(d[j++], d[j++], d[j++], d[j++], d[j++]);
                            break;
                        case 7 /* Rect */:
                            context.rect(d[j++], d[j++], d[j++], d[j++]);
                            break;
                        case 8 /* Arc */:
                            context.arc(d[j++], d[j++], d[j++], d[j++], d[j++], !!d[j++]);
                            break;
                        case 9 /* Save */:
                            context.save();
                            break;
                        case 10 /* Restore */:
                            context.restore();
                            break;
                        case 11 /* Transform */:
                            context.transform(d[j++], d[j++], d[j++], d[j++], d[j++], d[j++]);
                            break;
                    }
                }
            };
            Path.prototype._ensureCommandCapacity = function (length) {
                this._commands = Path._arrayBufferPool.ensureUint8ArrayLength(this._commands, length);
            };
            Path.prototype._ensureDataCapacity = function (length) {
                this._data = Path._arrayBufferPool.ensureFloat64ArrayLength(this._data, length);
            };
            Path.prototype._writeCommand = function (command) {
                if (this._commandPosition >= this._commands.length) {
                    this._ensureCommandCapacity(this._commandPosition + 1);
                }
                this._commands[this._commandPosition++] = command;
            };
            Path.prototype._writeData = function (a, b, c, d, e, f) {
                var argc = arguments.length;
                release || assert(argc <= 6 && (argc % 2 === 0 || argc === 5));
                if (this._dataPosition + argc >= this._data.length) {
                    this._ensureDataCapacity(this._dataPosition + argc);
                }
                var data = this._data;
                var p = this._dataPosition;
                data[p] = a;
                data[p + 1] = b;
                if (argc > 2) {
                    data[p + 2] = c;
                    data[p + 3] = d;
                    if (argc > 4) {
                        data[p + 4] = e;
                        if (argc === 6) {
                            data[p + 5] = f;
                        }
                    }
                }
                this._dataPosition += argc;
            };
            Path.prototype.closePath = function () {
                this._writeCommand(1 /* ClosePath */);
            };
            Path.prototype.moveTo = function (x, y) {
                this._writeCommand(2 /* MoveTo */);
                this._writeData(x, y);
            };
            Path.prototype.lineTo = function (x, y) {
                this._writeCommand(3 /* LineTo */);
                this._writeData(x, y);
            };
            Path.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
                this._writeCommand(4 /* QuadraticCurveTo */);
                this._writeData(cpx, cpy, x, y);
            };
            Path.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                this._writeCommand(5 /* BezierCurveTo */);
                this._writeData(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            Path.prototype.arcTo = function (x1, y1, x2, y2, radius) {
                this._writeCommand(6 /* ArcTo */);
                this._writeData(x1, y1, x2, y2, radius);
            };
            Path.prototype.rect = function (x, y, width, height) {
                this._writeCommand(7 /* Rect */);
                this._writeData(x, y, width, height);
            };
            Path.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                this._writeCommand(8 /* Arc */);
                this._writeData(x, y, radius, startAngle, endAngle, +anticlockwise);
            };
            Path.prototype.addPath = function (path, transformation) {
                if (transformation) {
                    this._writeCommand(9 /* Save */);
                    this._writeCommand(11 /* Transform */);
                    this._writeData(transformation.a, transformation.b, transformation.c, transformation.d, transformation.e, transformation.f);
                }
                var newCommandPosition = this._commandPosition + path._commandPosition;
                if (newCommandPosition >= this._commands.length) {
                    this._ensureCommandCapacity(newCommandPosition);
                }
                var commands = this._commands;
                var pathCommands = path._commands;
                for (var i = this._commandPosition, j = 0; i < newCommandPosition; i++) {
                    commands[i] = pathCommands[j++];
                }
                this._commandPosition = newCommandPosition;
                var newDataPosition = this._dataPosition + path._dataPosition;
                if (newDataPosition >= this._data.length) {
                    this._ensureDataCapacity(newDataPosition);
                }
                var data = this._data;
                var pathData = path._data;
                for (var i = this._dataPosition, j = 0; i < newDataPosition; i++) {
                    data[i] = pathData[j++];
                }
                this._dataPosition = newDataPosition;
                if (transformation) {
                    this._writeCommand(10 /* Restore */);
                }
            };
            Path._arrayBufferPool = new Shumway.ArrayBufferPool();
            return Path;
        })();
        GFX.Path = Path;
        if (typeof CanvasRenderingContext2D !== 'undefined' && (typeof Path2D === 'undefined' || !Path2D.prototype.addPath)) {
            var nativeFill = CanvasRenderingContext2D.prototype.fill;
            CanvasRenderingContext2D.prototype.fill = (function (path, fillRule) {
                if (arguments.length) {
                    if (path instanceof Path) {
                        Path._apply(path, this);
                    }
                    else {
                        fillRule = path;
                    }
                }
                if (fillRule) {
                    nativeFill.call(this, fillRule);
                }
                else {
                    nativeFill.call(this);
                }
            });
            var nativeStroke = CanvasRenderingContext2D.prototype.stroke;
            CanvasRenderingContext2D.prototype.stroke = (function (path, fillRule) {
                if (arguments.length) {
                    if (path instanceof Path) {
                        Path._apply(path, this);
                    }
                    else {
                        fillRule = path;
                    }
                }
                if (fillRule) {
                    nativeStroke.call(this, fillRule);
                }
                else {
                    nativeStroke.call(this);
                }
            });
            var nativeClip = CanvasRenderingContext2D.prototype.clip;
            CanvasRenderingContext2D.prototype.clip = (function (path, fillRule) {
                if (arguments.length) {
                    if (path instanceof Path) {
                        Path._apply(path, this);
                    }
                    else {
                        fillRule = path;
                    }
                }
                if (fillRule) {
                    nativeClip.call(this, fillRule);
                }
                else {
                    nativeClip.call(this);
                }
            });
            window['Path2D'] = Path;
        }
        if (typeof CanvasPattern !== "undefined") {
            if (Path2D.prototype.addPath) {
                function setTransform(matrix) {
                    this._transform = matrix;
                    if (this._template) {
                        this._template._transform = matrix;
                    }
                }
                if (!CanvasPattern.prototype.setTransform) {
                    CanvasPattern.prototype.setTransform = setTransform;
                }
                if (!CanvasGradient.prototype.setTransform) {
                    CanvasGradient.prototype.setTransform = setTransform;
                }
                var originalFill = CanvasRenderingContext2D.prototype.fill;
                var originalStroke = CanvasRenderingContext2D.prototype.stroke;
                CanvasRenderingContext2D.prototype.fill = (function fill(path, fillRule) {
                    var supportsStyle = this.fillStyle instanceof CanvasPattern || this.fillStyle instanceof CanvasGradient;
                    var hasStyleTransformation = !!this.fillStyle._transform;
                    if (supportsStyle && hasStyleTransformation && path instanceof Path2D) {
                        var m = this.fillStyle._transform;
                        var i;
                        try {
                            i = m.inverse();
                        }
                        catch (e) {
                            i = m = GFX.Geometry.Matrix.createIdentitySVGMatrix();
                        }
                        this.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                        var transformedPath = new Path2D();
                        transformedPath.addPath(path, i);
                        originalFill.call(this, transformedPath, fillRule);
                        this.transform(i.a, i.b, i.c, i.d, i.e, i.f);
                        return;
                    }
                    if (arguments.length === 0) {
                        originalFill.call(this);
                    }
                    else if (arguments.length === 1) {
                        originalFill.call(this, path);
                    }
                    else if (arguments.length === 2) {
                        originalFill.call(this, path, fillRule);
                    }
                });
                CanvasRenderingContext2D.prototype.stroke = (function stroke(path) {
                    var supportsStyle = this.strokeStyle instanceof CanvasPattern || this.strokeStyle instanceof CanvasGradient;
                    var hasStyleTransformation = !!this.strokeStyle._transform;
                    if (supportsStyle && hasStyleTransformation && path instanceof Path2D) {
                        var m = this.strokeStyle._transform;
                        var i = m.inverse();
                        this.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                        var transformedPath = new Path2D();
                        transformedPath.addPath(path, i);
                        var oldLineWidth = this.lineWidth;
                        this.lineWidth *= (i.a + i.d) / 2;
                        originalStroke.call(this, transformedPath);
                        this.transform(i.a, i.b, i.c, i.d, i.e, i.f);
                        this.lineWidth = oldLineWidth;
                        return;
                    }
                    if (arguments.length === 0) {
                        originalStroke.call(this);
                    }
                    else if (arguments.length === 1) {
                        originalStroke.call(this, path);
                    }
                });
            }
        }
        if (typeof CanvasRenderingContext2D !== 'undefined') {
            (function () {
                var MIN_LINE_WIDTH = 1;
                var MAX_LINE_WIDTH = 1024;
                function getDeterminant(matrix) {
                    return matrix.a * matrix.d - matrix.b * matrix.c;
                }
                function getScaleX(matrix) {
                    return matrix.a;
                    if (matrix.a === 1 && matrix.b === 0) {
                        return 1;
                    }
                    var result = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
                    return getDeterminant(matrix) < 0 ? -result : result;
                }
                function getScaleY(matrix) {
                    return matrix.d;
                    if (matrix.c === 0 && matrix.d === 1) {
                        return 1;
                    }
                    var result = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
                    return getDeterminant(matrix) < 0 ? -result : result;
                }
                CanvasRenderingContext2D.prototype.flashStroke = (function (path, lineScaleMode) {
                    var m = this.currentTransform;
                    if (!m) {
                        var mozCurrentTransform = this.mozCurrentTransform;
                        if (mozCurrentTransform) {
                            m = GFX.Geometry.Matrix.createSVGMatrixFromArray(mozCurrentTransform);
                        }
                        else {
                            this.stroke(path);
                            return;
                        }
                    }
                    var transformedPath = new Path2D();
                    transformedPath.addPath(path, m);
                    var oldLineWidth = this.lineWidth;
                    this.setTransform(1, 0, 0, 1, 0, 0);
                    switch (lineScaleMode) {
                        case 0 /* None */:
                            break;
                        case 1 /* Normal */:
                            this.lineWidth = clamp(oldLineWidth * (getScaleX(m) + getScaleY(m)) / 2, MIN_LINE_WIDTH, MAX_LINE_WIDTH);
                            break;
                        case 2 /* Vertical */:
                            this.lineWidth = clamp(oldLineWidth * getScaleY(m), MIN_LINE_WIDTH, MAX_LINE_WIDTH);
                            break;
                        case 3 /* Horizontal */:
                            this.lineWidth = clamp(oldLineWidth * getScaleX(m), MIN_LINE_WIDTH, MAX_LINE_WIDTH);
                            break;
                    }
                    this.stroke(transformedPath);
                    this.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
                    this.lineWidth = oldLineWidth;
                });
            })();
        }
        if (typeof CanvasRenderingContext2D !== 'undefined' && CanvasRenderingContext2D.prototype.globalColorMatrix === undefined) {
            var previousFill = CanvasRenderingContext2D.prototype.fill;
            var previousStroke = CanvasRenderingContext2D.prototype.stroke;
            var previousFillText = CanvasRenderingContext2D.prototype.fillText;
            var previousStrokeText = CanvasRenderingContext2D.prototype.strokeText;
            Object.defineProperty(CanvasRenderingContext2D.prototype, "globalColorMatrix", {
                get: function () {
                    if (this._globalColorMatrix) {
                        return this._globalColorMatrix.clone();
                    }
                    return null;
                },
                set: function (matrix) {
                    if (!matrix) {
                        this._globalColorMatrix = null;
                        return;
                    }
                    if (this._globalColorMatrix) {
                        this._globalColorMatrix.set(matrix);
                    }
                    else {
                        this._globalColorMatrix = matrix.clone();
                    }
                },
                enumerable: true,
                configurable: true
            });
            CanvasRenderingContext2D.prototype.fill = (function (a, b) {
                var oldFillStyle = null;
                if (this._globalColorMatrix) {
                    oldFillStyle = this.fillStyle;
                    this.fillStyle = transformStyle(this, this.fillStyle, this._globalColorMatrix);
                }
                if (arguments.length === 0) {
                    previousFill.call(this);
                }
                else if (arguments.length === 1) {
                    previousFill.call(this, a);
                }
                else if (arguments.length === 2) {
                    previousFill.call(this, a, b);
                }
                if (oldFillStyle) {
                    this.fillStyle = oldFillStyle;
                }
            });
            CanvasRenderingContext2D.prototype.stroke = (function (a, b) {
                var oldStrokeStyle = null;
                if (this._globalColorMatrix) {
                    oldStrokeStyle = this.strokeStyle;
                    this.strokeStyle = transformStyle(this, this.strokeStyle, this._globalColorMatrix);
                }
                if (arguments.length === 0) {
                    previousStroke.call(this);
                }
                else if (arguments.length === 1) {
                    previousStroke.call(this, a);
                }
                if (oldStrokeStyle) {
                    this.strokeStyle = oldStrokeStyle;
                }
            });
            CanvasRenderingContext2D.prototype.fillText = (function (text, x, y, maxWidth) {
                var oldFillStyle = null;
                if (this._globalColorMatrix) {
                    oldFillStyle = this.fillStyle;
                    this.fillStyle = transformStyle(this, this.fillStyle, this._globalColorMatrix);
                }
                if (arguments.length === 3) {
                    previousFillText.call(this, text, x, y);
                }
                else if (arguments.length === 4) {
                    previousFillText.call(this, text, x, y, maxWidth);
                }
                else {
                    Shumway.Debug.unexpected();
                }
                if (oldFillStyle) {
                    this.fillStyle = oldFillStyle;
                }
            });
            CanvasRenderingContext2D.prototype.strokeText = (function (text, x, y, maxWidth) {
                var oldStrokeStyle = null;
                if (this._globalColorMatrix) {
                    oldStrokeStyle = this.strokeStyle;
                    this.strokeStyle = transformStyle(this, this.strokeStyle, this._globalColorMatrix);
                }
                if (arguments.length === 3) {
                    previousStrokeText.call(this, text, x, y);
                }
                else if (arguments.length === 4) {
                    previousStrokeText.call(this, text, x, y, maxWidth);
                }
                else {
                    Shumway.Debug.unexpected();
                }
                if (oldStrokeStyle) {
                    this.strokeStyle = oldStrokeStyle;
                }
            });
        }
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var ScreenShot = (function () {
            function ScreenShot(dataURL, w, h) {
                this.dataURL = dataURL;
                this.w = w;
                this.h = h;
            }
            return ScreenShot;
        })();
        GFX.ScreenShot = ScreenShot;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var assert = Shumway.Debug.assert;
    var LRUList = (function () {
        function LRUList() {
            this._count = 0;
            this._head = this._tail = null;
        }
        Object.defineProperty(LRUList.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LRUList.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: true,
            configurable: true
        });
        LRUList.prototype._unshift = function (node) {
            release || assert(!node.next && !node.previous);
            if (this._count === 0) {
                this._head = this._tail = node;
            }
            else {
                node.next = this._head;
                node.next.previous = node;
                this._head = node;
            }
            this._count++;
        };
        LRUList.prototype._remove = function (node) {
            release || assert(this._count > 0);
            if (node === this._head && node === this._tail) {
                this._head = this._tail = null;
            }
            else if (node === this._head) {
                this._head = (node.next);
                this._head.previous = null;
            }
            else if (node == this._tail) {
                this._tail = (node.previous);
                this._tail.next = null;
            }
            else {
                node.previous.next = node.next;
                node.next.previous = node.previous;
            }
            node.previous = node.next = null;
            this._count--;
        };
        LRUList.prototype.use = function (node) {
            if (this._head === node) {
                return;
            }
            if (node.next || node.previous || this._tail === node) {
                this._remove(node);
            }
            this._unshift(node);
        };
        LRUList.prototype.pop = function () {
            if (!this._tail) {
                return null;
            }
            var node = this._tail;
            this._remove(node);
            return node;
        };
        LRUList.prototype.visit = function (callback, forward) {
            if (forward === void 0) { forward = true; }
            var node = (forward ? this._head : this._tail);
            while (node) {
                if (!callback(node)) {
                    break;
                }
                node = (forward ? node.next : node.previous);
            }
        };
        return LRUList;
    })();
    Shumway.LRUList = LRUList;
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Option = Shumway.Options.Option;
        var OptionSet = Shumway.Options.OptionSet;
        var shumwayOptions = Shumway.Settings.shumwayOptions;
        var rendererOptions = shumwayOptions.register(new OptionSet("Renderer Options"));
        GFX.imageUpdateOption = rendererOptions.register(new Option("", "imageUpdate", "boolean", true, "Enable image updating."));
        GFX.imageConvertOption = rendererOptions.register(new Option("", "imageConvert", "boolean", true, "Enable image conversion."));
        GFX.stageOptions = shumwayOptions.register(new OptionSet("Stage Renderer Options"));
        GFX.forcePaint = GFX.stageOptions.register(new Option("", "forcePaint", "boolean", false, "Force repainting."));
        GFX.ignoreViewport = GFX.stageOptions.register(new Option("", "ignoreViewport", "boolean", false, "Cull elements outside of the viewport."));
        GFX.viewportLoupeDiameter = GFX.stageOptions.register(new Option("", "viewportLoupeDiameter", "number", 256, "Size of the viewport loupe.", { range: { min: 1, max: 1024, step: 1 } }));
        GFX.disableClipping = GFX.stageOptions.register(new Option("", "disableClipping", "boolean", false, "Disable clipping."));
        GFX.debugClipping = GFX.stageOptions.register(new Option("", "debugClipping", "boolean", false, "Disable clipping."));
        GFX.hud = GFX.stageOptions.register(new Option("", "hud", "boolean", true, "Enable HUD."));
        var webGLOptions = GFX.stageOptions.register(new OptionSet("WebGL Options"));
        GFX.perspectiveCamera = webGLOptions.register(new Option("", "pc", "boolean", false, "Use perspective camera."));
        GFX.perspectiveCameraFOV = webGLOptions.register(new Option("", "pcFOV", "number", 60, "Perspective Camera FOV."));
        GFX.perspectiveCameraDistance = webGLOptions.register(new Option("", "pcDistance", "number", 2, "Perspective Camera Distance."));
        GFX.perspectiveCameraAngle = webGLOptions.register(new Option("", "pcAngle", "number", 0, "Perspective Camera Angle."));
        GFX.perspectiveCameraAngleRotate = webGLOptions.register(new Option("", "pcRotate", "boolean", false, "Rotate Use perspective camera."));
        GFX.perspectiveCameraSpacing = webGLOptions.register(new Option("", "pcSpacing", "number", 0.01, "Element Spacing."));
        GFX.perspectiveCameraSpacingInflate = webGLOptions.register(new Option("", "pcInflate", "boolean", false, "Rotate Use perspective camera."));
        GFX.drawTiles = webGLOptions.register(new Option("", "drawTiles", "boolean", false, "Draw WebGL Tiles"));
        GFX.drawSurfaces = webGLOptions.register(new Option("", "drawSurfaces", "boolean", false, "Draw WebGL Surfaces."));
        GFX.drawSurface = webGLOptions.register(new Option("", "drawSurface", "number", -1, "Draw WebGL Surface #"));
        GFX.drawElements = webGLOptions.register(new Option("", "drawElements", "boolean", true, "Actually call gl.drawElements. This is useful to test if the GPU is the bottleneck."));
        GFX.disableSurfaceUploads = webGLOptions.register(new Option("", "disableSurfaceUploads", "boolean", false, "Disable surface uploads."));
        GFX.premultipliedAlpha = webGLOptions.register(new Option("", "premultipliedAlpha", "boolean", false, "Set the premultipliedAlpha flag on getContext()."));
        GFX.unpackPremultiplyAlpha = webGLOptions.register(new Option("", "unpackPremultiplyAlpha", "boolean", true, "Use UNPACK_PREMULTIPLY_ALPHA_WEBGL in pixelStorei."));
        var factorChoices = {
            ZERO: 0,
            ONE: 1,
            SRC_COLOR: 768,
            ONE_MINUS_SRC_COLOR: 769,
            DST_COLOR: 774,
            ONE_MINUS_DST_COLOR: 775,
            SRC_ALPHA: 770,
            ONE_MINUS_SRC_ALPHA: 771,
            DST_ALPHA: 772,
            ONE_MINUS_DST_ALPHA: 773,
            SRC_ALPHA_SATURATE: 776,
            CONSTANT_COLOR: 32769,
            ONE_MINUS_CONSTANT_COLOR: 32770,
            CONSTANT_ALPHA: 32771,
            ONE_MINUS_CONSTANT_ALPHA: 32772
        };
        GFX.sourceBlendFactor = webGLOptions.register(new Option("", "sourceBlendFactor", "number", factorChoices.ONE, "", { choices: factorChoices }));
        GFX.destinationBlendFactor = webGLOptions.register(new Option("", "destinationBlendFactor", "number", factorChoices.ONE_MINUS_SRC_ALPHA, "", { choices: factorChoices }));
        var canvas2DOptions = GFX.stageOptions.register(new OptionSet("Canvas2D Options"));
        GFX.clipDirtyRegions = canvas2DOptions.register(new Option("", "clipDirtyRegions", "boolean", false, "Clip dirty regions."));
        GFX.clipCanvas = canvas2DOptions.register(new Option("", "clipCanvas", "boolean", false, "Clip Regions."));
        GFX.cull = canvas2DOptions.register(new Option("", "cull", "boolean", false, "Enable culling."));
        GFX.snapToDevicePixels = canvas2DOptions.register(new Option("", "snapToDevicePixels", "boolean", false, ""));
        GFX.imageSmoothing = canvas2DOptions.register(new Option("", "imageSmoothing", "boolean", false, ""));
        GFX.masking = canvas2DOptions.register(new Option("", "masking", "boolean", true, "Composite Mask."));
        GFX.blending = canvas2DOptions.register(new Option("", "blending", "boolean", true, ""));
        GFX.debugLayers = canvas2DOptions.register(new Option("", "debugLayers", "boolean", false, ""));
        GFX.filters = canvas2DOptions.register(new Option("", "filters", "boolean", false, ""));
        GFX.cacheShapes = canvas2DOptions.register(new Option("", "cacheShapes", "boolean", true, ""));
        GFX.cacheShapesMaxSize = canvas2DOptions.register(new Option("", "cacheShapesMaxSize", "number", 256, "", { range: { min: 1, max: 1024, step: 1 } }));
        GFX.cacheShapesThreshold = canvas2DOptions.register(new Option("", "cacheShapesThreshold", "number", 256, "", { range: { min: 1, max: 1024, step: 1 } }));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Geometry;
        (function (Geometry) {
            var clamp = Shumway.NumberUtilities.clamp;
            var pow2 = Shumway.NumberUtilities.pow2;
            var epsilonEquals = Shumway.NumberUtilities.epsilonEquals;
            var assert = Shumway.Debug.assert;
            function radianToDegrees(r) {
                return r * 180 / Math.PI;
            }
            Geometry.radianToDegrees = radianToDegrees;
            function degreesToRadian(d) {
                return d * Math.PI / 180;
            }
            Geometry.degreesToRadian = degreesToRadian;
            function quadraticBezier(from, cp, to, t) {
                var inverseT = 1 - t;
                return from * inverseT * inverseT + 2 * cp * inverseT * t + to * t * t;
            }
            Geometry.quadraticBezier = quadraticBezier;
            function quadraticBezierExtreme(from, cp, to) {
                var t = (from - cp) / (from - 2 * cp + to);
                if (t < 0) {
                    return from;
                }
                if (t > 1) {
                    return to;
                }
                return quadraticBezier(from, cp, to, t);
            }
            Geometry.quadraticBezierExtreme = quadraticBezierExtreme;
            function cubicBezier(from, cp, cp2, to, t) {
                var tSq = t * t;
                var inverseT = 1 - t;
                var inverseTSq = inverseT * inverseT;
                return from * inverseT * inverseTSq + 3 * cp * t * inverseTSq + 3 * cp2 * inverseT * tSq + to * t * tSq;
            }
            Geometry.cubicBezier = cubicBezier;
            function cubicBezierExtremes(from, cp, cp2, to) {
                var d1 = cp - from;
                var d2 = cp2 - cp;
                d2 *= 2;
                var d3 = to - cp2;
                if (d1 + d3 === d2) {
                    d3 *= 1.0001;
                }
                var fHead = 2 * d1 - d2;
                var part1 = d2 - 2 * d1;
                var fCenter = Math.sqrt(part1 * part1 - 4 * d1 * (d1 - d2 + d3));
                var fTail = 2 * (d1 - d2 + d3);
                var t1 = (fHead + fCenter) / fTail;
                var t2 = (fHead - fCenter) / fTail;
                var result = [];
                if (t1 >= 0 && t1 <= 1) {
                    result.push(cubicBezier(from, cp, cp2, to, t1));
                }
                if (t2 >= 0 && t2 <= 1) {
                    result.push(cubicBezier(from, cp, cp2, to, t2));
                }
                return result;
            }
            Geometry.cubicBezierExtremes = cubicBezierExtremes;
            var E = 0.0001;
            function eqFloat(a, b) {
                return Math.abs(a - b) < E;
            }
            var Point = (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Point.prototype.setElements = function (x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                };
                Point.prototype.set = function (other) {
                    this.x = other.x;
                    this.y = other.y;
                    return this;
                };
                Point.prototype.dot = function (other) {
                    return this.x * other.x + this.y * other.y;
                };
                Point.prototype.squaredLength = function () {
                    return this.dot(this);
                };
                Point.prototype.distanceTo = function (other) {
                    return Math.sqrt(this.dot(other));
                };
                Point.prototype.sub = function (other) {
                    this.x -= other.x;
                    this.y -= other.y;
                    return this;
                };
                Point.prototype.mul = function (value) {
                    this.x *= value;
                    this.y *= value;
                    return this;
                };
                Point.prototype.clone = function () {
                    return new Point(this.x, this.y);
                };
                Point.prototype.toString = function (digits) {
                    if (digits === void 0) { digits = 2; }
                    return "{x: " + this.x.toFixed(digits) + ", y: " + this.y.toFixed(digits) + "}";
                };
                Point.prototype.inTriangle = function (a, b, c) {
                    var s = a.y * c.x - a.x * c.y + (c.y - a.y) * this.x + (a.x - c.x) * this.y;
                    var t = a.x * b.y - a.y * b.x + (a.y - b.y) * this.x + (b.x - a.x) * this.y;
                    if ((s < 0) != (t < 0)) {
                        return false;
                    }
                    var T = -b.y * c.x + a.y * (c.x - b.x) + a.x * (b.y - c.y) + b.x * c.y;
                    if (T < 0.0) {
                        s = -s;
                        t = -t;
                        T = -T;
                    }
                    return s > 0 && t > 0 && (s + t) < T;
                };
                Point.createEmpty = function () {
                    return new Point(0, 0);
                };
                Point.createEmptyPoints = function (count) {
                    var result = [];
                    for (var i = 0; i < count; i++) {
                        result.push(new Point(0, 0));
                    }
                    return result;
                };
                return Point;
            })();
            Geometry.Point = Point;
            var Point3D = (function () {
                function Point3D(x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                Point3D.prototype.setElements = function (x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    return this;
                };
                Point3D.prototype.set = function (other) {
                    this.x = other.x;
                    this.y = other.y;
                    this.z = other.z;
                    return this;
                };
                Point3D.prototype.dot = function (other) {
                    return this.x * other.x + this.y * other.y + this.z * other.z;
                };
                Point3D.prototype.cross = function (other) {
                    var x = this.y * other.z - this.z * other.y;
                    var y = this.z * other.x - this.x * other.z;
                    var z = this.x * other.y - this.y * other.x;
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    return this;
                };
                Point3D.prototype.squaredLength = function () {
                    return this.dot(this);
                };
                Point3D.prototype.sub = function (other) {
                    this.x -= other.x;
                    this.y -= other.y;
                    this.z -= other.z;
                    return this;
                };
                Point3D.prototype.mul = function (value) {
                    this.x *= value;
                    this.y *= value;
                    this.z *= value;
                    return this;
                };
                Point3D.prototype.normalize = function () {
                    var length = Math.sqrt(this.squaredLength());
                    if (length > 0.00001) {
                        this.mul(1 / length);
                    }
                    else {
                        this.setElements(0, 0, 0);
                    }
                    return this;
                };
                Point3D.prototype.clone = function () {
                    return new Point3D(this.x, this.y, this.z);
                };
                Point3D.prototype.toString = function (digits) {
                    if (digits === void 0) { digits = 2; }
                    return "{x: " + this.x.toFixed(digits) + ", y: " + this.y.toFixed(digits) + ", z: " + this.z.toFixed(digits) + "}";
                };
                Point3D.createEmpty = function () {
                    return new Point3D(0, 0, 0);
                };
                Point3D.createEmptyPoints = function (count) {
                    var result = [];
                    for (var i = 0; i < count; i++) {
                        result.push(new Point3D(0, 0, 0));
                    }
                    return result;
                };
                return Point3D;
            })();
            Geometry.Point3D = Point3D;
            var Rectangle = (function () {
                function Rectangle(x, y, w, h) {
                    this.setElements(x, y, w, h);
                    Rectangle.allocationCount++;
                }
                Rectangle.prototype.setElements = function (x, y, w, h) {
                    this.x = x;
                    this.y = y;
                    this.w = w;
                    this.h = h;
                };
                Rectangle.prototype.set = function (other) {
                    this.x = other.x;
                    this.y = other.y;
                    this.w = other.w;
                    this.h = other.h;
                };
                Rectangle.prototype.contains = function (other) {
                    var r1 = other.x + other.w;
                    var b1 = other.y + other.h;
                    var r2 = this.x + this.w;
                    var b2 = this.y + this.h;
                    return (other.x >= this.x) && (other.x < r2) && (other.y >= this.y) && (other.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
                };
                Rectangle.prototype.containsPoint = function (point) {
                    return (point.x >= this.x) && (point.x < this.x + this.w) && (point.y >= this.y) && (point.y < this.y + this.h);
                };
                Rectangle.prototype.isContained = function (others) {
                    for (var i = 0; i < others.length; i++) {
                        if (others[i].contains(this)) {
                            return true;
                        }
                    }
                    return false;
                };
                Rectangle.prototype.isSmallerThan = function (other) {
                    return this.w < other.w && this.h < other.h;
                };
                Rectangle.prototype.isLargerThan = function (other) {
                    return this.w > other.w && this.h > other.h;
                };
                Rectangle.prototype.union = function (other) {
                    if (this.isEmpty()) {
                        this.set(other);
                        return;
                    }
                    else if (other.isEmpty()) {
                        return;
                    }
                    var x = this.x, y = this.y;
                    if (this.x > other.x) {
                        x = other.x;
                    }
                    if (this.y > other.y) {
                        y = other.y;
                    }
                    var x0 = this.x + this.w;
                    if (x0 < other.x + other.w) {
                        x0 = other.x + other.w;
                    }
                    var y0 = this.y + this.h;
                    if (y0 < other.y + other.h) {
                        y0 = other.y + other.h;
                    }
                    this.x = x;
                    this.y = y;
                    this.w = x0 - x;
                    this.h = y0 - y;
                };
                Rectangle.prototype.isEmpty = function () {
                    return this.w <= 0 || this.h <= 0;
                };
                Rectangle.prototype.setEmpty = function () {
                    this.x = 0;
                    this.y = 0;
                    this.w = 0;
                    this.h = 0;
                };
                Rectangle.prototype.intersect = function (other) {
                    var result = Rectangle.createEmpty();
                    if (this.isEmpty() || other.isEmpty()) {
                        result.setEmpty();
                        return result;
                    }
                    result.x = Math.max(this.x, other.x);
                    result.y = Math.max(this.y, other.y);
                    result.w = Math.min(this.x + this.w, other.x + other.w) - result.x;
                    result.h = Math.min(this.y + this.h, other.y + other.h) - result.y;
                    if (result.isEmpty()) {
                        result.setEmpty();
                    }
                    this.set(result);
                };
                Rectangle.prototype.intersects = function (other) {
                    if (this.isEmpty() || other.isEmpty()) {
                        return false;
                    }
                    var x = Math.max(this.x, other.x);
                    var y = Math.max(this.y, other.y);
                    var w = Math.min(this.x + this.w, other.x + other.w) - x;
                    var h = Math.min(this.y + this.h, other.y + other.h) - y;
                    return !(w <= 0 || h <= 0);
                };
                Rectangle.prototype.intersectsTransformedAABB = function (other, matrix) {
                    var rectangle = Rectangle._temporary;
                    rectangle.set(other);
                    matrix.transformRectangleAABB(rectangle);
                    return this.intersects(rectangle);
                };
                Rectangle.prototype.intersectsTranslated = function (other, tx, ty) {
                    if (this.isEmpty() || other.isEmpty()) {
                        return false;
                    }
                    var x = Math.max(this.x, other.x + tx);
                    var y = Math.max(this.y, other.y + ty);
                    var w = Math.min(this.x + this.w, other.x + tx + other.w) - x;
                    var h = Math.min(this.y + this.h, other.y + ty + other.h) - y;
                    return !(w <= 0 || h <= 0);
                };
                Rectangle.prototype.area = function () {
                    return this.w * this.h;
                };
                Rectangle.prototype.clone = function () {
                    var rectangle = Rectangle.allocate();
                    rectangle.set(this);
                    return rectangle;
                };
                Rectangle.allocate = function () {
                    var dirtyStack = Rectangle._dirtyStack;
                    if (dirtyStack.length) {
                        return dirtyStack.pop();
                    }
                    else {
                        return new Rectangle(12345, 67890, 12345, 67890);
                    }
                };
                Rectangle.prototype.free = function () {
                    Rectangle._dirtyStack.push(this);
                };
                Rectangle.prototype.snap = function () {
                    var x1 = Math.ceil(this.x + this.w);
                    var y1 = Math.ceil(this.y + this.h);
                    this.x = Math.floor(this.x);
                    this.y = Math.floor(this.y);
                    this.w = x1 - this.x;
                    this.h = y1 - this.y;
                    return this;
                };
                Rectangle.prototype.scale = function (x, y) {
                    this.x *= x;
                    this.y *= y;
                    this.w *= x;
                    this.h *= y;
                    return this;
                };
                Rectangle.prototype.offset = function (x, y) {
                    this.x += x;
                    this.y += y;
                    return this;
                };
                Rectangle.prototype.resize = function (w, h) {
                    this.w += w;
                    this.h += h;
                    return this;
                };
                Rectangle.prototype.expand = function (w, h) {
                    this.offset(-w, -h).resize(2 * w, 2 * h);
                    return this;
                };
                Rectangle.prototype.getCenter = function () {
                    return new Point(this.x + this.w / 2, this.y + this.h / 2);
                };
                Rectangle.prototype.getAbsoluteBounds = function () {
                    return new Rectangle(0, 0, this.w, this.h);
                };
                Rectangle.prototype.toString = function (digits) {
                    if (digits === void 0) { digits = 2; }
                    return "{" + this.x.toFixed(digits) + ", " + this.y.toFixed(digits) + ", " + this.w.toFixed(digits) + ", " + this.h.toFixed(digits) + "}";
                };
                Rectangle.createEmpty = function () {
                    var rectangle = Rectangle.allocate();
                    rectangle.setEmpty();
                    return rectangle;
                };
                Rectangle.createSquare = function (size) {
                    return new Rectangle(-size / 2, -size / 2, size, size);
                };
                Rectangle.createMaxI16 = function () {
                    return new Rectangle(-32768 /* MinI16 */, -32768 /* MinI16 */, 65535 /* MaxU16 */, 65535 /* MaxU16 */);
                };
                Rectangle.prototype.setMaxI16 = function () {
                    this.setElements(-32768 /* MinI16 */, -32768 /* MinI16 */, 65535 /* MaxU16 */, 65535 /* MaxU16 */);
                };
                Rectangle.prototype.getCorners = function (points) {
                    points[0].x = this.x;
                    points[0].y = this.y;
                    points[1].x = this.x + this.w;
                    points[1].y = this.y;
                    points[2].x = this.x + this.w;
                    points[2].y = this.y + this.h;
                    points[3].x = this.x;
                    points[3].y = this.y + this.h;
                };
                Rectangle.allocationCount = 0;
                Rectangle._temporary = new Rectangle(0, 0, 0, 0);
                Rectangle._dirtyStack = [];
                return Rectangle;
            })();
            Geometry.Rectangle = Rectangle;
            var OBB = (function () {
                function OBB(corners) {
                    this.corners = corners.map(function (corner) {
                        return corner.clone();
                    });
                    this.axes = [
                        corners[1].clone().sub(corners[0]),
                        corners[3].clone().sub(corners[0])
                    ];
                    this.origins = [];
                    for (var i = 0; i < 2; i++) {
                        this.axes[i].mul(1 / this.axes[i].squaredLength());
                        this.origins.push(corners[0].dot(this.axes[i]));
                    }
                }
                OBB.prototype.getBounds = function () {
                    return OBB.getBounds(this.corners);
                };
                OBB.getBounds = function (points) {
                    var min = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
                    var max = new Point(Number.MIN_VALUE, Number.MIN_VALUE);
                    for (var i = 0; i < 4; i++) {
                        var x = points[i].x, y = points[i].y;
                        min.x = Math.min(min.x, x);
                        min.y = Math.min(min.y, y);
                        max.x = Math.max(max.x, x);
                        max.y = Math.max(max.y, y);
                    }
                    return new Rectangle(min.x, min.y, max.x - min.x, max.y - min.y);
                };
                OBB.prototype.intersects = function (other) {
                    return this.intersectsOneWay(other) && other.intersectsOneWay(this);
                };
                OBB.prototype.intersectsOneWay = function (other) {
                    for (var i = 0; i < 2; i++) {
                        for (var j = 0; j < 4; j++) {
                            var t = other.corners[j].dot(this.axes[i]);
                            var tMin, tMax;
                            if (j === 0) {
                                tMax = tMin = t;
                            }
                            else {
                                if (t < tMin) {
                                    tMin = t;
                                }
                                else if (t > tMax) {
                                    tMax = t;
                                }
                            }
                        }
                        if ((tMin > 1 + this.origins[i]) || (tMax < this.origins[i])) {
                            return false;
                        }
                    }
                    return true;
                };
                return OBB;
            })();
            Geometry.OBB = OBB;
            (function (MatrixType) {
                MatrixType[MatrixType["Unknown"] = 0x0000] = "Unknown";
                MatrixType[MatrixType["Identity"] = 0x0001] = "Identity";
                MatrixType[MatrixType["Translation"] = 0x0002] = "Translation";
            })(Geometry.MatrixType || (Geometry.MatrixType = {}));
            var MatrixType = Geometry.MatrixType;
            var Matrix = (function () {
                function Matrix(a, b, c, d, tx, ty) {
                    this._data = new Float64Array(6);
                    this._type = 0 /* Unknown */;
                    this.setElements(a, b, c, d, tx, ty);
                    Matrix.allocationCount++;
                }
                Object.defineProperty(Matrix.prototype, "a", {
                    get: function () {
                        return this._data[0];
                    },
                    set: function (a) {
                        this._data[0] = a;
                        this._type = 0 /* Unknown */;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Matrix.prototype, "b", {
                    get: function () {
                        return this._data[1];
                    },
                    set: function (b) {
                        this._data[1] = b;
                        this._type = 0 /* Unknown */;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Matrix.prototype, "c", {
                    get: function () {
                        return this._data[2];
                    },
                    set: function (c) {
                        this._data[2] = c;
                        this._type = 0 /* Unknown */;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Matrix.prototype, "d", {
                    get: function () {
                        return this._data[3];
                    },
                    set: function (d) {
                        this._data[3] = d;
                        this._type = 0 /* Unknown */;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Matrix.prototype, "tx", {
                    get: function () {
                        return this._data[4];
                    },
                    set: function (tx) {
                        this._data[4] = tx;
                        if (this._type === 1 /* Identity */) {
                            this._type = 2 /* Translation */;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Matrix.prototype, "ty", {
                    get: function () {
                        return this._data[5];
                    },
                    set: function (ty) {
                        this._data[5] = ty;
                        if (this._type === 1 /* Identity */) {
                            this._type = 2 /* Translation */;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Matrix.prototype.setElements = function (a, b, c, d, tx, ty) {
                    var m = this._data;
                    m[0] = a;
                    m[1] = b;
                    m[2] = c;
                    m[3] = d;
                    m[4] = tx;
                    m[5] = ty;
                    this._type = 0 /* Unknown */;
                };
                Matrix.prototype.set = function (other) {
                    var m = this._data, n = other._data;
                    m[0] = n[0];
                    m[1] = n[1];
                    m[2] = n[2];
                    m[3] = n[3];
                    m[4] = n[4];
                    m[5] = n[5];
                    this._type = other._type;
                };
                Matrix.prototype.emptyArea = function (query) {
                    var m = this._data;
                    if (m[0] === 0 || m[3] === 0) {
                        return true;
                    }
                    return false;
                };
                Matrix.prototype.infiniteArea = function (query) {
                    var m = this._data;
                    if (Math.abs(m[0]) === Infinity || Math.abs(m[3]) === Infinity) {
                        return true;
                    }
                    return false;
                };
                Matrix.prototype.isEqual = function (other) {
                    if (this._type === 1 /* Identity */ && other._type === 1 /* Identity */) {
                        return true;
                    }
                    var m = this._data, n = other._data;
                    return m[0] === n[0] && m[1] === n[1] && m[2] === n[2] && m[3] === n[3] && m[4] === n[4] && m[5] === n[5];
                };
                Matrix.prototype.clone = function () {
                    var matrix = Matrix.allocate();
                    matrix.set(this);
                    return matrix;
                };
                Matrix.allocate = function () {
                    var dirtyStack = Matrix._dirtyStack;
                    var matrix = null;
                    if (dirtyStack.length) {
                        return dirtyStack.pop();
                    }
                    else {
                        return new Matrix(12345, 12345, 12345, 12345, 12345, 12345);
                    }
                };
                Matrix.prototype.free = function () {
                    Matrix._dirtyStack.push(this);
                };
                Matrix.prototype.transform = function (a, b, c, d, tx, ty) {
                    var m = this._data;
                    var _a = m[0], _b = m[1], _c = m[2], _d = m[3], _tx = m[4], _ty = m[5];
                    m[0] = _a * a + _c * b;
                    m[1] = _b * a + _d * b;
                    m[2] = _a * c + _c * d;
                    m[3] = _b * c + _d * d;
                    m[4] = _a * tx + _c * ty + _tx;
                    m[5] = _b * tx + _d * ty + _ty;
                    this._type = 0 /* Unknown */;
                    return this;
                };
                Matrix.prototype.transformRectangle = function (rectangle, points) {
                    var m = this._data, a = m[0], b = m[1], c = m[2], d = m[3], tx = m[4], ty = m[5];
                    var x = rectangle.x;
                    var y = rectangle.y;
                    var w = rectangle.w;
                    var h = rectangle.h;
                    points[0].x = a * x + c * y + tx;
                    points[0].y = b * x + d * y + ty;
                    points[1].x = a * (x + w) + c * y + tx;
                    points[1].y = b * (x + w) + d * y + ty;
                    points[2].x = a * (x + w) + c * (y + h) + tx;
                    points[2].y = b * (x + w) + d * (y + h) + ty;
                    points[3].x = a * x + c * (y + h) + tx;
                    points[3].y = b * x + d * (y + h) + ty;
                };
                Matrix.prototype.isTranslationOnly = function () {
                    if (this._type === 2 /* Translation */) {
                        return true;
                    }
                    var m = this._data;
                    if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
                        this._type === 2 /* Translation */;
                        return true;
                    }
                    else if (epsilonEquals(m[0], 1) && epsilonEquals(m[1], 0) && epsilonEquals(m[2], 0) && epsilonEquals(m[3], 1)) {
                        this._type === 2 /* Translation */;
                        return true;
                    }
                    return false;
                };
                Matrix.prototype.transformRectangleAABB = function (rectangle) {
                    var m = this._data;
                    if (this._type === 1 /* Identity */) {
                        return;
                    }
                    else if (this._type === 2 /* Translation */) {
                        rectangle.x += m[4];
                        rectangle.y += m[5];
                        return;
                    }
                    var a = m[0], b = m[1], c = m[2], d = m[3], tx = m[4], ty = m[5];
                    var x = rectangle.x;
                    var y = rectangle.y;
                    var w = rectangle.w;
                    var h = rectangle.h;
                    var x0 = a * x + c * y + tx;
                    var y0 = b * x + d * y + ty;
                    var x1 = a * (x + w) + c * y + tx;
                    var y1 = b * (x + w) + d * y + ty;
                    var x2 = a * (x + w) + c * (y + h) + tx;
                    var y2 = b * (x + w) + d * (y + h) + ty;
                    var x3 = a * x + c * (y + h) + tx;
                    var y3 = b * x + d * (y + h) + ty;
                    var tmp = 0;
                    if (x0 > x1) {
                        tmp = x0;
                        x0 = x1;
                        x1 = tmp;
                    }
                    if (x2 > x3) {
                        tmp = x2;
                        x2 = x3;
                        x3 = tmp;
                    }
                    rectangle.x = x0 < x2 ? x0 : x2;
                    rectangle.w = (x1 > x3 ? x1 : x3) - rectangle.x;
                    if (y0 > y1) {
                        tmp = y0;
                        y0 = y1;
                        y1 = tmp;
                    }
                    if (y2 > y3) {
                        tmp = y2;
                        y2 = y3;
                        y3 = tmp;
                    }
                    rectangle.y = y0 < y2 ? y0 : y2;
                    rectangle.h = (y1 > y3 ? y1 : y3) - rectangle.y;
                };
                Matrix.prototype.scale = function (x, y) {
                    var m = this._data;
                    m[0] *= x;
                    m[1] *= y;
                    m[2] *= x;
                    m[3] *= y;
                    m[4] *= x;
                    m[5] *= y;
                    this._type = 0 /* Unknown */;
                    return this;
                };
                Matrix.prototype.scaleClone = function (x, y) {
                    if (x === 1 && y === 1) {
                        return this;
                    }
                    return this.clone().scale(x, y);
                };
                Matrix.prototype.rotate = function (angle) {
                    var m = this._data, a = m[0], b = m[1], c = m[2], d = m[3], tx = m[4], ty = m[5];
                    var cos = Math.cos(angle);
                    var sin = Math.sin(angle);
                    m[0] = cos * a - sin * b;
                    m[1] = sin * a + cos * b;
                    m[2] = cos * c - sin * d;
                    m[3] = sin * c + cos * d;
                    m[4] = cos * tx - sin * ty;
                    m[5] = sin * tx + cos * ty;
                    this._type = 0 /* Unknown */;
                    return this;
                };
                Matrix.prototype.concat = function (other) {
                    if (other._type === 1 /* Identity */) {
                        return this;
                    }
                    var m = this._data, n = other._data;
                    var a = m[0] * n[0];
                    var b = 0.0;
                    var c = 0.0;
                    var d = m[3] * n[3];
                    var tx = m[4] * n[0] + n[4];
                    var ty = m[5] * n[3] + n[5];
                    if (m[1] !== 0.0 || m[2] !== 0.0 || n[1] !== 0.0 || n[2] !== 0.0) {
                        a += m[1] * n[2];
                        d += m[2] * n[1];
                        b += m[0] * n[1] + m[1] * n[3];
                        c += m[2] * n[0] + m[3] * n[2];
                        tx += m[5] * n[2];
                        ty += m[4] * n[1];
                    }
                    m[0] = a;
                    m[1] = b;
                    m[2] = c;
                    m[3] = d;
                    m[4] = tx;
                    m[5] = ty;
                    this._type = 0 /* Unknown */;
                    return this;
                };
                Matrix.prototype.concatClone = function (other) {
                    return this.clone().concat(other);
                };
                Matrix.prototype.preMultiply = function (other) {
                    var m = this._data, n = other._data;
                    if (other._type === 2 /* Translation */ && (this._type & (1 /* Identity */ | 2 /* Translation */))) {
                        m[4] += n[4];
                        m[5] += n[5];
                        this._type = 2 /* Translation */;
                        return;
                    }
                    else if (other._type === 1 /* Identity */) {
                        return;
                    }
                    var a = n[0] * m[0];
                    var b = 0.0;
                    var c = 0.0;
                    var d = n[3] * m[3];
                    var tx = n[4] * m[0] + m[4];
                    var ty = n[5] * m[3] + m[5];
                    if (n[1] !== 0.0 || n[2] !== 0.0 || m[1] !== 0.0 || m[2] !== 0.0) {
                        a += n[1] * m[2];
                        d += n[2] * m[1];
                        b += n[0] * m[1] + n[1] * m[3];
                        c += n[2] * m[0] + n[3] * m[2];
                        tx += n[5] * m[2];
                        ty += n[4] * m[1];
                    }
                    m[0] = a;
                    m[1] = b;
                    m[2] = c;
                    m[3] = d;
                    m[4] = tx;
                    m[5] = ty;
                    this._type = 0 /* Unknown */;
                };
                Matrix.prototype.translate = function (x, y) {
                    var m = this._data;
                    m[4] += x;
                    m[5] += y;
                    if (this._type === 1 /* Identity */) {
                        this._type = 2 /* Translation */;
                    }
                    return this;
                };
                Matrix.prototype.setIdentity = function () {
                    var m = this._data;
                    m[0] = 1;
                    m[1] = 0;
                    m[2] = 0;
                    m[3] = 1;
                    m[4] = 0;
                    m[5] = 0;
                    this._type = 1 /* Identity */;
                };
                Matrix.prototype.isIdentity = function () {
                    if (this._type === 1 /* Identity */) {
                        return true;
                    }
                    var m = this._data;
                    return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
                };
                Matrix.prototype.transformPoint = function (point) {
                    if (this._type === 1 /* Identity */) {
                        return;
                    }
                    var m = this._data;
                    var x = point.x;
                    var y = point.y;
                    point.x = m[0] * x + m[2] * y + m[4];
                    point.y = m[1] * x + m[3] * y + m[5];
                };
                Matrix.prototype.transformPoints = function (points) {
                    if (this._type === 1 /* Identity */) {
                        return;
                    }
                    for (var i = 0; i < points.length; i++) {
                        this.transformPoint(points[i]);
                    }
                };
                Matrix.prototype.deltaTransformPoint = function (point) {
                    if (this._type === 1 /* Identity */) {
                        return;
                    }
                    var m = this._data;
                    var x = point.x;
                    var y = point.y;
                    point.x = m[0] * x + m[2] * y;
                    point.y = m[1] * x + m[3] * y;
                };
                Matrix.prototype.inverse = function (result) {
                    var m = this._data, r = result._data;
                    if (this._type === 1 /* Identity */) {
                        result.setIdentity();
                        return;
                    }
                    else if (this._type === 2 /* Translation */) {
                        r[0] = 1;
                        r[1] = 0;
                        r[2] = 0;
                        r[3] = 1;
                        r[4] = -m[4];
                        r[5] = -m[5];
                        result._type = 2 /* Translation */;
                        return;
                    }
                    var b = m[1];
                    var c = m[2];
                    var tx = m[4];
                    var ty = m[5];
                    if (b === 0 && c === 0) {
                        var a = r[0] = 1 / m[0];
                        var d = r[3] = 1 / m[3];
                        r[1] = 0;
                        r[2] = 0;
                        r[4] = -a * tx;
                        r[5] = -d * ty;
                    }
                    else {
                        var a = m[0];
                        var d = m[3];
                        var determinant = a * d - b * c;
                        if (determinant === 0) {
                            result.setIdentity();
                            return;
                        }
                        determinant = 1 / determinant;
                        r[0] = d * determinant;
                        b = r[1] = -b * determinant;
                        c = r[2] = -c * determinant;
                        d = r[3] = a * determinant;
                        r[4] = -(r[0] * tx + c * ty);
                        r[5] = -(b * tx + d * ty);
                    }
                    result._type = 0 /* Unknown */;
                    return;
                };
                Matrix.prototype.getTranslateX = function () {
                    return this._data[4];
                };
                Matrix.prototype.getTranslateY = function () {
                    return this._data[4];
                };
                Matrix.prototype.getScaleX = function () {
                    var m = this._data;
                    if (m[0] === 1 && m[1] === 0) {
                        return 1;
                    }
                    var result = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
                    return m[0] > 0 ? result : -result;
                };
                Matrix.prototype.getScaleY = function () {
                    var m = this._data;
                    if (m[2] === 0 && m[3] === 1) {
                        return 1;
                    }
                    var result = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
                    return m[3] > 0 ? result : -result;
                };
                Matrix.prototype.getScale = function () {
                    return (this.getScaleX() + this.getScaleY()) / 2;
                };
                Matrix.prototype.getAbsoluteScaleX = function () {
                    return Math.abs(this.getScaleX());
                };
                Matrix.prototype.getAbsoluteScaleY = function () {
                    return Math.abs(this.getScaleY());
                };
                Matrix.prototype.getRotation = function () {
                    var m = this._data;
                    return Math.atan(m[1] / m[0]) * 180 / Math.PI;
                };
                Matrix.prototype.isScaleOrRotation = function () {
                    var m = this._data;
                    return Math.abs(m[0] * m[2] + m[1] * m[3]) < 0.01;
                };
                Matrix.prototype.toString = function (digits) {
                    if (digits === void 0) { digits = 2; }
                    var m = this._data;
                    return "{" + m[0].toFixed(digits) + ", " + m[1].toFixed(digits) + ", " + m[2].toFixed(digits) + ", " + m[3].toFixed(digits) + ", " + m[4].toFixed(digits) + ", " + m[5].toFixed(digits) + "}";
                };
                Matrix.prototype.toWebGLMatrix = function () {
                    var m = this._data;
                    return new Float32Array([
                        m[0],
                        m[1],
                        0,
                        m[2],
                        m[3],
                        0,
                        m[4],
                        m[5],
                        1
                    ]);
                };
                Matrix.prototype.toCSSTransform = function () {
                    var m = this._data;
                    return "matrix(" + m[0] + ", " + m[1] + ", " + m[2] + ", " + m[3] + ", " + m[4] + ", " + m[5] + ")";
                };
                Matrix.createIdentity = function () {
                    var matrix = Matrix.allocate();
                    matrix.setIdentity();
                    return matrix;
                };
                Matrix.prototype.toSVGMatrix = function () {
                    var m = this._data;
                    var matrix = Matrix._svg.createSVGMatrix();
                    matrix.a = m[0];
                    matrix.b = m[1];
                    matrix.c = m[2];
                    matrix.d = m[3];
                    matrix.e = m[4];
                    matrix.f = m[5];
                    return matrix;
                };
                Matrix.prototype.snap = function () {
                    var m = this._data;
                    if (this.isTranslationOnly()) {
                        m[0] = 1;
                        m[1] = 0;
                        m[2] = 0;
                        m[3] = 1;
                        m[4] = Math.round(m[4]);
                        m[5] = Math.round(m[5]);
                        this._type = 2 /* Translation */;
                        return true;
                    }
                    return false;
                };
                Matrix.createIdentitySVGMatrix = function () {
                    return Matrix._svg.createSVGMatrix();
                };
                Matrix.createSVGMatrixFromArray = function (array) {
                    var matrix = Matrix._svg.createSVGMatrix();
                    matrix.a = array[0];
                    matrix.b = array[1];
                    matrix.c = array[2];
                    matrix.d = array[3];
                    matrix.e = array[4];
                    matrix.f = array[5];
                    return matrix;
                };
                Matrix.allocationCount = 0;
                Matrix._dirtyStack = [];
                Matrix._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                Matrix.multiply = function (dst, src) {
                    var n = src._data;
                    dst.transform(n[0], n[1], n[2], n[3], n[4], n[5]);
                };
                return Matrix;
            })();
            Geometry.Matrix = Matrix;
            var Matrix3D = (function () {
                function Matrix3D(m) {
                    this._m = new Float32Array(m);
                }
                Matrix3D.prototype.asWebGLMatrix = function () {
                    return this._m;
                };
                Matrix3D.createCameraLookAt = function (cameraPosition, target, up) {
                    var zAxis = cameraPosition.clone().sub(target).normalize();
                    var xAxis = up.clone().cross(zAxis).normalize();
                    var yAxis = zAxis.clone().cross(xAxis);
                    return new Matrix3D([
                        xAxis.x,
                        xAxis.y,
                        xAxis.z,
                        0,
                        yAxis.x,
                        yAxis.y,
                        yAxis.z,
                        0,
                        zAxis.x,
                        zAxis.y,
                        zAxis.z,
                        0,
                        cameraPosition.x,
                        cameraPosition.y,
                        cameraPosition.z,
                        1
                    ]);
                };
                Matrix3D.createLookAt = function (cameraPosition, target, up) {
                    var zAxis = cameraPosition.clone().sub(target).normalize();
                    var xAxis = up.clone().cross(zAxis).normalize();
                    var yAxis = zAxis.clone().cross(xAxis);
                    return new Matrix3D([
                        xAxis.x,
                        yAxis.x,
                        zAxis.x,
                        0,
                        yAxis.x,
                        yAxis.y,
                        zAxis.y,
                        0,
                        zAxis.x,
                        yAxis.z,
                        zAxis.z,
                        0,
                        -xAxis.dot(cameraPosition),
                        -yAxis.dot(cameraPosition),
                        -zAxis.dot(cameraPosition),
                        1
                    ]);
                };
                Matrix3D.prototype.mul = function (point) {
                    var v = [point.x, point.y, point.z, 0];
                    var m = this._m;
                    var d = [];
                    for (var i = 0; i < 4; i++) {
                        d[i] = 0.0;
                        var row = i * 4;
                        for (var j = 0; j < 4; j++) {
                            d[i] += m[row + j] * v[j];
                        }
                    }
                    return new Point3D(d[0], d[1], d[2]);
                };
                Matrix3D.create2DProjection = function (width, height, depth) {
                    return new Matrix3D([
                        2 / width,
                        0,
                        0,
                        0,
                        0,
                        -2 / height,
                        0,
                        0,
                        0,
                        0,
                        2 / depth,
                        0,
                        -1,
                        1,
                        0,
                        1,
                    ]);
                };
                Matrix3D.createPerspective = function (fieldOfViewInRadians, aspectRatio, near, far) {
                    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
                    var rangeInverse = 1.0 / (near - far);
                    return new Matrix3D([
                        f / aspectRatio,
                        0,
                        0,
                        0,
                        0,
                        f,
                        0,
                        0,
                        0,
                        0,
                        (near + far) * rangeInverse,
                        -1,
                        0,
                        0,
                        near * far * rangeInverse * 2,
                        0
                    ]);
                };
                Matrix3D.createIdentity = function () {
                    return Matrix3D.createTranslation(0, 0, 0);
                };
                Matrix3D.createTranslation = function (tx, ty, tz) {
                    return new Matrix3D([
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        tx,
                        ty,
                        tz,
                        1
                    ]);
                };
                Matrix3D.createXRotation = function (angleInRadians) {
                    var c = Math.cos(angleInRadians);
                    var s = Math.sin(angleInRadians);
                    return new Matrix3D([
                        1,
                        0,
                        0,
                        0,
                        0,
                        c,
                        s,
                        0,
                        0,
                        -s,
                        c,
                        0,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix3D.createYRotation = function (angleInRadians) {
                    var c = Math.cos(angleInRadians);
                    var s = Math.sin(angleInRadians);
                    return new Matrix3D([
                        c,
                        0,
                        -s,
                        0,
                        0,
                        1,
                        0,
                        0,
                        s,
                        0,
                        c,
                        0,
                        0,
                        0,
                        0,
                        1
                    ]);
                };
                Matrix3D.createZRotation = function (angleInRadians) {
                    var c = Math.cos(angleInRadians);
                    var s = Math.sin(angleInRadians);
                    return new Matrix3D([
                        c,
                        s,
                        0,
                        0,
                        -s,
                        c,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                    ]);
                };
                Matrix3D.createScale = function (sx, sy, sz) {
                    return new Matrix3D([
                        sx,
                        0,
                        0,
                        0,
                        0,
                        sy,
                        0,
                        0,
                        0,
                        0,
                        sz,
                        0,
                        0,
                        0,
                        0,
                        1,
                    ]);
                };
                Matrix3D.createMultiply = function (a, b) {
                    var am = a._m;
                    var bm = b._m;
                    var a00 = am[0 * 4 + 0];
                    var a01 = am[0 * 4 + 1];
                    var a02 = am[0 * 4 + 2];
                    var a03 = am[0 * 4 + 3];
                    var a10 = am[1 * 4 + 0];
                    var a11 = am[1 * 4 + 1];
                    var a12 = am[1 * 4 + 2];
                    var a13 = am[1 * 4 + 3];
                    var a20 = am[2 * 4 + 0];
                    var a21 = am[2 * 4 + 1];
                    var a22 = am[2 * 4 + 2];
                    var a23 = am[2 * 4 + 3];
                    var a30 = am[3 * 4 + 0];
                    var a31 = am[3 * 4 + 1];
                    var a32 = am[3 * 4 + 2];
                    var a33 = am[3 * 4 + 3];
                    var b00 = bm[0 * 4 + 0];
                    var b01 = bm[0 * 4 + 1];
                    var b02 = bm[0 * 4 + 2];
                    var b03 = bm[0 * 4 + 3];
                    var b10 = bm[1 * 4 + 0];
                    var b11 = bm[1 * 4 + 1];
                    var b12 = bm[1 * 4 + 2];
                    var b13 = bm[1 * 4 + 3];
                    var b20 = bm[2 * 4 + 0];
                    var b21 = bm[2 * 4 + 1];
                    var b22 = bm[2 * 4 + 2];
                    var b23 = bm[2 * 4 + 3];
                    var b30 = bm[3 * 4 + 0];
                    var b31 = bm[3 * 4 + 1];
                    var b32 = bm[3 * 4 + 2];
                    var b33 = bm[3 * 4 + 3];
                    return new Matrix3D([
                        a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
                        a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
                        a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
                        a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
                        a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
                        a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
                        a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
                        a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
                        a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
                        a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
                        a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
                        a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
                        a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
                        a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
                        a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
                        a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33
                    ]);
                };
                Matrix3D.createInverse = function (a) {
                    var m = a._m;
                    var m00 = m[0 * 4 + 0];
                    var m01 = m[0 * 4 + 1];
                    var m02 = m[0 * 4 + 2];
                    var m03 = m[0 * 4 + 3];
                    var m10 = m[1 * 4 + 0];
                    var m11 = m[1 * 4 + 1];
                    var m12 = m[1 * 4 + 2];
                    var m13 = m[1 * 4 + 3];
                    var m20 = m[2 * 4 + 0];
                    var m21 = m[2 * 4 + 1];
                    var m22 = m[2 * 4 + 2];
                    var m23 = m[2 * 4 + 3];
                    var m30 = m[3 * 4 + 0];
                    var m31 = m[3 * 4 + 1];
                    var m32 = m[3 * 4 + 2];
                    var m33 = m[3 * 4 + 3];
                    var tmp_0 = m22 * m33;
                    var tmp_1 = m32 * m23;
                    var tmp_2 = m12 * m33;
                    var tmp_3 = m32 * m13;
                    var tmp_4 = m12 * m23;
                    var tmp_5 = m22 * m13;
                    var tmp_6 = m02 * m33;
                    var tmp_7 = m32 * m03;
                    var tmp_8 = m02 * m23;
                    var tmp_9 = m22 * m03;
                    var tmp_10 = m02 * m13;
                    var tmp_11 = m12 * m03;
                    var tmp_12 = m20 * m31;
                    var tmp_13 = m30 * m21;
                    var tmp_14 = m10 * m31;
                    var tmp_15 = m30 * m11;
                    var tmp_16 = m10 * m21;
                    var tmp_17 = m20 * m11;
                    var tmp_18 = m00 * m31;
                    var tmp_19 = m30 * m01;
                    var tmp_20 = m00 * m21;
                    var tmp_21 = m20 * m01;
                    var tmp_22 = m00 * m11;
                    var tmp_23 = m10 * m01;
                    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
                    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
                    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
                    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
                    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
                    return new Matrix3D([
                        d * t0,
                        d * t1,
                        d * t2,
                        d * t3,
                        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
                        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
                        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
                        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
                        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
                        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
                        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
                        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
                        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
                        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
                        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
                        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
                    ]);
                };
                return Matrix3D;
            })();
            Geometry.Matrix3D = Matrix3D;
            var DirtyRegion = (function () {
                function DirtyRegion(w, h, sizeInBits) {
                    if (sizeInBits === void 0) { sizeInBits = 7; }
                    var size = this.size = 1 << sizeInBits;
                    this.sizeInBits = sizeInBits;
                    this.w = w;
                    this.h = h;
                    this.c = Math.ceil(w / size);
                    this.r = Math.ceil(h / size);
                    this.grid = [];
                    for (var y = 0; y < this.r; y++) {
                        this.grid.push([]);
                        for (var x = 0; x < this.c; x++) {
                            this.grid[y][x] = new DirtyRegion.Cell(new Rectangle(x * size, y * size, size, size));
                        }
                    }
                }
                DirtyRegion.prototype.clear = function () {
                    for (var y = 0; y < this.r; y++) {
                        for (var x = 0; x < this.c; x++) {
                            this.grid[y][x].clear();
                        }
                    }
                };
                DirtyRegion.prototype.getBounds = function () {
                    return new Rectangle(0, 0, this.w, this.h);
                };
                DirtyRegion.prototype.addDirtyRectangle = function (rectangle) {
                    var x = rectangle.x >> this.sizeInBits;
                    var y = rectangle.y >> this.sizeInBits;
                    if (x >= this.c || y >= this.r) {
                        return;
                    }
                    if (x < 0) {
                        x = 0;
                    }
                    if (y < 0) {
                        y = 0;
                    }
                    var cell = this.grid[y][x];
                    rectangle = rectangle.clone();
                    rectangle.snap();
                    if (cell.region.contains(rectangle)) {
                        if (cell.bounds.isEmpty()) {
                            cell.bounds.set(rectangle);
                        }
                        else if (!cell.bounds.contains(rectangle)) {
                            cell.bounds.union(rectangle);
                        }
                    }
                    else {
                        var w = Math.min(this.c, Math.ceil((rectangle.x + rectangle.w) / this.size)) - x;
                        var h = Math.min(this.r, Math.ceil((rectangle.y + rectangle.h) / this.size)) - y;
                        for (var i = 0; i < w; i++) {
                            for (var j = 0; j < h; j++) {
                                var cell = this.grid[y + j][x + i];
                                var intersection = cell.region.clone();
                                intersection.intersect(rectangle);
                                if (!intersection.isEmpty()) {
                                    this.addDirtyRectangle(intersection);
                                }
                            }
                        }
                    }
                };
                DirtyRegion.prototype.gatherRegions = function (regions) {
                    for (var y = 0; y < this.r; y++) {
                        for (var x = 0; x < this.c; x++) {
                            var bounds = this.grid[y][x].bounds;
                            if (!bounds.isEmpty()) {
                                regions.push(this.grid[y][x].bounds);
                            }
                        }
                    }
                };
                DirtyRegion.prototype.gatherOptimizedRegions = function (regions) {
                    this.gatherRegions(regions);
                };
                DirtyRegion.prototype.getDirtyRatio = function () {
                    var totalArea = this.w * this.h;
                    if (totalArea === 0) {
                        return 0;
                    }
                    var dirtyArea = 0;
                    for (var y = 0; y < this.r; y++) {
                        for (var x = 0; x < this.c; x++) {
                            dirtyArea += this.grid[y][x].region.area();
                        }
                    }
                    return dirtyArea / totalArea;
                };
                DirtyRegion.prototype.render = function (context, options) {
                    function drawRectangle(rectangle) {
                        context.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
                    }
                    if (options && options.drawGrid) {
                        context.strokeStyle = "white";
                        for (var y = 0; y < this.r; y++) {
                            for (var x = 0; x < this.c; x++) {
                                var cell = this.grid[y][x];
                                context.beginPath();
                                drawRectangle(cell.region);
                                context.closePath();
                                context.stroke();
                            }
                        }
                    }
                    context.strokeStyle = "#E0F8D8";
                    for (var y = 0; y < this.r; y++) {
                        for (var x = 0; x < this.c; x++) {
                            var cell = this.grid[y][x];
                            context.beginPath();
                            drawRectangle(cell.bounds);
                            context.closePath();
                            context.stroke();
                        }
                    }
                };
                DirtyRegion.tmpRectangle = Rectangle.createEmpty();
                return DirtyRegion;
            })();
            Geometry.DirtyRegion = DirtyRegion;
            var DirtyRegion;
            (function (DirtyRegion) {
                var Cell = (function () {
                    function Cell(region) {
                        this.region = region;
                        this.bounds = Rectangle.createEmpty();
                    }
                    Cell.prototype.clear = function () {
                        this.bounds.setEmpty();
                    };
                    return Cell;
                })();
                DirtyRegion.Cell = Cell;
            })(DirtyRegion = Geometry.DirtyRegion || (Geometry.DirtyRegion = {}));
            var Tile = (function () {
                function Tile(index, x, y, w, h, scale) {
                    this.index = index;
                    this.x = x;
                    this.y = y;
                    this.scale = scale;
                    this.bounds = new Rectangle(x * w, y * h, w, h);
                }
                Tile.prototype.getOBB = function () {
                    if (this._obb) {
                        return this._obb;
                    }
                    this.bounds.getCorners(Tile.corners);
                    return this._obb = new OBB(Tile.corners);
                };
                Tile.corners = Point.createEmptyPoints(4);
                return Tile;
            })();
            Geometry.Tile = Tile;
            var TileCache = (function () {
                function TileCache(w, h, tileW, tileH, scale) {
                    this.tileW = tileW;
                    this.tileH = tileH;
                    this.scale = scale;
                    this.w = w;
                    this.h = h;
                    this.rows = Math.ceil(h / tileH);
                    this.columns = Math.ceil(w / tileW);
                    release || assert(this.rows < 2048 && this.columns < 2048);
                    this.tiles = [];
                    var index = 0;
                    for (var y = 0; y < this.rows; y++) {
                        for (var x = 0; x < this.columns; x++) {
                            this.tiles.push(new Tile(index++, x, y, tileW, tileH, scale));
                        }
                    }
                }
                TileCache.prototype.getTiles = function (query, transform) {
                    if (transform.emptyArea(query)) {
                        return [];
                    }
                    else if (transform.infiniteArea(query)) {
                        return this.tiles;
                    }
                    var tileCount = this.columns * this.rows;
                    if (tileCount < 40 && transform.isScaleOrRotation()) {
                        var precise = tileCount > 10;
                        return this.getFewTiles(query, transform, precise);
                    }
                    else {
                        return this.getManyTiles(query, transform);
                    }
                };
                TileCache.prototype.getFewTiles = function (query, transform, precise) {
                    if (precise === void 0) { precise = true; }
                    if (transform.isTranslationOnly() && this.tiles.length === 1) {
                        if (this.tiles[0].bounds.intersectsTranslated(query, transform.tx, transform.ty)) {
                            return [this.tiles[0]];
                        }
                        return [];
                    }
                    transform.transformRectangle(query, TileCache._points);
                    var queryOBB;
                    var queryBounds = new Rectangle(0, 0, this.w, this.h);
                    if (precise) {
                        queryOBB = new OBB(TileCache._points);
                    }
                    queryBounds.intersect(OBB.getBounds(TileCache._points));
                    if (queryBounds.isEmpty()) {
                        return [];
                    }
                    var minX = queryBounds.x / this.tileW | 0;
                    var minY = queryBounds.y / this.tileH | 0;
                    var maxX = Math.ceil((queryBounds.x + queryBounds.w) / this.tileW) | 0;
                    var maxY = Math.ceil((queryBounds.y + queryBounds.h) / this.tileH) | 0;
                    minX = clamp(minX, 0, this.columns);
                    maxX = clamp(maxX, 0, this.columns);
                    minY = clamp(minY, 0, this.rows);
                    maxY = clamp(maxY, 0, this.rows);
                    var tiles = [];
                    for (var x = minX; x < maxX; x++) {
                        for (var y = minY; y < maxY; y++) {
                            var tile = this.tiles[y * this.columns + x];
                            if (tile.bounds.intersects(queryBounds) && (precise ? tile.getOBB().intersects(queryOBB) : true)) {
                                tiles.push(tile);
                            }
                        }
                    }
                    return tiles;
                };
                TileCache.prototype.getManyTiles = function (query, transform) {
                    function intersectX(x, p1, p2) {
                        return (x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;
                    }
                    function appendTiles(tiles, cache, column, startRow, endRow) {
                        if (column < 0 || column >= cache.columns) {
                            return;
                        }
                        var j1 = clamp(startRow, 0, cache.rows);
                        var j2 = clamp(endRow + 1, 0, cache.rows);
                        for (var j = j1; j < j2; j++) {
                            tiles.push(cache.tiles[j * cache.columns + column]);
                        }
                    }
                    var rectPoints = TileCache._points;
                    transform.transformRectangle(query, rectPoints);
                    var i1 = rectPoints[0].x < rectPoints[1].x ? 0 : 1;
                    var i2 = rectPoints[2].x < rectPoints[3].x ? 2 : 3;
                    var i0 = rectPoints[i1].x < rectPoints[i2].x ? i1 : i2;
                    var lines = [];
                    for (var j = 0; j < 5; j++, i0++) {
                        lines.push(rectPoints[i0 % 4]);
                    }
                    if ((lines[1].x - lines[0].x) * (lines[3].y - lines[0].y) < (lines[1].y - lines[0].y) * (lines[3].x - lines[0].x)) {
                        var tmp = lines[1];
                        lines[1] = lines[3];
                        lines[3] = tmp;
                    }
                    var tiles = [];
                    var lastY1, lastY2;
                    var i = Math.floor(lines[0].x / this.tileW);
                    var nextX = (i + 1) * this.tileW;
                    if (lines[2].x < nextX) {
                        lastY1 = Math.min(lines[0].y, lines[1].y, lines[2].y, lines[3].y);
                        lastY2 = Math.max(lines[0].y, lines[1].y, lines[2].y, lines[3].y);
                        var j1 = Math.floor(lastY1 / this.tileH);
                        var j2 = Math.floor(lastY2 / this.tileH);
                        appendTiles(tiles, this, i, j1, j2);
                        return tiles;
                    }
                    var line1 = 0, line2 = 4;
                    var lastSegment1 = false, lastSegment2 = false;
                    if (lines[0].x === lines[1].x || lines[0].x === lines[3].x) {
                        if (lines[0].x === lines[1].x) {
                            lastSegment1 = true;
                            line1++;
                        }
                        else {
                            lastSegment2 = true;
                            line2--;
                        }
                        lastY1 = intersectX(nextX, lines[line1], lines[line1 + 1]);
                        lastY2 = intersectX(nextX, lines[line2], lines[line2 - 1]);
                        var j1 = Math.floor(lines[line1].y / this.tileH);
                        var j2 = Math.floor(lines[line2].y / this.tileH);
                        appendTiles(tiles, this, i, j1, j2);
                        i++;
                    }
                    do {
                        var nextY1, nextY2;
                        var nextSegment1, nextSegment2;
                        if (lines[line1 + 1].x < nextX) {
                            nextY1 = lines[line1 + 1].y;
                            nextSegment1 = true;
                        }
                        else {
                            nextY1 = intersectX(nextX, lines[line1], lines[line1 + 1]);
                            nextSegment1 = false;
                        }
                        if (lines[line2 - 1].x < nextX) {
                            nextY2 = lines[line2 - 1].y;
                            nextSegment2 = true;
                        }
                        else {
                            nextY2 = intersectX(nextX, lines[line2], lines[line2 - 1]);
                            nextSegment2 = false;
                        }
                        var j1 = Math.floor((lines[line1].y < lines[line1 + 1].y ? lastY1 : nextY1) / this.tileH);
                        var j2 = Math.floor((lines[line2].y > lines[line2 - 1].y ? lastY2 : nextY2) / this.tileH);
                        appendTiles(tiles, this, i, j1, j2);
                        if (nextSegment1 && lastSegment1) {
                            break;
                        }
                        if (nextSegment1) {
                            lastSegment1 = true;
                            line1++;
                            lastY1 = intersectX(nextX, lines[line1], lines[line1 + 1]);
                        }
                        else {
                            lastY1 = nextY1;
                        }
                        if (nextSegment2) {
                            lastSegment2 = true;
                            line2--;
                            lastY2 = intersectX(nextX, lines[line2], lines[line2 - 1]);
                        }
                        else {
                            lastY2 = nextY2;
                        }
                        i++;
                        nextX = (i + 1) * this.tileW;
                    } while (line1 < line2);
                    return tiles;
                };
                TileCache._points = Point.createEmptyPoints(4);
                return TileCache;
            })();
            Geometry.TileCache = TileCache;
            var MIN_CACHE_LEVELS = 5;
            var MAX_CACHE_LEVELS = 3;
            var RenderableTileCache = (function () {
                function RenderableTileCache(source, tileSize, minUntiledSize) {
                    this._cacheLevels = [];
                    this._source = source;
                    this._tileSize = tileSize;
                    this._minUntiledSize = minUntiledSize;
                }
                RenderableTileCache.prototype._getTilesAtScale = function (query, transform, scratchBounds) {
                    var transformScale = Math.max(transform.getAbsoluteScaleX(), transform.getAbsoluteScaleY());
                    var level = 0;
                    if (transformScale !== 1) {
                        level = clamp(Math.round(Math.log(1 / transformScale) / Math.LN2), -MIN_CACHE_LEVELS, MAX_CACHE_LEVELS);
                    }
                    var scale = pow2(level);
                    if (this._source.hasFlags(1048576 /* Dynamic */)) {
                        while (true) {
                            scale = pow2(level);
                            if (scratchBounds.contains(this._source.getBounds().getAbsoluteBounds().clone().scale(scale, scale))) {
                                break;
                            }
                            level--;
                            release || assert(level >= -MIN_CACHE_LEVELS);
                        }
                    }
                    if (!(this._source.hasFlags(2097152 /* Scalable */))) {
                        level = clamp(level, -MIN_CACHE_LEVELS, 0);
                    }
                    var scale = pow2(level);
                    var levelIndex = MIN_CACHE_LEVELS + level;
                    var cache = this._cacheLevels[levelIndex];
                    if (!cache) {
                        var bounds = this._source.getBounds().getAbsoluteBounds();
                        var scaledBounds = bounds.clone().scale(scale, scale);
                        var tileW, tileH;
                        if (this._source.hasFlags(1048576 /* Dynamic */) || !this._source.hasFlags(4194304 /* Tileable */) || Math.max(scaledBounds.w, scaledBounds.h) <= this._minUntiledSize) {
                            tileW = scaledBounds.w;
                            tileH = scaledBounds.h;
                        }
                        else {
                            tileW = tileH = this._tileSize;
                        }
                        cache = this._cacheLevels[levelIndex] = new TileCache(scaledBounds.w, scaledBounds.h, tileW, tileH, scale);
                    }
                    return cache.getTiles(query, transform.scaleClone(scale, scale));
                };
                RenderableTileCache.prototype.fetchTiles = function (query, transform, scratchContext, cacheImageCallback) {
                    var scratchBounds = new Rectangle(0, 0, scratchContext.canvas.width, scratchContext.canvas.height);
                    var tiles = this._getTilesAtScale(query, transform, scratchBounds);
                    var uncachedTiles;
                    var source = this._source;
                    for (var i = 0; i < tiles.length; i++) {
                        var tile = tiles[i];
                        if (!tile.cachedSurfaceRegion || !tile.cachedSurfaceRegion.surface || (source.hasFlags(1048576 /* Dynamic */ | 16 /* Dirty */))) {
                            if (!uncachedTiles) {
                                uncachedTiles = [];
                            }
                            uncachedTiles.push(tile);
                        }
                    }
                    if (uncachedTiles) {
                        this._cacheTiles(scratchContext, uncachedTiles, cacheImageCallback, scratchBounds);
                    }
                    source.removeFlags(16 /* Dirty */);
                    return tiles;
                };
                RenderableTileCache.prototype._getTileBounds = function (tiles) {
                    var bounds = Rectangle.createEmpty();
                    for (var i = 0; i < tiles.length; i++) {
                        bounds.union(tiles[i].bounds);
                    }
                    return bounds;
                };
                RenderableTileCache.prototype._cacheTiles = function (scratchContext, uncachedTiles, cacheImageCallback, scratchBounds, maxRecursionDepth) {
                    if (maxRecursionDepth === void 0) { maxRecursionDepth = 4; }
                    release || assert(maxRecursionDepth > 0, "Infinite recursion is likely.");
                    var uncachedTileBounds = this._getTileBounds(uncachedTiles);
                    scratchContext.save();
                    scratchContext.setTransform(1, 0, 0, 1, 0, 0);
                    scratchContext.clearRect(0, 0, scratchBounds.w, scratchBounds.h);
                    scratchContext.translate(-uncachedTileBounds.x, -uncachedTileBounds.y);
                    scratchContext.scale(uncachedTiles[0].scale, uncachedTiles[0].scale);
                    var sourceBounds = this._source.getBounds();
                    scratchContext.translate(-sourceBounds.x, -sourceBounds.y);
                    profile && GFX.timelineBuffer && GFX.timelineBuffer.enter("renderTiles");
                    GFX.traceLevel >= 2 /* Verbose */ && GFX.writer && GFX.writer.writeLn("Rendering Tiles: " + uncachedTileBounds);
                    this._source.render(scratchContext, 0);
                    scratchContext.restore();
                    profile && GFX.timelineBuffer && GFX.timelineBuffer.leave("renderTiles");
                    var remainingUncachedTiles = null;
                    for (var i = 0; i < uncachedTiles.length; i++) {
                        var tile = uncachedTiles[i];
                        var region = tile.bounds.clone();
                        region.x -= uncachedTileBounds.x;
                        region.y -= uncachedTileBounds.y;
                        if (!scratchBounds.contains(region)) {
                            if (!remainingUncachedTiles) {
                                remainingUncachedTiles = [];
                            }
                            remainingUncachedTiles.push(tile);
                        }
                        tile.cachedSurfaceRegion = cacheImageCallback(tile.cachedSurfaceRegion, scratchContext, region);
                    }
                    if (remainingUncachedTiles) {
                        if (remainingUncachedTiles.length >= 2) {
                            var a = remainingUncachedTiles.slice(0, remainingUncachedTiles.length / 2 | 0);
                            var b = remainingUncachedTiles.slice(a.length);
                            this._cacheTiles(scratchContext, a, cacheImageCallback, scratchBounds, maxRecursionDepth - 1);
                            this._cacheTiles(scratchContext, b, cacheImageCallback, scratchBounds, maxRecursionDepth - 1);
                        }
                        else {
                            this._cacheTiles(scratchContext, remainingUncachedTiles, cacheImageCallback, scratchBounds, maxRecursionDepth - 1);
                        }
                    }
                };
                return RenderableTileCache;
            })();
            Geometry.RenderableTileCache = RenderableTileCache;
        })(Geometry = GFX.Geometry || (GFX.Geometry = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var roundToMultipleOfPowerOfTwo = Shumway.IntegerUtilities.roundToMultipleOfPowerOfTwo;
        var assert = Shumway.Debug.assert;
        var Rectangle = GFX.Geometry.Rectangle;
        var RegionAllocator;
        (function (RegionAllocator) {
            var Region = (function (_super) {
                __extends(Region, _super);
                function Region() {
                    _super.apply(this, arguments);
                }
                return Region;
            })(GFX.Geometry.Rectangle);
            RegionAllocator.Region = Region;
            var CompactAllocator = (function () {
                function CompactAllocator(w, h) {
                    this._root = new CompactCell(0, 0, w | 0, h | 0, false);
                }
                CompactAllocator.prototype.allocate = function (w, h) {
                    w = Math.ceil(w);
                    h = Math.ceil(h);
                    release || assert(w > 0 && h > 0);
                    var result = this._root.insert(w, h);
                    if (result) {
                        result.allocator = this;
                        result.allocated = true;
                    }
                    return result;
                };
                CompactAllocator.prototype.free = function (region) {
                    var cell = region;
                    release || assert(cell.allocator === this);
                    cell.clear();
                    region.allocated = false;
                };
                CompactAllocator.RANDOM_ORIENTATION = true;
                CompactAllocator.MAX_DEPTH = 256;
                return CompactAllocator;
            })();
            RegionAllocator.CompactAllocator = CompactAllocator;
            var CompactCell = (function (_super) {
                __extends(CompactCell, _super);
                function CompactCell(x, y, w, h, horizontal) {
                    _super.call(this, x, y, w, h);
                    this._children = null;
                    this._horizontal = horizontal;
                    this.allocated = false;
                }
                CompactCell.prototype.clear = function () {
                    this._children = null;
                    this.allocated = false;
                };
                CompactCell.prototype.insert = function (w, h) {
                    return this._insert(w, h, 0);
                };
                CompactCell.prototype._insert = function (w, h, depth) {
                    if (depth > CompactAllocator.MAX_DEPTH) {
                        return;
                    }
                    if (this.allocated) {
                        return;
                    }
                    if (this.w < w || this.h < h) {
                        return;
                    }
                    if (!this._children) {
                        var orientation = !this._horizontal;
                        if (CompactAllocator.RANDOM_ORIENTATION) {
                            orientation = Math.random() >= 0.5;
                        }
                        if (this._horizontal) {
                            this._children = [
                                new CompactCell(this.x, this.y, this.w, h, false),
                                new CompactCell(this.x, this.y + h, this.w, this.h - h, orientation),
                            ];
                        }
                        else {
                            this._children = [
                                new CompactCell(this.x, this.y, w, this.h, true),
                                new CompactCell(this.x + w, this.y, this.w - w, this.h, orientation),
                            ];
                        }
                        var first = this._children[0];
                        if (first.w === w && first.h === h) {
                            first.allocated = true;
                            return first;
                        }
                        return this._insert(w, h, depth + 1);
                    }
                    else {
                        var result;
                        result = this._children[0]._insert(w, h, depth + 1);
                        if (result) {
                            return result;
                        }
                        result = this._children[1]._insert(w, h, depth + 1);
                        if (result) {
                            return result;
                        }
                    }
                };
                return CompactCell;
            })(RegionAllocator.Region);
            var GridAllocator = (function () {
                function GridAllocator(w, h, sizeW, sizeH) {
                    this._columns = w / sizeW | 0;
                    this._rows = h / sizeH | 0;
                    this._sizeW = sizeW;
                    this._sizeH = sizeH;
                    this._freeList = [];
                    this._index = 0;
                    this._total = this._columns * this._rows;
                }
                GridAllocator.prototype.allocate = function (w, h) {
                    w = Math.ceil(w);
                    h = Math.ceil(h);
                    release || assert(w > 0 && h > 0);
                    var sizeW = this._sizeW;
                    var sizeH = this._sizeH;
                    if (w > sizeW || h > sizeH) {
                        return null;
                    }
                    var freeList = this._freeList;
                    var index = this._index;
                    if (freeList.length > 0) {
                        var cell = freeList.pop();
                        release || assert(cell.allocated === false);
                        cell.w = w;
                        cell.h = h;
                        cell.allocated = true;
                        return cell;
                    }
                    else if (index < this._total) {
                        var y = (index / this._columns) | 0;
                        var x = index - (y * this._columns);
                        var cell = new GridCell(x * sizeW, y * sizeH, w, h);
                        cell.index = index;
                        cell.allocator = this;
                        cell.allocated = true;
                        this._index++;
                        return cell;
                    }
                    return null;
                };
                GridAllocator.prototype.free = function (region) {
                    var cell = region;
                    release || assert(cell.allocator === this);
                    cell.allocated = false;
                    this._freeList.push(cell);
                };
                return GridAllocator;
            })();
            RegionAllocator.GridAllocator = GridAllocator;
            var GridCell = (function (_super) {
                __extends(GridCell, _super);
                function GridCell(x, y, w, h) {
                    _super.call(this, x, y, w, h);
                    this.index = -1;
                }
                return GridCell;
            })(RegionAllocator.Region);
            RegionAllocator.GridCell = GridCell;
            var Bucket = (function () {
                function Bucket(size, region, allocator) {
                    this.size = size;
                    this.region = region;
                    this.allocator = allocator;
                }
                return Bucket;
            })();
            var BucketCell = (function (_super) {
                __extends(BucketCell, _super);
                function BucketCell(x, y, w, h, region) {
                    _super.call(this, x, y, w, h);
                    this.region = region;
                }
                return BucketCell;
            })(RegionAllocator.Region);
            RegionAllocator.BucketCell = BucketCell;
            var BucketAllocator = (function () {
                function BucketAllocator(w, h) {
                    release || assert(w > 0 && h > 0);
                    this._buckets = [];
                    this._w = w | 0;
                    this._h = h | 0;
                    this._filled = 0;
                }
                BucketAllocator.prototype.allocate = function (w, h) {
                    w = Math.ceil(w);
                    h = Math.ceil(h);
                    release || assert(w > 0 && h > 0);
                    var size = Math.max(w, h);
                    if (w > this._w || h > this._h) {
                        return null;
                    }
                    var region = null;
                    var bucket;
                    var buckets = this._buckets;
                    do {
                        for (var i = 0; i < buckets.length; i++) {
                            if (buckets[i].size >= size) {
                                bucket = buckets[i];
                                region = bucket.allocator.allocate(w, h);
                                if (region) {
                                    break;
                                }
                            }
                        }
                        if (!region) {
                            var remainingSpace = this._h - this._filled;
                            if (remainingSpace < h) {
                                return null;
                            }
                            var gridSize = roundToMultipleOfPowerOfTwo(size, 8);
                            var bucketHeight = gridSize * 2;
                            if (bucketHeight > remainingSpace) {
                                bucketHeight = remainingSpace;
                            }
                            if (bucketHeight < gridSize) {
                                return null;
                            }
                            var bucketRegion = new Rectangle(0, this._filled, this._w, bucketHeight);
                            this._buckets.push(new Bucket(gridSize, bucketRegion, new GridAllocator(bucketRegion.w, bucketRegion.h, gridSize, gridSize)));
                            this._filled += bucketHeight;
                        }
                    } while (!region);
                    return new BucketCell(bucket.region.x + region.x, bucket.region.y + region.y, region.w, region.h, region);
                };
                BucketAllocator.prototype.free = function (region) {
                    region.region.allocator.free(region.region);
                };
                return BucketAllocator;
            })();
            RegionAllocator.BucketAllocator = BucketAllocator;
        })(RegionAllocator = GFX.RegionAllocator || (GFX.RegionAllocator = {}));
        var SurfaceRegionAllocator;
        (function (SurfaceRegionAllocator) {
            var SimpleAllocator = (function () {
                function SimpleAllocator(createSurface) {
                    this._createSurface = createSurface;
                    this._surfaces = [];
                }
                Object.defineProperty(SimpleAllocator.prototype, "surfaces", {
                    get: function () {
                        return this._surfaces;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleAllocator.prototype._createNewSurface = function (w, h) {
                    var surface = this._createSurface(w, h);
                    this._surfaces.push(surface);
                    return surface;
                };
                SimpleAllocator.prototype.addSurface = function (surface) {
                    this._surfaces.push(surface);
                };
                SimpleAllocator.prototype.allocate = function (w, h) {
                    for (var i = 0; i < this._surfaces.length; i++) {
                        var region = this._surfaces[i].allocate(w, h);
                        if (region) {
                            return region;
                        }
                    }
                    return this._createNewSurface(w, h).allocate(w, h);
                };
                SimpleAllocator.prototype.free = function (region) {
                };
                return SimpleAllocator;
            })();
            SurfaceRegionAllocator.SimpleAllocator = SimpleAllocator;
        })(SurfaceRegionAllocator = GFX.SurfaceRegionAllocator || (GFX.SurfaceRegionAllocator = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Rectangle = GFX.Geometry.Rectangle;
        var Matrix = GFX.Geometry.Matrix;
        var DirtyRegion = GFX.Geometry.DirtyRegion;
        var assert = Shumway.Debug.assert;
        (function (BlendMode) {
            BlendMode[BlendMode["Normal"] = 1] = "Normal";
            BlendMode[BlendMode["Layer"] = 2] = "Layer";
            BlendMode[BlendMode["Multiply"] = 3] = "Multiply";
            BlendMode[BlendMode["Screen"] = 4] = "Screen";
            BlendMode[BlendMode["Lighten"] = 5] = "Lighten";
            BlendMode[BlendMode["Darken"] = 6] = "Darken";
            BlendMode[BlendMode["Difference"] = 7] = "Difference";
            BlendMode[BlendMode["Add"] = 8] = "Add";
            BlendMode[BlendMode["Subtract"] = 9] = "Subtract";
            BlendMode[BlendMode["Invert"] = 10] = "Invert";
            BlendMode[BlendMode["Alpha"] = 11] = "Alpha";
            BlendMode[BlendMode["Erase"] = 12] = "Erase";
            BlendMode[BlendMode["Overlay"] = 13] = "Overlay";
            BlendMode[BlendMode["HardLight"] = 14] = "HardLight";
        })(GFX.BlendMode || (GFX.BlendMode = {}));
        var BlendMode = GFX.BlendMode;
        (function (NodeFlags) {
            NodeFlags[NodeFlags["None"] = 0x00000] = "None";
            NodeFlags[NodeFlags["BoundsAutoCompute"] = 0x00002] = "BoundsAutoCompute";
            NodeFlags[NodeFlags["IsMask"] = 0x00004] = "IsMask";
            NodeFlags[NodeFlags["Dirty"] = 0x00010] = "Dirty";
            NodeFlags[NodeFlags["InvalidBounds"] = 0x00100] = "InvalidBounds";
            NodeFlags[NodeFlags["InvalidConcatenatedMatrix"] = 0x00200] = "InvalidConcatenatedMatrix";
            NodeFlags[NodeFlags["InvalidInvertedConcatenatedMatrix"] = 0x00400] = "InvalidInvertedConcatenatedMatrix";
            NodeFlags[NodeFlags["InvalidConcatenatedColorMatrix"] = 0x00800] = "InvalidConcatenatedColorMatrix";
            NodeFlags[NodeFlags["UpOnAddedOrRemoved"] = NodeFlags.InvalidBounds | NodeFlags.Dirty] = "UpOnAddedOrRemoved";
            NodeFlags[NodeFlags["UpOnMoved"] = NodeFlags.InvalidBounds | NodeFlags.Dirty] = "UpOnMoved";
            NodeFlags[NodeFlags["DownOnAddedOrRemoved"] = NodeFlags.InvalidConcatenatedMatrix | NodeFlags.InvalidInvertedConcatenatedMatrix | NodeFlags.InvalidConcatenatedColorMatrix] = "DownOnAddedOrRemoved";
            NodeFlags[NodeFlags["DownOnMoved"] = NodeFlags.InvalidConcatenatedMatrix | NodeFlags.InvalidInvertedConcatenatedMatrix | NodeFlags.InvalidConcatenatedColorMatrix] = "DownOnMoved";
            NodeFlags[NodeFlags["UpOnColorMatrixChanged"] = NodeFlags.Dirty] = "UpOnColorMatrixChanged";
            NodeFlags[NodeFlags["DownOnColorMatrixChanged"] = NodeFlags.InvalidConcatenatedColorMatrix] = "DownOnColorMatrixChanged";
            NodeFlags[NodeFlags["Visible"] = 0x10000] = "Visible";
            NodeFlags[NodeFlags["UpOnInvalidate"] = NodeFlags.InvalidBounds | NodeFlags.Dirty] = "UpOnInvalidate";
            NodeFlags[NodeFlags["Default"] = NodeFlags.BoundsAutoCompute | NodeFlags.InvalidBounds | NodeFlags.InvalidConcatenatedMatrix | NodeFlags.InvalidInvertedConcatenatedMatrix | NodeFlags.Visible] = "Default";
            NodeFlags[NodeFlags["CacheAsBitmap"] = 0x20000] = "CacheAsBitmap";
            NodeFlags[NodeFlags["PixelSnapping"] = 0x40000] = "PixelSnapping";
            NodeFlags[NodeFlags["ImageSmoothing"] = 0x80000] = "ImageSmoothing";
            NodeFlags[NodeFlags["Dynamic"] = 0x100000] = "Dynamic";
            NodeFlags[NodeFlags["Scalable"] = 0x200000] = "Scalable";
            NodeFlags[NodeFlags["Tileable"] = 0x400000] = "Tileable";
            NodeFlags[NodeFlags["Loading"] = 0x800000] = "Loading";
            NodeFlags[NodeFlags["Transparent"] = 0x08000] = "Transparent";
        })(GFX.NodeFlags || (GFX.NodeFlags = {}));
        var NodeFlags = GFX.NodeFlags;
        (function (NodeType) {
            NodeType[NodeType["Node"] = 0x0001] = "Node";
            NodeType[NodeType["Shape"] = 0x0003] = "Shape";
            NodeType[NodeType["Group"] = 0x0005] = "Group";
            NodeType[NodeType["Stage"] = 0x000D] = "Stage";
            NodeType[NodeType["Renderable"] = 0x0021] = "Renderable";
        })(GFX.NodeType || (GFX.NodeType = {}));
        var NodeType = GFX.NodeType;
        (function (NodeEventType) {
            NodeEventType[NodeEventType["None"] = 0x0000] = "None";
            NodeEventType[NodeEventType["OnStageBoundsChanged"] = 0x0001] = "OnStageBoundsChanged";
        })(GFX.NodeEventType || (GFX.NodeEventType = {}));
        var NodeEventType = GFX.NodeEventType;
        var NodeVisitor = (function () {
            function NodeVisitor() {
            }
            NodeVisitor.prototype.visitNode = function (node, state) {
            };
            NodeVisitor.prototype.visitShape = function (node, state) {
                this.visitNode(node, state);
            };
            NodeVisitor.prototype.visitGroup = function (node, state) {
                this.visitNode(node, state);
                var children = node.getChildren();
                for (var i = 0; i < children.length; i++) {
                    children[i].visit(this, state);
                }
            };
            NodeVisitor.prototype.visitStage = function (node, state) {
                this.visitGroup(node, state);
            };
            NodeVisitor.prototype.visitRenderable = function (node, state) {
                this.visitNode(node, state);
            };
            return NodeVisitor;
        })();
        GFX.NodeVisitor = NodeVisitor;
        var State = (function () {
            function State() {
            }
            return State;
        })();
        GFX.State = State;
        var MatrixState = (function (_super) {
            __extends(MatrixState, _super);
            function MatrixState() {
                _super.call(this);
                this.matrix = Matrix.createIdentity();
            }
            MatrixState.prototype.transform = function (transform) {
                var state = this.clone();
                state.matrix.preMultiply(transform.getMatrix());
                return state;
            };
            MatrixState.allocate = function () {
                var dirtyStack = MatrixState._dirtyStack;
                var state = null;
                if (dirtyStack.length) {
                    state = dirtyStack.pop();
                }
                return state;
            };
            MatrixState.prototype.clone = function () {
                var state = MatrixState.allocate();
                if (!state) {
                    state = new MatrixState();
                }
                state.set(this);
                return state;
            };
            MatrixState.prototype.set = function (state) {
                this.matrix.set(state.matrix);
            };
            MatrixState.prototype.free = function () {
                MatrixState._dirtyStack.push(this);
            };
            MatrixState._dirtyStack = [];
            return MatrixState;
        })(State);
        GFX.MatrixState = MatrixState;
        var DirtyNodeVisitor = (function (_super) {
            __extends(DirtyNodeVisitor, _super);
            function DirtyNodeVisitor() {
                _super.apply(this, arguments);
                this.isDirty = true;
            }
            DirtyNodeVisitor.prototype.start = function (node, dirtyRegion) {
                this._dirtyRegion = dirtyRegion;
                var state = new MatrixState();
                state.matrix.setIdentity();
                node.visit(this, state);
                state.free();
            };
            DirtyNodeVisitor.prototype.visitGroup = function (node, state) {
                var children = node.getChildren();
                this.visitNode(node, state);
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var childState = state.transform(child.getTransform());
                    child.visit(this, childState);
                    childState.free();
                }
            };
            DirtyNodeVisitor.prototype.visitNode = function (node, state) {
                if (node.hasFlags(16 /* Dirty */)) {
                    this.isDirty = true;
                }
                node.toggleFlags(16 /* Dirty */, false);
            };
            return DirtyNodeVisitor;
        })(NodeVisitor);
        GFX.DirtyNodeVisitor = DirtyNodeVisitor;
        var TracingNodeVisitor = (function (_super) {
            __extends(TracingNodeVisitor, _super);
            function TracingNodeVisitor(writer) {
                _super.call(this);
                this.writer = writer;
            }
            TracingNodeVisitor.prototype.visitNode = function (node, state) {
            };
            TracingNodeVisitor.prototype.visitShape = function (node, state) {
                this.writer.writeLn(node.toString());
                this.visitNode(node, state);
            };
            TracingNodeVisitor.prototype.visitGroup = function (node, state) {
                this.visitNode(node, state);
                var children = node.getChildren();
                this.writer.enter(node.toString() + " " + children.length);
                for (var i = 0; i < children.length; i++) {
                    children[i].visit(this, state);
                }
                this.writer.outdent();
            };
            TracingNodeVisitor.prototype.visitStage = function (node, state) {
                this.visitGroup(node, state);
            };
            return TracingNodeVisitor;
        })(NodeVisitor);
        GFX.TracingNodeVisitor = TracingNodeVisitor;
        var Node = (function () {
            function Node() {
                this._clip = -1;
                this._eventListeners = null;
                this._id = Node._nextId++;
                this._type = 1 /* Node */;
                this._flags = NodeFlags.Default;
                this._index = -1;
                this._parent = null;
                this._bounds = null;
                this._layer = null;
                this._transform = null;
                this._properties = null;
            }
            Object.defineProperty(Node.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Node.prototype._dispatchEvent = function (type) {
                if (!this._eventListeners) {
                    return;
                }
                var listeners = this._eventListeners;
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                    if (listener.type === type) {
                        listener.listener(this, type);
                    }
                }
            };
            Node.prototype.addEventListener = function (type, listener) {
                if (!this._eventListeners) {
                    this._eventListeners = [];
                }
                this._eventListeners.push({ type: type, listener: listener });
            };
            Object.defineProperty(Node.prototype, "properties", {
                get: function () {
                    return this._properties || (this._properties = {});
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "clip", {
                get: function () {
                    return this._clip;
                },
                set: function (value) {
                    this._clip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Node.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                enumerable: true,
                configurable: true
            });
            Node.prototype.getTransformedBounds = function (target) {
                var bounds = this.getBounds(true);
                if (target === this || bounds.isEmpty()) {
                }
                else {
                    var m = this.getTransform().getConcatenatedMatrix();
                    if (target) {
                        var t = target.getTransform().getInvertedConcatenatedMatrix(true);
                        t.preMultiply(m);
                        t.transformRectangleAABB(bounds);
                        t.free();
                    }
                    else {
                        m.transformRectangleAABB(bounds);
                    }
                }
                return bounds;
            };
            Node.prototype._markCurrentBoundsAsDirtyRegion = function () {
                return;
            };
            Node.prototype.getStage = function (withDirtyRegion) {
                if (withDirtyRegion === void 0) { withDirtyRegion = true; }
                var node = this._parent;
                while (node) {
                    if (node.isType(13 /* Stage */)) {
                        var stage = node;
                        if (withDirtyRegion) {
                            if (stage.dirtyRegion) {
                                return stage;
                            }
                        }
                        else {
                            return stage;
                        }
                    }
                    node = node._parent;
                }
                return null;
            };
            Node.prototype.getChildren = function (clone) {
                if (clone === void 0) { clone = false; }
                throw Shumway.Debug.abstractMethod("Node::getChildren");
            };
            Node.prototype.getBounds = function (clone) {
                if (clone === void 0) { clone = false; }
                throw Shumway.Debug.abstractMethod("Node::getBounds");
            };
            Node.prototype.setBounds = function (value) {
                release || assert(!(this._flags & 2 /* BoundsAutoCompute */));
                var bounds = this._bounds || (this._bounds = Rectangle.createEmpty());
                bounds.set(value);
                this.removeFlags(256 /* InvalidBounds */);
            };
            Node.prototype.clone = function () {
                throw Shumway.Debug.abstractMethod("Node::clone");
            };
            Node.prototype.setFlags = function (flags) {
                this._flags |= flags;
            };
            Node.prototype.hasFlags = function (flags) {
                return (this._flags & flags) === flags;
            };
            Node.prototype.hasAnyFlags = function (flags) {
                return !!(this._flags & flags);
            };
            Node.prototype.removeFlags = function (flags) {
                this._flags &= ~flags;
            };
            Node.prototype.toggleFlags = function (flags, on) {
                if (on) {
                    this._flags |= flags;
                }
                else {
                    this._flags &= ~flags;
                }
            };
            Node.prototype._propagateFlagsUp = function (flags) {
                if (flags === 0 /* None */ || this.hasFlags(flags)) {
                    return;
                }
                if (!this.hasFlags(2 /* BoundsAutoCompute */)) {
                    flags &= ~256 /* InvalidBounds */;
                }
                this.setFlags(flags);
                var parent = this._parent;
                if (parent) {
                    parent._propagateFlagsUp(flags);
                }
            };
            Node.prototype._propagateFlagsDown = function (flags) {
                throw Shumway.Debug.abstractMethod("Node::_propagateFlagsDown");
            };
            Node.prototype.isAncestor = function (node) {
                while (node) {
                    if (node === this) {
                        return true;
                    }
                    release || assert(node !== node._parent);
                    node = node._parent;
                }
                return false;
            };
            Node._getAncestors = function (node, last) {
                var path = Node._path;
                path.length = 0;
                while (node && node !== last) {
                    release || assert(node !== node._parent);
                    path.push(node);
                    node = node._parent;
                }
                release || assert(node === last, "Last ancestor is not an ancestor.");
                return path;
            };
            Node.prototype._findClosestAncestor = function (flags, on) {
                var node = this;
                while (node) {
                    if (node.hasFlags(flags) === on) {
                        return node;
                    }
                    release || assert(node !== node._parent);
                    node = node._parent;
                }
                return null;
            };
            Node.prototype.isType = function (type) {
                return this._type === type;
            };
            Node.prototype.isTypeOf = function (type) {
                return (this._type & type) === type;
            };
            Node.prototype.isLeaf = function () {
                return this.isType(33 /* Renderable */) || this.isType(3 /* Shape */);
            };
            Node.prototype.isLinear = function () {
                if (this.isLeaf()) {
                    return true;
                }
                if (this.isType(5 /* Group */)) {
                    var children = this._children;
                    if (children.length === 1 && children[0].isLinear()) {
                        return true;
                    }
                }
                return false;
            };
            Node.prototype.getTransformMatrix = function (clone) {
                if (clone === void 0) { clone = false; }
                return this.getTransform().getMatrix(clone);
            };
            Node.prototype.getTransform = function () {
                if (this._transform === null) {
                    this._transform = new Transform(this);
                }
                return this._transform;
            };
            Node.prototype.getLayer = function () {
                if (this._layer === null) {
                    this._layer = new Layer(this);
                }
                return this._layer;
            };
            Node.prototype.visit = function (visitor, state) {
                switch (this._type) {
                    case 1 /* Node */:
                        visitor.visitNode(this, state);
                        break;
                    case 5 /* Group */:
                        visitor.visitGroup(this, state);
                        break;
                    case 13 /* Stage */:
                        visitor.visitStage(this, state);
                        break;
                    case 3 /* Shape */:
                        visitor.visitShape(this, state);
                        break;
                    case 33 /* Renderable */:
                        visitor.visitRenderable(this, state);
                        break;
                    default:
                        Shumway.Debug.unexpectedCase();
                }
            };
            Node.prototype.invalidate = function () {
                this._markCurrentBoundsAsDirtyRegion();
                this._propagateFlagsUp(NodeFlags.UpOnInvalidate);
            };
            Node.prototype.toString = function (bounds) {
                if (bounds === void 0) { bounds = false; }
                var s = NodeType[this._type] + " " + this._id;
                if (bounds) {
                    s += " " + this._bounds.toString();
                }
                return s;
            };
            Node._path = [];
            Node._nextId = 0;
            return Node;
        })();
        GFX.Node = Node;
        var Group = (function (_super) {
            __extends(Group, _super);
            function Group() {
                _super.call(this);
                this._type = 5 /* Group */;
                this._children = [];
            }
            Group.prototype.getChildren = function (clone) {
                if (clone === void 0) { clone = false; }
                if (clone) {
                    return this._children.slice(0);
                }
                return this._children;
            };
            Group.prototype.childAt = function (index) {
                release || assert(index >= 0 && index < this._children.length);
                return this._children[index];
            };
            Object.defineProperty(Group.prototype, "child", {
                get: function () {
                    release || assert(this._children.length === 1);
                    return this._children[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Group.prototype, "groupChild", {
                get: function () {
                    release || assert(this._children.length === 1);
                    release || assert(this._children[0] instanceof Group);
                    return this._children[0];
                },
                enumerable: true,
                configurable: true
            });
            Group.prototype.addChild = function (node) {
                release || assert(node);
                release || assert(!node.isAncestor(this));
                if (node._parent) {
                    node._parent.removeChildAt(node._index);
                }
                node._parent = this;
                node._index = this._children.length;
                this._children.push(node);
                this._propagateFlagsUp(NodeFlags.UpOnAddedOrRemoved);
                node._propagateFlagsDown(NodeFlags.DownOnAddedOrRemoved);
                node._markCurrentBoundsAsDirtyRegion();
            };
            Group.prototype.removeChildAt = function (index) {
                release || assert(index >= 0 && index < this._children.length);
                var node = this._children[index];
                release || assert(index === node._index);
                node._markCurrentBoundsAsDirtyRegion();
                this._children.splice(index, 1);
                node._index = -1;
                node._parent = null;
                this._propagateFlagsUp(NodeFlags.UpOnAddedOrRemoved);
                node._propagateFlagsDown(NodeFlags.DownOnAddedOrRemoved);
            };
            Group.prototype.clearChildren = function () {
                for (var i = 0; i < this._children.length; i++) {
                    var child = this._children[i];
                    child._markCurrentBoundsAsDirtyRegion();
                    if (child) {
                        child._index = -1;
                        child._parent = null;
                        child._propagateFlagsDown(NodeFlags.DownOnAddedOrRemoved);
                    }
                }
                this._children.length = 0;
                this._propagateFlagsUp(NodeFlags.UpOnAddedOrRemoved);
            };
            Group.prototype._propagateFlagsDown = function (flags) {
                if (this.hasFlags(flags)) {
                    return;
                }
                this.setFlags(flags);
                var children = this._children;
                for (var i = 0; i < children.length; i++) {
                    children[i]._propagateFlagsDown(flags);
                }
            };
            Group.prototype.getBounds = function (clone) {
                if (clone === void 0) { clone = false; }
                var bounds = this._bounds || (this._bounds = Rectangle.createEmpty());
                if (this.hasFlags(256 /* InvalidBounds */)) {
                    bounds.setEmpty();
                    var children = this._children;
                    var childBounds = Rectangle.allocate();
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        childBounds.set(child.getBounds());
                        child.getTransformMatrix().transformRectangleAABB(childBounds);
                        bounds.union(childBounds);
                    }
                    childBounds.free();
                    this.removeFlags(256 /* InvalidBounds */);
                }
                if (clone) {
                    return bounds.clone();
                }
                return bounds;
            };
            return Group;
        })(Node);
        GFX.Group = Group;
        var Transform = (function () {
            function Transform(node) {
                this._node = node;
                this._matrix = Matrix.createIdentity();
                this._colorMatrix = GFX.ColorMatrix.createIdentity();
                this._concatenatedMatrix = Matrix.createIdentity();
                this._invertedConcatenatedMatrix = Matrix.createIdentity();
                this._concatenatedColorMatrix = GFX.ColorMatrix.createIdentity();
            }
            Transform.prototype.setMatrix = function (value) {
                if (this._matrix.isEqual(value)) {
                    return;
                }
                this._node._markCurrentBoundsAsDirtyRegion();
                this._matrix.set(value);
                this._node._propagateFlagsUp(NodeFlags.UpOnMoved);
                this._node._propagateFlagsDown(NodeFlags.DownOnMoved);
                this._node._markCurrentBoundsAsDirtyRegion();
            };
            Transform.prototype.setColorMatrix = function (value) {
                this._colorMatrix.set(value);
                this._node._propagateFlagsUp(NodeFlags.UpOnColorMatrixChanged);
                this._node._propagateFlagsDown(NodeFlags.DownOnColorMatrixChanged);
            };
            Transform.prototype.getMatrix = function (clone) {
                if (clone === void 0) { clone = false; }
                if (clone) {
                    return this._matrix.clone();
                }
                return this._matrix;
            };
            Transform.prototype.hasColorMatrix = function () {
                return this._colorMatrix !== null;
            };
            Transform.prototype.getColorMatrix = function (clone) {
                if (clone === void 0) { clone = false; }
                if (this._colorMatrix === null) {
                    this._colorMatrix = GFX.ColorMatrix.createIdentity();
                }
                if (clone) {
                    return this._colorMatrix.clone();
                }
                return this._colorMatrix;
            };
            Transform.prototype.getConcatenatedMatrix = function (clone) {
                if (clone === void 0) { clone = false; }
                if (this._node.hasFlags(512 /* InvalidConcatenatedMatrix */)) {
                    var ancestor = this._node._findClosestAncestor(512 /* InvalidConcatenatedMatrix */, false);
                    var path = Node._getAncestors(this._node, ancestor);
                    var m = ancestor ? ancestor.getTransform()._concatenatedMatrix.clone() : Matrix.createIdentity();
                    for (var i = path.length - 1; i >= 0; i--) {
                        var ancestor = path[i];
                        var ancestorTransform = ancestor.getTransform();
                        release || assert(ancestor.hasFlags(512 /* InvalidConcatenatedMatrix */));
                        m.preMultiply(ancestorTransform._matrix);
                        ancestorTransform._concatenatedMatrix.set(m);
                        ancestor.removeFlags(512 /* InvalidConcatenatedMatrix */);
                    }
                }
                if (clone) {
                    return this._concatenatedMatrix.clone();
                }
                return this._concatenatedMatrix;
            };
            Transform.prototype.getInvertedConcatenatedMatrix = function (clone) {
                if (clone === void 0) { clone = false; }
                if (this._node.hasFlags(1024 /* InvalidInvertedConcatenatedMatrix */)) {
                    this.getConcatenatedMatrix().inverse(this._invertedConcatenatedMatrix);
                    this._node.removeFlags(1024 /* InvalidInvertedConcatenatedMatrix */);
                }
                if (clone) {
                    return this._invertedConcatenatedMatrix.clone();
                }
                return this._invertedConcatenatedMatrix;
            };
            Transform.prototype.toString = function () {
                return this._matrix.toString();
            };
            return Transform;
        })();
        GFX.Transform = Transform;
        var Layer = (function () {
            function Layer(node) {
                this._node = node;
                this._mask = null;
                this._blendMode = 1 /* Normal */;
            }
            Object.defineProperty(Layer.prototype, "filters", {
                get: function () {
                    return this._filters;
                },
                set: function (value) {
                    this._filters = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layer.prototype, "blendMode", {
                get: function () {
                    return this._blendMode;
                },
                set: function (value) {
                    this._blendMode = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layer.prototype, "mask", {
                get: function () {
                    return this._mask;
                },
                set: function (value) {
                    if (this._mask && this._mask !== value) {
                        this._mask.removeFlags(4 /* IsMask */);
                    }
                    this._mask = value;
                    if (this._mask) {
                        this._mask.setFlags(4 /* IsMask */);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Layer.prototype.toString = function () {
                return BlendMode[this._blendMode];
            };
            return Layer;
        })();
        GFX.Layer = Layer;
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(source) {
                _super.call(this);
                release || assert(source);
                this._source = source;
                this._type = 3 /* Shape */;
                this.ratio = 0;
            }
            Shape.prototype.getBounds = function (clone) {
                if (clone === void 0) { clone = false; }
                var bounds = this._bounds || (this._bounds = Rectangle.createEmpty());
                if (this.hasFlags(256 /* InvalidBounds */)) {
                    bounds.set(this._source.getBounds());
                    this.removeFlags(256 /* InvalidBounds */);
                }
                if (clone) {
                    return bounds.clone();
                }
                return bounds;
            };
            Object.defineProperty(Shape.prototype, "source", {
                get: function () {
                    return this._source;
                },
                enumerable: true,
                configurable: true
            });
            Shape.prototype._propagateFlagsDown = function (flags) {
                this.setFlags(flags);
            };
            Shape.prototype.getChildren = function (clone) {
                if (clone === void 0) { clone = false; }
                return [this._source];
            };
            return Shape;
        })(Node);
        GFX.Shape = Shape;
        var StageAlignFlags = Shumway.Remoting.StageAlignFlags;
        var StageScaleMode = Shumway.Remoting.StageScaleMode;
        function getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var RendererOptions = (function () {
            function RendererOptions() {
                this.debug = false;
                this.paintRenderable = true;
                this.paintBounds = false;
                this.paintDirtyRegion = false;
                this.paintFlashing = false;
                this.paintViewport = false;
            }
            return RendererOptions;
        })();
        GFX.RendererOptions = RendererOptions;
        (function (Backend) {
            Backend[Backend["Canvas2D"] = 0] = "Canvas2D";
            Backend[Backend["WebGL"] = 1] = "WebGL";
            Backend[Backend["Both"] = 2] = "Both";
            Backend[Backend["DOM"] = 3] = "DOM";
            Backend[Backend["SVG"] = 4] = "SVG";
        })(GFX.Backend || (GFX.Backend = {}));
        var Backend = GFX.Backend;
        var Renderer = (function (_super) {
            __extends(Renderer, _super);
            function Renderer(container, stage, options) {
                _super.call(this);
                this._container = container;
                this._stage = stage;
                this._options = options;
                this._viewport = Rectangle.createSquare(1024);
                this._devicePixelRatio = 1;
            }
            Object.defineProperty(Renderer.prototype, "viewport", {
                set: function (viewport) {
                    this._viewport.set(viewport);
                },
                enumerable: true,
                configurable: true
            });
            Renderer.prototype.render = function () {
                throw Shumway.Debug.abstractMethod("Renderer::render");
            };
            Renderer.prototype.resize = function () {
                throw Shumway.Debug.abstractMethod("Renderer::resize");
            };
            Renderer.prototype.screenShot = function (bounds, stageContent) {
                throw Shumway.Debug.abstractMethod("Renderer::screenShot");
            };
            return Renderer;
        })(NodeVisitor);
        GFX.Renderer = Renderer;
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage(w, h, trackDirtyRegion) {
                if (trackDirtyRegion === void 0) { trackDirtyRegion = false; }
                _super.call(this);
                this._dirtyVisitor = new DirtyNodeVisitor();
                this._flags &= ~2 /* BoundsAutoCompute */;
                this._type = 13 /* Stage */;
                this._scaleMode = Stage.DEFAULT_SCALE;
                this._align = Stage.DEFAULT_ALIGN;
                this._content = new Group();
                this._content._flags &= ~2 /* BoundsAutoCompute */;
                this.addChild(this._content);
                this.setFlags(16 /* Dirty */);
                this.setBounds(new Rectangle(0, 0, w, h));
                if (trackDirtyRegion) {
                    this._dirtyRegion = new DirtyRegion(w, h);
                    this._dirtyRegion.addDirtyRectangle(new Rectangle(0, 0, w, h));
                }
                else {
                    this._dirtyRegion = null;
                }
                this._updateContentMatrix();
            }
            Object.defineProperty(Stage.prototype, "dirtyRegion", {
                get: function () {
                    return this._dirtyRegion;
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.setBounds = function (value) {
                _super.prototype.setBounds.call(this, value);
                this._updateContentMatrix();
                this._dispatchEvent(1 /* OnStageBoundsChanged */);
                if (this._dirtyRegion) {
                    this._dirtyRegion = new DirtyRegion(value.w, value.h);
                    this._dirtyRegion.addDirtyRectangle(value);
                }
            };
            Object.defineProperty(Stage.prototype, "content", {
                get: function () {
                    return this._content;
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.readyToRender = function () {
                this._dirtyVisitor.isDirty = false;
                this._dirtyVisitor.start(this, this._dirtyRegion);
                if (this._dirtyVisitor.isDirty) {
                    return true;
                }
                return false;
            };
            Object.defineProperty(Stage.prototype, "align", {
                get: function () {
                    return this._align;
                },
                set: function (value) {
                    this._align = value;
                    this._updateContentMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "scaleMode", {
                get: function () {
                    return this._scaleMode;
                },
                set: function (value) {
                    this._scaleMode = value;
                    this._updateContentMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype._updateContentMatrix = function () {
                if (this._scaleMode === Stage.DEFAULT_SCALE && this._align === Stage.DEFAULT_ALIGN) {
                    this._content.getTransform().setMatrix(new Matrix(1, 0, 0, 1, 0, 0));
                    return;
                }
                var bounds = this.getBounds();
                var contentBounds = this._content.getBounds();
                var wScale = bounds.w / contentBounds.w;
                var hScale = bounds.h / contentBounds.h;
                var scaleX, scaleY;
                switch (this._scaleMode) {
                    case 2 /* NoBorder */:
                        scaleX = scaleY = Math.max(wScale, hScale);
                        break;
                    case 4 /* NoScale */:
                        scaleX = scaleY = 1;
                        break;
                    case 1 /* ExactFit */:
                        scaleX = wScale;
                        scaleY = hScale;
                        break;
                    default:
                        scaleX = scaleY = Math.min(wScale, hScale);
                        break;
                }
                var offsetX;
                if ((this._align & 4 /* Left */)) {
                    offsetX = 0;
                }
                else if ((this._align & 8 /* Right */)) {
                    offsetX = bounds.w - contentBounds.w * scaleX;
                }
                else {
                    offsetX = (bounds.w - contentBounds.w * scaleX) / 2;
                }
                var offsetY;
                if ((this._align & 1 /* Top */)) {
                    offsetY = 0;
                }
                else if ((this._align & 2 /* Bottom */)) {
                    offsetY = bounds.h - contentBounds.h * scaleY;
                }
                else {
                    offsetY = (bounds.h - contentBounds.h * scaleY) / 2;
                }
                this._content.getTransform().setMatrix(new Matrix(scaleX, 0, 0, scaleY, offsetX, offsetY));
            };
            Stage.DEFAULT_SCALE = 4 /* NoScale */;
            Stage.DEFAULT_ALIGN = 4 /* Left */ | 1 /* Top */;
            return Stage;
        })(Group);
        GFX.Stage = Stage;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Rectangle = GFX.Geometry.Rectangle;
        var PathCommand = Shumway.PathCommand;
        var Matrix = GFX.Geometry.Matrix;
        var assertUnreachable = Shumway.Debug.assertUnreachable;
        var assert = Shumway.Debug.assert;
        var unexpected = Shumway.Debug.unexpected;
        var indexOf = Shumway.ArrayUtilities.indexOf;
        var VideoPlaybackEvent = Shumway.Remoting.VideoPlaybackEvent;
        var VideoControlEvent = Shumway.Remoting.VideoControlEvent;
        var Renderable = (function (_super) {
            __extends(Renderable, _super);
            function Renderable() {
                _super.call(this);
                this._parents = [];
                this._renderableParents = [];
                this._invalidateEventListeners = null;
                this._flags &= ~2 /* BoundsAutoCompute */;
                this._type = 33 /* Renderable */;
            }
            Renderable.prototype.addParent = function (frame) {
                release || assert(frame);
                var index = indexOf(this._parents, frame);
                release || assert(index < 0);
                this._parents.push(frame);
            };
            Renderable.prototype.addRenderableParent = function (renderable) {
                release || assert(renderable);
                var index = indexOf(this._renderableParents, renderable);
                release || assert(index < 0);
                this._renderableParents.push(renderable);
            };
            Renderable.prototype.invalidate = function () {
                this.setFlags(16 /* Dirty */);
                var nodes = this._parents;
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].invalidate();
                }
                var renderables = this._renderableParents;
                for (var i = 0; i < renderables.length; i++) {
                    renderables[i].invalidate();
                }
                var listeners = this._invalidateEventListeners;
                if (listeners) {
                    for (var i = 0; i < listeners.length; i++) {
                        listeners[i](this);
                    }
                }
            };
            Renderable.prototype.addInvalidateEventListener = function (listener) {
                if (!this._invalidateEventListeners) {
                    this._invalidateEventListeners = [];
                }
                var index = indexOf(this._invalidateEventListeners, listener);
                release || assert(index < 0);
                this._invalidateEventListeners.push(listener);
            };
            Renderable.prototype.getBounds = function (clone) {
                if (clone === void 0) { clone = false; }
                if (clone) {
                    return this._bounds.clone();
                }
                return this._bounds;
            };
            Renderable.prototype.getChildren = function (clone) {
                if (clone === void 0) { clone = false; }
                return null;
            };
            Renderable.prototype._propagateFlagsUp = function (flags) {
                if (flags === 0 /* None */ || this.hasFlags(flags)) {
                    return;
                }
                for (var i = 0; i < this._parents.length; i++) {
                    this._parents[i]._propagateFlagsUp(flags);
                }
            };
            Renderable.prototype.render = function (context, ratio, cullBounds, paintClip, paintpaintStencil) {
            };
            return Renderable;
        })(GFX.Node);
        GFX.Renderable = Renderable;
        var CustomRenderable = (function (_super) {
            __extends(CustomRenderable, _super);
            function CustomRenderable(bounds, render) {
                _super.call(this);
                this.setBounds(bounds);
                this.render = render;
            }
            return CustomRenderable;
        })(Renderable);
        GFX.CustomRenderable = CustomRenderable;
        var RenderableVideo = (function (_super) {
            __extends(RenderableVideo, _super);
            function RenderableVideo(url, bounds, assetId, eventSerializer) {
                _super.call(this);
                this._flags = 1048576 /* Dynamic */ | 16 /* Dirty */;
                this._lastCurrentTime = 0;
                this._seekHappens = false;
                this.setBounds(bounds);
                this._assetId = assetId;
                this._eventSerializer = eventSerializer;
                var element = document.createElement('video');
                var elementEventHandler = this._handleVideoEvent.bind(this);
                element.preload = 'metadata';
                element.src = url;
                element.addEventListener("play", elementEventHandler);
                element.addEventListener("ended", elementEventHandler);
                element.addEventListener("loadeddata", elementEventHandler);
                element.addEventListener("progress", elementEventHandler);
                element.addEventListener("waiting", elementEventHandler);
                element.addEventListener("loadedmetadata", elementEventHandler);
                element.addEventListener("error", elementEventHandler);
                element.addEventListener("seeking", elementEventHandler);
                this._video = element;
                this._videoEventHandler = elementEventHandler;
                RenderableVideo._renderableVideos.push(this);
                if (typeof registerInspectorAsset !== "undefined") {
                    registerInspectorAsset(-1, -1, this);
                }
                this._notifyNetStream(0 /* Initialized */, null);
            }
            Object.defineProperty(RenderableVideo.prototype, "video", {
                get: function () {
                    return this._video;
                },
                enumerable: true,
                configurable: true
            });
            RenderableVideo.prototype._handleVideoEvent = function (evt) {
                var type;
                var data = null;
                var element = this._video;
                switch (evt.type) {
                    case "play":
                        type = 1 /* PlayStart */;
                        break;
                    case "ended":
                        type = 2 /* PlayStop */;
                        break;
                    case "loadeddata":
                        type = 3 /* BufferFull */;
                        break;
                    case "progress":
                        type = 4 /* Progress */;
                        break;
                    case "waiting":
                        type = 5 /* BufferEmpty */;
                        break;
                    case "loadedmetadata":
                        type = 7 /* Metadata */;
                        data = {
                            videoWidth: element.videoWidth,
                            videoHeight: element.videoHeight,
                            duration: element.duration
                        };
                        break;
                    case "error":
                        type = 6 /* Error */;
                        data = {
                            code: element.error.code
                        };
                        break;
                    case "seeking":
                        type = 8 /* Seeking */;
                        this._seekHappens = true;
                        break;
                    default:
                        return;
                }
                this._notifyNetStream(type, data);
            };
            RenderableVideo.prototype._notifyNetStream = function (eventType, data) {
                this._eventSerializer.sendVideoPlaybackEvent(this._assetId, eventType, data);
            };
            RenderableVideo.prototype.processControlRequest = function (type, data) {
                var videoElement = this._video;
                var ESTIMATED_VIDEO_SECOND_SIZE = 500;
                switch (type) {
                    case 1 /* Pause */:
                        if (videoElement) {
                            if (data.paused && !videoElement.paused) {
                                if (!isNaN(data.time)) {
                                    videoElement.currentTime = data.time;
                                }
                                videoElement.pause();
                            }
                            else if (!data.paused && videoElement.paused) {
                                videoElement.play();
                                if (!isNaN(data.time)) {
                                    videoElement.currentTime = data.time;
                                }
                                if (this._seekHappens) {
                                    this._seekHappens = true;
                                    this._notifyNetStream(3 /* BufferFull */, null);
                                }
                            }
                        }
                        return;
                    case 2 /* Seek */:
                        if (videoElement) {
                            videoElement.currentTime = data.time;
                        }
                        return;
                    case 3 /* GetTime */:
                        return videoElement ? videoElement.currentTime : 0;
                    case 4 /* GetBufferLength */:
                        return videoElement ? videoElement.duration : 0;
                    case 5 /* SetSoundLevels */:
                        if (videoElement) {
                            videoElement.volume = data.volume;
                        }
                        return;
                    case 6 /* GetBytesLoaded */:
                        if (!videoElement) {
                            return 0;
                        }
                        var bufferedTill = -1;
                        if (videoElement.buffered) {
                            for (var i = 0; i < videoElement.buffered.length; i++) {
                                bufferedTill = Math.max(bufferedTill, videoElement.buffered.end(i));
                            }
                        }
                        else {
                            bufferedTill = videoElement.duration;
                        }
                        return Math.round(bufferedTill * ESTIMATED_VIDEO_SECOND_SIZE);
                    case 7 /* GetBytesTotal */:
                        return videoElement ? Math.round(videoElement.duration * ESTIMATED_VIDEO_SECOND_SIZE) : 0;
                }
            };
            RenderableVideo.prototype.checkForUpdate = function () {
                if (this._lastCurrentTime !== this._video.currentTime) {
                    this.invalidate();
                }
                this._lastCurrentTime = this._video.currentTime;
            };
            RenderableVideo.checkForVideoUpdates = function () {
                var renderables = RenderableVideo._renderableVideos;
                for (var i = 0; i < renderables.length; i++) {
                    renderables[i].checkForUpdate();
                }
            };
            RenderableVideo.prototype.render = function (context, ratio, cullBounds) {
                GFX.enterTimeline("RenderableVideo.render");
                var videoElement = this._video;
                if (videoElement && videoElement.videoWidth > 0) {
                    context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight, 0, 0, this._bounds.w, this._bounds.h);
                }
                GFX.leaveTimeline("RenderableVideo.render");
            };
            RenderableVideo._renderableVideos = [];
            return RenderableVideo;
        })(Renderable);
        GFX.RenderableVideo = RenderableVideo;
        var RenderableBitmap = (function (_super) {
            __extends(RenderableBitmap, _super);
            function RenderableBitmap(canvas, bounds) {
                _super.call(this);
                this._flags = 1048576 /* Dynamic */ | 16 /* Dirty */;
                this.properties = {};
                this.setBounds(bounds);
                this._canvas = canvas;
                this._context = this._canvas.getContext("2d");
                this._imageData = this._context.createImageData(this._bounds.w, this._bounds.h);
            }
            RenderableBitmap.FromDataBuffer = function (type, dataBuffer, bounds) {
                GFX.enterTimeline("RenderableBitmap.FromDataBuffer");
                var canvas = document.createElement("canvas");
                canvas.width = bounds.w;
                canvas.height = bounds.h;
                var renderableBitmap = new RenderableBitmap(canvas, bounds);
                renderableBitmap.updateFromDataBuffer(type, dataBuffer);
                GFX.leaveTimeline("RenderableBitmap.FromDataBuffer");
                return renderableBitmap;
            };
            RenderableBitmap.FromNode = function (source, matrix, colorMatrix, blendMode, clipRect) {
                GFX.enterTimeline("RenderableBitmap.FromFrame");
                var canvas = document.createElement("canvas");
                var bounds = source.getBounds();
                canvas.width = bounds.w;
                canvas.height = bounds.h;
                var renderableBitmap = new RenderableBitmap(canvas, bounds);
                renderableBitmap.drawNode(source, matrix, colorMatrix, blendMode, clipRect);
                GFX.leaveTimeline("RenderableBitmap.FromFrame");
                return renderableBitmap;
            };
            RenderableBitmap.prototype.updateFromDataBuffer = function (type, dataBuffer) {
                if (!GFX.imageUpdateOption.value) {
                    return;
                }
                GFX.enterTimeline("RenderableBitmap.updateFromDataBuffer", { length: dataBuffer.length });
                if (type === 4 /* JPEG */ || type === 5 /* PNG */ || type === 6 /* GIF */) {
                    var self = this;
                    self.setFlags(8388608 /* Loading */);
                    var image = new Image();
                    image.src = URL.createObjectURL(dataBuffer.toBlob(Shumway.getMIMETypeForImageType(type)));
                    image.onload = function () {
                        self._context.drawImage(image, 0, 0);
                        self.removeFlags(8388608 /* Loading */);
                        self.invalidate();
                    };
                    image.onerror = function () {
                        unexpected("Image loading error: " + Shumway.ImageType[type]);
                    };
                }
                else {
                    if (GFX.imageConvertOption.value) {
                        GFX.enterTimeline("ColorUtilities.convertImage");
                        Shumway.ColorUtilities.convertImage(type, 3 /* StraightAlphaRGBA */, new Int32Array(dataBuffer.buffer), new Int32Array(this._imageData.data.buffer));
                        GFX.leaveTimeline("ColorUtilities.convertImage");
                    }
                    GFX.enterTimeline("putImageData");
                    this._context.putImageData(this._imageData, 0, 0);
                    GFX.leaveTimeline("putImageData");
                }
                this.invalidate();
                GFX.leaveTimeline("RenderableBitmap.updateFromDataBuffer");
            };
            RenderableBitmap.prototype.readImageData = function (output) {
                var data = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height).data;
                output.writeRawBytes(data);
            };
            RenderableBitmap.prototype.render = function (context, ratio, cullBounds) {
                GFX.enterTimeline("RenderableBitmap.render");
                if (this._canvas) {
                    context.drawImage(this._canvas, 0, 0);
                }
                else {
                    this._renderFallback(context);
                }
                GFX.leaveTimeline("RenderableBitmap.render");
            };
            RenderableBitmap.prototype.drawNode = function (source, matrix, colorMatrix, blendMode, clip) {
                GFX.enterTimeline("RenderableBitmap.drawFrame");
                var Canvas2D = GFX.Canvas2D;
                var bounds = this.getBounds();
                var options = new Canvas2D.Canvas2DRendererOptions();
                var renderer = new Canvas2D.Canvas2DRenderer(this._canvas, null, options);
                renderer.renderNode(source, clip || bounds, matrix);
                GFX.leaveTimeline("RenderableBitmap.drawFrame");
            };
            RenderableBitmap.prototype._renderFallback = function (context) {
                if (!this.fillStyle) {
                    this.fillStyle = Shumway.ColorStyle.randomStyle();
                }
                var bounds = this._bounds;
                context.save();
                context.beginPath();
                context.lineWidth = 2;
                context.fillStyle = this.fillStyle;
                context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                context.restore();
            };
            return RenderableBitmap;
        })(Renderable);
        GFX.RenderableBitmap = RenderableBitmap;
        (function (PathType) {
            PathType[PathType["Fill"] = 0] = "Fill";
            PathType[PathType["Stroke"] = 1] = "Stroke";
            PathType[PathType["StrokeFill"] = 2] = "StrokeFill";
        })(GFX.PathType || (GFX.PathType = {}));
        var PathType = GFX.PathType;
        var StyledPath = (function () {
            function StyledPath(type, style, smoothImage, strokeProperties) {
                this.type = type;
                this.style = style;
                this.smoothImage = smoothImage;
                this.strokeProperties = strokeProperties;
                this.path = new Path2D();
                release || assert((type === 1 /* Stroke */) === !!strokeProperties);
            }
            return StyledPath;
        })();
        GFX.StyledPath = StyledPath;
        var StrokeProperties = (function () {
            function StrokeProperties(thickness, scaleMode, capsStyle, jointsStyle, miterLimit) {
                this.thickness = thickness;
                this.scaleMode = scaleMode;
                this.capsStyle = capsStyle;
                this.jointsStyle = jointsStyle;
                this.miterLimit = miterLimit;
            }
            return StrokeProperties;
        })();
        GFX.StrokeProperties = StrokeProperties;
        function morph(start, end, ratio) {
            return start + (end - start) * ratio;
        }
        function morphColor(start, end, ratio) {
            return morph(start >> 24 & 0xff, end >> 24 & 0xff, ratio) << 24 | morph(start >> 16 & 0xff, end >> 16 & 0xff, ratio) << 16 | morph(start >> 8 & 0xff, end >> 8 & 0xff, ratio) << 8 | morph(start & 0xff, end & 0xff, ratio);
        }
        var RenderableShape = (function (_super) {
            __extends(RenderableShape, _super);
            function RenderableShape(id, pathData, textures, bounds) {
                _super.call(this);
                this._flags = 16 /* Dirty */ | 2097152 /* Scalable */ | 4194304 /* Tileable */;
                this.properties = {};
                this.setBounds(bounds);
                this._id = id;
                this._pathData = pathData;
                this._textures = textures;
                if (textures.length) {
                    this.setFlags(1048576 /* Dynamic */);
                }
            }
            RenderableShape.prototype.update = function (pathData, textures, bounds) {
                this.setBounds(bounds);
                this._pathData = pathData;
                this._paths = null;
                this._textures = textures;
                this.setFlags(1048576 /* Dynamic */);
                this.invalidate();
            };
            RenderableShape.prototype.render = function (context, ratio, cullBounds, paintClip, paintStencil) {
                if (paintClip === void 0) { paintClip = false; }
                if (paintStencil === void 0) { paintStencil = false; }
                var paintStencilStyle = '#FF4981';
                context.fillStyle = context.strokeStyle = 'transparent';
                var textures = this._textures;
                for (var i = 0; i < textures.length; i++) {
                    if (textures[i] && textures[i].hasFlags(8388608 /* Loading */)) {
                        return;
                    }
                }
                var paths = this._deserializePaths(this._pathData, context, ratio);
                release || assert(paths);
                GFX.enterTimeline("RenderableShape.render", this);
                for (var i = 0; i < paths.length; i++) {
                    var path = paths[i];
                    context['mozImageSmoothingEnabled'] = context.msImageSmoothingEnabled = context['imageSmoothingEnabled'] = path.smoothImage;
                    if (path.type === 0 /* Fill */) {
                        context.fillStyle = paintStencil ? paintStencilStyle : path.style;
                        paintClip ? context.clip(path.path, 'evenodd') : context.fill(path.path, 'evenodd');
                        context.fillStyle = 'transparent';
                    }
                    else if (!paintClip && !paintStencil) {
                        context.strokeStyle = path.style;
                        var lineScaleMode = 1 /* Normal */;
                        if (path.strokeProperties) {
                            lineScaleMode = path.strokeProperties.scaleMode;
                            context.lineWidth = path.strokeProperties.thickness;
                            context.lineCap = path.strokeProperties.capsStyle;
                            context.lineJoin = path.strokeProperties.jointsStyle;
                            context.miterLimit = path.strokeProperties.miterLimit;
                        }
                        var lineWidth = context.lineWidth;
                        var isSpecialCaseWidth = lineWidth === 1 || lineWidth === 3;
                        if (isSpecialCaseWidth) {
                            context.translate(0.5, 0.5);
                        }
                        context.flashStroke(path.path, lineScaleMode);
                        if (isSpecialCaseWidth) {
                            context.translate(-0.5, -0.5);
                        }
                        context.strokeStyle = 'transparent';
                    }
                }
                GFX.leaveTimeline("RenderableShape.render");
            };
            RenderableShape.prototype._deserializePaths = function (data, context, ratio) {
                release || assert(data ? !this._paths : this._paths);
                GFX.enterTimeline("RenderableShape.deserializePaths");
                if (this._paths) {
                    return this._paths;
                }
                var paths = this._paths = [];
                var fillPath = null;
                var strokePath = null;
                var x = 0;
                var y = 0;
                var cpX;
                var cpY;
                var formOpen = false;
                var formOpenX = 0;
                var formOpenY = 0;
                var commands = data.commands;
                var coordinates = data.coordinates;
                var styles = data.styles;
                styles.position = 0;
                var coordinatesIndex = 0;
                var commandsCount = data.commandsPosition;
                for (var commandIndex = 0; commandIndex < commandsCount; commandIndex++) {
                    var command = commands[commandIndex];
                    switch (command) {
                        case 9 /* MoveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 2);
                            if (formOpen && fillPath) {
                                fillPath.lineTo(formOpenX, formOpenY);
                                strokePath && strokePath.lineTo(formOpenX, formOpenY);
                            }
                            formOpen = true;
                            x = formOpenX = coordinates[coordinatesIndex++] / 20;
                            y = formOpenY = coordinates[coordinatesIndex++] / 20;
                            fillPath && fillPath.moveTo(x, y);
                            strokePath && strokePath.moveTo(x, y);
                            break;
                        case 10 /* LineTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 2);
                            x = coordinates[coordinatesIndex++] / 20;
                            y = coordinates[coordinatesIndex++] / 20;
                            fillPath && fillPath.lineTo(x, y);
                            strokePath && strokePath.lineTo(x, y);
                            break;
                        case 11 /* CurveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 4);
                            cpX = coordinates[coordinatesIndex++] / 20;
                            cpY = coordinates[coordinatesIndex++] / 20;
                            x = coordinates[coordinatesIndex++] / 20;
                            y = coordinates[coordinatesIndex++] / 20;
                            fillPath && fillPath.quadraticCurveTo(cpX, cpY, x, y);
                            strokePath && strokePath.quadraticCurveTo(cpX, cpY, x, y);
                            break;
                        case 12 /* CubicCurveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 6);
                            cpX = coordinates[coordinatesIndex++] / 20;
                            cpY = coordinates[coordinatesIndex++] / 20;
                            var cpX2 = coordinates[coordinatesIndex++] / 20;
                            var cpY2 = coordinates[coordinatesIndex++] / 20;
                            x = coordinates[coordinatesIndex++] / 20;
                            y = coordinates[coordinatesIndex++] / 20;
                            fillPath && fillPath.bezierCurveTo(cpX, cpY, cpX2, cpY2, x, y);
                            strokePath && strokePath.bezierCurveTo(cpX, cpY, cpX2, cpY2, x, y);
                            break;
                        case 1 /* BeginSolidFill */:
                            release || assert(styles.bytesAvailable >= 4);
                            fillPath = this._createPath(0 /* Fill */, Shumway.ColorUtilities.rgbaToCSSStyle(styles.readUnsignedInt()), false, null, x, y);
                            break;
                        case 3 /* BeginBitmapFill */:
                            var bitmapStyle = this._readBitmap(styles, context);
                            fillPath = this._createPath(0 /* Fill */, bitmapStyle.style, bitmapStyle.smoothImage, null, x, y);
                            break;
                        case 2 /* BeginGradientFill */:
                            fillPath = this._createPath(0 /* Fill */, this._readGradient(styles, context), false, null, x, y);
                            break;
                        case 4 /* EndFill */:
                            fillPath = null;
                            break;
                        case 5 /* LineStyleSolid */:
                            var color = Shumway.ColorUtilities.rgbaToCSSStyle(styles.readUnsignedInt());
                            styles.position += 1;
                            var scaleMode = styles.readByte();
                            var capsStyle = RenderableShape.LINE_CAPS_STYLES[styles.readByte()];
                            var jointsStyle = RenderableShape.LINE_JOINTS_STYLES[styles.readByte()];
                            var strokeProperties = new StrokeProperties(coordinates[coordinatesIndex++] / 20, scaleMode, capsStyle, jointsStyle, styles.readByte());
                            strokePath = this._createPath(1 /* Stroke */, color, false, strokeProperties, x, y);
                            break;
                        case 6 /* LineStyleGradient */:
                            strokePath = this._createPath(2 /* StrokeFill */, this._readGradient(styles, context), false, null, x, y);
                            break;
                        case 7 /* LineStyleBitmap */:
                            var bitmapStyle = this._readBitmap(styles, context);
                            strokePath = this._createPath(2 /* StrokeFill */, bitmapStyle.style, bitmapStyle.smoothImage, null, x, y);
                            break;
                        case 8 /* LineEnd */:
                            strokePath = null;
                            break;
                        default:
                            release || assertUnreachable('Invalid command ' + command + ' encountered at index' + commandIndex + ' of ' + commandsCount);
                    }
                }
                release || assert(styles.bytesAvailable === 0);
                release || assert(commandIndex === commandsCount);
                release || assert(coordinatesIndex === data.coordinatesPosition);
                if (formOpen && fillPath) {
                    fillPath.lineTo(formOpenX, formOpenY);
                    strokePath && strokePath.lineTo(formOpenX, formOpenY);
                }
                this._pathData = null;
                GFX.leaveTimeline("RenderableShape.deserializePaths");
                return paths;
            };
            RenderableShape.prototype._createPath = function (type, style, smoothImage, strokeProperties, x, y) {
                var path = new StyledPath(type, style, smoothImage, strokeProperties);
                this._paths.push(path);
                path.path.moveTo(x, y);
                return path.path;
            };
            RenderableShape.prototype._readMatrix = function (data) {
                return new Matrix(data.readFloat(), data.readFloat(), data.readFloat(), data.readFloat(), data.readFloat(), data.readFloat());
            };
            RenderableShape.prototype._readGradient = function (styles, context) {
                release || assert(styles.bytesAvailable >= 1 + 1 + 6 * 4 + 1 + 1 + 4 + 1 + 1);
                var gradientType = styles.readUnsignedByte();
                var focalPoint = styles.readShort() * 2 / 0xff;
                release || assert(focalPoint >= -1 && focalPoint <= 1);
                var transform = this._readMatrix(styles);
                var gradient = gradientType === 16 /* Linear */ ? context.createLinearGradient(-1, 0, 1, 0) : context.createRadialGradient(focalPoint, 0, 0, 0, 0, 1);
                gradient.setTransform && gradient.setTransform(transform.toSVGMatrix());
                var colorStopsCount = styles.readUnsignedByte();
                for (var i = 0; i < colorStopsCount; i++) {
                    var ratio = styles.readUnsignedByte() / 0xff;
                    var cssColor = Shumway.ColorUtilities.rgbaToCSSStyle(styles.readUnsignedInt());
                    gradient.addColorStop(ratio, cssColor);
                }
                styles.position += 2;
                return gradient;
            };
            RenderableShape.prototype._readBitmap = function (styles, context) {
                release || assert(styles.bytesAvailable >= 4 + 6 * 4 + 1 + 1);
                var textureIndex = styles.readUnsignedInt();
                var fillTransform = this._readMatrix(styles);
                var repeat = styles.readBoolean() ? 'repeat' : 'no-repeat';
                var smooth = styles.readBoolean();
                var texture = this._textures[textureIndex];
                var fillStyle;
                if (texture) {
                    fillStyle = context.createPattern(texture._canvas, repeat);
                    fillStyle.setTransform(fillTransform.toSVGMatrix());
                }
                else {
                    fillStyle = null;
                }
                return { style: fillStyle, smoothImage: smooth };
            };
            RenderableShape.prototype._renderFallback = function (context) {
                if (!this.fillStyle) {
                    this.fillStyle = Shumway.ColorStyle.randomStyle();
                }
                var bounds = this._bounds;
                context.save();
                context.beginPath();
                context.lineWidth = 2;
                context.fillStyle = this.fillStyle;
                context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                context.restore();
            };
            RenderableShape.LINE_CAPS_STYLES = ['round', 'butt', 'square'];
            RenderableShape.LINE_JOINTS_STYLES = ['round', 'bevel', 'miter'];
            return RenderableShape;
        })(Renderable);
        GFX.RenderableShape = RenderableShape;
        var RenderableMorphShape = (function (_super) {
            __extends(RenderableMorphShape, _super);
            function RenderableMorphShape() {
                _super.apply(this, arguments);
                this._flags = 1048576 /* Dynamic */ | 16 /* Dirty */ | 2097152 /* Scalable */ | 4194304 /* Tileable */;
                this._morphPaths = Object.create(null);
            }
            RenderableMorphShape.prototype._deserializePaths = function (data, context, ratio) {
                GFX.enterTimeline("RenderableMorphShape.deserializePaths");
                if (this._morphPaths[ratio]) {
                    return this._morphPaths[ratio];
                }
                var paths = this._morphPaths[ratio] = [];
                var fillPath = null;
                var strokePath = null;
                var x = 0;
                var y = 0;
                var cpX;
                var cpY;
                var formOpen = false;
                var formOpenX = 0;
                var formOpenY = 0;
                var commands = data.commands;
                var coordinates = data.coordinates;
                var morphCoordinates = data.morphCoordinates;
                var styles = data.styles;
                var morphStyles = data.morphStyles;
                styles.position = 0;
                morphStyles.position = 0;
                var coordinatesIndex = 0;
                var commandsCount = data.commandsPosition;
                for (var commandIndex = 0; commandIndex < commandsCount; commandIndex++) {
                    var command = commands[commandIndex];
                    switch (command) {
                        case 9 /* MoveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 2);
                            if (formOpen && fillPath) {
                                fillPath.lineTo(formOpenX, formOpenY);
                                strokePath && strokePath.lineTo(formOpenX, formOpenY);
                            }
                            formOpen = true;
                            x = formOpenX = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            y = formOpenY = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            fillPath && fillPath.moveTo(x, y);
                            strokePath && strokePath.moveTo(x, y);
                            break;
                        case 10 /* LineTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 2);
                            x = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            y = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            fillPath && fillPath.lineTo(x, y);
                            strokePath && strokePath.lineTo(x, y);
                            break;
                        case 11 /* CurveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 4);
                            cpX = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            cpY = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            x = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            y = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            fillPath && fillPath.quadraticCurveTo(cpX, cpY, x, y);
                            strokePath && strokePath.quadraticCurveTo(cpX, cpY, x, y);
                            break;
                        case 12 /* CubicCurveTo */:
                            release || assert(coordinatesIndex <= data.coordinatesPosition - 6);
                            cpX = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            cpY = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            var cpX2 = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            var cpY2 = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            x = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            y = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            fillPath && fillPath.bezierCurveTo(cpX, cpY, cpX2, cpY2, x, y);
                            strokePath && strokePath.bezierCurveTo(cpX, cpY, cpX2, cpY2, x, y);
                            break;
                        case 1 /* BeginSolidFill */:
                            release || assert(styles.bytesAvailable >= 4);
                            fillPath = this._createMorphPath(0 /* Fill */, ratio, Shumway.ColorUtilities.rgbaToCSSStyle(morphColor(styles.readUnsignedInt(), morphStyles.readUnsignedInt(), ratio)), false, null, x, y);
                            break;
                        case 3 /* BeginBitmapFill */:
                            var bitmapStyle = this._readMorphBitmap(styles, morphStyles, ratio, context);
                            fillPath = this._createMorphPath(0 /* Fill */, ratio, bitmapStyle.style, bitmapStyle.smoothImage, null, x, y);
                            break;
                        case 2 /* BeginGradientFill */:
                            var gradientStyle = this._readMorphGradient(styles, morphStyles, ratio, context);
                            fillPath = this._createMorphPath(0 /* Fill */, ratio, gradientStyle, false, null, x, y);
                            break;
                        case 4 /* EndFill */:
                            fillPath = null;
                            break;
                        case 5 /* LineStyleSolid */:
                            var width = morph(coordinates[coordinatesIndex], morphCoordinates[coordinatesIndex++], ratio) / 20;
                            var color = Shumway.ColorUtilities.rgbaToCSSStyle(morphColor(styles.readUnsignedInt(), morphStyles.readUnsignedInt(), ratio));
                            styles.position += 1;
                            var scaleMode = styles.readByte();
                            var capsStyle = RenderableShape.LINE_CAPS_STYLES[styles.readByte()];
                            var jointsStyle = RenderableShape.LINE_JOINTS_STYLES[styles.readByte()];
                            var strokeProperties = new StrokeProperties(width, scaleMode, capsStyle, jointsStyle, styles.readByte());
                            strokePath = this._createMorphPath(1 /* Stroke */, ratio, color, false, strokeProperties, x, y);
                            break;
                        case 6 /* LineStyleGradient */:
                            var gradientStyle = this._readMorphGradient(styles, morphStyles, ratio, context);
                            strokePath = this._createMorphPath(2 /* StrokeFill */, ratio, gradientStyle, false, null, x, y);
                            break;
                        case 7 /* LineStyleBitmap */:
                            var bitmapStyle = this._readMorphBitmap(styles, morphStyles, ratio, context);
                            strokePath = this._createMorphPath(2 /* StrokeFill */, ratio, bitmapStyle.style, bitmapStyle.smoothImage, null, x, y);
                            break;
                        case 8 /* LineEnd */:
                            strokePath = null;
                            break;
                        default:
                            release || assertUnreachable('Invalid command ' + command + ' encountered at index' + commandIndex + ' of ' + commandsCount);
                    }
                }
                release || assert(styles.bytesAvailable === 0);
                release || assert(commandIndex === commandsCount);
                release || assert(coordinatesIndex === data.coordinatesPosition);
                if (formOpen && fillPath) {
                    fillPath.lineTo(formOpenX, formOpenY);
                    strokePath && strokePath.lineTo(formOpenX, formOpenY);
                }
                GFX.leaveTimeline("RenderableMorphShape.deserializPaths");
                return paths;
            };
            RenderableMorphShape.prototype._createMorphPath = function (type, ratio, style, smoothImage, strokeProperties, x, y) {
                var path = new StyledPath(type, style, smoothImage, strokeProperties);
                this._morphPaths[ratio].push(path);
                path.path.moveTo(x, y);
                return path.path;
            };
            RenderableMorphShape.prototype._readMorphMatrix = function (data, morphData, ratio) {
                return new Matrix(morph(data.readFloat(), morphData.readFloat(), ratio), morph(data.readFloat(), morphData.readFloat(), ratio), morph(data.readFloat(), morphData.readFloat(), ratio), morph(data.readFloat(), morphData.readFloat(), ratio), morph(data.readFloat(), morphData.readFloat(), ratio), morph(data.readFloat(), morphData.readFloat(), ratio));
            };
            RenderableMorphShape.prototype._readMorphGradient = function (styles, morphStyles, ratio, context) {
                release || assert(styles.bytesAvailable >= 1 + 1 + 6 * 4 + 1 + 1 + 4 + 1 + 1);
                var gradientType = styles.readUnsignedByte();
                var focalPoint = styles.readShort() * 2 / 0xff;
                release || assert(focalPoint >= -1 && focalPoint <= 1);
                var transform = this._readMorphMatrix(styles, morphStyles, ratio);
                var gradient = gradientType === 16 /* Linear */ ? context.createLinearGradient(-1, 0, 1, 0) : context.createRadialGradient(focalPoint, 0, 0, 0, 0, 1);
                gradient.setTransform && gradient.setTransform(transform.toSVGMatrix());
                var colorStopsCount = styles.readUnsignedByte();
                for (var i = 0; i < colorStopsCount; i++) {
                    var stop = morph(styles.readUnsignedByte() / 0xff, morphStyles.readUnsignedByte() / 0xff, ratio);
                    var color = morphColor(styles.readUnsignedInt(), morphStyles.readUnsignedInt(), ratio);
                    var cssColor = Shumway.ColorUtilities.rgbaToCSSStyle(color);
                    gradient.addColorStop(stop, cssColor);
                }
                styles.position += 2;
                return gradient;
            };
            RenderableMorphShape.prototype._readMorphBitmap = function (styles, morphStyles, ratio, context) {
                release || assert(styles.bytesAvailable >= 4 + 6 * 4 + 1 + 1);
                var textureIndex = styles.readUnsignedInt();
                var fillTransform = this._readMorphMatrix(styles, morphStyles, ratio);
                var repeat = styles.readBoolean() ? 'repeat' : 'no-repeat';
                var smooth = styles.readBoolean();
                var texture = this._textures[textureIndex];
                release || assert(texture._canvas);
                var fillStyle = context.createPattern(texture._canvas, repeat);
                fillStyle.setTransform(fillTransform.toSVGMatrix());
                return { style: fillStyle, smoothImage: smooth };
            };
            return RenderableMorphShape;
        })(RenderableShape);
        GFX.RenderableMorphShape = RenderableMorphShape;
        var TextLine = (function () {
            function TextLine() {
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.ascent = 0;
                this.descent = 0;
                this.leading = 0;
                this.align = 0;
                this.runs = [];
            }
            TextLine.prototype.addRun = function (font, fillStyle, text, underline) {
                if (text) {
                    TextLine._measureContext.font = font;
                    var width = TextLine._measureContext.measureText(text).width | 0;
                    this.runs.push(new TextRun(font, fillStyle, text, width, underline));
                    this.width += width;
                }
            };
            TextLine.prototype.wrap = function (maxWidth) {
                var lines = [this];
                var runs = this.runs;
                var currentLine = this;
                currentLine.width = 0;
                currentLine.runs = [];
                var measureContext = TextLine._measureContext;
                for (var i = 0; i < runs.length; i++) {
                    var run = runs[i];
                    var text = run.text;
                    run.text = '';
                    run.width = 0;
                    measureContext.font = run.font;
                    var spaceLeft = maxWidth;
                    var words = text.split(/[\s.-]/);
                    var offset = 0;
                    for (var j = 0; j < words.length; j++) {
                        var word = words[j];
                        var chunk = text.substr(offset, word.length + 1);
                        var wordWidth = measureContext.measureText(chunk).width | 0;
                        if (wordWidth > spaceLeft) {
                            do {
                                if (run.text) {
                                    currentLine.runs.push(run);
                                    currentLine.width += run.width;
                                    run = new TextRun(run.font, run.fillStyle, '', 0, run.underline);
                                    var newLine = new TextLine();
                                    newLine.y = (currentLine.y + currentLine.descent + currentLine.leading + currentLine.ascent) | 0;
                                    newLine.ascent = currentLine.ascent;
                                    newLine.descent = currentLine.descent;
                                    newLine.leading = currentLine.leading;
                                    newLine.align = currentLine.align;
                                    lines.push(newLine);
                                    currentLine = newLine;
                                }
                                spaceLeft = maxWidth - wordWidth;
                                if (spaceLeft < 0) {
                                    var k = chunk.length;
                                    var t;
                                    var w;
                                    do {
                                        k--;
                                        if (k < 1)
                                            throw new Error('Shall never happen: bad maxWidth?');
                                        t = chunk.substr(0, k);
                                        w = measureContext.measureText(t).width | 0;
                                    } while (w > maxWidth);
                                    run.text = t;
                                    run.width = w;
                                    chunk = chunk.substr(k);
                                    wordWidth = measureContext.measureText(chunk).width | 0;
                                }
                            } while (spaceLeft < 0);
                        }
                        else {
                            spaceLeft = spaceLeft - wordWidth;
                        }
                        run.text += chunk;
                        run.width += wordWidth;
                        offset += word.length + 1;
                    }
                    currentLine.runs.push(run);
                    currentLine.width += run.width;
                }
                return lines;
            };
            TextLine._measureContext = document.createElement('canvas').getContext('2d');
            return TextLine;
        })();
        GFX.TextLine = TextLine;
        var TextRun = (function () {
            function TextRun(font, fillStyle, text, width, underline) {
                if (font === void 0) { font = ''; }
                if (fillStyle === void 0) { fillStyle = ''; }
                if (text === void 0) { text = ''; }
                if (width === void 0) { width = 0; }
                if (underline === void 0) { underline = false; }
                this.font = font;
                this.fillStyle = fillStyle;
                this.text = text;
                this.width = width;
                this.underline = underline;
            }
            return TextRun;
        })();
        GFX.TextRun = TextRun;
        var RenderableText = (function (_super) {
            __extends(RenderableText, _super);
            function RenderableText(bounds) {
                _super.call(this);
                this._flags = 1048576 /* Dynamic */ | 16 /* Dirty */;
                this.properties = {};
                this._textBounds = bounds.clone();
                this._textRunData = null;
                this._plainText = '';
                this._backgroundColor = 0;
                this._borderColor = 0;
                this._matrix = Matrix.createIdentity();
                this._coords = null;
                this._scrollV = 1;
                this._scrollH = 0;
                this.textRect = bounds.clone();
                this.lines = [];
                this.setBounds(bounds);
            }
            RenderableText.prototype.setBounds = function (bounds) {
                _super.prototype.setBounds.call(this, bounds);
                this._textBounds.set(bounds);
                this.textRect.setElements(bounds.x + 2, bounds.y + 2, bounds.w - 2, bounds.h - 2);
            };
            RenderableText.prototype.setContent = function (plainText, textRunData, matrix, coords) {
                this._textRunData = textRunData;
                this._plainText = plainText;
                this._matrix.set(matrix);
                this._coords = coords;
                this.lines = [];
            };
            RenderableText.prototype.setStyle = function (backgroundColor, borderColor, scrollV, scrollH) {
                this._backgroundColor = backgroundColor;
                this._borderColor = borderColor;
                this._scrollV = scrollV;
                this._scrollH = scrollH;
            };
            RenderableText.prototype.reflow = function (autoSize, wordWrap) {
                var textRunData = this._textRunData;
                if (!textRunData) {
                    return;
                }
                var bounds = this._bounds;
                var availableWidth = bounds.w - 4;
                var plainText = this._plainText;
                var lines = this.lines;
                var currentLine = new TextLine();
                var baseLinePos = 0;
                var maxWidth = 0;
                var maxAscent = 0;
                var maxDescent = 0;
                var maxLeading = 0;
                var firstAlign = -1;
                var finishLine = function () {
                    if (!currentLine.runs.length) {
                        baseLinePos += maxAscent + maxDescent + maxLeading;
                        return;
                    }
                    baseLinePos += maxAscent;
                    currentLine.y = baseLinePos | 0;
                    baseLinePos += maxDescent + maxLeading;
                    currentLine.ascent = maxAscent;
                    currentLine.descent = maxDescent;
                    currentLine.leading = maxLeading;
                    currentLine.align = firstAlign;
                    if (wordWrap && currentLine.width > availableWidth) {
                        var wrappedLines = currentLine.wrap(availableWidth);
                        for (var i = 0; i < wrappedLines.length; i++) {
                            var line = wrappedLines[i];
                            baseLinePos = line.y + line.descent + line.leading;
                            lines.push(line);
                            if (line.width > maxWidth) {
                                maxWidth = line.width;
                            }
                        }
                    }
                    else {
                        lines.push(currentLine);
                        if (currentLine.width > maxWidth) {
                            maxWidth = currentLine.width;
                        }
                    }
                    currentLine = new TextLine();
                };
                GFX.enterTimeline("RenderableText.reflow");
                while (textRunData.position < textRunData.length) {
                    var beginIndex = textRunData.readInt();
                    var endIndex = textRunData.readInt();
                    var size = textRunData.readInt();
                    var fontId = textRunData.readInt();
                    var fontName;
                    if (fontId) {
                        fontName = 'swffont' + fontId;
                    }
                    else {
                        fontName = textRunData.readUTF();
                    }
                    var ascent = textRunData.readInt();
                    var descent = textRunData.readInt();
                    var leading = textRunData.readInt();
                    if (ascent > maxAscent) {
                        maxAscent = ascent;
                    }
                    if (descent > maxDescent) {
                        maxDescent = descent;
                    }
                    if (leading > maxLeading) {
                        maxLeading = leading;
                    }
                    var bold = textRunData.readBoolean();
                    var italic = textRunData.readBoolean();
                    var boldItalic = '';
                    if (italic) {
                        boldItalic += 'italic';
                    }
                    if (bold) {
                        boldItalic += ' bold';
                    }
                    var font = boldItalic + ' ' + size + 'px ' + fontName;
                    var color = textRunData.readInt();
                    var fillStyle = Shumway.ColorUtilities.rgbToHex(color);
                    var align = textRunData.readInt();
                    if (firstAlign === -1) {
                        firstAlign = align;
                    }
                    var bullet = textRunData.readBoolean();
                    var indent = textRunData.readInt();
                    var kerning = textRunData.readInt();
                    var leftMargin = textRunData.readInt();
                    var letterSpacing = textRunData.readInt();
                    var rightMargin = textRunData.readInt();
                    var underline = textRunData.readBoolean();
                    var text = '';
                    var eof = false;
                    for (var i = beginIndex; !eof; i++) {
                        var eof = i >= endIndex - 1;
                        var char = plainText[i];
                        if (char !== '\r' && char !== '\n') {
                            text += char;
                            if (i < plainText.length - 1) {
                                continue;
                            }
                        }
                        currentLine.addRun(font, fillStyle, text, underline);
                        finishLine();
                        text = '';
                        if (eof) {
                            maxAscent = 0;
                            maxDescent = 0;
                            maxLeading = 0;
                            firstAlign = -1;
                            break;
                        }
                        if (char === '\r' && plainText[i + 1] === '\n') {
                            i++;
                        }
                    }
                    currentLine.addRun(font, fillStyle, text, underline);
                }
                var endCharacter = plainText[plainText.length - 1];
                if (endCharacter === '\r' || endCharacter === '\n') {
                    lines.push(currentLine);
                }
                var rect = this.textRect;
                rect.w = maxWidth;
                rect.h = baseLinePos;
                if (autoSize) {
                    if (!wordWrap) {
                        availableWidth = maxWidth;
                        var width = bounds.w;
                        switch (autoSize) {
                            case 1:
                                rect.x = (width - (availableWidth + 4)) >> 1;
                                break;
                            case 2:
                                break;
                            case 3:
                                rect.x = width - (availableWidth + 4);
                                break;
                        }
                        this._textBounds.setElements(rect.x - 2, rect.y - 2, rect.w + 4, rect.h + 4);
                    }
                    bounds.h = baseLinePos + 4;
                }
                else {
                    this._textBounds = bounds;
                }
                var numLines = lines.length;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.width < availableWidth) {
                        switch (line.align) {
                            case 0:
                                break;
                            case 1:
                                line.x = (availableWidth - line.width) | 0;
                                break;
                            case 2:
                                line.x = ((availableWidth - line.width) / 2) | 0;
                                break;
                        }
                    }
                }
                this.invalidate();
                GFX.leaveTimeline("RenderableText.reflow");
            };
            RenderableText.prototype.render = function (context) {
                GFX.enterTimeline("RenderableText.render");
                context.save();
                var rect = this._textBounds;
                if (this._backgroundColor) {
                    context.fillStyle = Shumway.ColorUtilities.rgbaToCSSStyle(this._backgroundColor);
                    context.fillRect(rect.x, rect.y, rect.w, rect.h);
                }
                if (this._borderColor) {
                    context.strokeStyle = Shumway.ColorUtilities.rgbaToCSSStyle(this._borderColor);
                    context.lineCap = 'square';
                    context.lineWidth = 1;
                    context.strokeRect(rect.x, rect.y, rect.w, rect.h);
                }
                if (this._coords) {
                    this._renderChars(context);
                }
                else {
                    this._renderLines(context);
                }
                context.restore();
                GFX.leaveTimeline("RenderableText.render");
            };
            RenderableText.prototype._renderChars = function (context) {
                if (this._matrix) {
                    var m = this._matrix;
                    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                var lines = this.lines;
                var coords = this._coords;
                coords.position = 0;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var runs = line.runs;
                    for (var j = 0; j < runs.length; j++) {
                        var run = runs[j];
                        context.font = run.font;
                        context.fillStyle = run.fillStyle;
                        var text = run.text;
                        for (var k = 0; k < text.length; k++) {
                            var x = coords.readInt() / 20;
                            var y = coords.readInt() / 20;
                            context.fillText(text[k], x, y);
                        }
                    }
                }
            };
            RenderableText.prototype._renderLines = function (context) {
                var bounds = this._textBounds;
                context.beginPath();
                context.rect(bounds.x + 2, bounds.y + 2, bounds.w - 4, bounds.h - 4);
                context.clip();
                context.translate((bounds.x - this._scrollH) + 2, bounds.y + 2);
                var lines = this.lines;
                var scrollV = this._scrollV;
                var scrollY = 0;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var x = line.x;
                    var y = line.y;
                    if (i + 1 < scrollV) {
                        scrollY = y + line.descent + line.leading;
                        continue;
                    }
                    y -= scrollY;
                    if ((i + 1) - scrollV && y > bounds.h) {
                        break;
                    }
                    var runs = line.runs;
                    for (var j = 0; j < runs.length; j++) {
                        var run = runs[j];
                        context.font = run.font;
                        context.fillStyle = run.fillStyle;
                        if (run.underline) {
                            context.fillRect(x, (y + (line.descent / 2)) | 0, run.width, 1);
                        }
                        context.textAlign = "left";
                        context.textBaseline = "alphabetic";
                        context.fillText(run.text, x, y);
                        x += run.width;
                    }
                }
            };
            return RenderableText;
        })(Renderable);
        GFX.RenderableText = RenderableText;
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(w, h) {
                _super.call(this);
                this._flags = 1048576 /* Dynamic */ | 2097152 /* Scalable */;
                this.properties = {};
                this.setBounds(new Rectangle(0, 0, w, h));
            }
            Object.defineProperty(Label.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value;
                },
                enumerable: true,
                configurable: true
            });
            Label.prototype.render = function (context, ratio, cullBounds) {
                context.save();
                context.textBaseline = "top";
                context.fillStyle = "white";
                context.fillText(this.text, 0, 0);
                context.restore();
            };
            return Label;
        })(Renderable);
        GFX.Label = Label;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var clampByte = Shumway.ColorUtilities.clampByte;
        var assert = Shumway.Debug.assert;
        var Filter = (function () {
            function Filter() {
            }
            return Filter;
        })();
        GFX.Filter = Filter;
        var BlurFilter = (function (_super) {
            __extends(BlurFilter, _super);
            function BlurFilter(blurX, blurY, quality) {
                _super.call(this);
                this.blurX = blurX;
                this.blurY = blurY;
                this.quality = quality;
            }
            return BlurFilter;
        })(Filter);
        GFX.BlurFilter = BlurFilter;
        var DropshadowFilter = (function (_super) {
            __extends(DropshadowFilter, _super);
            function DropshadowFilter(alpha, angle, blurX, blurY, color, distance, hideObject, inner, knockout, quality, strength) {
                _super.call(this);
                this.alpha = alpha;
                this.angle = angle;
                this.blurX = blurX;
                this.blurY = blurY;
                this.color = color;
                this.distance = distance;
                this.hideObject = hideObject;
                this.inner = inner;
                this.knockout = knockout;
                this.quality = quality;
                this.strength = strength;
            }
            return DropshadowFilter;
        })(Filter);
        GFX.DropshadowFilter = DropshadowFilter;
        var GlowFilter = (function (_super) {
            __extends(GlowFilter, _super);
            function GlowFilter(alpha, blurX, blurY, color, inner, knockout, quality, strength) {
                _super.call(this);
                this.alpha = alpha;
                this.blurX = blurX;
                this.blurY = blurY;
                this.color = color;
                this.inner = inner;
                this.knockout = knockout;
                this.quality = quality;
                this.strength = strength;
            }
            return GlowFilter;
        })(Filter);
        GFX.GlowFilter = GlowFilter;
        (function (ColorMatrixType) {
            ColorMatrixType[ColorMatrixType["Unknown"] = 0x0000] = "Unknown";
            ColorMatrixType[ColorMatrixType["Identity"] = 0x0001] = "Identity";
        })(GFX.ColorMatrixType || (GFX.ColorMatrixType = {}));
        var ColorMatrixType = GFX.ColorMatrixType;
        var ColorMatrix = (function () {
            function ColorMatrix(data) {
                release || assert(data.length === 20);
                this._data = new Float32Array(data);
                this._type = 0 /* Unknown */;
            }
            ColorMatrix.prototype.clone = function () {
                var colorMatrix = new ColorMatrix(this._data);
                colorMatrix._type = this._type;
                return colorMatrix;
            };
            ColorMatrix.prototype.set = function (other) {
                this._data.set(other._data);
                this._type = other._type;
            };
            ColorMatrix.prototype.toWebGLMatrix = function () {
                return new Float32Array(this._data);
            };
            ColorMatrix.prototype.asWebGLMatrix = function () {
                return this._data.subarray(0, 16);
            };
            ColorMatrix.prototype.asWebGLVector = function () {
                return this._data.subarray(16, 20);
            };
            ColorMatrix.prototype.isIdentity = function () {
                if (this._type & 1 /* Identity */) {
                    return true;
                }
                var m = this._data;
                return m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 0 && m[4] == 0 && m[5] == 1 && m[6] == 0 && m[7] == 0 && m[8] == 0 && m[9] == 0 && m[10] == 1 && m[11] == 0 && m[12] == 0 && m[13] == 0 && m[14] == 0 && m[15] == 1 && m[16] == 0 && m[17] == 0 && m[18] == 0 && m[19] == 0;
            };
            ColorMatrix.createIdentity = function () {
                var colorMatrix = new ColorMatrix([
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0
                ]);
                colorMatrix._type = 1 /* Identity */;
                return colorMatrix;
            };
            ColorMatrix.prototype.setMultipliersAndOffsets = function (redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
                var m = this._data;
                for (var i = 0; i < m.length; i++) {
                    m[i] = 0;
                }
                m[0] = redMultiplier;
                m[5] = greenMultiplier;
                m[10] = blueMultiplier;
                m[15] = alphaMultiplier;
                m[16] = redOffset / 255;
                m[17] = greenOffset / 255;
                m[18] = blueOffset / 255;
                m[19] = alphaOffset / 255;
                this._type = 0 /* Unknown */;
            };
            ColorMatrix.prototype.transformRGBA = function (rgba) {
                var r = (rgba >> 24) & 0xff;
                var g = (rgba >> 16) & 0xff;
                var b = (rgba >> 8) & 0xff;
                var a = rgba & 0xff;
                var m = this._data;
                var R = clampByte(r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[16] * 255);
                var G = clampByte(r * m[4] + g * m[5] + b * m[6] + a * m[7] + m[17] * 255);
                var B = clampByte(r * m[8] + g * m[9] + b * m[10] + a * m[11] + m[18] * 255);
                var A = clampByte(r * m[12] + g * m[13] + b * m[14] + a * m[15] + m[19] * 255);
                return R << 24 | G << 16 | B << 8 | A;
            };
            ColorMatrix.prototype.multiply = function (other) {
                if (other._type & 1 /* Identity */) {
                    return;
                }
                var a = this._data, b = other._data;
                var a00 = a[0 * 4 + 0];
                var a01 = a[0 * 4 + 1];
                var a02 = a[0 * 4 + 2];
                var a03 = a[0 * 4 + 3];
                var a10 = a[1 * 4 + 0];
                var a11 = a[1 * 4 + 1];
                var a12 = a[1 * 4 + 2];
                var a13 = a[1 * 4 + 3];
                var a20 = a[2 * 4 + 0];
                var a21 = a[2 * 4 + 1];
                var a22 = a[2 * 4 + 2];
                var a23 = a[2 * 4 + 3];
                var a30 = a[3 * 4 + 0];
                var a31 = a[3 * 4 + 1];
                var a32 = a[3 * 4 + 2];
                var a33 = a[3 * 4 + 3];
                var a40 = a[4 * 4 + 0];
                var a41 = a[4 * 4 + 1];
                var a42 = a[4 * 4 + 2];
                var a43 = a[4 * 4 + 3];
                var b00 = b[0 * 4 + 0];
                var b01 = b[0 * 4 + 1];
                var b02 = b[0 * 4 + 2];
                var b03 = b[0 * 4 + 3];
                var b10 = b[1 * 4 + 0];
                var b11 = b[1 * 4 + 1];
                var b12 = b[1 * 4 + 2];
                var b13 = b[1 * 4 + 3];
                var b20 = b[2 * 4 + 0];
                var b21 = b[2 * 4 + 1];
                var b22 = b[2 * 4 + 2];
                var b23 = b[2 * 4 + 3];
                var b30 = b[3 * 4 + 0];
                var b31 = b[3 * 4 + 1];
                var b32 = b[3 * 4 + 2];
                var b33 = b[3 * 4 + 3];
                var b40 = b[4 * 4 + 0];
                var b41 = b[4 * 4 + 1];
                var b42 = b[4 * 4 + 2];
                var b43 = b[4 * 4 + 3];
                a[0 * 4 + 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
                a[0 * 4 + 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
                a[0 * 4 + 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
                a[0 * 4 + 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
                a[1 * 4 + 0] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
                a[1 * 4 + 1] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
                a[1 * 4 + 2] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
                a[1 * 4 + 3] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
                a[2 * 4 + 0] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
                a[2 * 4 + 1] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
                a[2 * 4 + 2] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
                a[2 * 4 + 3] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
                a[3 * 4 + 0] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
                a[3 * 4 + 1] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
                a[3 * 4 + 2] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
                a[3 * 4 + 3] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
                a[4 * 4 + 0] = a00 * b40 + a10 * b41 + a20 * b42 + a30 * b43 + a40;
                a[4 * 4 + 1] = a01 * b40 + a11 * b41 + a21 * b42 + a31 * b43 + a41;
                a[4 * 4 + 2] = a02 * b40 + a12 * b41 + a22 * b42 + a32 * b43 + a42;
                a[4 * 4 + 3] = a03 * b40 + a13 * b41 + a23 * b42 + a33 * b43 + a43;
                this._type = 0 /* Unknown */;
            };
            Object.defineProperty(ColorMatrix.prototype, "alphaMultiplier", {
                get: function () {
                    return this._data[15];
                },
                enumerable: true,
                configurable: true
            });
            ColorMatrix.prototype.hasOnlyAlphaMultiplier = function () {
                var m = this._data;
                return m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 0 && m[4] == 0 && m[5] == 1 && m[6] == 0 && m[7] == 0 && m[8] == 0 && m[9] == 0 && m[10] == 1 && m[11] == 0 && m[12] == 0 && m[13] == 0 && m[14] == 0 && m[16] == 0 && m[17] == 0 && m[18] == 0 && m[19] == 0;
            };
            ColorMatrix.prototype.equals = function (other) {
                if (!other) {
                    return false;
                }
                else if (this._type === other._type && this._type === 1 /* Identity */) {
                    return true;
                }
                var a = this._data;
                var b = other._data;
                for (var i = 0; i < 20; i++) {
                    if (Math.abs(a[i] - b[i]) > 0.001) {
                        return false;
                    }
                }
                return true;
            };
            ColorMatrix.prototype.toSVGFilterMatrix = function () {
                var m = this._data;
                return [m[0], m[4], m[8], m[12], m[16], m[1], m[5], m[9], m[13], m[17], m[2], m[6], m[10], m[14], m[18], m[3], m[7], m[11], m[15], m[19]].join(" ");
            };
            return ColorMatrix;
        })();
        GFX.ColorMatrix = ColorMatrix;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
//# sourceMappingURL=gfx-base.js.map
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var WebGL;
        (function (WebGL) {
            var Point3D = GFX.Geometry.Point3D;
            var Matrix3D = GFX.Geometry.Matrix3D;
            var degreesToRadian = GFX.Geometry.degreesToRadian;
            var assert = Shumway.Debug.assert;
            var unexpected = Shumway.Debug.unexpected;
            var notImplemented = Shumway.Debug.notImplemented;
            WebGL.SHADER_ROOT = "shaders/";
            function endsWith(str, end) {
                return str.indexOf(end, this.length - end.length) !== -1;
            }
            var WebGLContext = (function () {
                function WebGLContext(canvas, options) {
                    this._fillColor = Shumway.Color.Red;
                    this._surfaceRegionCache = new Shumway.LRUList();
                    this.modelViewProjectionMatrix = Matrix3D.createIdentity();
                    this._canvas = canvas;
                    this._options = options;
                    this.gl = (canvas.getContext("experimental-webgl", {
                        preserveDrawingBuffer: false,
                        antialias: true,
                        stencil: true,
                        premultipliedAlpha: false
                    }));
                    release || assert(this.gl, "Cannot create WebGL context.");
                    this._programCache = Object.create(null);
                    this._resize();
                    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.unpackPremultiplyAlpha ? this.gl.ONE : this.gl.ZERO);
                    this._backgroundColor = Shumway.Color.Black;
                    this._geometry = new WebGL.WebGLGeometry(this);
                    this._tmpVertices = WebGL.Vertex.createEmptyVertices(WebGL.Vertex, 64);
                    this._maxSurfaces = options.maxSurfaces;
                    this._maxSurfaceSize = options.maxSurfaceSize;
                    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
                    this.gl.enable(this.gl.BLEND);
                    this.modelViewProjectionMatrix = Matrix3D.create2DProjection(this._w, this._h, 2000);
                    var self = this;
                    this._surfaceRegionAllocator = new GFX.SurfaceRegionAllocator.SimpleAllocator(function () {
                        var texture = self._createTexture(1024, 1024);
                        return new WebGL.WebGLSurface(1024, 1024, texture);
                    });
                }
                Object.defineProperty(WebGLContext.prototype, "surfaces", {
                    get: function () {
                        return (this._surfaceRegionAllocator.surfaces);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WebGLContext.prototype, "fillStyle", {
                    set: function (value) {
                        this._fillColor.set(Shumway.Color.parseColor(value));
                    },
                    enumerable: true,
                    configurable: true
                });
                WebGLContext.prototype.setBlendMode = function (value) {
                    var gl = this.gl;
                    switch (value) {
                        case 8 /* Add */:
                            gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                            break;
                        case 3 /* Multiply */:
                            gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        case 4 /* Screen */:
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                            break;
                        case 2 /* Layer */:
                        case 1 /* Normal */:
                            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                            break;
                        default:
                            notImplemented("Blend Mode: " + value);
                    }
                };
                WebGLContext.prototype.setBlendOptions = function () {
                    this.gl.blendFunc(this._options.sourceBlendFactor, this._options.destinationBlendFactor);
                };
                WebGLContext.glSupportedBlendMode = function (value) {
                    switch (value) {
                        case 8 /* Add */:
                        case 3 /* Multiply */:
                        case 4 /* Screen */:
                        case 1 /* Normal */:
                            return true;
                        default:
                            return false;
                    }
                };
                WebGLContext.prototype.create2DProjectionMatrix = function () {
                    return Matrix3D.create2DProjection(this._w, this._h, -this._w);
                };
                WebGLContext.prototype.createPerspectiveMatrix = function (cameraDistance, fov, angle) {
                    var cameraAngleRadians = degreesToRadian(angle);
                    var projectionMatrix = Matrix3D.createPerspective(degreesToRadian(fov), 1, 0.1, 5000);
                    var up = new Point3D(0, 1, 0);
                    var target = new Point3D(0, 0, 0);
                    var camera = new Point3D(0, 0, cameraDistance);
                    var cameraMatrix = Matrix3D.createCameraLookAt(camera, target, up);
                    var viewMatrix = Matrix3D.createInverse(cameraMatrix);
                    var matrix = Matrix3D.createIdentity();
                    matrix = Matrix3D.createMultiply(matrix, Matrix3D.createTranslation(-this._w / 2, -this._h / 2, 0));
                    matrix = Matrix3D.createMultiply(matrix, Matrix3D.createScale(1 / this._w, -1 / this._h, 1 / 100));
                    matrix = Matrix3D.createMultiply(matrix, Matrix3D.createYRotation(cameraAngleRadians));
                    matrix = Matrix3D.createMultiply(matrix, viewMatrix);
                    matrix = Matrix3D.createMultiply(matrix, projectionMatrix);
                    return matrix;
                };
                WebGLContext.prototype.discardCachedImages = function () {
                    GFX.traceLevel >= 2 /* Verbose */ && GFX.writer && GFX.writer.writeLn("Discard Cache");
                    var count = this._surfaceRegionCache.count / 2 | 0;
                    for (var i = 0; i < count; i++) {
                        var surfaceRegion = this._surfaceRegionCache.pop();
                        GFX.traceLevel >= 2 /* Verbose */ && GFX.writer && GFX.writer.writeLn("Discard: " + surfaceRegion);
                        surfaceRegion.texture.atlas.remove(surfaceRegion.region);
                        surfaceRegion.texture = null;
                    }
                };
                WebGLContext.prototype.cacheImage = function (image) {
                    var w = image.width;
                    var h = image.height;
                    var surfaceRegion = this.allocateSurfaceRegion(w, h);
                    GFX.traceLevel >= 2 /* Verbose */ && GFX.writer && GFX.writer.writeLn("Uploading Image: @ " + surfaceRegion.region);
                    this._surfaceRegionCache.use(surfaceRegion);
                    this.updateSurfaceRegion(image, surfaceRegion);
                    return surfaceRegion;
                };
                WebGLContext.prototype.allocateSurfaceRegion = function (w, h, discardCache) {
                    if (discardCache === void 0) { discardCache = true; }
                    return this._surfaceRegionAllocator.allocate(w, h);
                };
                WebGLContext.prototype.updateSurfaceRegion = function (image, surfaceRegion) {
                    var gl = this.gl;
                    gl.bindTexture(gl.TEXTURE_2D, surfaceRegion.surface.texture);
                    GFX.enterTimeline("texSubImage2D");
                    gl.texSubImage2D(gl.TEXTURE_2D, 0, surfaceRegion.region.x, surfaceRegion.region.y, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    GFX.leaveTimeline("texSubImage2D");
                };
                WebGLContext.prototype._resize = function () {
                    var gl = this.gl;
                    this._w = this._canvas.width;
                    this._h = this._canvas.height;
                    gl.viewport(0, 0, this._w, this._h);
                    for (var k in this._programCache) {
                        this._initializeProgram(this._programCache[k]);
                    }
                };
                WebGLContext.prototype._initializeProgram = function (program) {
                    var gl = this.gl;
                    gl.useProgram(program);
                };
                WebGLContext.prototype._createShaderFromFile = function (file) {
                    var path = WebGL.SHADER_ROOT + file;
                    var gl = this.gl;
                    var request = new XMLHttpRequest();
                    request.open("GET", path, false);
                    request.send();
                    release || assert(request.status === 200 || request.status === 0, "File : " + path + " not found.");
                    var shaderType;
                    if (endsWith(path, ".vert")) {
                        shaderType = gl.VERTEX_SHADER;
                    }
                    else if (endsWith(path, ".frag")) {
                        shaderType = gl.FRAGMENT_SHADER;
                    }
                    else {
                        throw "Shader Type: not supported.";
                    }
                    return this._createShader(shaderType, request.responseText);
                };
                WebGLContext.prototype.createProgramFromFiles = function (vertex, fragment) {
                    var key = vertex + "-" + fragment;
                    var program = this._programCache[key];
                    if (!program) {
                        program = this._createProgram([
                            this._createShaderFromFile(vertex),
                            this._createShaderFromFile(fragment)
                        ]);
                        this._queryProgramAttributesAndUniforms(program);
                        this._initializeProgram(program);
                        this._programCache[key] = program;
                    }
                    return program;
                };
                WebGLContext.prototype._createProgram = function (shaders) {
                    var gl = this.gl;
                    var program = gl.createProgram();
                    shaders.forEach(function (shader) {
                        gl.attachShader(program, shader);
                    });
                    gl.linkProgram(program);
                    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        var lastError = gl.getProgramInfoLog(program);
                        unexpected("Cannot link program: " + lastError);
                        gl.deleteProgram(program);
                    }
                    return program;
                };
                WebGLContext.prototype._createShader = function (shaderType, shaderSource) {
                    var gl = this.gl;
                    var shader = gl.createShader(shaderType);
                    gl.shaderSource(shader, shaderSource);
                    gl.compileShader(shader);
                    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                        var lastError = gl.getShaderInfoLog(shader);
                        unexpected("Cannot compile shader: " + lastError);
                        gl.deleteShader(shader);
                        return null;
                    }
                    return shader;
                };
                WebGLContext.prototype._createTexture = function (w, h) {
                    var gl = this.gl;
                    var texture = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    return texture;
                };
                WebGLContext.prototype._createFramebuffer = function (texture) {
                    var gl = this.gl;
                    var framebuffer = gl.createFramebuffer();
                    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                    return framebuffer;
                };
                WebGLContext.prototype._queryProgramAttributesAndUniforms = function (program) {
                    program.uniforms = {};
                    program.attributes = {};
                    var gl = this.gl;
                    for (var i = 0, j = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); i < j; i++) {
                        var attribute = gl.getActiveAttrib(program, i);
                        program.attributes[attribute.name] = attribute;
                        attribute.location = gl.getAttribLocation(program, attribute.name);
                    }
                    for (var i = 0, j = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i < j; i++) {
                        var uniform = gl.getActiveUniform(program, i);
                        program.uniforms[uniform.name] = uniform;
                        uniform.location = gl.getUniformLocation(program, uniform.name);
                    }
                };
                Object.defineProperty(WebGLContext.prototype, "target", {
                    set: function (surface) {
                        var gl = this.gl;
                        if (surface) {
                            gl.viewport(0, 0, surface.w, surface.h);
                            gl.bindFramebuffer(gl.FRAMEBUFFER, surface.framebuffer);
                        }
                        else {
                            gl.viewport(0, 0, this._w, this._h);
                            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                WebGLContext.prototype.clear = function (color) {
                    if (color === void 0) { color = Shumway.Color.None; }
                    var gl = this.gl;
                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                };
                WebGLContext.prototype.clearTextureRegion = function (surfaceRegion, color) {
                    if (color === void 0) { color = Shumway.Color.None; }
                    var gl = this.gl;
                    var region = surfaceRegion.region;
                    this.target = surfaceRegion.surface;
                    gl.enable(gl.SCISSOR_TEST);
                    gl.scissor(region.x, region.y, region.w, region.h);
                    gl.clearColor(color.r, color.g, color.b, color.a);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    gl.disable(gl.SCISSOR_TEST);
                };
                WebGLContext.prototype.sizeOf = function (type) {
                    var gl = this.gl;
                    switch (type) {
                        case gl.UNSIGNED_BYTE:
                            return 1;
                        case gl.UNSIGNED_SHORT:
                            return 2;
                        case this.gl.INT:
                        case this.gl.FLOAT:
                            return 4;
                        default:
                            notImplemented(type);
                    }
                };
                WebGLContext.MAX_SURFACES = 8;
                return WebGLContext;
            })();
            WebGL.WebGLContext = WebGLContext;
        })(WebGL = GFX.WebGL || (GFX.WebGL = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var WebGL;
        (function (WebGL) {
            var release = false;
            var assert = Shumway.Debug.assert;
            var BufferWriter = (function (_super) {
                __extends(BufferWriter, _super);
                function BufferWriter() {
                    _super.apply(this, arguments);
                }
                BufferWriter.prototype.ensureVertexCapacity = function (count) {
                    release || assert((this._offset & 0x3) === 0);
                    this.ensureCapacity(this._offset + count * 8);
                };
                BufferWriter.prototype.writeVertex = function (x, y) {
                    release || assert((this._offset & 0x3) === 0);
                    this.ensureCapacity(this._offset + 8);
                    this.writeVertexUnsafe(x, y);
                };
                BufferWriter.prototype.writeVertexUnsafe = function (x, y) {
                    var index = this._offset >> 2;
                    this._f32[index] = x;
                    this._f32[index + 1] = y;
                    this._offset += 8;
                };
                BufferWriter.prototype.writeVertex3D = function (x, y, z) {
                    release || assert((this._offset & 0x3) === 0);
                    this.ensureCapacity(this._offset + 12);
                    this.writeVertex3DUnsafe(x, y, z);
                };
                BufferWriter.prototype.writeVertex3DUnsafe = function (x, y, z) {
                    var index = this._offset >> 2;
                    this._f32[index] = x;
                    this._f32[index + 1] = y;
                    this._f32[index + 2] = z;
                    this._offset += 12;
                };
                BufferWriter.prototype.writeTriangleElements = function (a, b, c) {
                    release || assert((this._offset & 0x1) === 0);
                    this.ensureCapacity(this._offset + 6);
                    var index = this._offset >> 1;
                    this._u16[index] = a;
                    this._u16[index + 1] = b;
                    this._u16[index + 2] = c;
                    this._offset += 6;
                };
                BufferWriter.prototype.ensureColorCapacity = function (count) {
                    release || assert((this._offset & 0x2) === 0);
                    this.ensureCapacity(this._offset + count * 16);
                };
                BufferWriter.prototype.writeColorFloats = function (r, g, b, a) {
                    release || assert((this._offset & 0x2) === 0);
                    this.ensureCapacity(this._offset + 16);
                    this.writeColorFloatsUnsafe(r, g, b, a);
                };
                BufferWriter.prototype.writeColorFloatsUnsafe = function (r, g, b, a) {
                    var index = this._offset >> 2;
                    this._f32[index] = r;
                    this._f32[index + 1] = g;
                    this._f32[index + 2] = b;
                    this._f32[index + 3] = a;
                    this._offset += 16;
                };
                BufferWriter.prototype.writeColor = function (r, g, b, a) {
                    release || assert((this._offset & 0x3) === 0);
                    this.ensureCapacity(this._offset + 4);
                    var index = this._offset >> 2;
                    this._i32[index] = a << 24 | b << 16 | g << 8 | r;
                    this._offset += 4;
                };
                BufferWriter.prototype.writeColorUnsafe = function (r, g, b, a) {
                    var index = this._offset >> 2;
                    this._i32[index] = a << 24 | b << 16 | g << 8 | r;
                    this._offset += 4;
                };
                BufferWriter.prototype.writeRandomColor = function () {
                    this.writeColor(Math.random(), Math.random(), Math.random(), Math.random() / 2);
                };
                return BufferWriter;
            })(Shumway.ArrayUtilities.ArrayWriter);
            WebGL.BufferWriter = BufferWriter;
            var WebGLAttribute = (function () {
                function WebGLAttribute(name, size, type, normalized) {
                    if (normalized === void 0) { normalized = false; }
                    this.name = name;
                    this.size = size;
                    this.type = type;
                    this.normalized = normalized;
                }
                return WebGLAttribute;
            })();
            WebGL.WebGLAttribute = WebGLAttribute;
            var WebGLAttributeList = (function () {
                function WebGLAttributeList(attributes) {
                    this.size = 0;
                    this.attributes = attributes;
                }
                WebGLAttributeList.prototype.initialize = function (context) {
                    var offset = 0;
                    for (var i = 0; i < this.attributes.length; i++) {
                        this.attributes[i].offset = offset;
                        offset += context.sizeOf(this.attributes[i].type) * this.attributes[i].size;
                    }
                    this.size = offset;
                };
                return WebGLAttributeList;
            })();
            WebGL.WebGLAttributeList = WebGLAttributeList;
            var WebGLGeometry = (function () {
                function WebGLGeometry(context) {
                    this.triangleCount = 0;
                    this._elementOffset = 0;
                    this.context = context;
                    this.array = new BufferWriter(8);
                    this.buffer = context.gl.createBuffer();
                    this.elementArray = new BufferWriter(8);
                    this.elementBuffer = context.gl.createBuffer();
                }
                Object.defineProperty(WebGLGeometry.prototype, "elementOffset", {
                    get: function () {
                        return this._elementOffset;
                    },
                    enumerable: true,
                    configurable: true
                });
                WebGLGeometry.prototype.addQuad = function () {
                    var offset = this._elementOffset;
                    this.elementArray.writeTriangleElements(offset, offset + 1, offset + 2);
                    this.elementArray.writeTriangleElements(offset, offset + 2, offset + 3);
                    this.triangleCount += 2;
                    this._elementOffset += 4;
                };
                WebGLGeometry.prototype.resetElementOffset = function () {
                    this._elementOffset = 0;
                };
                WebGLGeometry.prototype.reset = function () {
                    this.array.reset();
                    this.elementArray.reset();
                    this.resetElementOffset();
                    this.triangleCount = 0;
                };
                WebGLGeometry.prototype.uploadBuffers = function () {
                    var gl = this.context.gl;
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, this.array.subU8View(), gl.DYNAMIC_DRAW);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.elementArray.subU8View(), gl.DYNAMIC_DRAW);
                };
                return WebGLGeometry;
            })();
            WebGL.WebGLGeometry = WebGLGeometry;
            var Vertex = (function (_super) {
                __extends(Vertex, _super);
                function Vertex(x, y, z) {
                    _super.call(this, x, y, z);
                }
                Vertex.createEmptyVertices = function (type, count) {
                    var result = [];
                    for (var i = 0; i < count; i++) {
                        result.push(new type(0, 0, 0));
                    }
                    return result;
                };
                return Vertex;
            })(GFX.Geometry.Point3D);
            WebGL.Vertex = Vertex;
            (function (WebGLBlendFactor) {
                WebGLBlendFactor[WebGLBlendFactor["ZERO"] = 0] = "ZERO";
                WebGLBlendFactor[WebGLBlendFactor["ONE"] = 1] = "ONE";
                WebGLBlendFactor[WebGLBlendFactor["SRC_COLOR"] = 768] = "SRC_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["DST_COLOR"] = 774] = "DST_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["SRC_ALPHA"] = 770] = "SRC_ALPHA";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
                WebGLBlendFactor[WebGLBlendFactor["DST_ALPHA"] = 772] = "DST_ALPHA";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
                WebGLBlendFactor[WebGLBlendFactor["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
                WebGLBlendFactor[WebGLBlendFactor["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
                WebGLBlendFactor[WebGLBlendFactor["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
                WebGLBlendFactor[WebGLBlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
            })(WebGL.WebGLBlendFactor || (WebGL.WebGLBlendFactor = {}));
            var WebGLBlendFactor = WebGL.WebGLBlendFactor;
        })(WebGL = GFX.WebGL || (GFX.WebGL = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var WebGL;
        (function (WebGL) {
            var release = false;
            var WebGLSurface = (function () {
                function WebGLSurface(w, h, texture) {
                    this.texture = texture;
                    this.w = w;
                    this.h = h;
                    this._regionAllocator = new GFX.RegionAllocator.CompactAllocator(this.w, this.h);
                }
                WebGLSurface.prototype.allocate = function (w, h) {
                    var region = this._regionAllocator.allocate(w, h);
                    if (region) {
                        return new WebGLSurfaceRegion(this, region);
                    }
                    return null;
                };
                WebGLSurface.prototype.free = function (surfaceRegion) {
                    this._regionAllocator.free(surfaceRegion.region);
                };
                return WebGLSurface;
            })();
            WebGL.WebGLSurface = WebGLSurface;
            var WebGLSurfaceRegion = (function () {
                function WebGLSurfaceRegion(surface, region) {
                    this.surface = surface;
                    this.region = region;
                    this.next = this.previous = null;
                }
                return WebGLSurfaceRegion;
            })();
            WebGL.WebGLSurfaceRegion = WebGLSurfaceRegion;
        })(WebGL = GFX.WebGL || (GFX.WebGL = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var WebGL;
        (function (WebGL) {
            var Color = Shumway.Color;
            var SCRATCH_CANVAS_SIZE = 1024 * 2;
            WebGL.TILE_SIZE = 256;
            WebGL.MIN_UNTILED_SIZE = 256;
            function getTileSize(bounds) {
                if (bounds.w < WebGL.TILE_SIZE || bounds.h < WebGL.TILE_SIZE) {
                    return Math.min(bounds.w, bounds.h);
                }
                return WebGL.TILE_SIZE;
            }
            var Matrix = GFX.Geometry.Matrix;
            var Rectangle = GFX.Geometry.Rectangle;
            var WebGLRendererOptions = (function (_super) {
                __extends(WebGLRendererOptions, _super);
                function WebGLRendererOptions() {
                    _super.apply(this, arguments);
                    this.maxSurfaces = 8;
                    this.maxSurfaceSize = 2048 * 2;
                    this.animateZoom = true;
                    this.disableSurfaceUploads = false;
                    this.frameSpacing = 0.0001;
                    this.ignoreColorMatrix = false;
                    this.drawSurfaces = false;
                    this.drawSurface = -1;
                    this.premultipliedAlpha = false;
                    this.unpackPremultiplyAlpha = true;
                    this.showTemporaryCanvases = false;
                    this.sourceBlendFactor = 1 /* ONE */;
                    this.destinationBlendFactor = 771 /* ONE_MINUS_SRC_ALPHA */;
                }
                return WebGLRendererOptions;
            })(GFX.RendererOptions);
            WebGL.WebGLRendererOptions = WebGLRendererOptions;
            var WebGLRenderer = (function (_super) {
                __extends(WebGLRenderer, _super);
                function WebGLRenderer(container, stage, options) {
                    if (options === void 0) { options = new WebGLRendererOptions(); }
                    _super.call(this, container, stage, options);
                    this._tmpVertices = WebGL.Vertex.createEmptyVertices(WebGL.Vertex, 64);
                    this._cachedTiles = [];
                    var context = this._context = new WebGL.WebGLContext(this._canvas, options);
                    this._updateSize();
                    this._brush = new WebGL.WebGLCombinedBrush(context, new WebGL.WebGLGeometry(context));
                    this._stencilBrush = new WebGL.WebGLCombinedBrush(context, new WebGL.WebGLGeometry(context));
                    this._scratchCanvas = document.createElement("canvas");
                    this._scratchCanvas.width = this._scratchCanvas.height = SCRATCH_CANVAS_SIZE;
                    this._scratchCanvasContext = this._scratchCanvas.getContext("2d", {
                        willReadFrequently: true
                    });
                    this._dynamicScratchCanvas = document.createElement("canvas");
                    this._dynamicScratchCanvas.width = this._dynamicScratchCanvas.height = 0;
                    this._dynamicScratchCanvasContext = this._dynamicScratchCanvas.getContext("2d", {
                        willReadFrequently: true
                    });
                    this._uploadCanvas = document.createElement("canvas");
                    this._uploadCanvas.width = this._uploadCanvas.height = 0;
                    this._uploadCanvasContext = this._uploadCanvas.getContext("2d", {
                        willReadFrequently: true
                    });
                    if (options.showTemporaryCanvases) {
                        document.getElementById("temporaryCanvasPanelContainer").appendChild(this._uploadCanvas);
                        document.getElementById("temporaryCanvasPanelContainer").appendChild(this._scratchCanvas);
                    }
                    this._clipStack = [];
                }
                WebGLRenderer.prototype.resize = function () {
                    this._updateSize();
                    this.render();
                };
                WebGLRenderer.prototype._updateSize = function () {
                    this._viewport = new Rectangle(0, 0, this._canvas.width, this._canvas.height);
                    this._context._resize();
                };
                WebGLRenderer.prototype._cacheImageCallback = function (oldSurfaceRegion, src, srcBounds) {
                    var w = srcBounds.w;
                    var h = srcBounds.h;
                    var sx = srcBounds.x;
                    var sy = srcBounds.y;
                    this._uploadCanvas.width = w + 2;
                    this._uploadCanvas.height = h + 2;
                    this._uploadCanvasContext.drawImage(src.canvas, sx, sy, w, h, 1, 1, w, h);
                    this._uploadCanvasContext.drawImage(src.canvas, sx, sy, w, 1, 1, 0, w, 1);
                    this._uploadCanvasContext.drawImage(src.canvas, sx, sy + h - 1, w, 1, 1, h + 1, w, 1);
                    this._uploadCanvasContext.drawImage(src.canvas, sx, sy, 1, h, 0, 1, 1, h);
                    this._uploadCanvasContext.drawImage(src.canvas, sx + w - 1, sy, 1, h, w + 1, 1, 1, h);
                    if (!oldSurfaceRegion || !oldSurfaceRegion.surface) {
                        return this._context.cacheImage(this._uploadCanvas);
                    }
                    else {
                        if (!this._options.disableSurfaceUploads) {
                            this._context.updateSurfaceRegion(this._uploadCanvas, oldSurfaceRegion);
                        }
                        return oldSurfaceRegion;
                    }
                };
                WebGLRenderer.prototype._enterClip = function (clip, matrix, brush, viewport) {
                    brush.flush();
                    var gl = this._context.gl;
                    if (this._clipStack.length === 0) {
                        gl.enable(gl.STENCIL_TEST);
                        gl.clear(gl.STENCIL_BUFFER_BIT);
                        gl.stencilFunc(gl.ALWAYS, 1, 1);
                    }
                    this._clipStack.push(clip);
                    gl.colorMask(false, false, false, false);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
                    this._renderFrame(clip, matrix, brush, viewport, 0);
                    brush.flush();
                    gl.colorMask(true, true, true, true);
                    gl.stencilFunc(gl.NOTEQUAL, 0, this._clipStack.length);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                };
                WebGLRenderer.prototype._leaveClip = function (clip, matrix, brush, viewport) {
                    brush.flush();
                    var gl = this._context.gl;
                    var clip = this._clipStack.pop();
                    if (clip) {
                        gl.colorMask(false, false, false, false);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                        this._renderFrame(clip, matrix, brush, viewport, 0);
                        brush.flush();
                        gl.colorMask(true, true, true, true);
                        gl.stencilFunc(gl.NOTEQUAL, 0, this._clipStack.length);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                    }
                    if (this._clipStack.length === 0) {
                        gl.disable(gl.STENCIL_TEST);
                    }
                };
                WebGLRenderer.prototype._renderFrame = function (root, matrix, brush, viewport, depth) {
                    if (depth === void 0) { depth = 0; }
                };
                WebGLRenderer.prototype._renderSurfaces = function (brush) {
                    var options = this._options;
                    var context = this._context;
                    var viewport = this._viewport;
                    if (options.drawSurfaces) {
                        var surfaces = context.surfaces;
                        var matrix = Matrix.createIdentity();
                        if (options.drawSurface >= 0 && options.drawSurface < surfaces.length) {
                            var surface = surfaces[options.drawSurface | 0];
                            var src = new Rectangle(0, 0, surface.w, surface.h);
                            var dst = src.clone();
                            while (dst.w > viewport.w) {
                                dst.scale(0.5, 0.5);
                            }
                            brush.drawImage(new WebGL.WebGLSurfaceRegion(surface, src), dst, Color.White, null, matrix, 0.2);
                        }
                        else {
                            var surfaceWindowSize = viewport.w / 5;
                            if (surfaceWindowSize > viewport.h / surfaces.length) {
                                surfaceWindowSize = viewport.h / surfaces.length;
                            }
                            brush.fillRectangle(new Rectangle(viewport.w - surfaceWindowSize, 0, surfaceWindowSize, viewport.h), new Color(0, 0, 0, 0.5), matrix, 0.1);
                            for (var i = 0; i < surfaces.length; i++) {
                                var surface = surfaces[i];
                                var surfaceWindow = new Rectangle(viewport.w - surfaceWindowSize, i * surfaceWindowSize, surfaceWindowSize, surfaceWindowSize);
                                brush.drawImage(new WebGL.WebGLSurfaceRegion(surface, new Rectangle(0, 0, surface.w, surface.h)), surfaceWindow, Color.White, null, matrix, 0.2);
                            }
                        }
                        brush.flush();
                    }
                };
                WebGLRenderer.prototype.render = function () {
                    var self = this;
                    var stage = this._stage;
                    var options = this._options;
                    var context = this._context;
                    var gl = context.gl;
                    if (options.perspectiveCamera) {
                        this._context.modelViewProjectionMatrix = this._context.createPerspectiveMatrix(options.perspectiveCameraDistance + (options.animateZoom ? Math.sin(Date.now() / 3000) * 0.8 : 0), options.perspectiveCameraFOV, options.perspectiveCameraAngle);
                    }
                    else {
                        this._context.modelViewProjectionMatrix = this._context.create2DProjectionMatrix();
                    }
                    var brush = this._brush;
                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    brush.reset();
                    var viewport = this._viewport;
                    GFX.enterTimeline("_renderFrame");
                    GFX.leaveTimeline();
                    brush.flush();
                    if (options.paintViewport) {
                        brush.fillRectangle(viewport, new Color(0.5, 0, 0, 0.25), Matrix.createIdentity(), 0);
                        brush.flush();
                    }
                    this._renderSurfaces(brush);
                };
                return WebGLRenderer;
            })(GFX.Renderer);
            WebGL.WebGLRenderer = WebGLRenderer;
        })(WebGL = GFX.WebGL || (GFX.WebGL = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var WebGL;
        (function (WebGL) {
            var Color = Shumway.Color;
            var Point = GFX.Geometry.Point;
            var Matrix3D = GFX.Geometry.Matrix3D;
            var WebGLBrush = (function () {
                function WebGLBrush(context, geometry, target) {
                    this._target = target;
                    this._context = context;
                    this._geometry = geometry;
                }
                WebGLBrush.prototype.reset = function () {
                    Shumway.Debug.abstractMethod("reset");
                };
                WebGLBrush.prototype.flush = function () {
                    Shumway.Debug.abstractMethod("flush");
                };
                Object.defineProperty(WebGLBrush.prototype, "target", {
                    get: function () {
                        return this._target;
                    },
                    set: function (target) {
                        if (this._target !== target) {
                            this.flush();
                        }
                        this._target = target;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WebGLBrush;
            })();
            WebGL.WebGLBrush = WebGLBrush;
            (function (WebGLCombinedBrushKind) {
                WebGLCombinedBrushKind[WebGLCombinedBrushKind["FillColor"] = 0] = "FillColor";
                WebGLCombinedBrushKind[WebGLCombinedBrushKind["FillTexture"] = 1] = "FillTexture";
                WebGLCombinedBrushKind[WebGLCombinedBrushKind["FillTextureWithColorMatrix"] = 2] = "FillTextureWithColorMatrix";
            })(WebGL.WebGLCombinedBrushKind || (WebGL.WebGLCombinedBrushKind = {}));
            var WebGLCombinedBrushKind = WebGL.WebGLCombinedBrushKind;
            var WebGLCombinedBrushVertex = (function (_super) {
                __extends(WebGLCombinedBrushVertex, _super);
                function WebGLCombinedBrushVertex(x, y, z) {
                    _super.call(this, x, y, z);
                    this.kind = 0 /* FillColor */;
                    this.color = new Color(0, 0, 0, 0);
                    this.sampler = 0;
                    this.coordinate = new Point(0, 0);
                }
                WebGLCombinedBrushVertex.initializeAttributeList = function (context) {
                    var gl = context.gl;
                    if (WebGLCombinedBrushVertex.attributeList) {
                        return;
                    }
                    WebGLCombinedBrushVertex.attributeList = new WebGL.WebGLAttributeList([
                        new WebGL.WebGLAttribute("aPosition", 3, gl.FLOAT),
                        new WebGL.WebGLAttribute("aCoordinate", 2, gl.FLOAT),
                        new WebGL.WebGLAttribute("aColor", 4, gl.UNSIGNED_BYTE, true),
                        new WebGL.WebGLAttribute("aKind", 1, gl.FLOAT),
                        new WebGL.WebGLAttribute("aSampler", 1, gl.FLOAT)
                    ]);
                    WebGLCombinedBrushVertex.attributeList.initialize(context);
                };
                WebGLCombinedBrushVertex.prototype.writeTo = function (geometry) {
                    var array = geometry.array;
                    array.ensureAdditionalCapacity(68);
                    array.writeVertex3DUnsafe(this.x, this.y, this.z);
                    array.writeVertexUnsafe(this.coordinate.x, this.coordinate.y);
                    array.writeColorUnsafe(this.color.r * 255, this.color.g * 255, this.color.b * 255, this.color.a * 255);
                    array.writeFloatUnsafe(this.kind);
                    array.writeFloatUnsafe(this.sampler);
                };
                return WebGLCombinedBrushVertex;
            })(WebGL.Vertex);
            WebGL.WebGLCombinedBrushVertex = WebGLCombinedBrushVertex;
            var WebGLCombinedBrush = (function (_super) {
                __extends(WebGLCombinedBrush, _super);
                function WebGLCombinedBrush(context, geometry, target) {
                    if (target === void 0) { target = null; }
                    _super.call(this, context, geometry, target);
                    this._blendMode = 1 /* Normal */;
                    this._program = context.createProgramFromFiles("combined.vert", "combined.frag");
                    this._surfaces = [];
                    WebGLCombinedBrushVertex.initializeAttributeList(this._context);
                }
                WebGLCombinedBrush.prototype.reset = function () {
                    this._surfaces = [];
                    this._geometry.reset();
                };
                WebGLCombinedBrush.prototype.drawImage = function (src, dstRectangle, color, colorMatrix, matrix, depth, blendMode) {
                    if (depth === void 0) { depth = 0; }
                    if (blendMode === void 0) { blendMode = 1 /* Normal */; }
                    if (!src || !src.surface) {
                        return true;
                    }
                    dstRectangle = dstRectangle.clone();
                    if (this._colorMatrix) {
                        if (!colorMatrix || !this._colorMatrix.equals(colorMatrix)) {
                            this.flush();
                        }
                    }
                    this._colorMatrix = colorMatrix;
                    if (this._blendMode !== blendMode) {
                        this.flush();
                        this._blendMode = blendMode;
                    }
                    var sampler = this._surfaces.indexOf(src.surface);
                    if (sampler < 0) {
                        if (this._surfaces.length === 8) {
                            this.flush();
                        }
                        this._surfaces.push(src.surface);
                        sampler = this._surfaces.length - 1;
                    }
                    var tmpVertices = WebGLCombinedBrush._tmpVertices;
                    var srcRectangle = src.region.clone();
                    srcRectangle.offset(1, 1).resize(-2, -2);
                    srcRectangle.scale(1 / src.surface.w, 1 / src.surface.h);
                    matrix.transformRectangle(dstRectangle, tmpVertices);
                    for (var i = 0; i < 4; i++) {
                        tmpVertices[i].z = depth;
                    }
                    tmpVertices[0].coordinate.x = srcRectangle.x;
                    tmpVertices[0].coordinate.y = srcRectangle.y;
                    tmpVertices[1].coordinate.x = srcRectangle.x + srcRectangle.w;
                    tmpVertices[1].coordinate.y = srcRectangle.y;
                    tmpVertices[2].coordinate.x = srcRectangle.x + srcRectangle.w;
                    tmpVertices[2].coordinate.y = srcRectangle.y + srcRectangle.h;
                    tmpVertices[3].coordinate.x = srcRectangle.x;
                    tmpVertices[3].coordinate.y = srcRectangle.y + srcRectangle.h;
                    for (var i = 0; i < 4; i++) {
                        var vertex = WebGLCombinedBrush._tmpVertices[i];
                        vertex.kind = colorMatrix ? 2 /* FillTextureWithColorMatrix */ : 1 /* FillTexture */;
                        vertex.color.set(color);
                        vertex.sampler = sampler;
                        vertex.writeTo(this._geometry);
                    }
                    this._geometry.addQuad();
                    return true;
                };
                WebGLCombinedBrush.prototype.fillRectangle = function (rectangle, color, matrix, depth) {
                    if (depth === void 0) { depth = 0; }
                    matrix.transformRectangle(rectangle, WebGLCombinedBrush._tmpVertices);
                    for (var i = 0; i < 4; i++) {
                        var vertex = WebGLCombinedBrush._tmpVertices[i];
                        vertex.kind = 0 /* FillColor */;
                        vertex.color.set(color);
                        vertex.z = depth;
                        vertex.writeTo(this._geometry);
                    }
                    this._geometry.addQuad();
                };
                WebGLCombinedBrush.prototype.flush = function () {
                    GFX.enterTimeline("WebGLCombinedBrush.flush");
                    var g = this._geometry;
                    var p = this._program;
                    var gl = this._context.gl;
                    var matrix;
                    g.uploadBuffers();
                    gl.useProgram(p);
                    if (this._target) {
                        matrix = Matrix3D.create2DProjection(this._target.w, this._target.h, 2000);
                        matrix = Matrix3D.createMultiply(matrix, Matrix3D.createScale(1, -1, 1));
                    }
                    else {
                        matrix = this._context.modelViewProjectionMatrix;
                    }
                    gl.uniformMatrix4fv(p.uniforms.uTransformMatrix3D.location, false, matrix.asWebGLMatrix());
                    if (this._colorMatrix) {
                        gl.uniformMatrix4fv(p.uniforms.uColorMatrix.location, false, this._colorMatrix.asWebGLMatrix());
                        gl.uniform4fv(p.uniforms.uColorVector.location, this._colorMatrix.asWebGLVector());
                    }
                    for (var i = 0; i < this._surfaces.length; i++) {
                        gl.activeTexture(gl.TEXTURE0 + i);
                        gl.bindTexture(gl.TEXTURE_2D, this._surfaces[i].texture);
                    }
                    gl.uniform1iv(p.uniforms["uSampler[0]"].location, [0, 1, 2, 3, 4, 5, 6, 7]);
                    gl.bindBuffer(gl.ARRAY_BUFFER, g.buffer);
                    var size = WebGLCombinedBrushVertex.attributeList.size;
                    var attributeList = WebGLCombinedBrushVertex.attributeList;
                    var attributes = attributeList.attributes;
                    for (var i = 0; i < attributes.length; i++) {
                        var attribute = attributes[i];
                        var position = p.attributes[attribute.name].location;
                        gl.enableVertexAttribArray(position);
                        gl.vertexAttribPointer(position, attribute.size, attribute.type, attribute.normalized, size, attribute.offset);
                    }
                    this._context.setBlendOptions();
                    this._context.target = this._target;
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.elementBuffer);
                    gl.drawElements(gl.TRIANGLES, g.triangleCount * 3, gl.UNSIGNED_SHORT, 0);
                    this.reset();
                    GFX.leaveTimeline("WebGLCombinedBrush.flush");
                };
                WebGLCombinedBrush._tmpVertices = WebGL.Vertex.createEmptyVertices(WebGLCombinedBrushVertex, 4);
                WebGLCombinedBrush._depth = 1;
                return WebGLCombinedBrush;
            })(WebGLBrush);
            WebGL.WebGLCombinedBrush = WebGLCombinedBrush;
        })(WebGL = GFX.WebGL || (GFX.WebGL = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Canvas2D;
        (function (Canvas2D) {
            var assert = Shumway.Debug.assert;
            var originalSave = CanvasRenderingContext2D.prototype.save;
            var originalClip = CanvasRenderingContext2D.prototype.clip;
            var originalFill = CanvasRenderingContext2D.prototype.fill;
            var originalStroke = CanvasRenderingContext2D.prototype.stroke;
            var originalRestore = CanvasRenderingContext2D.prototype.restore;
            var originalBeginPath = CanvasRenderingContext2D.prototype.beginPath;
            function debugSave() {
                if (this.stackDepth === undefined) {
                    this.stackDepth = 0;
                }
                if (this.clipStack === undefined) {
                    this.clipStack = [0];
                }
                else {
                    this.clipStack.push(0);
                }
                this.stackDepth++;
                originalSave.call(this);
            }
            function debugRestore() {
                this.stackDepth--;
                this.clipStack.pop();
                originalRestore.call(this);
            }
            function debugFill() {
                assert(!this.buildingClippingRegionDepth);
                originalFill.apply(this, arguments);
            }
            function debugStroke() {
                assert(GFX.debugClipping.value || !this.buildingClippingRegionDepth);
                originalStroke.apply(this, arguments);
            }
            function debugBeginPath() {
                originalBeginPath.call(this);
            }
            function debugClip() {
                if (this.clipStack === undefined) {
                    this.clipStack = [0];
                }
                this.clipStack[this.clipStack.length - 1]++;
                if (GFX.debugClipping.value) {
                    this.strokeStyle = Shumway.ColorStyle.Pink;
                    this.stroke.apply(this, arguments);
                }
                else {
                    originalClip.apply(this, arguments);
                }
            }
            function notifyReleaseChanged() {
                if (release) {
                    CanvasRenderingContext2D.prototype.save = originalSave;
                    CanvasRenderingContext2D.prototype.clip = originalClip;
                    CanvasRenderingContext2D.prototype.fill = originalFill;
                    CanvasRenderingContext2D.prototype.stroke = originalStroke;
                    CanvasRenderingContext2D.prototype.restore = originalRestore;
                    CanvasRenderingContext2D.prototype.beginPath = originalBeginPath;
                }
                else {
                    CanvasRenderingContext2D.prototype.save = debugSave;
                    CanvasRenderingContext2D.prototype.clip = debugClip;
                    CanvasRenderingContext2D.prototype.fill = debugFill;
                    CanvasRenderingContext2D.prototype.stroke = debugStroke;
                    CanvasRenderingContext2D.prototype.restore = debugRestore;
                    CanvasRenderingContext2D.prototype.beginPath = debugBeginPath;
                }
            }
            Canvas2D.notifyReleaseChanged = notifyReleaseChanged;
            CanvasRenderingContext2D.prototype.enterBuildingClippingRegion = function () {
                if (!this.buildingClippingRegionDepth) {
                    this.buildingClippingRegionDepth = 0;
                }
                this.buildingClippingRegionDepth++;
            };
            CanvasRenderingContext2D.prototype.leaveBuildingClippingRegion = function () {
                this.buildingClippingRegionDepth--;
            };
        })(Canvas2D = GFX.Canvas2D || (GFX.Canvas2D = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Canvas2D;
        (function (Canvas2D) {
            var isFirefox = navigator.userAgent.indexOf('Firefox') != -1;
            var Filters = (function () {
                function Filters() {
                }
                Filters._prepareSVGFilters = function () {
                    if (Filters._svgBlurFilter) {
                        return;
                    }
                    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                    var blurFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
                    blurFilter.setAttribute("id", "svgBlurFilter");
                    var feGaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
                    feGaussianFilter.setAttribute("stdDeviation", "0 0");
                    blurFilter.appendChild(feGaussianFilter);
                    defs.appendChild(blurFilter);
                    Filters._svgBlurFilter = feGaussianFilter;
                    var dropShadowFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
                    dropShadowFilter.setAttribute("id", "svgDropShadowFilter");
                    var feGaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
                    feGaussianFilter.setAttribute("in", "SourceAlpha");
                    feGaussianFilter.setAttribute("stdDeviation", "3");
                    dropShadowFilter.appendChild(feGaussianFilter);
                    Filters._svgDropshadowFilterBlur = feGaussianFilter;
                    var feOffset = document.createElementNS("http://www.w3.org/2000/svg", "feOffset");
                    feOffset.setAttribute("dx", "0");
                    feOffset.setAttribute("dy", "0");
                    feOffset.setAttribute("result", "offsetblur");
                    dropShadowFilter.appendChild(feOffset);
                    Filters._svgDropshadowFilterOffset = feOffset;
                    var feFlood = document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
                    feFlood.setAttribute("flood-color", "rgba(0,0,0,1)");
                    dropShadowFilter.appendChild(feFlood);
                    Filters._svgDropshadowFilterFlood = feFlood;
                    var feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
                    feComposite.setAttribute("in2", "offsetblur");
                    feComposite.setAttribute("operator", "in");
                    dropShadowFilter.appendChild(feComposite);
                    var feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
                    var feMergeNode = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
                    feMerge.appendChild(feMergeNode);
                    var feMergeNode = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
                    feMergeNode.setAttribute("in", "SourceGraphic");
                    feMerge.appendChild(feMergeNode);
                    dropShadowFilter.appendChild(feMerge);
                    defs.appendChild(dropShadowFilter);
                    var colorMatrixFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
                    colorMatrixFilter.setAttribute("id", "svgColorMatrixFilter");
                    var feColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
                    feColorMatrix.setAttribute("color-interpolation-filters", "sRGB");
                    feColorMatrix.setAttribute("in", "SourceGraphic");
                    feColorMatrix.setAttribute("type", "matrix");
                    colorMatrixFilter.appendChild(feColorMatrix);
                    defs.appendChild(colorMatrixFilter);
                    Filters._svgColorMatrixFilter = feColorMatrix;
                    svg.appendChild(defs);
                    document.documentElement.appendChild(svg);
                };
                Filters._applyColorMatrixFilter = function (context, colorMatrix) {
                    Filters._prepareSVGFilters();
                    Filters._svgColorMatrixFilter.setAttribute("values", colorMatrix.toSVGFilterMatrix());
                    context.filter = "url(#svgColorMatrixFilter)";
                };
                Filters._applyFilters = function (ratio, context, filters) {
                    Filters._prepareSVGFilters();
                    Filters._removeFilters(context);
                    var scale = ratio;
                    function getBlurScale(quality) {
                        var blurScale = ratio / 2;
                        switch (quality) {
                            case 0:
                                return 0;
                            case 1:
                                return blurScale / 2.7;
                            case 2:
                                return blurScale / 1.28;
                            case 3:
                            default:
                                return blurScale;
                        }
                    }
                    for (var i = 0; i < filters.length; i++) {
                        var filter = filters[i];
                        if (filter instanceof GFX.BlurFilter) {
                            var blurFilter = filter;
                            var blurScale = getBlurScale(blurFilter.quality);
                            Filters._svgBlurFilter.setAttribute("stdDeviation", blurFilter.blurX * blurScale + " " + blurFilter.blurY * blurScale);
                            context.filter = "url(#svgBlurFilter)";
                        }
                        else if (filter instanceof GFX.DropshadowFilter) {
                            var dropshadowFilter = filter;
                            var blurScale = getBlurScale(dropshadowFilter.quality);
                            Filters._svgDropshadowFilterBlur.setAttribute("stdDeviation", dropshadowFilter.blurX * blurScale + " " + dropshadowFilter.blurY * blurScale);
                            Filters._svgDropshadowFilterOffset.setAttribute("dx", String(Math.cos(dropshadowFilter.angle * Math.PI / 180) * dropshadowFilter.distance * scale));
                            Filters._svgDropshadowFilterOffset.setAttribute("dy", String(Math.sin(dropshadowFilter.angle * Math.PI / 180) * dropshadowFilter.distance * scale));
                            Filters._svgDropshadowFilterFlood.setAttribute("flood-color", Shumway.ColorUtilities.rgbaToCSSStyle(((dropshadowFilter.color << 8) | Math.round(255 * dropshadowFilter.alpha))));
                            context.filter = "url(#svgDropShadowFilter)";
                        }
                    }
                };
                Filters._removeFilters = function (context) {
                    context.filter = "none";
                };
                Filters._applyColorMatrix = function (context, colorMatrix) {
                    Filters._removeFilters(context);
                    if (colorMatrix.isIdentity()) {
                        context.globalAlpha = 1;
                        context.globalColorMatrix = null;
                    }
                    else if (colorMatrix.hasOnlyAlphaMultiplier()) {
                        context.globalAlpha = colorMatrix.alphaMultiplier;
                        context.globalColorMatrix = null;
                    }
                    else {
                        context.globalAlpha = 1;
                        if (Filters._svgFiltersAreSupported && true) {
                            Filters._applyColorMatrixFilter(context, colorMatrix);
                            context.globalColorMatrix = null;
                        }
                        else {
                            context.globalColorMatrix = colorMatrix;
                        }
                    }
                };
                Filters._svgFiltersAreSupported = !!Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "filter");
                return Filters;
            })();
            Canvas2D.Filters = Filters;
            function getCompositeOperation(blendMode) {
                var compositeOp = "source-over";
                switch (blendMode) {
                    case 1 /* Normal */:
                    case 2 /* Layer */:
                        return compositeOp;
                    case 3 /* Multiply */:
                        compositeOp = "multiply";
                        break;
                    case 8 /* Add */:
                    case 4 /* Screen */:
                        compositeOp = "screen";
                        break;
                    case 5 /* Lighten */:
                        compositeOp = "lighten";
                        break;
                    case 6 /* Darken */:
                        compositeOp = "darken";
                        break;
                    case 7 /* Difference */:
                        compositeOp = "difference";
                        break;
                    case 13 /* Overlay */:
                        compositeOp = "overlay";
                        break;
                    case 14 /* HardLight */:
                        compositeOp = "hard-light";
                        break;
                    case 11 /* Alpha */:
                        compositeOp = "destination-in";
                        break;
                    case 12 /* Erase */:
                        compositeOp = "destination-out";
                        break;
                    default:
                        Shumway.Debug.somewhatImplemented("Blend Mode: " + GFX.BlendMode[blendMode]);
                }
                return compositeOp;
            }
            function blendModeShouldClip(blendMode) {
                switch (blendMode) {
                    case 11 /* Alpha */:
                        return true;
                    default:
                        return false;
                }
            }
            var Canvas2DSurfaceRegion = (function () {
                function Canvas2DSurfaceRegion(surface, region, w, h) {
                    this.surface = surface;
                    this.region = region;
                    this.w = w;
                    this.h = h;
                }
                Canvas2DSurfaceRegion.prototype.free = function () {
                    this.surface.free(this);
                };
                Canvas2DSurfaceRegion._ensureCopyCanvasSize = function (w, h) {
                    var canvas;
                    if (!Canvas2DSurfaceRegion._copyCanvasContext) {
                        canvas = document.createElement("canvas");
                        if (typeof registerScratchCanvas !== "undefined") {
                            registerScratchCanvas(canvas);
                        }
                        canvas.width = 512;
                        canvas.height = 512;
                        Canvas2DSurfaceRegion._copyCanvasContext = canvas.getContext("2d");
                    }
                    else {
                        canvas = Canvas2DSurfaceRegion._copyCanvasContext.canvas;
                        if (canvas.width < w || canvas.height < h) {
                            canvas.width = Shumway.IntegerUtilities.nearestPowerOfTwo(w);
                            canvas.height = Shumway.IntegerUtilities.nearestPowerOfTwo(h);
                        }
                    }
                };
                Canvas2DSurfaceRegion.prototype.draw = function (source, x, y, w, h, blendMode) {
                    this.context.setTransform(1, 0, 0, 1, 0, 0);
                    var sourceCanvas, sx = 0, sy = 0;
                    if (source.context.canvas === this.context.canvas) {
                        Canvas2DSurfaceRegion._ensureCopyCanvasSize(w, h);
                        var copyContext = Canvas2DSurfaceRegion._copyCanvasContext;
                        copyContext.clearRect(0, 0, w, h);
                        copyContext.drawImage(source.surface.canvas, source.region.x, source.region.y, w, h, 0, 0, w, h);
                        sourceCanvas = copyContext.canvas;
                        sx = 0;
                        sy = 0;
                    }
                    else {
                        sourceCanvas = source.surface.canvas;
                        sx = source.region.x;
                        sy = source.region.y;
                    }
                    var canvas = this.context.canvas;
                    var clip = blendModeShouldClip(blendMode);
                    if (clip) {
                        this.context.save();
                        this.context.beginPath();
                        this.context.rect(x, y, w, h);
                        this.context.clip();
                    }
                    this.context.globalCompositeOperation = getCompositeOperation(blendMode);
                    this.context.drawImage(sourceCanvas, sx, sy, w, h, x, y, w, h);
                    this.context.globalCompositeOperation = getCompositeOperation(1 /* Normal */);
                    if (clip) {
                        this.context.restore();
                    }
                };
                Object.defineProperty(Canvas2DSurfaceRegion.prototype, "context", {
                    get: function () {
                        return this.surface.context;
                    },
                    enumerable: true,
                    configurable: true
                });
                Canvas2DSurfaceRegion.prototype.resetTransform = function () {
                    this.surface.context.setTransform(1, 0, 0, 1, 0, 0);
                };
                Canvas2DSurfaceRegion.prototype.reset = function () {
                    var context = this.surface.context;
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    context.fillStyle = null;
                    context.strokeStyle = null;
                    context.globalAlpha = 1;
                    context.globalColorMatrix = null;
                    context.globalCompositeOperation = getCompositeOperation(1 /* Normal */);
                };
                Canvas2DSurfaceRegion.prototype.fill = function (fillStyle) {
                    var context = this.surface.context, region = this.region;
                    context.fillStyle = fillStyle;
                    context.fillRect(region.x, region.y, region.w, region.h);
                };
                Canvas2DSurfaceRegion.prototype.clear = function (rectangle) {
                    var context = this.surface.context, region = this.region;
                    if (!rectangle) {
                        rectangle = region;
                    }
                    context.clearRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
                };
                return Canvas2DSurfaceRegion;
            })();
            Canvas2D.Canvas2DSurfaceRegion = Canvas2DSurfaceRegion;
            var Canvas2DSurface = (function () {
                function Canvas2DSurface(canvas, regionAllocator) {
                    this.canvas = canvas;
                    this.context = canvas.getContext("2d");
                    this.w = canvas.width;
                    this.h = canvas.height;
                    this._regionAllocator = regionAllocator;
                }
                Canvas2DSurface.prototype.allocate = function (w, h) {
                    var region = this._regionAllocator.allocate(w, h);
                    if (region) {
                        return new Canvas2DSurfaceRegion(this, region, w, h);
                    }
                    return null;
                };
                Canvas2DSurface.prototype.free = function (surfaceRegion) {
                    this._regionAllocator.free(surfaceRegion.region);
                };
                return Canvas2DSurface;
            })();
            Canvas2D.Canvas2DSurface = Canvas2DSurface;
        })(Canvas2D = GFX.Canvas2D || (GFX.Canvas2D = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Canvas2D;
        (function (Canvas2D) {
            var assert = Shumway.Debug.assert;
            var Rectangle = Shumway.GFX.Geometry.Rectangle;
            var Matrix = Shumway.GFX.Geometry.Matrix;
            var BlendMode = Shumway.GFX.BlendMode;
            var clamp = Shumway.NumberUtilities.clamp;
            var pow2 = Shumway.NumberUtilities.pow2;
            var writer = new Shumway.IndentingWriter(false, dumpLine);
            var MIN_CACHE_LEVELS = 5;
            var MAX_CACHE_LEVELS = 3;
            var MipMapLevel = (function () {
                function MipMapLevel(surfaceRegion, scale) {
                    this.surfaceRegion = surfaceRegion;
                    this.scale = scale;
                }
                return MipMapLevel;
            })();
            Canvas2D.MipMapLevel = MipMapLevel;
            var MipMap = (function () {
                function MipMap(renderer, node, surfaceRegionAllocator, size) {
                    this._node = node;
                    this._levels = [];
                    this._surfaceRegionAllocator = surfaceRegionAllocator;
                    this._size = size;
                    this._renderer = renderer;
                }
                MipMap.prototype.getLevel = function (matrix) {
                    var matrixScale = Math.max(matrix.getAbsoluteScaleX(), matrix.getAbsoluteScaleY());
                    var level = 0;
                    if (matrixScale !== 1) {
                        level = clamp(Math.round(Math.log(matrixScale) / Math.LN2), -MIN_CACHE_LEVELS, MAX_CACHE_LEVELS);
                    }
                    if (!(this._node.hasFlags(2097152 /* Scalable */))) {
                        level = clamp(level, -MIN_CACHE_LEVELS, 0);
                    }
                    var scale = pow2(level);
                    var levelIndex = MIN_CACHE_LEVELS + level;
                    var mipLevel = this._levels[levelIndex];
                    if (!mipLevel) {
                        var bounds = this._node.getBounds();
                        var scaledBounds = bounds.clone();
                        scaledBounds.scale(scale, scale);
                        scaledBounds.snap();
                        var surfaceRegion = this._surfaceRegionAllocator.allocate(scaledBounds.w, scaledBounds.h);
                        var region = surfaceRegion.region;
                        mipLevel = this._levels[levelIndex] = new MipMapLevel(surfaceRegion, scale);
                        var surface = (mipLevel.surfaceRegion.surface);
                        var context = surface.context;
                        var state = new RenderState(surfaceRegion);
                        state.clip.set(region);
                        state.matrix.setElements(scale, 0, 0, scale, region.x - scaledBounds.x, region.y - scaledBounds.y);
                        state.flags |= 64 /* IgnoreNextRenderWithCache */;
                        this._renderer.renderNodeWithState(this._node, state);
                        state.free();
                    }
                    return mipLevel;
                };
                return MipMap;
            })();
            Canvas2D.MipMap = MipMap;
            (function (FillRule) {
                FillRule[FillRule["NonZero"] = 0] = "NonZero";
                FillRule[FillRule["EvenOdd"] = 1] = "EvenOdd";
            })(Canvas2D.FillRule || (Canvas2D.FillRule = {}));
            var FillRule = Canvas2D.FillRule;
            var Canvas2DRendererOptions = (function (_super) {
                __extends(Canvas2DRendererOptions, _super);
                function Canvas2DRendererOptions() {
                    _super.apply(this, arguments);
                    this.snapToDevicePixels = true;
                    this.imageSmoothing = true;
                    this.blending = true;
                    this.debugLayers = false;
                    this.masking = true;
                    this.filters = true;
                    this.cacheShapes = false;
                    this.cacheShapesMaxSize = 256;
                    this.cacheShapesThreshold = 16;
                    this.alpha = false;
                }
                return Canvas2DRendererOptions;
            })(GFX.RendererOptions);
            Canvas2D.Canvas2DRendererOptions = Canvas2DRendererOptions;
            (function (RenderFlags) {
                RenderFlags[RenderFlags["None"] = 0x0000] = "None";
                RenderFlags[RenderFlags["IgnoreNextLayer"] = 0x0001] = "IgnoreNextLayer";
                RenderFlags[RenderFlags["RenderMask"] = 0x0002] = "RenderMask";
                RenderFlags[RenderFlags["IgnoreMask"] = 0x0004] = "IgnoreMask";
                RenderFlags[RenderFlags["PaintStencil"] = 0x0008] = "PaintStencil";
                RenderFlags[RenderFlags["PaintClip"] = 0x0010] = "PaintClip";
                RenderFlags[RenderFlags["IgnoreRenderable"] = 0x0020] = "IgnoreRenderable";
                RenderFlags[RenderFlags["IgnoreNextRenderWithCache"] = 0x0040] = "IgnoreNextRenderWithCache";
                RenderFlags[RenderFlags["CacheShapes"] = 0x0100] = "CacheShapes";
                RenderFlags[RenderFlags["PaintFlashing"] = 0x0200] = "PaintFlashing";
                RenderFlags[RenderFlags["PaintBounds"] = 0x0400] = "PaintBounds";
                RenderFlags[RenderFlags["PaintDirtyRegion"] = 0x0800] = "PaintDirtyRegion";
                RenderFlags[RenderFlags["ImageSmoothing"] = 0x1000] = "ImageSmoothing";
                RenderFlags[RenderFlags["PixelSnapping"] = 0x2000] = "PixelSnapping";
            })(Canvas2D.RenderFlags || (Canvas2D.RenderFlags = {}));
            var RenderFlags = Canvas2D.RenderFlags;
            var MAX_VIEWPORT = Rectangle.createMaxI16();
            var RenderState = (function (_super) {
                __extends(RenderState, _super);
                function RenderState(target) {
                    _super.call(this);
                    this.clip = Rectangle.createEmpty();
                    this.clipList = [];
                    this.flags = 0 /* None */;
                    this.target = null;
                    this.matrix = Matrix.createIdentity();
                    this.colorMatrix = GFX.ColorMatrix.createIdentity();
                    RenderState.allocationCount++;
                    this.target = target;
                }
                RenderState.prototype.set = function (state) {
                    this.clip.set(state.clip);
                    this.target = state.target;
                    this.matrix.set(state.matrix);
                    this.colorMatrix.set(state.colorMatrix);
                    this.flags = state.flags;
                    Shumway.ArrayUtilities.copyFrom(this.clipList, state.clipList);
                };
                RenderState.prototype.clone = function () {
                    var state = RenderState.allocate();
                    if (!state) {
                        state = new RenderState(this.target);
                    }
                    state.set(this);
                    return state;
                };
                RenderState.allocate = function () {
                    var dirtyStack = RenderState._dirtyStack;
                    var state = null;
                    if (dirtyStack.length) {
                        state = dirtyStack.pop();
                    }
                    return state;
                };
                RenderState.prototype.free = function () {
                    RenderState._dirtyStack.push(this);
                };
                RenderState.prototype.transform = function (transform) {
                    var state = this.clone();
                    state.matrix.preMultiply(transform.getMatrix());
                    if (transform.hasColorMatrix()) {
                        state.colorMatrix.multiply(transform.getColorMatrix());
                    }
                    return state;
                };
                RenderState.prototype.hasFlags = function (flags) {
                    return (this.flags & flags) === flags;
                };
                RenderState.prototype.removeFlags = function (flags) {
                    this.flags &= ~flags;
                };
                RenderState.prototype.toggleFlags = function (flags, on) {
                    if (on) {
                        this.flags |= flags;
                    }
                    else {
                        this.flags &= ~flags;
                    }
                };
                RenderState.allocationCount = 0;
                RenderState._dirtyStack = [];
                return RenderState;
            })(GFX.State);
            Canvas2D.RenderState = RenderState;
            var FrameInfo = (function () {
                function FrameInfo() {
                    this._count = 0;
                    this.shapes = 0;
                    this.groups = 0;
                    this.culledNodes = 0;
                }
                FrameInfo.prototype.enter = function (state) {
                    Shumway.GFX.enterTimeline("Frame", { frame: this._count });
                    this._count++;
                    if (!writer) {
                        return;
                    }
                    writer.enter("> Frame: " + this._count);
                    this._enterTime = performance.now();
                    this.shapes = 0;
                    this.groups = 0;
                    this.culledNodes = 0;
                };
                FrameInfo.prototype.leave = function () {
                    Shumway.GFX.leaveTimeline("Frame");
                    if (!writer) {
                        return;
                    }
                    writer.writeLn("Shapes: " + this.shapes + ", Groups: " + this.groups + ", Culled Nodes: " + this.culledNodes);
                    writer.writeLn("Elapsed: " + (performance.now() - this._enterTime).toFixed(2));
                    writer.writeLn("Rectangle: " + Rectangle.allocationCount + ", Matrix: " + Matrix.allocationCount + ", State: " + RenderState.allocationCount);
                    writer.leave("<");
                };
                return FrameInfo;
            })();
            Canvas2D.FrameInfo = FrameInfo;
            var Canvas2DRenderer = (function (_super) {
                __extends(Canvas2DRenderer, _super);
                function Canvas2DRenderer(container, stage, options) {
                    if (options === void 0) { options = new Canvas2DRendererOptions(); }
                    _super.call(this, container, stage, options);
                    this._visited = 0;
                    this._frameInfo = new FrameInfo();
                    this._fontSize = 0;
                    this._layers = [];
                    if (container instanceof HTMLCanvasElement) {
                        var canvas = container;
                        this._viewport = new Rectangle(0, 0, canvas.width, canvas.height);
                        this._target = this._createTarget(canvas);
                    }
                    else {
                        this._addLayer("Background Layer");
                        var canvasLayer = this._addLayer("Canvas Layer");
                        var canvas = document.createElement("canvas");
                        canvasLayer.appendChild(canvas);
                        this._viewport = new Rectangle(0, 0, container.scrollWidth, container.scrollHeight);
                        var self = this;
                        stage.addEventListener(1 /* OnStageBoundsChanged */, function () {
                            self._onStageBoundsChanged(canvas);
                        });
                        this._onStageBoundsChanged(canvas);
                    }
                    Canvas2DRenderer._prepareSurfaceAllocators();
                }
                Canvas2DRenderer.prototype._addLayer = function (name) {
                    var div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.overflow = "hidden";
                    div.style.width = "100%";
                    div.style.height = "100%";
                    this._container.appendChild(div);
                    this._layers.push(div);
                    return div;
                };
                Object.defineProperty(Canvas2DRenderer.prototype, "_backgroundVideoLayer", {
                    get: function () {
                        return this._layers[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Canvas2DRenderer.prototype._createTarget = function (canvas) {
                    return new Canvas2D.Canvas2DSurfaceRegion(new Canvas2D.Canvas2DSurface(canvas), new GFX.RegionAllocator.Region(0, 0, canvas.width, canvas.height), canvas.width, canvas.height);
                };
                Canvas2DRenderer.prototype._onStageBoundsChanged = function (canvas) {
                    var stageBounds = this._stage.getBounds(true);
                    stageBounds.snap();
                    var ratio = this._devicePixelRatio = window.devicePixelRatio || 1;
                    var w = (stageBounds.w / ratio) + 'px';
                    var h = (stageBounds.h / ratio) + 'px';
                    for (var i = 0; i < this._layers.length; i++) {
                        var layer = this._layers[i];
                        layer.style.width = w;
                        layer.style.height = h;
                    }
                    canvas.width = stageBounds.w;
                    canvas.height = stageBounds.h;
                    canvas.style.position = "absolute";
                    canvas.style.width = w;
                    canvas.style.height = h;
                    this._target = this._createTarget(canvas);
                    this._fontSize = 10 * this._devicePixelRatio;
                };
                Canvas2DRenderer._prepareSurfaceAllocators = function () {
                    if (Canvas2DRenderer._initializedCaches) {
                        return;
                    }
                    var minSurfaceSize = 1024;
                    Canvas2DRenderer._surfaceCache = new GFX.SurfaceRegionAllocator.SimpleAllocator(function (w, h) {
                        var canvas = document.createElement("canvas");
                        if (typeof registerScratchCanvas !== "undefined") {
                            registerScratchCanvas(canvas);
                        }
                        var W = Math.max(minSurfaceSize, w);
                        var H = Math.max(minSurfaceSize, h);
                        canvas.width = W;
                        canvas.height = H;
                        var allocator = null;
                        if (w >= 1024 / 2 || h >= 1024 / 2) {
                            allocator = new GFX.RegionAllocator.GridAllocator(W, H, W, H);
                        }
                        else {
                            allocator = new GFX.RegionAllocator.BucketAllocator(W, H);
                        }
                        return new Canvas2D.Canvas2DSurface(canvas, allocator);
                    });
                    Canvas2DRenderer._shapeCache = new GFX.SurfaceRegionAllocator.SimpleAllocator(function (w, h) {
                        var canvas = document.createElement("canvas");
                        if (typeof registerScratchCanvas !== "undefined") {
                            registerScratchCanvas(canvas);
                        }
                        var W = minSurfaceSize, H = minSurfaceSize;
                        canvas.width = W;
                        canvas.height = H;
                        var allocator = allocator = new GFX.RegionAllocator.CompactAllocator(W, H);
                        return new Canvas2D.Canvas2DSurface(canvas, allocator);
                    });
                    Canvas2DRenderer._initializedCaches = true;
                };
                Canvas2DRenderer.prototype.render = function () {
                    var stage = this._stage;
                    var target = this._target;
                    var options = this._options;
                    var viewport = this._viewport;
                    target.reset();
                    target.context.save();
                    target.context.beginPath();
                    target.context.rect(viewport.x, viewport.y, viewport.w, viewport.h);
                    target.context.clip();
                    this._renderStageToTarget(target, stage, viewport);
                    target.reset();
                    if (options.paintViewport) {
                        target.context.beginPath();
                        target.context.rect(viewport.x, viewport.y, viewport.w, viewport.h);
                        target.context.strokeStyle = "#FF4981";
                        target.context.lineWidth = 2;
                        target.context.stroke();
                    }
                    target.context.restore();
                };
                Canvas2DRenderer.prototype.renderNode = function (node, clip, matrix) {
                    var state = new RenderState(this._target);
                    state.clip.set(clip);
                    state.flags = 256 /* CacheShapes */;
                    state.matrix.set(matrix);
                    node.visit(this, state);
                    state.free();
                };
                Canvas2DRenderer.prototype.renderNodeWithState = function (node, state) {
                    node.visit(this, state);
                };
                Canvas2DRenderer.prototype._renderWithCache = function (node, state) {
                    var matrix = state.matrix;
                    var bounds = node.getBounds();
                    if (bounds.isEmpty()) {
                        return false;
                    }
                    var cacheShapesMaxSize = this._options.cacheShapesMaxSize;
                    var matrixScale = Math.max(matrix.getAbsoluteScaleX(), matrix.getAbsoluteScaleY());
                    var renderCount = 100;
                    var paintClip = !!(state.flags & 16 /* PaintClip */);
                    var paintStencil = !!(state.flags & 8 /* PaintStencil */);
                    var paintFlashing = !!(state.flags & 512 /* PaintFlashing */);
                    if (!state.hasFlags(256 /* CacheShapes */)) {
                        return;
                    }
                    if (paintStencil || paintClip || !state.colorMatrix.isIdentity() || node.hasFlags(1048576 /* Dynamic */)) {
                        return false;
                    }
                    if (renderCount < this._options.cacheShapesThreshold || bounds.w * matrixScale > cacheShapesMaxSize || bounds.h * matrixScale > cacheShapesMaxSize) {
                        return false;
                    }
                    var mipMap = node.properties["mipMap"];
                    if (!mipMap) {
                        mipMap = node.properties["mipMap"] = new MipMap(this, node, Canvas2DRenderer._shapeCache, cacheShapesMaxSize);
                    }
                    var mipMapLevel = mipMap.getLevel(matrix);
                    var mipMapLevelSurfaceRegion = (mipMapLevel.surfaceRegion);
                    var region = mipMapLevelSurfaceRegion.region;
                    if (mipMapLevel) {
                        var context = state.target.context;
                        context.imageSmoothingEnabled = context.mozImageSmoothingEnabled = true;
                        context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        context.drawImage(mipMapLevelSurfaceRegion.surface.canvas, region.x, region.y, region.w, region.h, bounds.x, bounds.y, bounds.w, bounds.h);
                        return true;
                    }
                    return false;
                };
                Canvas2DRenderer.prototype._intersectsClipList = function (node, state) {
                    var boundsAABB = node.getBounds(true);
                    var intersects = false;
                    state.matrix.transformRectangleAABB(boundsAABB);
                    if (state.clip.intersects(boundsAABB)) {
                        intersects = true;
                    }
                    var list = state.clipList;
                    if (intersects && list.length) {
                        intersects = false;
                        for (var i = 0; i < list.length; i++) {
                            if (boundsAABB.intersects(list[i])) {
                                intersects = true;
                                break;
                            }
                        }
                    }
                    boundsAABB.free();
                    return intersects;
                };
                Canvas2DRenderer.prototype.visitGroup = function (node, state) {
                    this._frameInfo.groups++;
                    var bounds = node.getBounds();
                    if (node.hasFlags(4 /* IsMask */) && !(state.flags & 4 /* IgnoreMask */)) {
                        return;
                    }
                    if (!node.hasFlags(65536 /* Visible */)) {
                        return;
                    }
                    if (!(state.flags & 1 /* IgnoreNextLayer */) && (node.getLayer().blendMode !== 1 /* Normal */ || node.getLayer().mask) && this._options.blending) {
                        state = state.clone();
                        state.flags |= 1 /* IgnoreNextLayer */;
                        this._renderLayer(node, state);
                        state.free();
                    }
                    else {
                        if (this._intersectsClipList(node, state)) {
                            var clips = null;
                            var children = node.getChildren();
                            for (var i = 0; i < children.length; i++) {
                                var child = children[i];
                                var childState = state.transform(child.getTransform());
                                childState.toggleFlags(4096 /* ImageSmoothing */, child.hasFlags(524288 /* ImageSmoothing */));
                                if (child.clip >= 0) {
                                    clips = clips || new Uint8Array(children.length);
                                    clips[child.clip + i]++;
                                    var clipState = childState.clone();
                                    state.target.context.save();
                                    clipState.flags |= 16 /* PaintClip */;
                                    child.visit(this, clipState);
                                    clipState.free();
                                }
                                else {
                                    child.visit(this, childState);
                                }
                                if (clips && clips[i] > 0) {
                                    while (clips[i]--) {
                                        state.target.context.restore();
                                    }
                                }
                                childState.free();
                            }
                        }
                        else {
                            this._frameInfo.culledNodes++;
                        }
                    }
                    this._renderDebugInfo(node, state);
                };
                Canvas2DRenderer.prototype._renderDebugInfo = function (node, state) {
                    if (!(state.flags & 1024 /* PaintBounds */)) {
                        return;
                    }
                    var context = state.target.context;
                    var bounds = node.getBounds(true);
                    var style = node.properties["style"];
                    if (!style) {
                        style = node.properties["style"] = Shumway.ColorStyle.randomStyle();
                    }
                    context.fillStyle = style;
                    context.strokeStyle = style;
                    state.matrix.transformRectangleAABB(bounds);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    if (bounds.w > 32 && bounds.h > 32) {
                        context.textAlign = "center";
                        context.textBaseline = "middle";
                        context.font = this._fontSize + "px Arial";
                        var debugText = "" + node.id;
                        context.fillText(debugText, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
                    }
                    bounds.free();
                    var matrix = state.matrix;
                    bounds = node.getBounds();
                    context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                    context.lineWidth = 1 / matrix.getScale();
                    context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
                };
                Canvas2DRenderer.prototype.visitStage = function (node, state) {
                    var context = state.target.context;
                    var bounds = node.getBounds(true);
                    state.matrix.transformRectangleAABB(bounds);
                    bounds.intersect(state.clip);
                    state.target.reset();
                    state = state.clone();
                    if (false && node.dirtyRegion) {
                        state.clipList.length = 0;
                        node.dirtyRegion.gatherOptimizedRegions(state.clipList);
                        context.save();
                        if (state.clipList.length) {
                            context.beginPath();
                            for (var i = 0; i < state.clipList.length; i++) {
                                var clip = state.clipList[i];
                                context.rect(clip.x, clip.y, clip.w, clip.h);
                            }
                            context.clip();
                        }
                        else {
                            context.restore();
                            state.free();
                            return;
                        }
                    }
                    state.target.clear(state.clip);
                    if (!node.hasFlags(32768 /* Transparent */) && node.color) {
                        if (!(state.flags & 32 /* IgnoreRenderable */)) {
                            this._container.style.backgroundColor = node.color.toCSSStyle();
                        }
                    }
                    this.visitGroup(node, state);
                    if (node.dirtyRegion) {
                        context.restore();
                        state.target.reset();
                        context.globalAlpha = 0.4;
                        if (state.hasFlags(2048 /* PaintDirtyRegion */)) {
                            node.dirtyRegion.render(state.target.context);
                        }
                        node.dirtyRegion.clear();
                    }
                    state.free();
                };
                Canvas2DRenderer.prototype.visitShape = function (node, state) {
                    if (!this._intersectsClipList(node, state)) {
                        return;
                    }
                    var matrix = state.matrix;
                    if (state.flags & 8192 /* PixelSnapping */) {
                        matrix = matrix.clone();
                        matrix.snap();
                    }
                    var context = state.target.context;
                    Canvas2D.Filters._applyColorMatrix(context, state.colorMatrix);
                    if (node.source instanceof GFX.RenderableVideo) {
                        this.visitRenderableVideo(node.source, state);
                    }
                    else if (context.globalAlpha > 0) {
                        this.visitRenderable(node.source, state, node.ratio);
                    }
                    if (state.flags & 8192 /* PixelSnapping */) {
                        matrix.free();
                    }
                };
                Canvas2DRenderer.prototype.visitRenderableVideo = function (node, state) {
                    if (!node.video || !node.video.videoWidth) {
                        return;
                    }
                    var ratio = this._devicePixelRatio;
                    var matrix = state.matrix.clone();
                    matrix.scale(1 / ratio, 1 / ratio);
                    var bounds = node.getBounds();
                    var videoMatrix = Shumway.GFX.Geometry.Matrix.createIdentity();
                    videoMatrix.scale(bounds.w / node.video.videoWidth, bounds.h / node.video.videoHeight);
                    matrix.preMultiply(videoMatrix);
                    videoMatrix.free();
                    var cssTransform = matrix.toCSSTransform();
                    node.video.style.transformOrigin = "0 0";
                    node.video.style.transform = cssTransform;
                    this._backgroundVideoLayer.appendChild(node.video);
                    matrix.free();
                };
                Canvas2DRenderer.prototype.visitRenderable = function (node, state, ratio) {
                    var bounds = node.getBounds();
                    var matrix = state.matrix;
                    var context = state.target.context;
                    var paintClip = !!(state.flags & 16 /* PaintClip */);
                    var paintStencil = !!(state.flags & 8 /* PaintStencil */);
                    var paintFlashing = !!(state.flags & 512 /* PaintFlashing */);
                    if (bounds.isEmpty()) {
                        return;
                    }
                    if (state.flags & 32 /* IgnoreRenderable */) {
                        return;
                    }
                    if (state.hasFlags(64 /* IgnoreNextRenderWithCache */)) {
                        state.removeFlags(64 /* IgnoreNextRenderWithCache */);
                    }
                    else {
                        if (this._renderWithCache(node, state)) {
                            return;
                        }
                    }
                    context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                    var paintStart = 0;
                    if (paintFlashing) {
                        paintStart = performance.now();
                    }
                    this._frameInfo.shapes++;
                    context.imageSmoothingEnabled = context.mozImageSmoothingEnabled = state.hasFlags(4096 /* ImageSmoothing */);
                    var renderCount = node.properties["renderCount"] || 0;
                    var cacheShapesMaxSize = this._options.cacheShapesMaxSize;
                    var matrixScale = Math.max(matrix.getAbsoluteScaleX(), matrix.getAbsoluteScaleY());
                    node.properties["renderCount"] = ++renderCount;
                    node.render(context, ratio, null, paintClip, paintStencil);
                    if (paintFlashing) {
                        var elapsed = performance.now() - paintStart;
                        context.fillStyle = Shumway.ColorStyle.gradientColor(0.1 / elapsed);
                        context.globalAlpha = 0.3 + 0.1 * Math.random();
                        context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                    }
                };
                Canvas2DRenderer.prototype._renderLayer = function (node, state) {
                    var layer = node.getLayer();
                    var mask = layer.mask;
                    if (!mask) {
                        var clip = Rectangle.allocate();
                        var target = this._renderToTemporarySurface(node, state, clip);
                        if (target) {
                            var matrix = state.matrix;
                            state.target.draw(target, clip.x, clip.y, clip.w, clip.h, layer.blendMode);
                            target.free();
                        }
                        clip.free();
                    }
                    else {
                        var paintStencil = !node.hasFlags(131072 /* CacheAsBitmap */) || !mask.hasFlags(131072 /* CacheAsBitmap */);
                        this._renderWithMask(node, mask, layer.blendMode, paintStencil, state);
                    }
                };
                Canvas2DRenderer.prototype._renderWithMask = function (node, mask, blendMode, stencil, state) {
                    var maskMatrix = mask.getTransform().getConcatenatedMatrix(true);
                    if (!mask.parent) {
                        maskMatrix = maskMatrix.concatClone(this._stage.getTransform().getConcatenatedMatrix());
                    }
                    var aAABB = node.getBounds().clone();
                    state.matrix.transformRectangleAABB(aAABB);
                    aAABB.snap();
                    if (aAABB.isEmpty()) {
                        return;
                    }
                    var bAABB = mask.getBounds().clone();
                    maskMatrix.transformRectangleAABB(bAABB);
                    bAABB.snap();
                    if (bAABB.isEmpty()) {
                        return;
                    }
                    var clip = state.clip.clone();
                    clip.intersect(aAABB);
                    clip.intersect(bAABB);
                    clip.snap();
                    if (clip.isEmpty()) {
                        return;
                    }
                    var aState = state.clone();
                    aState.clip.set(clip);
                    var a = this._renderToTemporarySurface(node, aState, Rectangle.createEmpty());
                    aState.free();
                    var bState = state.clone();
                    bState.clip.set(clip);
                    bState.matrix = maskMatrix;
                    bState.flags |= 4 /* IgnoreMask */;
                    if (stencil) {
                        bState.flags |= 8 /* PaintStencil */;
                    }
                    var b = this._renderToTemporarySurface(mask, bState, Rectangle.createEmpty());
                    bState.free();
                    a.draw(b, 0, 0, clip.w, clip.h, 11 /* Alpha */);
                    var matrix = state.matrix;
                    state.target.draw(a, clip.x, clip.y, clip.w, clip.h, blendMode);
                    b.free();
                    a.free();
                };
                Canvas2DRenderer.prototype._renderStageToTarget = function (target, node, clip) {
                    Rectangle.allocationCount = Matrix.allocationCount = RenderState.allocationCount = 0;
                    var state = new RenderState(target);
                    state.clip.set(clip);
                    if (!this._options.paintRenderable) {
                        state.flags |= 32 /* IgnoreRenderable */;
                    }
                    if (this._options.paintBounds) {
                        state.flags |= 1024 /* PaintBounds */;
                    }
                    if (this._options.paintDirtyRegion) {
                        state.flags |= 2048 /* PaintDirtyRegion */;
                    }
                    if (this._options.paintFlashing) {
                        state.flags |= 512 /* PaintFlashing */;
                    }
                    if (this._options.cacheShapes) {
                        state.flags |= 256 /* CacheShapes */;
                    }
                    if (this._options.imageSmoothing) {
                        state.flags |= 4096 /* ImageSmoothing */;
                    }
                    if (this._options.snapToDevicePixels) {
                        state.flags |= 8192 /* PixelSnapping */;
                    }
                    this._frameInfo.enter(state);
                    node.visit(this, state);
                    this._frameInfo.leave();
                };
                Canvas2DRenderer.prototype._renderToTemporarySurface = function (node, state, clip) {
                    var matrix = state.matrix;
                    var bounds = node.getBounds();
                    var boundsAABB = bounds.clone();
                    matrix.transformRectangleAABB(boundsAABB);
                    boundsAABB.snap();
                    clip.set(boundsAABB);
                    clip.intersect(state.clip);
                    clip.snap();
                    if (clip.isEmpty()) {
                        return null;
                    }
                    var target = this._allocateSurface(clip.w, clip.h);
                    var region = target.region;
                    var surfaceRegionBounds = new Rectangle(region.x, region.y, clip.w, clip.h);
                    target.context.setTransform(1, 0, 0, 1, 0, 0);
                    target.clear();
                    matrix = matrix.clone();
                    matrix.translate(surfaceRegionBounds.x - clip.x, surfaceRegionBounds.y - clip.y);
                    target.context.save();
                    state = state.clone();
                    state.target = target;
                    state.matrix = matrix;
                    state.clip.set(surfaceRegionBounds);
                    node.visit(this, state);
                    state.free();
                    target.context.restore();
                    return target;
                };
                Canvas2DRenderer.prototype._allocateSurface = function (w, h) {
                    var surface = (Canvas2DRenderer._surfaceCache.allocate(w, h));
                    surface.fill("#FF4981");
                    return surface;
                };
                Canvas2DRenderer.prototype.screenShot = function (bounds, stageContent) {
                    if (stageContent) {
                        var contentStage = this._stage.content.groupChild.child;
                        assert(contentStage instanceof GFX.Stage);
                        bounds = contentStage.content.getBounds(true);
                        contentStage.content.getTransform().getConcatenatedMatrix().transformRectangleAABB(bounds);
                        bounds.intersect(this._viewport);
                    }
                    if (!bounds) {
                        bounds = new Rectangle(0, 0, this._target.w, this._target.h);
                    }
                    var canvas = document.createElement("canvas");
                    canvas.width = bounds.w;
                    canvas.height = bounds.h;
                    var context = canvas.getContext("2d");
                    context.fillStyle = this._container.style.backgroundColor;
                    context.fillRect(0, 0, bounds.w, bounds.h);
                    context.drawImage(this._target.context.canvas, bounds.x, bounds.y, bounds.w, bounds.h, 0, 0, bounds.w, bounds.h);
                    return new GFX.ScreenShot(canvas.toDataURL('image/png'), bounds.w, bounds.h);
                };
                Canvas2DRenderer._initializedCaches = false;
                return Canvas2DRenderer;
            })(GFX.Renderer);
            Canvas2D.Canvas2DRenderer = Canvas2DRenderer;
        })(Canvas2D = GFX.Canvas2D || (GFX.Canvas2D = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var assert = Shumway.Debug.assert;
        var Point = GFX.Geometry.Point;
        var Matrix = GFX.Geometry.Matrix;
        var Rectangle = GFX.Geometry.Rectangle;
        var FPS = Shumway.Tools.Mini.FPS;
        var UIState = (function () {
            function UIState() {
            }
            UIState.prototype.onMouseUp = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onMouseDown = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onMouseMove = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onMouseWheel = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onMouseClick = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onKeyUp = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onKeyDown = function (easel, event) {
                easel.state = this;
            };
            UIState.prototype.onKeyPress = function (easel, event) {
                easel.state = this;
            };
            return UIState;
        })();
        GFX.UIState = UIState;
        var StartState = (function (_super) {
            __extends(StartState, _super);
            function StartState() {
                _super.apply(this, arguments);
                this._keyCodes = [];
            }
            StartState.prototype.onMouseDown = function (easel, event) {
                if (event.altKey) {
                    easel.state = new DragState(easel.worldView, easel.getMousePosition(event, null), easel.worldView.getTransform().getMatrix(true));
                }
                else {
                }
            };
            StartState.prototype.onMouseClick = function (easel, event) {
            };
            StartState.prototype.onKeyDown = function (easel, event) {
                this._keyCodes[event.keyCode] = true;
            };
            StartState.prototype.onKeyUp = function (easel, event) {
                this._keyCodes[event.keyCode] = false;
            };
            return StartState;
        })(UIState);
        function normalizeWheelSpeed(event) {
            var normalized;
            if (event.wheelDelta) {
                normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
            }
            else {
                var rawAmmount = event.deltaY ? event.deltaY : event.detail;
                normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
            }
            return normalized;
        }
        var PersistentState = (function (_super) {
            __extends(PersistentState, _super);
            function PersistentState() {
                _super.apply(this, arguments);
                this._keyCodes = [];
                this._paused = false;
                this._mousePosition = new Point(0, 0);
            }
            PersistentState.prototype.onMouseMove = function (easel, event) {
                this._mousePosition = easel.getMousePosition(event, null);
                this._update(easel);
            };
            PersistentState.prototype.onMouseDown = function (easel, event) {
            };
            PersistentState.prototype.onMouseClick = function (easel, event) {
            };
            PersistentState.prototype.onMouseWheel = function (easel, event) {
                var ticks = (event.type === 'DOMMouseScroll') ? -event.detail : event.wheelDelta / 40;
                if (event.altKey) {
                    event.preventDefault();
                    var p = easel.getMousePosition(event, null);
                    var m = easel.worldView.getTransform().getMatrix(true);
                    var s = 1 + ticks / 1000;
                    m.translate(-p.x, -p.y);
                    m.scale(s, s);
                    m.translate(p.x, p.y);
                    easel.worldView.getTransform().setMatrix(m);
                }
            };
            PersistentState.prototype.onKeyPress = function (easel, event) {
                if (event.keyCode === 112 || event.key === 'p') {
                    this._paused = !this._paused;
                }
                if (this._keyCodes[83]) {
                    easel.toggleOption("paintRenderable");
                }
                if (this._keyCodes[86]) {
                    easel.toggleOption("paintViewport");
                }
                if (this._keyCodes[66]) {
                    easel.toggleOption("paintBounds");
                }
                if (this._keyCodes[68]) {
                    easel.toggleOption("paintDirtyRegion");
                }
                if (this._keyCodes[70]) {
                    easel.toggleOption("paintFlashing");
                }
                this._update(easel);
            };
            PersistentState.prototype.onKeyDown = function (easel, event) {
                this._keyCodes[event.keyCode] = true;
                this._update(easel);
            };
            PersistentState.prototype.onKeyUp = function (easel, event) {
                this._keyCodes[event.keyCode] = false;
                this._update(easel);
            };
            PersistentState.prototype._update = function (easel) {
                easel.paused = this._paused;
                if (easel.getOption("paintViewport")) {
                    var w = GFX.viewportLoupeDiameter.value, h = GFX.viewportLoupeDiameter.value;
                    easel.viewport = new Rectangle(this._mousePosition.x - w / 2, this._mousePosition.y - h / 2, w, h);
                }
                else {
                    easel.viewport = null;
                }
            };
            return PersistentState;
        })(UIState);
        var MouseDownState = (function (_super) {
            __extends(MouseDownState, _super);
            function MouseDownState() {
                _super.apply(this, arguments);
                this._startTime = Date.now();
            }
            MouseDownState.prototype.onMouseMove = function (easel, event) {
                if (Date.now() - this._startTime < 10) {
                    return;
                }
                var node = easel.queryNodeUnderMouse(event);
                if (node) {
                    easel.state = new DragState(node, easel.getMousePosition(event, null), node.getTransform().getMatrix(true));
                }
            };
            MouseDownState.prototype.onMouseUp = function (easel, event) {
                easel.state = new StartState();
                easel.selectNodeUnderMouse(event);
            };
            return MouseDownState;
        })(UIState);
        var DragState = (function (_super) {
            __extends(DragState, _super);
            function DragState(target, startPosition, startMatrix) {
                _super.call(this);
                this._target = target;
                this._startPosition = startPosition;
                this._startMatrix = startMatrix;
            }
            DragState.prototype.onMouseMove = function (easel, event) {
                event.preventDefault();
                var p = easel.getMousePosition(event, null);
                p.sub(this._startPosition);
                this._target.getTransform().setMatrix(this._startMatrix.clone().translate(p.x, p.y));
                easel.state = this;
            };
            DragState.prototype.onMouseUp = function (easel, event) {
                easel.state = new StartState();
            };
            return DragState;
        })(UIState);
        var Easel = (function () {
            function Easel(container, disableHiDPI, backgroundColor) {
                if (disableHiDPI === void 0) { disableHiDPI = false; }
                if (backgroundColor === void 0) { backgroundColor = undefined; }
                this._state = new StartState();
                this._persistentState = new PersistentState();
                this.paused = false;
                this.viewport = null;
                this._selectedNodes = [];
                this._eventListeners = Object.create(null);
                this._fullScreen = false;
                release || assert(container && container.children.length === 0, "Easel container must be empty.");
                this._container = container;
                this._stage = new GFX.Stage(512, 512, true);
                this._worldView = this._stage.content;
                this._world = new GFX.Group();
                this._worldView.addChild(this._world);
                this._disableHiDPI = disableHiDPI;
                var stageContainer = document.createElement("div");
                stageContainer.style.position = "absolute";
                stageContainer.style.width = "100%";
                stageContainer.style.height = "100%";
                container.appendChild(stageContainer);
                if (GFX.hud.value) {
                    var hudContainer = document.createElement("div");
                    hudContainer.style.position = "absolute";
                    hudContainer.style.width = "100%";
                    hudContainer.style.height = "100%";
                    hudContainer.style.pointerEvents = "none";
                    hudContainer.style.opacity = "0.7";
                    var fpsContainer = document.createElement("div");
                    fpsContainer.style.position = "absolute";
                    fpsContainer.style.width = "100%";
                    fpsContainer.style.height = "20px";
                    fpsContainer.style.pointerEvents = "none";
                    hudContainer.appendChild(fpsContainer);
                    container.appendChild(hudContainer);
                    this._fps = new FPS(fpsContainer);
                }
                else {
                    this._fps = null;
                }
                var transparent = backgroundColor === 0;
                this.transparent = transparent;
                var cssBackgroundColor = backgroundColor === undefined ? "#14171a" : backgroundColor === 0 ? 'transparent' : Shumway.ColorUtilities.rgbaToCSSStyle(backgroundColor);
                this._options = new GFX.Canvas2D.Canvas2DRendererOptions();
                this._options.alpha = transparent;
                this._renderer = new GFX.Canvas2D.Canvas2DRenderer(stageContainer, this._stage, this._options);
                this._listenForContainerSizeChanges();
                this._onMouseUp = this._onMouseUp.bind(this);
                this._onMouseDown = this._onMouseDown.bind(this);
                this._onMouseMove = this._onMouseMove.bind(this);
                var self = this;
                window.addEventListener("mouseup", function (event) {
                    self._state.onMouseUp(self, event);
                    self._render();
                }, false);
                window.addEventListener("mousemove", function (event) {
                    self._state.onMouseMove(self, event);
                    self._persistentState.onMouseMove(self, event);
                }, false);
                function handleMouseWheel(event) {
                    self._state.onMouseWheel(self, event);
                    self._persistentState.onMouseWheel(self, event);
                }
                window.addEventListener('DOMMouseScroll', handleMouseWheel);
                window.addEventListener("mousewheel", handleMouseWheel);
                container.addEventListener("mousedown", function (event) {
                    self._state.onMouseDown(self, event);
                });
                window.addEventListener("keydown", function (event) {
                    self._state.onKeyDown(self, event);
                    self._persistentState.onKeyDown(self, event);
                }, false);
                window.addEventListener("keypress", function (event) {
                    self._state.onKeyPress(self, event);
                    self._persistentState.onKeyPress(self, event);
                }, false);
                window.addEventListener("keyup", function (event) {
                    self._state.onKeyUp(self, event);
                    self._persistentState.onKeyUp(self, event);
                }, false);
                this._enterRenderLoop();
            }
            Easel.prototype._listenForContainerSizeChanges = function () {
                var pollInterval = 10;
                var w = this._containerWidth;
                var h = this._containerHeight;
                this._onContainerSizeChanged();
                var self = this;
                setInterval(function () {
                    if (w !== self._containerWidth || h !== self._containerHeight) {
                        self._onContainerSizeChanged();
                        w = self._containerWidth;
                        h = self._containerHeight;
                    }
                }, pollInterval);
            };
            Easel.prototype._onContainerSizeChanged = function () {
                var ratio = this.getRatio();
                var sw = Math.ceil(this._containerWidth * ratio);
                var sh = Math.ceil(this._containerHeight * ratio);
                this._stage.setBounds(new Rectangle(0, 0, sw, sh));
                this._stage.content.setBounds(new Rectangle(0, 0, sw, sh));
                this._worldView.getTransform().setMatrix(new Matrix(ratio, 0, 0, ratio, 0, 0));
                this._dispatchEvent('resize');
            };
            Easel.prototype.addEventListener = function (type, listener) {
                if (!this._eventListeners[type]) {
                    this._eventListeners[type] = [];
                }
                this._eventListeners[type].push(listener);
            };
            Easel.prototype._dispatchEvent = function (type) {
                var listeners = this._eventListeners[type];
                if (!listeners) {
                    return;
                }
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i]();
                }
            };
            Easel.prototype._enterRenderLoop = function () {
                var self = this;
                requestAnimationFrame(function tick() {
                    self.render();
                    requestAnimationFrame(tick);
                });
            };
            Object.defineProperty(Easel.prototype, "state", {
                set: function (state) {
                    this._state = state;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Easel.prototype, "cursor", {
                set: function (cursor) {
                    this._container.style.cursor = cursor;
                },
                enumerable: true,
                configurable: true
            });
            Easel.prototype._render = function () {
                GFX.RenderableVideo.checkForVideoUpdates();
                var mustRender = (this._stage.readyToRender() || GFX.forcePaint.value) && !this.paused;
                var renderTime = 0;
                if (mustRender) {
                    var renderer = this._renderer;
                    if (this.viewport) {
                        renderer.viewport = this.viewport;
                    }
                    else {
                        renderer.viewport = this._stage.getBounds();
                    }
                    this._dispatchEvent("render");
                    GFX.enterTimeline("Render");
                    renderTime = performance.now();
                    renderer.render();
                    renderTime = performance.now() - renderTime;
                    GFX.leaveTimeline("Render");
                }
                if (this._fps) {
                    this._fps.tickAndRender(!mustRender, renderTime);
                }
            };
            Easel.prototype.render = function () {
                this._render();
            };
            Object.defineProperty(Easel.prototype, "world", {
                get: function () {
                    return this._world;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Easel.prototype, "worldView", {
                get: function () {
                    return this._worldView;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Easel.prototype, "stage", {
                get: function () {
                    return this._stage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Easel.prototype, "options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            Easel.prototype.getDisplayParameters = function () {
                var ratio = this.getRatio();
                return {
                    stageWidth: this._containerWidth,
                    stageHeight: this._containerHeight,
                    pixelRatio: ratio,
                    screenWidth: window.screen ? window.screen.width : 640,
                    screenHeight: window.screen ? window.screen.height : 480
                };
            };
            Easel.prototype.toggleOption = function (name) {
                var option = this._options;
                option[name] = !option[name];
            };
            Easel.prototype.getOption = function (name) {
                return this._options[name];
            };
            Easel.prototype.getRatio = function () {
                var devicePixelRatio = window.devicePixelRatio || 1;
                var backingStoreRatio = 1;
                var ratio = 1;
                if (devicePixelRatio !== backingStoreRatio && !this._disableHiDPI) {
                    ratio = devicePixelRatio / backingStoreRatio;
                }
                return ratio;
            };
            Object.defineProperty(Easel.prototype, "_containerWidth", {
                get: function () {
                    return this._container.clientWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Easel.prototype, "_containerHeight", {
                get: function () {
                    return this._container.clientHeight;
                },
                enumerable: true,
                configurable: true
            });
            Easel.prototype.queryNodeUnderMouse = function (event) {
                return this._world;
            };
            Easel.prototype.selectNodeUnderMouse = function (event) {
                var frame = this.queryNodeUnderMouse(event);
                if (frame) {
                    this._selectedNodes.push(frame);
                }
                this._render();
            };
            Easel.prototype.getMousePosition = function (event, coordinateSpace) {
                var container = this._container;
                var bRect = container.getBoundingClientRect();
                var ratio = this.getRatio();
                var x = ratio * (event.clientX - bRect.left) * (container.scrollWidth / bRect.width);
                var y = ratio * (event.clientY - bRect.top) * (container.scrollHeight / bRect.height);
                var p = new Point(x, y);
                if (!coordinateSpace) {
                    return p;
                }
                var m = Matrix.createIdentity();
                coordinateSpace.getTransform().getConcatenatedMatrix().inverse(m);
                m.transformPoint(p);
                return p;
            };
            Easel.prototype.getMouseWorldPosition = function (event) {
                return this.getMousePosition(event, this._world);
            };
            Easel.prototype._onMouseDown = function (event) {
            };
            Easel.prototype._onMouseUp = function (event) {
            };
            Easel.prototype._onMouseMove = function (event) {
            };
            Easel.prototype.screenShot = function (bounds, stageContent) {
                return this._renderer.screenShot(bounds, stageContent);
            };
            return Easel;
        })();
        GFX.Easel = Easel;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Matrix = Shumway.GFX.Geometry.Matrix;
        (function (Layout) {
            Layout[Layout["Simple"] = 0] = "Simple";
        })(GFX.Layout || (GFX.Layout = {}));
        var Layout = GFX.Layout;
        var TreeRendererOptions = (function (_super) {
            __extends(TreeRendererOptions, _super);
            function TreeRendererOptions() {
                _super.apply(this, arguments);
                this.layout = 0 /* Simple */;
            }
            return TreeRendererOptions;
        })(GFX.RendererOptions);
        GFX.TreeRendererOptions = TreeRendererOptions;
        var TreeRenderer = (function (_super) {
            __extends(TreeRenderer, _super);
            function TreeRenderer(container, stage, options) {
                if (options === void 0) { options = new TreeRendererOptions(); }
                _super.call(this, container, stage, options);
                this._canvas = document.createElement("canvas");
                this._container.appendChild(this._canvas);
                this._context = this._canvas.getContext("2d");
                this._listenForContainerSizeChanges();
            }
            TreeRenderer.prototype._listenForContainerSizeChanges = function () {
                var pollInterval = 10;
                var w = this._containerWidth;
                var h = this._containerHeight;
                this._onContainerSizeChanged();
                var self = this;
                setInterval(function () {
                    if (w !== self._containerWidth || h !== self._containerHeight) {
                        self._onContainerSizeChanged();
                        w = self._containerWidth;
                        h = self._containerHeight;
                    }
                }, pollInterval);
            };
            TreeRenderer.prototype._getRatio = function () {
                var devicePixelRatio = window.devicePixelRatio || 1;
                var backingStoreRatio = 1;
                var ratio = 1;
                if (devicePixelRatio !== backingStoreRatio) {
                    ratio = devicePixelRatio / backingStoreRatio;
                }
                return ratio;
            };
            TreeRenderer.prototype._onContainerSizeChanged = function () {
                var ratio = this._getRatio();
                var w = Math.ceil(this._containerWidth * ratio);
                var h = Math.ceil(this._containerHeight * ratio);
                var canvas = this._canvas;
                if (ratio > 0) {
                    canvas.width = w * ratio;
                    canvas.height = h * ratio;
                    canvas.style.width = w + 'px';
                    canvas.style.height = h + 'px';
                }
                else {
                    canvas.width = w;
                    canvas.height = h;
                }
            };
            Object.defineProperty(TreeRenderer.prototype, "_containerWidth", {
                get: function () {
                    return this._container.clientWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeRenderer.prototype, "_containerHeight", {
                get: function () {
                    return this._container.clientHeight;
                },
                enumerable: true,
                configurable: true
            });
            TreeRenderer.prototype.render = function () {
                var context = this._context;
                context.save();
                context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                context.scale(1, 1);
                if (this._options.layout === 0 /* Simple */) {
                    this._renderNodeSimple(this._context, this._stage, Matrix.createIdentity());
                }
                context.restore();
            };
            TreeRenderer.prototype._renderNodeSimple = function (context, root, transform) {
                var self = this;
                context.save();
                var fontHeight = 16;
                context.font = fontHeight + "px Arial";
                context.fillStyle = "white";
                var x = 0, y = 0;
                var w = 20, h = fontHeight, hPadding = 2, wColPadding = 8;
                var colX = 0;
                var maxX = 0;
                function visit(node) {
                    var children = node.getChildren();
                    if (node.hasFlags(16 /* Dirty */)) {
                        context.fillStyle = "red";
                    }
                    else {
                        context.fillStyle = "white";
                    }
                    var l = String(node.id);
                    if (node instanceof GFX.RenderableText) {
                        l = "T" + l;
                    }
                    else if (node instanceof GFX.RenderableShape) {
                        l = "S" + l;
                    }
                    else if (node instanceof GFX.RenderableBitmap) {
                        l = "B" + l;
                    }
                    else if (node instanceof GFX.RenderableVideo) {
                        l = "V" + l;
                    }
                    if (node instanceof GFX.Renderable) {
                        l = l + " [" + node._parents.length + "]";
                    }
                    var t = context.measureText(l).width;
                    context.fillText(l, x, y);
                    if (children) {
                        x += t + 4;
                        maxX = Math.max(maxX, x + w);
                        for (var i = 0; i < children.length; i++) {
                            visit(children[i]);
                            if (i < children.length - 1) {
                                y += h + hPadding;
                                if (y > self._canvas.height) {
                                    context.fillStyle = "gray";
                                    x = x - colX + maxX + wColPadding;
                                    colX = maxX + wColPadding;
                                    y = 0;
                                    context.fillStyle = "white";
                                }
                            }
                        }
                        x -= t + 4;
                    }
                }
                visit(root);
                context.restore();
            };
            return TreeRenderer;
        })(GFX.Renderer);
        GFX.TreeRenderer = TreeRenderer;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Remoting;
    (function (Remoting) {
        var GFX;
        (function (GFX) {
            var BlurFilter = Shumway.GFX.BlurFilter;
            var DropshadowFilter = Shumway.GFX.DropshadowFilter;
            var NodeFlags = Shumway.GFX.NodeFlags;
            var Shape = Shumway.GFX.Shape;
            var Group = Shumway.GFX.Group;
            var RenderableShape = Shumway.GFX.RenderableShape;
            var RenderableMorphShape = Shumway.GFX.RenderableMorphShape;
            var RenderableBitmap = Shumway.GFX.RenderableBitmap;
            var RenderableVideo = Shumway.GFX.RenderableVideo;
            var RenderableText = Shumway.GFX.RenderableText;
            var ColorMatrix = Shumway.GFX.ColorMatrix;
            var BlendMode = Shumway.GFX.BlendMode;
            var ShapeData = Shumway.ShapeData;
            var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
            var Stage = Shumway.GFX.Stage;
            var NodeEventType = Shumway.GFX.NodeEventType;
            var Matrix = Shumway.GFX.Geometry.Matrix;
            var Rectangle = Shumway.GFX.Geometry.Rectangle;
            var assert = Shumway.Debug.assert;
            var writer = null;
            var GFXChannelSerializer = (function () {
                function GFXChannelSerializer() {
                }
                GFXChannelSerializer.prototype.writeMouseEvent = function (event, point) {
                    var output = this.output;
                    output.writeInt(300 /* MouseEvent */);
                    var typeId = Shumway.Remoting.MouseEventNames.indexOf(event.type);
                    output.writeInt(typeId);
                    output.writeFloat(point.x);
                    output.writeFloat(point.y);
                    output.writeInt(event.buttons);
                    var flags = (event.ctrlKey ? 1 /* CtrlKey */ : 0) | (event.altKey ? 2 /* AltKey */ : 0) | (event.shiftKey ? 4 /* ShiftKey */ : 0);
                    output.writeInt(flags);
                };
                GFXChannelSerializer.prototype.writeKeyboardEvent = function (event) {
                    var output = this.output;
                    output.writeInt(301 /* KeyboardEvent */);
                    var typeId = Shumway.Remoting.KeyboardEventNames.indexOf(event.type);
                    output.writeInt(typeId);
                    output.writeInt(event.keyCode);
                    output.writeInt(event.charCode);
                    output.writeInt(event.location);
                    var flags = (event.ctrlKey ? 1 /* CtrlKey */ : 0) | (event.altKey ? 2 /* AltKey */ : 0) | (event.shiftKey ? 4 /* ShiftKey */ : 0);
                    output.writeInt(flags);
                };
                GFXChannelSerializer.prototype.writeFocusEvent = function (type) {
                    var output = this.output;
                    output.writeInt(302 /* FocusEvent */);
                    output.writeInt(type);
                };
                GFXChannelSerializer.prototype.writeDecodeImageResponse = function (promiseId, type, data, width, height) {
                    var output = this.output;
                    output.writeInt(108 /* DecodeImageResponse */);
                    output.writeInt(promiseId);
                    output.writeInt(type);
                    this._writeAsset(data);
                    output.writeInt(width);
                    output.writeInt(height);
                };
                GFXChannelSerializer.prototype._writeAsset = function (asset) {
                    this.output.writeInt(this.outputAssets.length);
                    this.outputAssets.push(asset);
                };
                return GFXChannelSerializer;
            })();
            GFX.GFXChannelSerializer = GFXChannelSerializer;
            var GFXChannelDeserializerContext = (function () {
                function GFXChannelDeserializerContext(easelHost, root, transparent) {
                    var stage = this.stage = new Stage(128, 512);
                    if (typeof registerInspectorStage !== "undefined") {
                        registerInspectorStage(stage);
                    }
                    function updateStageBounds(node) {
                        var stageBounds = node.getBounds(true);
                        var ratio = easelHost.easel.getRatio();
                        stageBounds.scale(1 / ratio, 1 / ratio);
                        stageBounds.snap();
                        stage.setBounds(stageBounds);
                    }
                    updateStageBounds(easelHost.stage);
                    easelHost.stage.addEventListener(1 /* OnStageBoundsChanged */, updateStageBounds);
                    easelHost.content = stage.content;
                    if (transparent) {
                        this.stage.setFlags(32768 /* Transparent */);
                    }
                    root.addChild(this.stage);
                    this._nodes = [];
                    this._assets = [];
                    this._easelHost = easelHost;
                    this._canvas = document.createElement("canvas");
                    this._context = this._canvas.getContext("2d");
                }
                GFXChannelDeserializerContext.prototype._registerAsset = function (id, symbolId, asset) {
                    if (typeof registerInspectorAsset !== "undefined") {
                        registerInspectorAsset(id, symbolId, asset);
                    }
                    this._assets[id] = asset;
                };
                GFXChannelDeserializerContext.prototype._makeNode = function (id) {
                    if (id === -1) {
                        return null;
                    }
                    var node = null;
                    if (id & 134217728 /* Asset */) {
                        id &= ~134217728 /* Asset */;
                        node = new Shape(this._assets[id]);
                        this._assets[id].addParent(node);
                    }
                    else {
                        node = this._nodes[id];
                    }
                    release || assert(node, "Node " + node + " of " + id + " has not been sent yet.");
                    return node;
                };
                GFXChannelDeserializerContext.prototype._getAsset = function (id) {
                    return this._assets[id];
                };
                GFXChannelDeserializerContext.prototype._getBitmapAsset = function (id) {
                    return this._assets[id];
                };
                GFXChannelDeserializerContext.prototype._getVideoAsset = function (id) {
                    return this._assets[id];
                };
                GFXChannelDeserializerContext.prototype._getTextAsset = function (id) {
                    return this._assets[id];
                };
                GFXChannelDeserializerContext.prototype._decodeImage = function (type, data, oncomplete) {
                    var image = new Image();
                    var self = this;
                    image.src = URL.createObjectURL(new Blob([data], { type: Shumway.getMIMETypeForImageType(type) }));
                    image.onload = function () {
                        self._canvas.width = image.width;
                        self._canvas.height = image.height;
                        self._context.drawImage(image, 0, 0);
                        oncomplete(self._context.getImageData(0, 0, image.width, image.height));
                    };
                    image.onerror = function () {
                        oncomplete(null);
                    };
                };
                GFXChannelDeserializerContext.prototype.sendVideoPlaybackEvent = function (assetId, eventType, data) {
                    this._easelHost.sendVideoPlaybackEvent(assetId, eventType, data);
                };
                return GFXChannelDeserializerContext;
            })();
            GFX.GFXChannelDeserializerContext = GFXChannelDeserializerContext;
            var GFXChannelDeserializer = (function () {
                function GFXChannelDeserializer() {
                }
                GFXChannelDeserializer.prototype.read = function () {
                    var tag = 0;
                    var input = this.input;
                    var data = {
                        bytesAvailable: input.bytesAvailable,
                        updateGraphics: 0,
                        updateBitmapData: 0,
                        updateTextContent: 0,
                        updateFrame: 0,
                        updateStage: 0,
                        updateNetStream: 0,
                        registerFont: 0,
                        drawToBitmap: 0,
                        decodeImage: 0
                    };
                    Shumway.GFX.enterTimeline("GFXChannelDeserializer.read", data);
                    while (input.bytesAvailable > 0) {
                        tag = input.readInt();
                        switch (tag) {
                            case 0 /* EOF */:
                                Shumway.GFX.leaveTimeline("GFXChannelDeserializer.read");
                                return;
                            case 101 /* UpdateGraphics */:
                                data.updateGraphics++;
                                this._readUpdateGraphics();
                                break;
                            case 102 /* UpdateBitmapData */:
                                data.updateBitmapData++;
                                this._readUpdateBitmapData();
                                break;
                            case 103 /* UpdateTextContent */:
                                data.updateTextContent++;
                                this._readUpdateTextContent();
                                break;
                            case 100 /* UpdateFrame */:
                                data.updateFrame++;
                                this._readUpdateFrame();
                                break;
                            case 104 /* UpdateStage */:
                                data.updateStage++;
                                this._readUpdateStage();
                                break;
                            case 105 /* UpdateNetStream */:
                                data.updateNetStream++;
                                this._readUpdateNetStream();
                                break;
                            case 201 /* DrawToBitmap */:
                                data.drawToBitmap++;
                                this._readDrawToBitmap();
                                break;
                            case 106 /* RequestBitmapData */:
                                data.drawToBitmap++;
                                this._readRequestBitmapData();
                                break;
                            case 107 /* DecodeImage */:
                                data.decodeImage++;
                                this._readDecodeImage();
                                break;
                            default:
                                release || assert(false, 'Unknown MessageReader tag: ' + tag);
                                break;
                        }
                    }
                    Shumway.GFX.leaveTimeline("GFXChannelDeserializer.read");
                };
                GFXChannelDeserializer.prototype._readMatrix = function () {
                    var input = this.input;
                    var matrix = GFXChannelDeserializer._temporaryReadMatrix;
                    matrix.setElements(input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat() / 20, input.readFloat() / 20);
                    return matrix;
                };
                GFXChannelDeserializer.prototype._readRectangle = function () {
                    var input = this.input;
                    var rectangle = GFXChannelDeserializer._temporaryReadRectangle;
                    rectangle.setElements(input.readInt() / 20, input.readInt() / 20, input.readInt() / 20, input.readInt() / 20);
                    return rectangle;
                };
                GFXChannelDeserializer.prototype._readColorMatrix = function () {
                    var input = this.input;
                    var colorMatrix = GFXChannelDeserializer._temporaryReadColorMatrix;
                    var rm = 1, gm = 1, bm = 1, am = 1;
                    var ro = 0, go = 0, bo = 0, ao = 0;
                    switch (input.readInt()) {
                        case 0 /* Identity */:
                            return GFXChannelDeserializer._temporaryReadColorMatrixIdentity;
                            break;
                        case 1 /* AlphaMultiplierOnly */:
                            am = input.readFloat();
                            break;
                        case 2 /* All */:
                            rm = input.readFloat();
                            gm = input.readFloat();
                            bm = input.readFloat();
                            am = input.readFloat();
                            ro = input.readInt();
                            go = input.readInt();
                            bo = input.readInt();
                            ao = input.readInt();
                            break;
                    }
                    colorMatrix.setMultipliersAndOffsets(rm, gm, bm, am, ro, go, bo, ao);
                    return colorMatrix;
                };
                GFXChannelDeserializer.prototype._readAsset = function () {
                    var assetId = this.input.readInt();
                    var asset = this.inputAssets[assetId];
                    this.inputAssets[assetId] = null;
                    return asset;
                };
                GFXChannelDeserializer.prototype._readUpdateGraphics = function () {
                    var input = this.input;
                    var context = this.context;
                    var id = input.readInt();
                    var symbolId = input.readInt();
                    var asset = context._getAsset(id);
                    var bounds = this._readRectangle();
                    var pathData = ShapeData.FromPlainObject(this._readAsset());
                    var numTextures = input.readInt();
                    var textures = [];
                    for (var i = 0; i < numTextures; i++) {
                        var bitmapId = input.readInt();
                        textures.push(context._getBitmapAsset(bitmapId));
                    }
                    if (asset) {
                        asset.update(pathData, textures, bounds);
                    }
                    else {
                        var renderable;
                        if (pathData.morphCoordinates) {
                            renderable = new RenderableMorphShape(id, pathData, textures, bounds);
                        }
                        else {
                            renderable = new RenderableShape(id, pathData, textures, bounds);
                        }
                        for (var i = 0; i < textures.length; i++) {
                            textures[i] && textures[i].addRenderableParent(renderable);
                        }
                        context._registerAsset(id, symbolId, renderable);
                    }
                };
                GFXChannelDeserializer.prototype._readUpdateBitmapData = function () {
                    var input = this.input;
                    var context = this.context;
                    var id = input.readInt();
                    var symbolId = input.readInt();
                    var asset = context._getBitmapAsset(id);
                    var bounds = this._readRectangle();
                    var type = input.readInt();
                    var dataBuffer = DataBuffer.FromPlainObject(this._readAsset());
                    if (!asset) {
                        asset = RenderableBitmap.FromDataBuffer(type, dataBuffer, bounds);
                        context._registerAsset(id, symbolId, asset);
                    }
                    else {
                        asset.updateFromDataBuffer(type, dataBuffer);
                    }
                    if (this.output) {
                    }
                };
                GFXChannelDeserializer.prototype._readUpdateTextContent = function () {
                    var input = this.input;
                    var context = this.context;
                    var id = input.readInt();
                    var symbolId = input.readInt();
                    var asset = context._getTextAsset(id);
                    var bounds = this._readRectangle();
                    var matrix = this._readMatrix();
                    var backgroundColor = input.readInt();
                    var borderColor = input.readInt();
                    var autoSize = input.readInt();
                    var wordWrap = input.readBoolean();
                    var scrollV = input.readInt();
                    var scrollH = input.readInt();
                    var plainText = this._readAsset();
                    var textRunData = DataBuffer.FromPlainObject(this._readAsset());
                    var coords = null;
                    var numCoords = input.readInt();
                    if (numCoords) {
                        coords = new DataBuffer(numCoords * 4);
                        input.readBytes(coords, 0, numCoords * 4);
                    }
                    if (!asset) {
                        asset = new RenderableText(bounds);
                        asset.setContent(plainText, textRunData, matrix, coords);
                        asset.setStyle(backgroundColor, borderColor, scrollV, scrollH);
                        asset.reflow(autoSize, wordWrap);
                        context._registerAsset(id, symbolId, asset);
                    }
                    else {
                        asset.setBounds(bounds);
                        asset.setContent(plainText, textRunData, matrix, coords);
                        asset.setStyle(backgroundColor, borderColor, scrollV, scrollH);
                        asset.reflow(autoSize, wordWrap);
                    }
                    if (this.output) {
                        var rect = asset.textRect;
                        this.output.writeInt(rect.w * 20);
                        this.output.writeInt(rect.h * 20);
                        this.output.writeInt(rect.x * 20);
                        var lines = asset.lines;
                        var numLines = lines.length;
                        this.output.writeInt(numLines);
                        for (var i = 0; i < numLines; i++) {
                            this._writeLineMetrics(lines[i]);
                        }
                    }
                };
                GFXChannelDeserializer.prototype._writeLineMetrics = function (line) {
                    release || assert(this.output);
                    this.output.writeInt(line.x);
                    this.output.writeInt(line.width);
                    this.output.writeInt(line.ascent);
                    this.output.writeInt(line.descent);
                    this.output.writeInt(line.leading);
                };
                GFXChannelDeserializer.prototype._readUpdateStage = function () {
                    var context = this.context;
                    var id = this.input.readInt();
                    if (!context._nodes[id]) {
                        context._nodes[id] = context.stage.content;
                    }
                    var color = this.input.readInt();
                    var bounds = this._readRectangle();
                    context.stage.content.setBounds(bounds);
                    context.stage.color = Shumway.Color.FromARGB(color);
                    context.stage.align = this.input.readInt();
                    context.stage.scaleMode = this.input.readInt();
                    var displayState = this.input.readInt();
                    var currentMouseTarget = this.input.readInt();
                    var cursor = this.input.readInt();
                    context._easelHost.cursor = Shumway.UI.toCSSCursor(cursor);
                    context._easelHost.fullscreen = displayState === 0 || displayState === 1;
                };
                GFXChannelDeserializer.prototype._readUpdateNetStream = function () {
                    var context = this.context;
                    var id = this.input.readInt();
                    var asset = context._getVideoAsset(id);
                    var rectangle = this._readRectangle();
                    var url = this.input.readUTF();
                    if (!asset) {
                        asset = new RenderableVideo(url, rectangle, id, context);
                        context._registerAsset(id, 0, asset);
                    }
                };
                GFXChannelDeserializer.prototype._readFilters = function (node) {
                    var input = this.input;
                    var count = input.readInt();
                    var filters = [];
                    if (count) {
                        for (var i = 0; i < count; i++) {
                            var type = input.readInt();
                            switch (type) {
                                case 0 /* Blur */:
                                    filters.push(new BlurFilter(input.readFloat(), input.readFloat(), input.readInt()));
                                    break;
                                case 1 /* DropShadow */:
                                    filters.push(new DropshadowFilter(input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readInt(), input.readFloat(), input.readBoolean(), input.readBoolean(), input.readBoolean(), input.readInt(), input.readFloat()));
                                    break;
                                default:
                                    Shumway.Debug.somewhatImplemented(Remoting.FilterType[type]);
                                    break;
                            }
                        }
                        node.getLayer().filters = filters;
                    }
                };
                GFXChannelDeserializer.prototype._readUpdateFrame = function () {
                    var input = this.input;
                    var context = this.context;
                    var id = input.readInt();
                    var ratio = 0;
                    writer && writer.writeLn("Receiving UpdateFrame: " + id);
                    var node = context._nodes[id];
                    if (!node) {
                        node = context._nodes[id] = new Group();
                    }
                    var hasBits = input.readInt();
                    if (hasBits & 1 /* HasMatrix */) {
                        node.getTransform().setMatrix(this._readMatrix());
                    }
                    if (hasBits & 8 /* HasColorTransform */) {
                        node.getTransform().setColorMatrix(this._readColorMatrix());
                    }
                    if (hasBits & 64 /* HasMask */) {
                        var maskId = input.readInt();
                        if (maskId >= 0) {
                            node.getLayer().mask = context._makeNode(maskId);
                        }
                    }
                    if (hasBits & 128 /* HasClip */) {
                        node.clip = input.readInt();
                    }
                    if (hasBits & 32 /* HasMiscellaneousProperties */) {
                        ratio = input.readInt() / 0xffff;
                        var blendMode = input.readInt();
                        if (blendMode !== 1 /* Normal */) {
                            node.getLayer().blendMode = blendMode;
                        }
                        this._readFilters(node);
                        node.toggleFlags(65536 /* Visible */, input.readBoolean());
                        node.toggleFlags(131072 /* CacheAsBitmap */, input.readBoolean());
                        node.toggleFlags(262144 /* PixelSnapping */, !!input.readInt());
                        node.toggleFlags(524288 /* ImageSmoothing */, !!input.readInt());
                    }
                    if (hasBits & 4 /* HasChildren */) {
                        var count = input.readInt();
                        var container = node;
                        container.clearChildren();
                        for (var i = 0; i < count; i++) {
                            var childId = input.readInt();
                            var child = context._makeNode(childId);
                            release || assert(child, "Child " + childId + " of " + id + " has not been sent yet.");
                            container.addChild(child);
                        }
                    }
                    if (ratio) {
                        var group = node;
                        var child = group.getChildren()[0];
                        if (child instanceof Shape) {
                            child.ratio = ratio;
                        }
                    }
                };
                GFXChannelDeserializer.prototype._readDrawToBitmap = function () {
                    var input = this.input;
                    var context = this.context;
                    var targetId = input.readInt();
                    var sourceId = input.readInt();
                    var hasBits = input.readInt();
                    var matrix;
                    var colorMatrix;
                    var clipRect;
                    if (hasBits & 1 /* HasMatrix */) {
                        matrix = this._readMatrix().clone();
                    }
                    else {
                        matrix = Matrix.createIdentity();
                    }
                    if (hasBits & 8 /* HasColorTransform */) {
                        colorMatrix = this._readColorMatrix();
                    }
                    if (hasBits & 16 /* HasClipRect */) {
                        clipRect = this._readRectangle();
                    }
                    var blendMode = input.readInt();
                    input.readBoolean();
                    var target = context._getBitmapAsset(targetId);
                    var source = context._makeNode(sourceId);
                    if (!target) {
                        context._registerAsset(targetId, -1, RenderableBitmap.FromNode(source, matrix, colorMatrix, blendMode, clipRect));
                    }
                    else {
                        target.drawNode(source, matrix, colorMatrix, blendMode, clipRect);
                    }
                };
                GFXChannelDeserializer.prototype._readRequestBitmapData = function () {
                    var input = this.input;
                    var output = this.output;
                    var context = this.context;
                    var id = input.readInt();
                    var renderableBitmap = context._getBitmapAsset(id);
                    renderableBitmap.readImageData(output);
                };
                GFXChannelDeserializer.prototype._readDecodeImage = function () {
                    var input = this.input;
                    var output = this.output;
                    var context = this.context;
                    var promiseId = input.readInt();
                    var type = input.readInt();
                    var data = this._readAsset();
                    var self = this;
                    this.context._decodeImage(type, data, function (imageData) {
                        var buffer = new DataBuffer();
                        var serializer = new Shumway.Remoting.GFX.GFXChannelSerializer();
                        var assets = [];
                        serializer.output = buffer;
                        serializer.outputAssets = assets;
                        if (imageData) {
                            serializer.writeDecodeImageResponse(promiseId, 3 /* StraightAlphaRGBA */, imageData.data, imageData.width, imageData.height);
                        }
                        else {
                            serializer.writeDecodeImageResponse(promiseId, 0 /* None */, null, 0, 0);
                        }
                        self.context._easelHost.onSendUpdates(buffer, assets);
                    });
                };
                GFXChannelDeserializer._temporaryReadMatrix = Matrix.createIdentity();
                GFXChannelDeserializer._temporaryReadRectangle = Rectangle.createEmpty();
                GFXChannelDeserializer._temporaryReadColorMatrix = ColorMatrix.createIdentity();
                GFXChannelDeserializer._temporaryReadColorMatrixIdentity = ColorMatrix.createIdentity();
                return GFXChannelDeserializer;
            })();
            GFX.GFXChannelDeserializer = GFXChannelDeserializer;
        })(GFX = Remoting.GFX || (Remoting.GFX = {}));
    })(Remoting = Shumway.Remoting || (Shumway.Remoting = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Point = Shumway.GFX.Geometry.Point;
        var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
        var EaselHost = (function () {
            function EaselHost(easel) {
                this._easel = easel;
                var group = easel.world;
                var transparent = easel.transparent;
                this._group = group;
                this._content = null;
                this._fullscreen = false;
                this._context = new Shumway.Remoting.GFX.GFXChannelDeserializerContext(this, this._group, transparent);
                this._addEventListeners();
            }
            EaselHost.prototype.onSendUpdates = function (update, asssets) {
                throw new Error('This method is abstract');
            };
            Object.defineProperty(EaselHost.prototype, "easel", {
                get: function () {
                    return this._easel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EaselHost.prototype, "stage", {
                get: function () {
                    return this._easel.stage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EaselHost.prototype, "content", {
                set: function (value) {
                    this._content = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EaselHost.prototype, "cursor", {
                set: function (cursor) {
                    this._easel.cursor = cursor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EaselHost.prototype, "fullscreen", {
                set: function (value) {
                    if (this._fullscreen !== value) {
                        this._fullscreen = value;
                        var firefoxCom = window.FirefoxCom;
                        if (firefoxCom) {
                            firefoxCom.request('setFullscreen', value, null);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            EaselHost.prototype._mouseEventListener = function (event) {
                var position = this._easel.getMousePosition(event, this._content);
                var point = new Point(position.x, position.y);
                var buffer = new DataBuffer();
                var serializer = new Shumway.Remoting.GFX.GFXChannelSerializer();
                serializer.output = buffer;
                serializer.writeMouseEvent(event, point);
                this.onSendUpdates(buffer, []);
            };
            EaselHost.prototype._keyboardEventListener = function (event) {
                var buffer = new DataBuffer();
                var serializer = new Shumway.Remoting.GFX.GFXChannelSerializer();
                serializer.output = buffer;
                serializer.writeKeyboardEvent(event);
                this.onSendUpdates(buffer, []);
            };
            EaselHost.prototype._addEventListeners = function () {
                var mouseEventListener = this._mouseEventListener.bind(this);
                var keyboardEventListener = this._keyboardEventListener.bind(this);
                var mouseEvents = EaselHost._mouseEvents;
                for (var i = 0; i < mouseEvents.length; i++) {
                    window.addEventListener(mouseEvents[i], mouseEventListener);
                }
                var keyboardEvents = EaselHost._keyboardEvents;
                for (var i = 0; i < keyboardEvents.length; i++) {
                    window.addEventListener(keyboardEvents[i], keyboardEventListener);
                }
                this._addFocusEventListeners();
                this._easel.addEventListener('resize', this._resizeEventListener.bind(this));
            };
            EaselHost.prototype._sendFocusEvent = function (type) {
                var buffer = new DataBuffer();
                var serializer = new Shumway.Remoting.GFX.GFXChannelSerializer();
                serializer.output = buffer;
                serializer.writeFocusEvent(type);
                this.onSendUpdates(buffer, []);
            };
            EaselHost.prototype._addFocusEventListeners = function () {
                var self = this;
                document.addEventListener('visibilitychange', function (event) {
                    self._sendFocusEvent(document.hidden ? 0 /* DocumentHidden */ : 1 /* DocumentVisible */);
                });
                window.addEventListener('focus', function (event) {
                    self._sendFocusEvent(3 /* WindowFocus */);
                });
                window.addEventListener('blur', function (event) {
                    self._sendFocusEvent(2 /* WindowBlur */);
                });
            };
            EaselHost.prototype._resizeEventListener = function () {
                this.onDisplayParameters(this._easel.getDisplayParameters());
            };
            EaselHost.prototype.onDisplayParameters = function (params) {
                throw new Error('This method is abstract');
            };
            EaselHost.prototype.processUpdates = function (updates, assets, output) {
                if (output === void 0) { output = null; }
                var deserializer = new Shumway.Remoting.GFX.GFXChannelDeserializer();
                deserializer.input = updates;
                deserializer.inputAssets = assets;
                deserializer.output = output;
                deserializer.context = this._context;
                deserializer.read();
            };
            EaselHost.prototype.processExternalCommand = function (command) {
                if (command.action === 'isEnabled') {
                    command.result = false;
                    return;
                }
                throw new Error('This command is not supported');
            };
            EaselHost.prototype.processVideoControl = function (id, eventType, data) {
                var asset = this._context._getVideoAsset(id);
                if (!asset) {
                    return undefined;
                }
                return asset.processControlRequest(eventType, data);
            };
            EaselHost.prototype.processFSCommand = function (command, args) {
            };
            EaselHost.prototype.processFrame = function () {
            };
            EaselHost.prototype.onExernalCallback = function (request) {
                throw new Error('This method is abstract');
            };
            EaselHost.prototype.sendExernalCallback = function (functionName, args) {
                var request = {
                    functionName: functionName,
                    args: args
                };
                this.onExernalCallback(request);
                if (request.error) {
                    throw new Error(request.error);
                }
                return request.result;
            };
            EaselHost.prototype.onVideoPlaybackEvent = function (id, eventType, data) {
                throw new Error('This method is abstract');
            };
            EaselHost.prototype.sendVideoPlaybackEvent = function (id, eventType, data) {
                this.onVideoPlaybackEvent(id, eventType, data);
            };
            EaselHost._mouseEvents = Shumway.Remoting.MouseEventNames;
            EaselHost._keyboardEvents = Shumway.Remoting.KeyboardEventNames;
            return EaselHost;
        })();
        GFX.EaselHost = EaselHost;
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Window;
        (function (Window) {
            var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
            var CircularBuffer = Shumway.CircularBuffer;
            var TimelineBuffer = Shumway.Tools.Profiler.TimelineBuffer;
            var WindowEaselHost = (function (_super) {
                __extends(WindowEaselHost, _super);
                function WindowEaselHost(easel, playerWindow, window) {
                    _super.call(this, easel);
                    this._timelineRequests = Object.create(null);
                    this._playerWindow = playerWindow;
                    this._window = window;
                    this._window.addEventListener('message', function (e) {
                        this.onWindowMessage(e.data);
                    }.bind(this));
                    this._window.addEventListener('syncmessage', function (e) {
                        this.onWindowMessage(e.detail, false);
                    }.bind(this));
                }
                WindowEaselHost.prototype.onSendUpdates = function (updates, assets) {
                    var bytes = updates.getBytes();
                    this._playerWindow.postMessage({
                        type: 'gfx',
                        updates: bytes,
                        assets: assets
                    }, '*', [bytes.buffer]);
                };
                WindowEaselHost.prototype.onExernalCallback = function (request) {
                    var event = this._playerWindow.document.createEvent('CustomEvent');
                    event.initCustomEvent('syncmessage', false, false, {
                        type: 'externalCallback',
                        request: request
                    });
                    this._playerWindow.dispatchEvent(event);
                };
                WindowEaselHost.prototype.onDisplayParameters = function (params) {
                    this._playerWindow.postMessage({
                        type: 'displayParameters',
                        params: params
                    }, '*');
                };
                WindowEaselHost.prototype.onVideoPlaybackEvent = function (id, eventType, data) {
                    var event = this._playerWindow.document.createEvent('CustomEvent');
                    event.initCustomEvent('syncmessage', false, false, {
                        type: 'videoPlayback',
                        id: id,
                        eventType: eventType,
                        data: data
                    });
                    this._playerWindow.dispatchEvent(event);
                };
                WindowEaselHost.prototype.requestTimeline = function (type, cmd) {
                    return new Promise(function (resolve) {
                        this._timelineRequests[type] = resolve;
                        this._playerWindow.postMessage({
                            type: 'timeline',
                            cmd: cmd,
                            request: type
                        }, '*');
                    }.bind(this));
                };
                WindowEaselHost.prototype.onWindowMessage = function (data, async) {
                    if (async === void 0) { async = true; }
                    if (typeof data === 'object' && data !== null) {
                        if (data.type === 'player') {
                            var updates = DataBuffer.FromArrayBuffer(data.updates.buffer);
                            if (async) {
                                this.processUpdates(updates, data.assets);
                            }
                            else {
                                var output = new DataBuffer();
                                this.processUpdates(updates, data.assets, output);
                                data.result = output.toPlainObject();
                            }
                        }
                        else if (data.type === 'frame') {
                            this.processFrame();
                        }
                        else if (data.type === 'external') {
                            this.processExternalCommand(data.request);
                        }
                        else if (data.type === 'videoControl') {
                            data.result = this.processVideoControl(data.id, data.eventType, data.data);
                        }
                        else if (data.type === 'fscommand') {
                            this.processFSCommand(data.command, data.args);
                        }
                        else if (data.type === 'timelineResponse' && data.timeline) {
                            data.timeline.__proto__ = TimelineBuffer.prototype;
                            data.timeline._marks.__proto__ = CircularBuffer.prototype;
                            data.timeline._times.__proto__ = CircularBuffer.prototype;
                            this._timelineRequests[data.request](data.timeline);
                        }
                    }
                };
                return WindowEaselHost;
            })(GFX.EaselHost);
            Window.WindowEaselHost = WindowEaselHost;
        })(Window = GFX.Window || (GFX.Window = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var GFX;
    (function (GFX) {
        var Test;
        (function (Test) {
            var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
            var TestEaselHost = (function (_super) {
                __extends(TestEaselHost, _super);
                function TestEaselHost(easel) {
                    _super.call(this, easel);
                    this._worker = Shumway.Player.Test.FakeSyncWorker.instance;
                    this._worker.addEventListener('message', this._onWorkerMessage.bind(this));
                    this._worker.addEventListener('syncmessage', this._onSyncWorkerMessage.bind(this));
                }
                TestEaselHost.prototype.onSendUpdates = function (updates, assets) {
                    var bytes = updates.getBytes();
                    this._worker.postMessage({
                        type: 'gfx',
                        updates: bytes,
                        assets: assets
                    }, [bytes.buffer]);
                };
                TestEaselHost.prototype.onExernalCallback = function (request) {
                    this._worker.postSyncMessage({
                        type: 'externalCallback',
                        request: request
                    });
                };
                TestEaselHost.prototype.onDisplayParameters = function (params) {
                    this._worker.postMessage({
                        type: 'displayParameters',
                        params: params
                    });
                };
                TestEaselHost.prototype.onVideoPlaybackEvent = function (id, eventType, data) {
                    this._worker.postMessage({
                        type: 'videoPlayback',
                        id: id,
                        eventType: eventType,
                        data: data
                    });
                };
                TestEaselHost.prototype.requestTimeline = function (type, cmd) {
                    var buffer;
                    switch (type) {
                        case 'AVM2':
                            buffer = Shumway.AVM2.timelineBuffer;
                            break;
                        case 'Player':
                            buffer = Shumway.Player.timelineBuffer;
                            break;
                        case 'SWF':
                            buffer = Shumway.SWF.timelineBuffer;
                            break;
                    }
                    if (cmd === 'clear' && buffer) {
                        buffer.reset();
                    }
                    return Promise.resolve(buffer);
                };
                TestEaselHost.prototype._onWorkerMessage = function (e, async) {
                    if (async === void 0) { async = true; }
                    var data = e.data;
                    if (typeof data !== 'object' || data === null) {
                        return;
                    }
                    var type = data.type;
                    switch (type) {
                        case 'player':
                            var updates = DataBuffer.FromArrayBuffer(data.updates.buffer);
                            if (async) {
                                this.processUpdates(updates, data.assets);
                            }
                            else {
                                var output = new DataBuffer();
                                this.processUpdates(updates, data.assets, output);
                                e.result = output.toPlainObject();
                                e.handled = true;
                            }
                            break;
                        case 'frame':
                            this.processFrame();
                            break;
                        case 'external':
                            e.result = this.processExternalCommand(data.command);
                            e.handled = true;
                            break;
                        case 'videoControl':
                            e.result = this.processVideoControl(data.id, data.eventType, data.data);
                            e.handled = true;
                            break;
                        case 'fscommand':
                            this.processFSCommand(data.command, data.args);
                            break;
                    }
                };
                TestEaselHost.prototype._onSyncWorkerMessage = function (e) {
                    return this._onWorkerMessage(e, false);
                };
                return TestEaselHost;
            })(GFX.EaselHost);
            Test.TestEaselHost = TestEaselHost;
        })(Test = GFX.Test || (GFX.Test = {}));
    })(GFX = Shumway.GFX || (Shumway.GFX = {}));
})(Shumway || (Shumway = {}));
//# sourceMappingURL=gfx.js.map
console.timeEnd("Load GFX Dependencies");
