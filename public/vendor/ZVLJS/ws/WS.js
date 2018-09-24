'use strict';
ZVLJS.createNamespace('ZVLJS.ws');
ZVLJS.ws.WS = function(options){
    ZVLJS.override(this, options);
};
ZVLJS.ws.WS.prototype = {
    /**
     * @type {WebSocket}
     */
    wsInstance : undefined,
    url : undefined,
    connect : function () {
        if (ZVLJS.isDefined(this.wsInstance)){
            throw new Error('Already connected.');
        }
        this.wsInstance = new WebSocket(this.url);
        this.wsInstance.onmessage = this.onMessage.bind(this);
        this.wsInstance.onopen = this.onOpen.bind(this);
        this.wsInstance.onclose = this.onClose.bind(this);
        this.wsInstance.onerror = this.onError.bind(this);
    },
    onOpen : function (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onOpen', arguments);
    },
    onClose : function (e) {
        this.wsInstance = undefined;
        ZVLJS.debug('ZVLJS.ws.WS/onClose', arguments)
    },
    onError : function (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onError', arguments)
    },
    onMessage : function (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onMessage', arguments)
    },
    send : function(data){
        this.wsInstance.send(data);
    },
    close : function(){
        this.wsInstance.close();
        this.wsInstance = undefined;
    },
    sendText : function(text){
        this.wsInstance.send(text);
    },
    sendJson : function (jsonObj) {
        let text = JSON.stringify(jsonObj);
        this.sendText(text);
    }
}