module.exports = {
  $init: () => ({ id: null, isTranscribed: false }),

  Transcribed (transcription, transcribed) {
    transcription.isTranscribed = true

    return transcription
  }
}
