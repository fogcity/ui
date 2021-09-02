import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'

type TimePickerProps = Partial<{
  min: string
  max: string
  onChange: (time: any) => any
  cssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'time-picker'

const useStyles = createUseStyles<RuleNames, Omit<TimePickerProps, 'onFileChange'>, Theme>((theme) => ({
  'time-picker': ({ cssOptions, ...props }) => ({
    ...props,
    ...cssOptions?.(theme),
  }),
}))

const TimePicker = ({
  min,
  max,
  onChange,
  children,
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & TimePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes['time-picker'], className)
  return (
    <label aria-label="time input" className={computedClassNames} {...props}>
      <input min={min} max={max} hidden={!!children} type="time" onChange={handleChange} />
      {children || 'Time'}
    </label>
  )
}

export default TimePicker
