'use strict';
ZVLJS.Loader = {
    baseUrl : document.location.origin + '/ZVLJS',
    scripts : [
         '/ws/WS.js',
        '/ws/chat/Base.js',
         '/ws/chat/Guest.js'
    ],
    css : [
        '/css/Core.css',
        '/templates/WsChatGuest.css'
    ],
    setBaseUrl (value){
        this.baseUrl = value;
        return this;
    },
    getBaseUrl(){
        return this.baseUrl;
    },
    load(callback, scope) {
        this.css.forEach(function (url) {
            let absoluteUrl = this.baseUrl +  url;
            this.loadCss(absoluteUrl);
        }, this);

        let urs = Object.assign(this.scripts),
            cnrLoad = urs.length;
        this.scripts.forEach(function (url) {
            let absoluteUrl = this.baseUrl +  url;
            ZVLJS.debug('ZVLJS.Loader.load/beforeLoad', absoluteUrl);
            this.loadScript(absoluteUrl, function (isSuccess, message) {
                if (!isSuccess){
                    throw new Error('Can\'t load script. ' + absoluteUrl + '.' + (message ? ' Error:' + message: ''));
                }
                ZVLJS.debug('ZVLJS.Loader.load/afterLoad', absoluteUrl);
                --cnrLoad;
                if (cnrLoad == 0){
                    callback.call(scope, true)
                }
            }, this);
        }, this);

    },
    loadCss : function(url){
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: url
        }).appendTo("head");
    },
    loadScript(url, callback, scope) {
        scope = scope || this;
        try {
            let domEl = document.createElement('script');
            domEl.setAttribute("defer", "defer");
            domEl.async = false;
            domEl.onload = function () {
                callback.call(scope, true);
            };
            domEl.onerror = function (event) {
                callback.call(scope, false);
            };
            domEl.src = url;
            document.head.appendChild(domEl);
        } catch (e) {
            callback.call(scope, e.message);
        }
    },
    loadHtml(url, callback, scope){
        let domEl = document.createElement('div');
        domEl.onload = function () {
            alert('onload');
            callback.call(scope, true, domEl)
        };
        domEl.onerror = function () {
            callback.call(scope, false, domEl)
        };
        domEl.innerHTML = '<object type="text/html" data="' + url + '" ></object>'
        document.body.appendChild(domEl);
        return domEl;
    },
    loadHtmlFragment(url, callback, scope){
        $.ajax({
            url: url
        }).done(function(data) {
            let domEl = document.createElement('div');
            domEl.innerHTML = data;
            callback.call(scope, true, domEl);
        }).fail(function() {
            callback.call(scope, false);
        });
    }
};
