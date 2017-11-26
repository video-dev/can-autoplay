import test from 'ava'

import { mockPlay } from './common'
import { video } from '../lib/index'

test.serial('returns true for available video auto-playback', t => {
  mockPlay(() => Promise.resolve())
  return video().then(result => t.true(result))
})

test.serial('returns false for unavailable video auto-playback', t => {
  mockPlay(() => Promise.reject(new Error()))
  return video().then(result => t.false(result))
})

test.serial('returns true for old browsers', t => {
  mockPlay(() => undefined)
  return video().then(result => t.true(result))
})
