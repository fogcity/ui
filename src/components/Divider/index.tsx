import * as React from 'react'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'
type DividerProps = {
  width?: number
  vertical?: boolean
  color?: string
  doubleLine?: boolean
  dashed?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'divider'

const useStyles = createUseStyles<RuleNames, DividerProps, Theme>((theme) => ({
  divider: ({ color, width, vertical, cssOptions, doubleLine, dashed }) => ({
    border: 'none',
    ...(vertical
      ? {
          display: 'inline',
          borderLeft: `${width}px ${dashed ? 'dashed' : 'solid'}  ${
            color || theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey) : '#F3F4F6'
          }`,
        }
      : {
          borderTop: `${width}px ${dashed ? 'dashed' : 'solid'}  ${
            color || theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey) : '#F3F4F6'
          }`,
        }),
    ...cssOptions?.(theme),
  }),
}))

const Divider = ({
  width = 1,
  vertical = false,
  dashed = false,
  doubleLine = false,
  color,
  cssOptions,
  className,
  children,
  ...props
}: DividerProps & React.ComponentPropsWithoutRef<'hr'>) => {
  const classes = useStyles({
    vertical,
    dashed,
    color,
    width,
    doubleLine,
    cssOptions,
  })

  const computedClassNames = classnames(classes.divider, className)
  return <hr aria-label="hr divider" className={computedClassNames} {...props} />
}

export default Divider
