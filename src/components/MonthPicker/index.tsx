import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import * as React from 'react'
type MonthPickerProps = Partial<{
  min: string
  max: string
  onChange: (month: any) => any
  cssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'month-picker'

const useStyles = createUseStyles<RuleNames, Omit<MonthPickerProps, 'onFileChange'>, Theme>((theme) => ({
  'month-picker': ({ cssOptions, ...props }) => ({
    ...props,
    ...cssOptions?.(theme),
  }),
}))

const MonthPicker = ({
  min,
  max,
  onChange,
  children,
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & MonthPickerProps) => {
  const ref = React.useRef(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(214)

    onChange?.(e.target.value)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes['month-picker'], className)
  return (
    <label aria-label="month input" className={computedClassNames} {...props}>
      <input ref={ref} hidden min={min} max={max} type="month" onChange={handleChange} />
      {children || (
        <span
          onClick={() => {
            console.log(ref)
            ref.current.focus()
          }}
        >
          'Month'
        </span>
      )}
    </label>
  )
}

export default MonthPicker
