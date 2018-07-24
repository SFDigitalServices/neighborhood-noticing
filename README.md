neighborhood-noticing
=====================

# Architecture

This is a front-end Javascript application built with Vue.js. It pulls the data it needs from Citygram via its API.

For Citygram's architecture, see [this
diagram](https://github.com/codeforamerica/citygram/blob/master/images/citygram_architecture.png).

# Development

* Install nodejs@10.6
  * Use of [nvm](https://github.com/creationix/nvm) recommended
* Install [`yarn`](https://yarnpkg.com)
* `yarn install`
* Copy environment file examples
  * `cp .env.example .env`
    * Load this using autoenv, direnv, or other
  * `cp .citygram.env.example .citygram.env`
  * `cp .citygram-services.env.example .citygram-services.env`
    * Set `$SOCRATA_APP_TOKEN` in order to use endpoints that consume the Socrata API. See
      [Socrata Application Tokens](https://dev.socrata.com/docs/app-tokens.html) for Socrata token creation instructions
      and details. See [Socrata Applications](https://dev.socrata.com/register) to register a new application (and
      receive a token).
* Start dependencies
  * `docker-compose up -d db`
    * Starts the PostgresSQL database that citygram and citygram-services depend on
  * `docker-compose up citygram_migration citygram_services_migration`
    * Runs the schema migrations
  * `docker-compose up`
    * TODO: have migration tasks wait for database availability so this can be reduced to just `docker-compose up`
* `npm start`
  * By default, binds to port 8080, but you can run `npm start -- --port=1234` to specify an alternate port

## Creating publishers

The first time you start the dependent services via `docker-compose`, you will need to create some publishers for the
front-end to consume. This can be done via a `irb` console in the Citygram container.

E.g.

```
$ docker-compose run citygram bundle exec rake console
$> Publisher.set_allowed_columns(:title, :endpoint, :active, :visible, :city, :state, :icon, :description, :tags, :event_display_endpoint, :events_are_polygons)
$> Publisher.new(:title=>"Street-Use Permits", :endpoint=>"http://citygram_services:9292/sf-street-use", :active=>true, :city=>"San Francisco", :icon => "cone.png", :state=>"CA", :tags=>["san-francisco"]).save!
```

Note that the tag should match the tag set for the front-end via `$VUE_APP_CITYGRAM_TAG`. The endpoint should point to
an endpoint defined in Citygram Services (exposed to the container as `http://citygram_services:9292`).

When you create new publishers, you should repoll for events (see below).

## Updating events

You can have Citygram poll for new events via:

`docker-compose run citygram bundle exec rake publishers:update`

# Testing

* `npm test`
