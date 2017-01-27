# README

sudo -u postgres psql

create role residential_sales with createdb login password 'residential_sales';

bundle install

bundle exec rake db:create db:migrate
