import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type ChipProps = {
  outline?: boolean
  color?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'chip'

const useStyles = createUseStyles<RuleNames, ChipProps, Theme>((theme) => {
  const getComputedColor = (color?: string) =>
    color || theme ? (theme.mode == 'light' ? theme.color.black : theme.color.white) : '#111827'
  return {
    chip: ({ outline, color, cssOptions }) => ({
      display: 'inline-block',
      padding: '0.1em 0.5em 0.2em 0.5em',
      color: getComputedColor(color),
      borderRadius: '16px',
      ...(!outline
        ? {
            backgroundColor: getComputedColor(color),
            color: theme ? (theme.mode == 'light' ? theme.color.black : theme.color.white) : '#111827',
          }
        : {
            border: '1px solid ' + getComputedColor(color),
          }),
      ...cssOptions?.(theme),
    }),
  }
})
const Chip = ({
  outline = true,
  color,
  cssOptions,
  children,
  className,
  ...props
}: ChipProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({ outline, color, cssOptions })

  const computedClassNames = classnames(classes.chip, className)

  return (
    <div className={computedClassNames} {...props}>
      {children}
    </div>
  )
}

export default Chip
