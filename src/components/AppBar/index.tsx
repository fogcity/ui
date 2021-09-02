import { useState } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type AppBarProps = {
  shy?: boolean
  fixed?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
} & React.ComponentPropsWithoutRef<'div'>

type RuleNames = 'AppBar'

const useStyles = createUseStyles<RuleNames, AppBarProps, Theme>((theme) => ({
  AppBar: ({ cssOptions, fixed }) => ({
    height: theme?.appBar?.height || '3em',
    backgroundColor: theme ? (theme.mode == 'light' ? theme.color.white : theme.color.black) : '#fff',
    ...(fixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme?.zIndex?.appBar || 700,
        }
      : {}),
    ...cssOptions?.(theme),
  }),
}))
const AppBar = ({ fixed = true, cssOptions, className, children, ...props }: AppBarProps) => {
  const classes = useStyles({ fixed, cssOptions })
  const computedClassNames = classnames(classes.AppBar, className)
  return (
    <header className={computedClassNames} {...props}>
      {children}
    </header>
  )
}

export default AppBar
