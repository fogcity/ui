import * as React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
type SwitchProps = Partial<{
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
  on: boolean
  color?: string
  css?: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'switch'

const useStyles = createUseStyles<RuleNames, SwitchProps, Theme>(theme => ({
  switch: ({ css, color, on }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '4em',
    height: '1.6em',
    background: on ? color || theme.color.primary || '#231F9C' : theme.color.greyLight || '#F3F4F6',
    borderRadius: 100,
    position: 'relative',
    transition: 'background 0.4s ease-out',
    ...css,
    '& > input': {
      display: 'none',
    },
    '& > .switch-button': {
      content: "''",
      position: 'absolute',
      left: on ? `calc(65% - 5%)` : '5%',
      width: '1.4em',
      height: '1.4em',
      borderRadius: 45,
      transition: '.4s ease-out',
      background: '#fff',
      boxShadow: '0 0 2px 0 ' + theme.color.grey || '#6b7280',
      // transform: on ? 'translateX(60%)' : '',
    },
    '&:active > .switch-button': {
      // width: '2em',
    },
  }),
}))

const Switch = ({
  on = false,
  onChange,
  color,
  children,
  css,
  className,
  ...props
}: SwitchProps & React.ComponentPropsWithoutRef<'input'>) => {
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }
  const classes = useStyles({
    css,
    on,
    color,
  })
  const computedClassNames = classnames(classes.switch, className)

  return (
    <label className={computedClassNames}>
      <input checked={on} onChange={handleSwitchChange} type='checkbox' />
      <span className={`switch-button`} />
    </label>
  )
}

export default Switch
