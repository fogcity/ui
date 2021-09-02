import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'

type TextProps = Partial<{
  thin: boolean
  blod: boolean
  color: string | string
  fontSize: string
  maxLength: number

  dark: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'text'

const useStyles = createUseStyles<RuleNames, TextProps, Theme>((theme) => ({
  text: ({ color, dark, blod, maxLength, thin, cssOptions }) => {
    const computedColor =
      color ||
      ((dark
        ? theme
          ? theme.color.white
          : '#fff'
        : theme
        ? theme.mode == 'light'
          ? theme.color.black
          : theme.color.white
        : '#111827') as string)
    return {
      fontWeight: blod ? 700 : thin ? 200 : 500,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textOverflow: maxLength ? 'ellipsis' : '',
      whiteSpace: maxLength ? 'nowrap' : '',
      width: maxLength || '',
      overflow: maxLength ? 'hidden' : '',
      color: computedColor,
      ...cssOptions?.(theme),
    }
  },
}))

const Text = ({
  thin = false,
  dark = false,
  maxLength,
  fontSize,
  blod,
  color,
  children,
  cssOptions,
  className,
  ...props
}: TextProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    thin,
    color,
    blod,
    fontSize,
    maxLength,
    dark,
    cssOptions,
  })
  const computedClassNames = classnames(classes.text, className)
  return (
    <div className={computedClassNames} {...props}>
      {children}
    </div>
  )
}

export default Text
