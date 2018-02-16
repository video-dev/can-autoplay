/* global URL */

import * as Media from './media'
import base64toBlob from './base64-to-blob'

function setupDefaultValues (options) {
  return Object.assign({
    muted: false,
    timeout: 250,
    inline: false,
    blob: false
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
    const source = options.blob
      ? URL.createObjectURL(base64toBlob(Media.VIDEO))
      : Media.VIDEO

    return {
      element: document.createElement('video'),
      source: source
    }
  })
}

function audio (options) {
  options = setupDefaultValues(options)
  return startPlayback(options, () => {
    const source = options.blob
      ? URL.createObjectURL(base64toBlob(Media.VIDEO))
      : Media.AUDIO

    return {
      element: document.createElement('audio'),
      source: source
    }
  })
}

export default {audio, video}
