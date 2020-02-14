module.exports = {
  $init: () => ({
    id: null,
    uri: null,
    transcodedUri: null,
    isStarted: false,
    isTranscoded: false,
    isTranscribed: false,
    isCataloged: false
  }),

  Started (video, started) {
    video.id = started.data.videoId
    video.uri = started.data.uri
    video.isStarted = true

    return video
  },

  Transcribed (video, transcribed) {
    video.isTranscribed = true

    return video
  },

  Transcoded (video, transcoded) {
    video.transcodedUri = transcoded.data.transcodedUri
    video.isTranscoded = true

    return video
  },

  Cataloged (video, cataloged) {
    video.isCataloged = true

    return video
  }
}
