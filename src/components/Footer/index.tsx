import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type FooterProps = Partial<{
  absolute: boolean
  relative: boolean
  fixed: boolean
  cssOptions: (theme: Theme) => React.CSSProperties
}>
type RuleNames = 'footer'
const useStyles = createUseStyles<RuleNames, FooterProps, Theme>((theme) => ({
  footer: ({ absolute, relative, fixed, cssOptions }) => ({
    ...(absolute && { position: 'absolute', left: 0, right: 0, bottom: 0 }),
    ...(relative && { position: 'relative' }),
    ...(fixed && { position: 'fixed', left: 0, right: 0, bottom: 0 }),
    ...cssOptions?.(theme),
  }),
}))

const Footer = ({ children, className, ...props }: FooterProps & React.ComponentPropsWithoutRef<'aside'>) => {
  const classes = useStyles({ ...props })
  const computedClassNames = classnames(classes.footer, className)
  return (
    <aside className={computedClassNames} {...props}>
      {children}
    </aside>
  )
}

export default Footer
