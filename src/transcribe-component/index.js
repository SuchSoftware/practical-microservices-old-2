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
function createHandlers () {
  return {
    Transcribe (transcribe) {
      // TODO: Write the handler code.  Refer to the event model for the list
      // of fields in the transcribe command.

      return Promise.resolve(true)
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
