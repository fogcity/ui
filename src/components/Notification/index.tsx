import { useEffect, useState } from 'react'
import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type NotificationProps = {
  show?: boolean
  delay?: number
  onClose: () => void
}
type RuleNames = 'notification' | '@keyframes in'
const useStyles = createUseStyles<RuleNames, Omit<NotificationProps, 'onClose'>, Theme>((theme) => ({
  notification: ({ show }) => ({
    position: 'fixed',
    zIndex: theme.zIndex.notification,
    top: 0,
    transform: `translateY(${show ? '0%' : '-100%'})`,
    transition: '.3s all',
    animation: '$in .3s',
  }),
  '@keyframes in': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '100%': {
      transform: 'translateY(0%)',
    },
  },
}))

const Notification = ({
  show = false,
  onClose,
  delay = 3,
  color,
  children,
  className,
  ...props
}: NotificationProps & React.ComponentPropsWithoutRef<'aside'>) => {
  const classes = useStyles({ show })
  const computedClassNames = classnames(classes.notification, className)
  useEffect(() => {
    if (show == true)
      setTimeout(() => {
        onClose()
      }, delay * 1000)
  }, [show])
  return (
    <aside className={computedClassNames} {...props}>
      {children}
    </aside>
  )
}

export default Notification
