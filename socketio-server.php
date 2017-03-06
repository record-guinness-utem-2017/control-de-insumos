<?php

require_once __DIR__ . '/vendor/autoload.php';

use Workerman\Worker;
use PHPSocketIO\SocketIO;

$io = new SocketIO(2021);
$io->on('connection', function($socket) use ($io){
  echo "Cliente conectado.\n";
});

Worker::runAll();
