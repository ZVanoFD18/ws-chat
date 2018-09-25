'use strict';
ZVLJS.createNamespace('ZVLJS.ws.chat');

ZVLJS.ws.chat.Guest = function (options) {
    ZVLJS.override(this, options);
    this.createDom();
};
ZVLJS.ws.chat.Guest.prototype.__proto__ = ZVLJS.ws.chat.Base.prototype;
ZVLJS.override(ZVLJS.ws.chat.Guest.prototype, {
    domEl : undefined,
    template: 'WsChatGuest.html',
    css : 'WsChatGuest.css',
    initTemplate(){
        $(this.domEl).find('[data-id="buttonConnect"]').disabled = false;
        $(this.domEl).find('[data-id="buttonConnect"]').click(ZVLJS.createDelegate(this.onClickConnect, this));

        $(this.domEl).find('[data-id="buttonSend"]').disabled = true;
        $(this.domEl).find('[data-id="buttonSend"]').click(ZVLJS.createDelegate(this.onClickSend, this));
        
        // document.body.appendChild(this.domEl);
        ZVLJS.ws.chat.Base.prototype.initTemplate.apply(this, arguments)
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

