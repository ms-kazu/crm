#/bin/bash

set -eux

#kill -9 `cat /var/www/racco/tmp/pids/unicorn.pid`

# cd /var/www/racco/scripts

ps=`ps aux | grep unicorn | wc -l`

if [ -e /var/www/racco/tmp/pids/unicorn.pid ] && [ $ps -gt 0 ]; then
  echo "process"
  echo $ps
fi