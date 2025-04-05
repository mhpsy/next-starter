'use client'

// whether it's a next link or a normal link, it's the useRouter that really works
import { Link as NextLink, useRouter } from '@/i18n/navigation'

import { formatUrl } from '@/lib/url/format-url'
import React, { startTransition } from 'react'
import { useProgress } from '../progress'

// Copied from  https://github.com/vercel/next.js/blob/canary/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement
  const target = eventTarget.getAttribute('target')
  return (
    (target && target !== '_self')
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey // triggers resource download
    || (event.nativeEvent && event.nativeEvent.which === 2)
  )
}

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({ ref, href, children, replace, scroll, ...rest }: Parameters<typeof NextLink>[0] & { ref?: React.RefObject<HTMLAnchorElement | null> }) {
  const router = useRouter()
  const startProgress = useProgress()

  return (
    <NextLink
      ref={ref}
      href={href}
      onClick={(e) => {
        if (isModifiedEvent(e))
          return
        e.preventDefault()
        startTransition(() => {
          startProgress()
          const url = typeof href === 'string' ? href : formatUrl(href as any)
          if (replace) {
            router.replace(url, { scroll })
          }
          else {
            router.push(url, { scroll })
          }
        })
      }}
      {...rest}
    >
      {children}
    </NextLink>
  )
}
