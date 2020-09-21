import clsx from 'clsx'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

interface NextComposedProps {
  as: string | UrlObject
  href: string | AnyObject
  prefetch: ConstrainBoolean
  [key: string]: any
}

const NextComposed = React.forwardRef<any, NextComposedProps>(function NextComposed(props, ref) {
  const { as, href, ...other } = props

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

interface LinkProps {
  activeClassName: string
  as: string | UrlObject
  className: string
  href: string | UrlObject
  innerRef: React.Ref<any>
  naked: boolean
  onClick: () => void
  prefetch: boolean
  children: ReactNode
  [key: string]: any
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href as string}
      {...other}
    />
  )
}

export default React.forwardRef<any, LinkProps>((props, ref) => <Link {...props} innerRef={ref} />)
