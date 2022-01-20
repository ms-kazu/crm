#/bin/bash

set -eux

sudo su -l racco

rake assets:clobber assets:precompile
find app/assets/ -type f -exec touch {} \;
rake assets:clobber assets:precompile
RAILS_ENV=production rake assets:precompile
bundle exec unicorn_rails -E development -c config/unicorn.rb -D

exit

chown -R /var/www racco:racco