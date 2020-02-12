const uuid = require('uuid/v4')

const TranscribedControls = require('../src/transcribe-component/controls/events/transcribed')
const { project } = require('../src/message-store/read')

const events = [TranscribedControls.example()]

const projection = 
  $init: () => ({ id: null, isTranscribed: false }),

  Transcribed (transcription, transcribed) {
    transcription.isTranscribed = true
  
    return transcription
  }
}

const transcription = project(events, projection)

console.log({ transcription })
console.log(
  'Has the file been transcribed?',
  transcription.isTranscribed ? 'Yes' : 'No'
)
