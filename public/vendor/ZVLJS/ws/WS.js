'use strict';
ZVLJS.createNamespace('ZVLJS.ws');
ZVLJS.ws.WS = function(options){
    ZVLJS.override(this, options);
};
ZVLJS.override(ZVLJS.ws.WS.prototype, {
    /**
     * @type {WebSocket}
     */
    wsInstance : undefined,
    url : undefined,
    connect () {
        if (ZVLJS.isDefined(this.wsInstance)){
            throw new Error('Already connected.');
        }
        this.wsInstance = new WebSocket(this.url);
        this.wsInstance.onmessage = this.onMessage.bind(this);
        this.wsInstance.onopen = this.onOpen.bind(this);
        this.wsInstance.onclose = this.onClose.bind(this);
        this.wsInstance.onerror = this.onError.bind(this);
    },
    onOpen (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onOpen', arguments);
    },
    onClose (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onClose', arguments)
        this.wsInstance = undefined;
    },
    onError (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onError', arguments)
    },
    onMessage (e) {
        ZVLJS.debug('ZVLJS.ws.WS/onMessage', arguments)
    },
    send (data){
        this.checkIsConnected();
        this.wsInstance.send(data);
    },
    close (){
        this.wsInstance.close();
        this.wsInstance = undefined;
    },
    sendText (text){
        this.checkIsConnected();
        this.wsInstance.send(text);
    },
    sendJson (jsonObj) {
        this.checkIsConnected();
        let text = JSON.stringify(jsonObj);
        this.sendText(text);
    },
    checkIsConnected(){
        if (!ZVLJS.isDefined(this.wsInstance)){
            throw new Error('WebSocket is not connected');
        }
    }
});
