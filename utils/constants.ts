export const COOKIE_NAME = 'verkuerzer-token'

type EmptyObject = {}

export type NOOP = () => EmptyObject

export const noop: NOOP = () => {
  return {}
}
