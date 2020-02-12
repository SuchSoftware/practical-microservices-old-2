const { join } = require('path')

const IdControls = require('../id')

module.exports = {
  example () {
    const videoId = IdControls.example()

    return {
      id: IdControls.example(),
      type: 'Transcribe',
      metadata: {},
      data: {
        videoId,
        uri: this.uri()
      }
    }
  },

  uri () {
    return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
}
