/** @file Document `<head />` tag */

import NextHead from 'next/head'

export const TITLE = 'Ultralight'
export const DESCRIPTION = 'Simple Project Management'

/** Document `<head />` tag */
export const Head = () => (
  <NextHead>
    <title>{TITLE}</title>
    <meta name="description" content={DESCRIPTION} />
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
)
