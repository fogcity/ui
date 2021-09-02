import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import Col from '../Col'
import Row from '../Row'

type InputProps = {
  flex?: number
  gap?: string
  format?: (value: string) => string
  onChange?: (value: string, e: any) => any
  prefix?: { node: React.ReactNode; flex: number }
  suffix?: { node: React.ReactNode; flex: number }
  outline?: boolean
  contain?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}
type RuleNames = 'input' | 'input-container'

const useStyles = createUseStyles<RuleNames, InputProps & { disabled?: boolean }, Theme>((theme) => ({
  input: ({ cssOptions, disabled, outline, contain }) => ({
    width: '100%',
    padding: '.6em',
    backgroundColor: contain
      ? theme?.color?.greyLight || '#F3F4F6'
      : disabled
      ? theme?.color?.greyLight || '#F3F4F6'
      : 'transparent',
    color: disabled ? theme?.color?.grey || '#6b7280' : theme?.color?.black || '#111827',
    outline: outline ? (!disabled ? '1px solid ' + theme?.color?.greyLight : 'none') : 'none',
    borderRadius: '4px',
    ...cssOptions?.(theme),
  }),
  'input-container': ({ cssOptions, disabled, contain }) => ({
    backgroundColor: contain
      ? theme?.color?.greyLight || '#F3F4F6'
      : disabled
      ? theme?.color?.greyLight || '#F3F4F6'
      : 'transparent',
    ...cssOptions?.(theme),
  }),
}))

/**
 * Input:
 * if has prefix or suffix, the property flex is required.
 */
const Input = ({
  prefix,
  suffix,
  flex = 1,
  gap,
  contain = false,
  outline = false,
  format,
  disabled,
  onChange,
  cssOptions,
  children,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'suffix' | 'prefix'> & InputProps) => {
  const classes = useStyles({ cssOptions, disabled, outline, contain })
  const computedClassNames = classnames(classes.input, className)
  const clsnsContainer = classnames(classes['input-container'], className)
  const handleInputChange = (e: { target: { value: string } }) => {
    onChange?.(format?.(e.target.value) || e.target.value, e)
  }
  const inputNode = <input className={computedClassNames} {...props} onChange={handleInputChange} />
  return prefix || suffix ? (
    <Row className={clsnsContainer} gap={gap}>
      {prefix && <Col flex={prefix.flex}>{prefix.node}</Col>}
      <Col flex={flex}>{inputNode}</Col>
      {suffix && <Col flex={suffix.flex}>{suffix.node}</Col>}
    </Row>
  ) : (
    { inputNode }
  )
}

export default Input
