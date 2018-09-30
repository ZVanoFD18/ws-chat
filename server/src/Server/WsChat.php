<?php
/**
 * Created by PhpStorm.
 * User: Vano
 * Date: 16.09.2018
 * Time: 18:34
 */

namespace ZVanoZ\Server;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WsChat implements MessageComponentInterface
{
    const MSG_TYPE_LOGIN = 'LOGIN';
    const MSG_TYPE_MESSAGE_TEXT = 'MESSAGE_TEXT';
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    /**
     * @param {Ratchet\WebSocket\WsConnection} $conn
     */
    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        try{
            $json = json_decode($msg);
        } catch (Error $e){
            return;
        }
        switch ($json->msgType){
            case self::MSG_TYPE_LOGIN:
                $this->doLogin($from, $json);
                break;
            case self::MSG_TYPE_MESSAGE_TEXT:
                $this->send2all($from, $json);
                break;
//            default:
//                $this->send2all($json);
        }
    }
    protected function send2all(ConnectionInterface $from, $json){

        foreach ($this->clients as $client) {
            //$client->send($msg);
            $this->sendJson($client, $json);
        }
    }
    protected function send2other(ConnectionInterface $from, $json){
        foreach ($this->clients as $client) {
            if ($from != $client) {
                //$client->send($msg);
                $this->sendJson($client, $json);
            }
        }
    }
    protected function doLogin(ConnectionInterface $from, $json){
        //@TODO: проверка принятых данных, привязка соединения к гостям, операторам или администратторам.
        $responce = array(
            'msgType' => self::MSG_TYPE_LOGIN,
            'result' => true
        );
        $this->sendJson($from, $responce);
    }
    protected function sendJson(ConnectionInterface $target, $data){
        $jsonString = json_encode($data);
        $target->send($jsonString);
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        $conn->close();
    }
}
