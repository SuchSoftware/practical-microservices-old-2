const test = require('blue-tape')
const { existsSync } = require('fs')

const CommandControls = require('../../../../src/transcribe-component/controls/commands/transcribe')
const { config } = require('../../../test-helper')

test('It transcribes a video', t => {
  const transcribe = CommandControls.example()
  const entityStreamName = `transcribe-${transcribe.data.videoId}`

  // Observe that a message was written
  // Invoke the message handler
  return config.transcribeComponent.handlers.Transcribe(transcribe).then(() =>
    config.messageStore.read(entityStreamName).then(messages => {
      t.equals(messages.length, 1, 'Only 1 message')
      t.equals(messages[0].type, 'Transcribed', 'It is a Transcribed event')
    })
  )
})
