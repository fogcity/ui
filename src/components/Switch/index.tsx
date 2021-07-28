import * as React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
type SwitchProps = Partial<{
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
  on: boolean
  color?: string
  cssOptions?: React.CSSProperties
}>

type RuleNames = 'switch'

const useStyles = createUseStyles<RuleNames, SwitchProps, Theme>((theme) => ({
  switch: ({ cssOptions, color, on }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '4em',
    height: '2em',
    background: on ? color || theme.color.primary || '#231F9C' : theme.color.greyLight || '#F3F4F6',
    borderRadius: 100,
    position: 'relative',
    transition: 'background 0.4s ease-out',
    ...cssOptions,
    '& > input': {
      display: 'none',
    },
    '& > .switch-button': {
      content: "''",
      position: 'absolute',
      left: on ? `calc(55% - 5%)` : '5%',
      width: '1.8em',
      height: '1.8em',
      borderRadius: 45,
      transition: '.4s ease-out',
      background: '#fff',
      boxShadow: '0 0 2px 0 ' + theme.color.grey || '#6b7280',
      // transform: on ? 'translateX(60%)' : '',
    },
    '&:active > .switch-button': {
      width: '3em',
    },
  }),
}))

const Switch = ({
  on = false,
  onChange,
  color,
  children,
  cssOptions,
  className,
  ...props
}: SwitchProps & React.ComponentPropsWithoutRef<'input'>) => {
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }
  const classes = useStyles({
    cssOptions,
    on,
    color,
  })
  const computedClassNames = classnames(classes.switch, className)

  return (
    <label className={computedClassNames}>
      <input checked={on} onChange={handleSwitchChange} type="checkbox" />
      <span className={`switch-button`} />
    </label>
  )
}

export default Switch
