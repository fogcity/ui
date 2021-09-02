import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type ContainerProps = {
  noPadding?: boolean
  padding?: string
  noYPadding?: boolean
  noXPadding?: boolean
  absolute?: boolean
  relative?: boolean
  fullHeight?: boolean
  sticky?: boolean
  fullScreen?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'container'

const useStyles = createUseStyles<RuleNames, ContainerProps, Theme>((theme) => ({
  container: ({
    noPadding,
    fullScreen,
    padding,
    relative,
    noYPadding,
    absolute,
    noXPadding,
    fullHeight,
    cssOptions,
    sticky,
  }) => {
    let paddingComputed
    if (noPadding) paddingComputed = ''
    else if (noYPadding) paddingComputed = '0 ' + padding
    else if (noXPadding) paddingComputed = padding + ' 0'
    else paddingComputed = padding
    return {
      height: fullScreen ? '100vh' : fullHeight ? '100%' : 'auto',
      padding: paddingComputed,
      ...(sticky && {
        position: 'sticky',
        top: 0,
      }),
      ...(relative && { position: 'relative' }),
      ...(absolute && { position: 'absolute' }),
      ...cssOptions?.(theme),
    }
  },
}))
const Container = ({
  noPadding = false,
  noYPadding = false,
  noXPadding = false,
  padding = '1em',
  absolute = false,
  fullHeight = false,
  relative = false,
  fullScreen = false,
  sticky = false,

  cssOptions,
  className,
  children,
  ...props
}: ContainerProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    noPadding,
    padding,
    noYPadding,
    absolute,
    noXPadding,
    fullHeight,
    sticky,
    relative,
    fullScreen,
    cssOptions,
  })
  const computedClassNames = classnames(
    classes.container,
    className && {
      [`${className}`]: true,
    },
  )

  return (
    <div className={computedClassNames} {...props}>
      {children}
    </div>
  )
}

export default Container
