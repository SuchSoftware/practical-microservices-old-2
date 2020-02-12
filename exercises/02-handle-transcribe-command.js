const uuid = require('uuid/v4')

const { config } = require('./preamble')

const videoId = uuid()
const transcribe = {
  id: uuid(),
  type: 'Transcribe',
  metadata: {
    traceId: uuid(),
    originStreamName: `catalog-${uuid}`
  },
  data: {
    videoId,
    uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
}

config.transcribeComponent.handlers
  .Transcribe(transcribe)
  .finally(config.messageStore.stop)

console.log('Video trnascribed.  Inspect message store.')
