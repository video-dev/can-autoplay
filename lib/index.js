import audioBlob from '../media/audio.mp3'
import videoBlob from '../media/video.mp4'

function setupDefaultValues (options) {
  return Object.assign({
    muted: false,
    timeout: 250,
    inline: false
  }, options)
}

function startPlayback ({muted, timeout, inline}, elementCallback) {
  let {element, source} = elementCallback()
  let playResult
  let timeoutId
  let sendOutput

  element.muted = muted
  if (muted === true) {
    element.setAttribute('muted', 'muted')
  }
  // indicates that the video is to be played "inline",
  // that is within the element's playback area.
  if (inline === true) {
    element.setAttribute('playsinline', 'playsinline')
  }

  element.src = source

  return new Promise(resolve => {
    playResult = element.play()
    timeoutId = setTimeout(() => {
      sendOutput(false, new Error(`Timeout ${timeout} ms has been reached`))
    }, timeout)
    sendOutput = (result, error = null) => {
      clearTimeout(timeoutId)
      resolve({result, error})
    }

    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch(playError => sendOutput(false, playError))
    } else {
      sendOutput(true)
    }
  })
}

//
// API
//

function video (options) {
  options = setupDefaultValues(options)
  return startPlayback(options, () => {
    return {
      element: document.createElement('video'),
      source: videoBlob
    }
  })
}

function audio (options) {
  options = setupDefaultValues(options)
  return startPlayback(options, () => {
    return {
      element: document.createElement('audio'),
      source: audioBlob
    }
  })
}

export default {audio, video}
