'use strict';
ZVLJS.createNamespace('ZVLJS.ws.chat');

ZVLJS.ws.chat.Guest = function (options) {
    // ZVLJS.override(this, ZVLJS.ws.chat.GuestBase);
    ZVLJS.override(this, options);
    this.createDom();
};
ZVLJS.ws.chat.Guest.prototype.__proto__ = ZVLJS.ws.chat.Base.prototype;

ZVLJS.override(ZVLJS.ws.chat.Guest.prototype, {
    USER_ROLE : 'GUEST',
    domEl : undefined,
    template: 'WsChatGuest.html',
    css : 'WsChatGuest.css',
    initTemplate(){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/initTemplate', arguments)
        $(this.domEl).find('[data-id="buttonConnect"]').prop('disabled', false);
        $(this.domEl).find('[data-id="buttonConnect"]').click(ZVLJS.createDelegate(this.onClickConnect, this));
        $(this.domEl).find('[data-id="buttonDisconnect"]').prop('disabled', true);
        $(this.domEl).find('[data-id="buttonDisconnect"]').click(ZVLJS.createDelegate(this.onClickDisonnect, this));


        $(this.domEl).find('[data-id="buttonLogin"]').prop('disabled', true);
        $(this.domEl).find('[data-id="buttonLogin"]').click(ZVLJS.createDelegate(this.onClickLogin, this));

        $(this.domEl).find('[data-id="buttonSend"]').prop('disabled', true);
        $(this.domEl).find('[data-id="buttonSend"]').click(ZVLJS.createDelegate(this.onClickSend, this));

        $(this.domEl).find('[data-id="title"]').onmousedown(ZVLJS.createDelegate(this.onClickTitle, this));


        // document.body.appendChild(this.domEl);
        //ZVLJS.ws.chat.Base.prototype.initTemplate.apply(this, arguments)
        ZVLJS.ws.chat.Guest.prototype.__proto__.initTemplate.apply(this, arguments);
    },
    onClickConnect (){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onClickConnect', arguments)
        this.connect();
    },
    onClickDisonnect (){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onClickDisonnect', arguments)
        alert('@TODO: disconnect');
    },
    onClickLogin (){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onClickLogin', arguments);
        let userName = $(this.domEl).find('[data-id="userName"]')[0].value;
        this.login('', '', {
            role : this.USER_ROLE,
            displayName : userName
        });
        $(this.domEl).find('[data-id="buttonSend"]').prop('disabled', true);
    },
    onClickSend (){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onClickSend', arguments)
        //let message = $(this.domEl).find('[data-id="sendText"]').value();
        let message = $(this.domEl).find('[data-id="sendText"]')[0].value;
        //this.sendText(message);
        let data = {
            msgType: this.MSG_TYPE.MESSAGE_TEXT,
            text : message
        };
        this.sendJson(data);
    },
    onOpen : function (e) {
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onOpen', arguments)
        $(this.domEl).find('[data-id="buttonConnect"]').prop('disabled', true);
        $(this.domEl).find('[data-id="buttonDisconnect"]').prop('disabled', false);
        $(this.domEl).find('[data-id="buttonLogin"]').prop('disabled', false);
    },
    onClose : function (e) {
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onClose', arguments)
        this.__proto__.__proto__.onClose.apply(this, arguments);
        $(this.domEl).find('[data-id="buttonConnect"]').prop('disabled', false);
        $(this.domEl).find('[data-id="buttonLogin"]').prop('disabled', true);
        $(this.domEl).find('[data-id="buttonSend"]').prop('disabled', true);
    },
    onLogin(json){
        ZVLJS.debug('ZVLJS.ws.chat.Guest/onLogin', arguments);
        if (json.result){
            $(this.domEl).find('[data-id="buttonLogin"]').prop('disabled', true);
            $(this.domEl).find('[data-id="buttonSend"]').prop('disabled', false);
        }
    },
    // onMessage : function (e) {
    //     ZVLJS.debug('ZVLJS.ws.chat.Guest/onMessage', arguments);
    //      let parentOnMessage = ZVLJS.ws.chat.Guest.prototype.__proto__.onMessage.apply(this, arguments);
    //     //return false;
    // },
    onJsonMessageText : function (json) {
        $(this.domEl).find('[data-id="log"]').append(function () {
            let msgRow = document.createElement('div');
            msgRow.innerText = json.text;
            return msgRow;
        });
    },
    /**
     * https://learn.javascript.ru/drag-and-drop
     * http://plnkr.co/edit/qwrhqAarRXyJCEeqCJGl?p=preview
     * @param e
     */
    onClickTitle : function (e) {
        let domEl = $(this.domEl).find('[data-id="title"]');
        domEl .ondragstart = function() {
            return false;
        };
        let startPos = elem.getBoundingClientRect();
        let onmousemove = function (e) {
            
        }
    }
});


