const uuid = require('uuid/v4')

const { config } = require('./preamble')
const TranscodedControls = require('../src/catalog-component/controls/events/transcoded')

const transcoded = TranscodedControls.example()
transcoded.metadata.traceId = uuid()
transcoded.streamName = `catalog-${uuid()}`

// Run this immediately.  It will go boom.  In this exercise, you're going to
// fill out the whole handler, including defining it in the handlers object.
// That happens in `src/catalog-component/index.js`.
config.catalogComponent.eventHandlers
  .Transcoded(transcoded)
  .then(() => config.catalogComponent.eventHandlers.Transcoded(transcoded))
  .then(() => console.log('Transcoded processed.'))
  .finally(config.messageStore.stop)
