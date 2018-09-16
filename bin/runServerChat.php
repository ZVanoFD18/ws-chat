<?php
include_once "../vendor/autoload.php";
$wsChat = new ZVanoZ\Server\WsChat();
// Run the server application through the WebSocket protocol on port 8080
$app = new Ratchet\App('localhost', 8080);
$app->route('/chat', new ZVanoZ\Server\WsChat(), array('*'));
$app->route('/echo', new Ratchet\Server\EchoServer, array('*'));
$app->run();