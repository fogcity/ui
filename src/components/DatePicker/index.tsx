import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'

type DatePickerProps = Partial<{
  onChange: (date: any) => any
  min: string
  max: string
  cssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'date-picker'

const useStyles = createUseStyles<RuleNames, Omit<DatePickerProps, 'onFileChange'>, Theme>((theme) => ({
  'date-picker': ({ cssOptions, ...props }) => ({
    ...props,
    ...cssOptions?.(theme),
  }),
}))

const DatePicker = ({
  onChange,
  min,
  max,
  children,
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & DatePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes['date-picker'], className)
  return (
    <label aria-label="date input" className={computedClassNames} {...props}>
      <input min={min} max={max} hidden={!!children} type="date" onChange={handleChange} />
      {children || <span id="value">n/a</span>}
    </label>
  )
}

export default DatePicker
