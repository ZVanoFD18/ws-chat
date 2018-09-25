'use strict';
ZVLJS.createNamespace('ZVLJS.ws.chat');

ZVLJS.ws.chat.Guest = function (options) {
    ZVLJS.override(this, options);
    this.createDom();
};
ZVLJS.ws.chat.Guest.prototype.__proto__ = ZVLJS.ws.WS.prototype;
ZVLJS.override(ZVLJS.ws.chat.Guest.prototype, {
    domEl : undefined,
    template: 'WsChatGuest.html',
    css : 'WsChatGuest.css',
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
        $(this.domEl).find('[data-id="buttonConnect"]').disabled = false;
        $(this.domEl).find('[data-id="buttonConnect"]').click(ZVLJS.createDelegate(this.onClickConnect, this));

        $(this.domEl).find('[data-id="buttonSend"]').disabled = true;
        $(this.domEl).find('[data-id="buttonSend"]').click(ZVLJS.createDelegate(this.onClickSend, this));
        
        document.body.appendChild(this.domEl);
    },
    onClickConnect (){
        this.connect();
    },
    onClickSend (){
        //let message = $(this.domEl).find('[data-id="sendText"]').value();
        let message = $(this.domEl).find('[data-id="sendText"]')[0].value;
        this.sendText(message);
    },
    onOpen : function (e) {
        $(this.domEl).find('[data-id="buttonConnect"]').disabled = true;
        $(this.domEl).find('[data-id="buttonSend"]').disabled = false;
    },
});

