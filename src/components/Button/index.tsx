import * as React from 'react'
import classnames from 'classnames'
import Text from './'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type ButtonProps = {
  padding?: string
  block?: boolean
  disabled?: boolean
  text?: boolean
  outlined?: boolean
  icon?: boolean
  tile?: boolean
  color?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}
type RuleNames = 'button'

const useStyles = createUseStyles<RuleNames, ButtonProps, Theme>(
  (theme) => ({
    button: ({ block, color, tile, cssOptions, icon, disabled, text, outlined }) => ({
      padding: icon ? '' : '0.6em 1.2em',
      width: block ? '100%' : 'auto',
      border: outlined ? '1px solid ' + (color || theme?.color?.primary || '#231F9C') : 'none',
      borderRadius: tile ? '0px' : '4px',
      color: theme ? (theme.mode == 'light' ? theme.color.black : theme.color.white) : '#111827',
      backgroundColor:
        disabled == false
          ? text || outlined || icon
            ? 'transparent'
            : theme
            ? theme.color.primary
            : '#231F9C'
          : theme
          ? theme.color.greyLight
          : '#F3F4F5',
      ...cssOptions?.(theme),
    }),
  }),
  { name: 'Button', classNamePrefix: 'Button' },
)

const Button = ({
  block = false,
  disabled = false,
  text = false,
  outlined = false,
  cssOptions,
  icon = false,
  tile = false,
  color,
  padding,
  className,
  children,
  ...props
}: ButtonProps & React.ComponentProps<'button'>) => {
  const classes = useStyles({
    color,
    block,
    tile,
    icon,
    disabled,
    text,
    cssOptions,
    outlined,
    padding,
  })

  const computedClassNames = classnames(classes.button, className)
  return (
    <button className={computedClassNames} disabled={disabled} {...props}>
      {typeof children == 'string' ? <Text>{children}</Text> : children}
    </button>
  )
}

export default Button
