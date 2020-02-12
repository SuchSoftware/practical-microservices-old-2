const uuid = require('uuid')

const projection = require('./projection')

// Video for faking the transcription
function transcribeVideo (uri) {
  return `
    We're no strangers to love
    You know the rules and so do I...
  `
}

// Handlers will do the actual work of handling messages.
// They are analogous to HTTP handlers, only the stimulus they respond to is
// one of the messages communicated over pub/sub.
//
// Fleshing out these handlers is the main activity of the workshop.
function createHandlers ({ messageStore }) {
  return {
    async Transcribe (transcribe) {
      const { videoId, uri } = transcribe.data
      const streamName = `transcription-${videoId}`

      const transcription = await messageStore.fetch(streamName, projection)

      if (transcription.isTranscribed) {
        console.log(`Message ${transcribe.id} already handled.  Skipping.`)

        return true
      }

      const transcriptionText = transcribeVideo(uri)

      const transcribed = {
        id: uuid(),
        type: 'Transcribed',
        metadata: {
          traceId: transcribe.metadata.traceId,
          originStreamName: transcribe.metadata.originStreamName
        },
        data: {
          videoId,
          transcription: transcriptionText
        }
      }

      return messageStore.write(streamName, transcribed)
    }
  }
}

// This top-level function will receive dependencies in future steps
function createComponent ({ messageStore }) {
  const handlers = createHandlers({ messageStore })

  // Components get new messages to process by polling the message store.
  // We decouple actually starting the component from the rest of its
  // definition.  Naturally, starting the polling cycle in test would proveo
  // problematic.
  //
  // The convention in this code base is that each component exposes a `start`
  // function that gets picked up in `src/index.js`.
  function start () {
    console.log('Starting transcribe component')
  }

  return {
    handlers,
    start
  }
}

module.exports = createComponent
