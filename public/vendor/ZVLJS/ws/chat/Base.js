'use strict';
ZVLJS.createNamespace('ZVLJS.ws.chat');

ZVLJS.ws.chat.Base = function (options) {
    ZVLJS.override(this, options);
    this.createDom();
};
ZVLJS.ws.chat.Base.prototype.__proto__ = ZVLJS.ws.WS.prototype;

ZVLJS.override(ZVLJS.ws.chat.Base.prototype, {
    chatRoom : undefined,
    MSG_TYPE : {
        LOGIN : 'LOGIN',
        LOGOUT : 'LOGOUT',
        MESSAGE_TEXT : 'MESSAGE_TEXT'
    },
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
        ZVLJS.debug('ZVLJS.ws.chat.Base/initTemplate', arguments)
        document.body.appendChild(this.domEl);
    },
    onClose(){
        ZVLJS.debug('ZVLJS.ws.chat.Base/onClose', arguments);
        ZVLJS.ws.chat.Base.prototype.__proto__.onClose.apply(this, arguments);
    },
    login(login, pass, options){
        this.checkIsConnected();
        this.sendJson({
            msgType : this.MSG_TYPE.LOGIN,
            login : login,
            pass : pass,
            chatRoom: this.chatRoom
        });
    },
    onLogin(json){
        ZVLJS.debug('ZVLJS.ws.chat.Base/onLogin', arguments)
    },
    logout (){

    },
    onMessage : function (e) {
        ZVLJS.debug('ZVLJS.ws.chat.Base/onMessage', arguments);
        let json = JSON.parse(e.data);
        this.onJsonMessage(json);
        // ZVLJS.ws.chat.Guest.prototype.__proto__.onMessage.apply(this, arguments);
        // return false;
    },
    /**
     * Обрабатывает сообщение в формате JSON.
     * Возвращает TRUE, если сообщение обработано в текущем классе.
     * Возвращает FALSE, если сообщение данного типа неизвестно текущему классу.
     * @param json
     * @returns {boolean}
     */
    onJsonMessage : function (json) {
        switch (json.msgType) {
            case this.MSG_TYPE.LOGIN :
                this.onLogin(json);
                return true;
            case this.MSG_TYPE.MESSAGE_TEXT :
                this.onJsonMessageText(json);
                return true;
        }
        return false;
    }
});

