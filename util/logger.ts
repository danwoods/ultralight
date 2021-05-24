/** @file Simple wrapper for console */

/**
 * Wrapper for console
 * @param {string} name Local name of logger
 * @returns {Object} Wrapper for console
 */
export const logger = (name: string) => ({
  info: (msg: string, ...rest) => console.info(`[[${name}]] ${msg}`, rest),
  error: (msg: string, ...rest) => console.error(`[[${name}]] ${msg}`, rest),
  debug: (msg: string, ...rest) => console.debug(`[[${name}]] ${msg}`, rest),
  warn: (msg: string, ...rest) => console.warn(`[[${name}]] ${msg}`, rest)
})
