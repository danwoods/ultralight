/** @file Document `<head />` tag */

import NextHead from 'next/head'

export const TITLE = 'Ultralight'
export const DESCRIPTION = 'Simple Project Management'

type Props = {
  title?: string
  description?: string
}

/** Document `<head />` tag */
export const Head = ({ title, description }: Props) => (
  <NextHead>
    <title>{title || TITLE}</title>
    <meta name="description" content={description || DESCRIPTION} />
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
)
