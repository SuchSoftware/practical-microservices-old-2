// config.js is the heart of the dependency injection we use.  It is in this
// file that we piece together the actual runtime values.  This file breathes
// the breath of life into the otherwise hollow shell of the rest of the
// system.

const createHomeApplication = require('./home-application')
const createKnexClient = require('./knex-client')
const createPostgresClient = require('./postgres-client')
const createMessageStore = require('./message-store')
const createTranscodeComponent = require('./transcode-component')
const createTranscribeComponent = require('./transcribe-component')
const createViewCountAggregator = require('./view-count-aggregator')
const createCatalogComponent = require('./catalog-component')
const createVideoListAggregator = require('./video-list-aggregator')

// Even the configuration has a dependency, namely the run-time environment.
function createConfig ({ env }) {
  // We build a Postgres client connection
  const postgresClient = createPostgresClient({
    connectionString: env.messageStoreConnectionString
  })
  // The message store code receives that client connection.  This way, if we
  // want to do something else with that same connection, we can.  It's Just
  // Postgres™.
  const messageStore = createMessageStore({ db: postgresClient })

  const knexClient = createKnexClient({
    connectionString: env.databaseUrl
  })

  // Applications
  const homeApplication = createHomeApplication({
    db: knexClient,
    messageStore
  })

  // Components
  const transcodeComponent = createTranscodeComponent({ messageStore })
  const transcribeComponent = createTranscribeComponent({ messageStore })
  const catalogComponent = createCatalogComponent({ messageStore })

  // Aggregators
  const videoListAggregator = createVideoListAggregator({
    db: knexClient,
    messageStore
  })
  const viewCountAggregator = createViewCountAggregator()

  const consumers = [
    transcodeComponent,
    transcribeComponent,
    catalogComponent,
    viewCountAggregator,
    videoListAggregator
  ]

  return {
    consumers,
    env,
    homeApplication,
    messageStore,
    transcodeComponent,
    transcribeComponent,
    catalogComponent,
    viewCountAggregator,
    videoListAggregator
  }
}

module.exports = createConfig
