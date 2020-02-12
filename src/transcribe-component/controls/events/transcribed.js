const { join } = require('path')

const IdControls = require('../id')

module.exports = {
  example () {
    const videoId = IdControls.example()

    return {
      id: IdControls.example(),
      type: 'Transcribed',
      metadata: {},
      data: {
        videoId,
        transcription: 'Never gonna give you up'
      }
    }
  }
}
