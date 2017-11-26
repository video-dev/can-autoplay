import test from 'ava'

import { mockPlay } from './common'
import { audio, getError, video } from '../lib/index'

test.serial('returns error object from last unavailable video auto-playback', t => {
  const message = 'Aborted.'
  mockPlay(() => Promise.reject(new Error(message)))
  return video().then(() => t.is(getError().message, message))
})

test.serial('returns error object from last unavailable audio auto-playback', t => {
  const message = 'Aborted.'
  mockPlay(() => Promise.reject(new Error(message)))
  return audio().then(() => t.is(getError().message, message))
})

test.serial('resets error state', t => {
  mockPlay(() => Promise.reject(new Error()))
  return video()
    .then(() => {
      // Reset to normal
      mockPlay(() => Promise.resolve())
      return video()
    })
    .then(() => {
      t.is(getError(), null)
    })
})

test.serial('reaches timeout with a false result', t => {
  t.plan(2)
  mockPlay(() => new Promise(resolve => undefined))
  return video({timeout: 0}).then(result => {
    t.false(result)
    t.regex(getError().message, /timeout/i)
  })
})
