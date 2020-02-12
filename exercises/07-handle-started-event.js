const uuid = require('uuid/v4')

const { config } = require('./preamble')
const StartedControls = require('../src/catalog-component/controls/events/started')

const started = StartedControls.example()
started.metadata.traceId = uuid()

config.catalogComponent.eventHandlers
  .Started(started)
  .then(() => config.catalogComponent.eventHandlers.Started(started))
  .then(() => console.log('Started processed.'))
  .finally(config.messageStore.stop)
