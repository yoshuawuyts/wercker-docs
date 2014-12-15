---
sidebar_current: "services"
---

# Services

Most applications use a database to store data or a message queue to handle jobs asynchronously. With wercker you can specify which services you require and wercker will provision them for you.

This is done by specifying the required services in your [wercker.yml](/articles/werckeryml/) file. Through environment variables you will then be able to access these services.

## wercker.yml

To be able to use services you must first specify them in the service property in the `wercker.yml` file. You simply specify the name as the key and use 'true' as the value:


``` yaml
box: wercker/ruby
services:
    - wercker/mongodb
    - wercker/rabbitmq
```

See the [section](/articles/werckeryml/) on `wercker.yml` for more information.

## Supported services

These are the services which are supported by wercker. The list also includes the environment variables needed to access the service. It is important that you use these environment variables, since the login information might change. [Contact us](mailto:pleasemailus@wercker.com) if you want support for any other service.

****

#### mysql


    Host: WERCKER_MYSQL_HOST
    Port: WERCKER_MYSQL_PORT
    Username: WERCKER_MYSQL_USERNAME
    Password: WERCKER_MYSQL_PASSWORD
    Database: WERCKER_MYSQL_DATABASE

****
##### Note there is also a convencience environment variable `WERCKER_MYSQL_URL` in the form of `mysql://username:password@hostname:port/databasename`
****

#### postgresql


    Host: WERCKER_POSTGRESQL_HOST
    Port: WERCKER_POSTGRESQL_PORT
    Username: WERCKER_POSTGRESQL_USERNAME
    Password: WERCKER_POSTGRESQL_PASSWORD
    Database: WERCKER_POSTGRESQL_DATABASE


****
##### Note there is also a convencience environment variable `WERCKER_POSTGRESQL_URL` in the form of `postgres://username:password@hostname:port/databasename`
****

#### mongodb

      Host: WERCKER_MONGODB_HOST
      Port: WERCKER_MONGODB_PORT


****

#### rabbitmq

      Host: WERCKER_RABBITMQ_HOST
      Port: WERCKER_RABBITMQ_PORT


****

#### redis version 2.4.14

    Host: WERCKER_REDIS_HOST
    Port: WERCKER_REDIS_PORT

****


#### More information on language and services:

* [Getting Started with Node.js and Redis](/articles/languages/nodejs/nodejs-redis.html)
* [Getting Started with Rails and Mongodb](/articles/languages/ruby/rails-mongoid.html)
* [Getting Started with Sinatra and Redis](/articles/languages/ruby/sinatra-redis.html)
* [Getting Started with Django and Postgres](/articles/languages/python/django-postgres.html)
