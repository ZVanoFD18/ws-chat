# ссылки

* Домашняя страница 

http://socketo.me/

* Документация 

 http://socketo.me/docs/

 http://socketo.me/docs/hello-world


# Чтобы заработал XDebug под XAMPP в конец php.ini
; c:\xampp\php\php.ini c:\xampp\php\php.ini
[XDebug]
;zend_extension = "c:\xampp\php\ext\php_xdebug-2.6.0-7.2-vc15.dll"
;zend_extension = "c:\xampp\php\ext\php_xdebug-2.5.3-5.6-vc11-nts.dll"
zend_extension = "c:\xampp\php\ext\php_xdebug.dll"
xdebug.remote_autostart = 1
xdebug.profiler_append = 0
xdebug.profiler_enable = 0
xdebug.profiler_enable_trigger = 0
xdebug.profiler_output_dir = "c:\xampp\tmp"
;xdebug.profiler_output_name = "cachegrind.out.%t-%s"
xdebug.remote_enable = 1
xdebug.remote_handler = "dbgp"
xdebug.remote_host = "127.0.0.1"
xdebug.remote_log = "c:\xampp\tmp\xdebug.txt"
xdebug.remote_port = 9000
xdebug.trace_output_dir = "c:\xampp\tmp"
;36000 = 10h

Просмотр открытых сокетов
netstat -a | find /I "LISTENING"