import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type BottomNavigationProps = Partial<{
  cssOptions: (theme: Theme) => React.CSSProperties
}>
type RuleNames = 'BottomNavigation'
const useStyles = createUseStyles<RuleNames, BottomNavigationProps, Theme>((theme) => ({
  BottomNavigation: ({ cssOptions }) => ({
    ...cssOptions?.(theme),
  }),
}))

const BottomNavigation = ({
  children,
  cssOptions,
  className,
  ...props
}: BottomNavigationProps & React.ComponentPropsWithoutRef<'aside'>) => {
  const classes = useStyles({ cssOptions })
  const computedClassNames = classnames(classes.BottomNavigation, className)
  return (
    <aside className={computedClassNames} {...props}>
      {children}
    </aside>
  )
}

export default BottomNavigation
