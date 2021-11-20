/** @file Document `<head />` tag */

import NextHead from 'next/head'

export const TITLE = 'Ultralight'
export const DESCRIPTION = 'Simple Project Management'

/** Document `<head />` tag */
export const Head = ({ title, description }) => (
  <NextHead>
    <title>{title || TITLE}</title>
    <meta name="description" content={description || DESCRIPTION} />
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
)
