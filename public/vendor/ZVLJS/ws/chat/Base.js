'use strict';
ZVLJS.createNamespace('ZVLJS.ws.chat');

ZVLJS.ws.chat.Base = function (options) {
    ZVLJS.override(this, options);
    this.createDom();
};
ZVLJS.ws.chat.Base.prototype.__proto__ = ZVLJS.ws.WS.prototype;
ZVLJS.override(ZVLJS.ws.chat.Base.prototype, {
    domEl : undefined,
    template: undefined,
    css : undefined,
    getUrlTemplateHtml : function(){
        let url = ZVLJS.Loader.getBaseUrl() + '/templates/' + this.template;
        return url;
    },
    getUrlTemplateCss : function(){
        let url = ZVLJS.Loader.getBaseUrl() + '/templates/' + this.css;
        return url;
    },
    createDom: function () {
        let urlHtml = this.getUrlTemplateHtml(),
            urlCss = this.getUrlTemplateCss();
        ZVLJS.Loader.loadCss(urlCss);
        ZVLJS.Loader.loadHtmlFragment(urlHtml, function (isSuccess, domEl) {
            if (!isSuccess){
                throw new Error('Error loading template from ' + urlHtml);
            }
            this.domEl = domEl;
            this.initTemplate();
        }, this);
    },
    initTemplate(){
        document.body.appendChild(this.domEl);
    }
});

