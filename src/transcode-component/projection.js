module.exports = {
  $init: () => ({
    transcodeId: null,
    uri: null,
    transcodedUri: null,
    isTranscoded: false
  })

  // TODO: Need to add handlers for any event types that affect this
  // projection.  In our present case, that's just the "Transcoded" event.
}