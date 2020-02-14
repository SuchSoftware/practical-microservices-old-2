const { join } = require('path')

const IdControls = require('../id')

module.exports = {
  example () {
    return {
      id: IdControls.example(),
      type: 'Transcribed',
      metadata: {},
      data: {
        videoId: IdControls.example(),
        transcription: this.transcription()
      }
    }
  },

  transcription () {
    return `
      We're no strangers to love
      You know the rules and so do I...
    `
  }
}
