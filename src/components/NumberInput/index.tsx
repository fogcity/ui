import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'

import * as React from 'react'

type NumberInputProps = Partial<{
  onChange: (value: string) => void
  children: React.ReactNode
  className: string
  cssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'number-input'
const useStyles = createUseStyles<RuleNames, Omit<NumberInputProps, 'onFileChange'>, Theme>((theme) => ({
  'number-input': ({ cssOptions, ...props }) => ({
    '& > input::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
    },
    ...props,
    ...cssOptions?.(theme),
  }),
}))

const NumberInput = ({ onChange, children, cssOptions, className, ...props }: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes['number-input'], className)
  return (
    <label aria-label="number input" className={computedClassNames} {...props}>
      <input hidden={!!children} type={'number'} onChange={handleChange} />
      {children}
    </label>
  )
}

export default NumberInput
