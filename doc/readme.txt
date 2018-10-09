Чтобы щапустить приложение нужно сделать следующее.
1. Единоразово. Установить PHP, Apache, Composer (если не установлены).
2. Единоразово. Скачать этот проект с github в любую директорию
3. Единоразово. Загрузить библиотеки PHP через composer.
Зайти в директрорию проекта  и выполнить команду.
cd server
composer update
После этого в папке ./server/vendor/* появятся необходимые библиотеки (Ratchet и
все что он тянет по зависимостям).
4. По необходимости. Запустить WebSocket сервер.
Заходим в ./server/bin
Под Windows запускаем runServerChat.bat
Под другими ОС запускаем: php -f runServerChat.php
  После запуска он будет висеть на localhost:8081
Чат будет доступен по http://localhost:8081/chat
echo-сервис будет на http://localhost:8081/echo
Все запросы к echo-сервису будут возвращать то, что отправлялось.
  Под Windows просмотр открытых сервер-сокетов следующей командой:
netstat -a | find /I "LISTENING"
5. Единоразово. Настроить в apache vhost для проекта.
  vhost никак не связан с WebSocket сервером.
Это нужно чтобы получать html-страничку ./public/myChatClientGuest.html
по адресу http://ws-chat.local/myChatClientGuest.html
  Если этого не сделать, то при загрузке тестовой странички с диска получим
ошибки в консоли браузера. Так происходит потому что части библиотеки
грузятся AJAX-запросами.
5.1 Конфигурируем vhost
Пример в файле ./doc/ws-chat.local.vhost
Имя vhost-а "ws-chat.local", порт произвольный.
5.2 Добавляем ip для ws-chat.local в файл hosts.
Для windows c:\Windows\System32\drivers\etc\hosts
Для linux /etc/hosts
127.0.0.1	ws-chat.local
6. По необходимости. Запустить два разных браузера и
зайти на страничку http://ws-chat.local/myChatClientGuest.html
Появится форма чата.
    Нажать "Присоединиться".
Выполняется коннект на ws://localhost:8081/chat
После успешного соединения в объекте чата будет сохранен объект HTML5 WebSocket.
    Авторизироваться.
Ввести ФИО и нажать кнопку "Авторизироваться".
В этот момент будет отправлен JSON с данными авторизации.
    Чатиться.
Ввести текст в поле рядом с "Отправить" и нажать кнопку "Отправить".
Текст запакуется в JSON и будет отправлен на  ws://localhost:8081/chat
Там постоянно висит процесс WebSocket сервера.
Он приймет запрос и разошлет всем присоединенным участникам чата.

Пока все... работаю над UI чата, что собственно и надо делать в рамках курса по FrontEnd.


# ссылки

* Серверная часть WebSocket на Ratchet
** Домашняя страница
 http://socketo.me/
** Документация
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

