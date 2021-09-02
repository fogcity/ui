import * as React from 'react'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type ColProps = {
  alignSelf?: 'start' | 'center' | 'end' | 'baseline' | 'stretch' | 'normal'
  textAlign?: 'center' | 'left' | 'right'
  flex?: number | string
  noFlex?: boolean
  autoMargin?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'col'

const useStyles = createUseStyles<RuleNames, ColProps, Theme>((theme) => ({
  col: ({ flex, autoMargin, noFlex, cssOptions, ...props }) => ({
    ...props,
    ...(autoMargin ? { marginLeft: 'auto' } : { flex: noFlex ? '' : flex }),
    ...cssOptions?.(theme),
  }),
}))

const Col = ({
  alignSelf,
  textAlign = 'center',
  flex = '1',
  noFlex = false,
  autoMargin = false,
  cssOptions,
  className,
  children,
  ...props
}: ColProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    alignSelf,
    flex,
    noFlex,
    autoMargin,
    textAlign,
    cssOptions,
  })
  const computedClassNames = classnames(classes.col, className)
  return (
    <div className={computedClassNames} {...props}>
      {children}
    </div>
  )
}

export default Col
