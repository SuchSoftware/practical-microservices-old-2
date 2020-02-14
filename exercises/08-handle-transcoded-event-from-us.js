const uuid = require('uuid/v4')

const { config } = require('./preamble')
const TranscodedControls = require('../src/transcode-component/controls/events/transcoded')

const transcoded = TranscodedControls.example()
transcoded.metadata.traceId = uuid()
transcoded.metadata.originStreamName = `catalog-${uuid()}`

config.catalogComponent.transcodeEventHandlers
  .Transcoded(moved)
  .then(() =>
    config.videoCatalogComponent.transcodeEventHandlers.Transcoded(moved)
  )
  .then(() => console.log('Transcoded recorded.'))
  .finally(config.messageStore.stop)
