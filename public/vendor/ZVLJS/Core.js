'use strict';
window.ZVLJS = {
    emptyFn() {
    },
    createNamespace(namespace) {
        let parts = namespace.split('.'),
            lastNode = window;
        parts.forEach(function (item, index) {
            if (item in lastNode) {
                if (!this.isObject(lastNode[item])) {
                    throw new Error('Part of namespace is not Object.');
                }
            } else {
                lastNode[item] = {};
            }
            lastNode = lastNode[item];
        }, this);
        return lastNode;
    },
    define(namspace, config) {
        let nsObj = this.createNamespace(namspace);
        this.override(nsObj, config);
        return nsObj;
    },
    override(obj, config) {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                obj[key] = config[key];
            }
        }
        return obj;
    },
    createDelegate(f, scope) {
        return function () {
            return f.apply(scope, arguments);
        }
    },
    isArray(value) {
        return typeof(value) === 'object';
    },
    isObject(value) {
        return typeof(value) === 'object';
    },
    isString: function (value) {
        return typeof(value) === 'string';
    },
    isDefined(value) {
        return value !== undefined && !isNaN(value);
    }
};
ZVLJS.override(ZVLJS, {
    version : '0.0.0',
    description : 'ZVLJS - ZVano Library JavaScript',
    isDebug: false,
    /**
     * @see {"debug.js"}
     */
    debug: ZVLJS.emptyFn
});