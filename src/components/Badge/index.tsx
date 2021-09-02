import * as React from 'react'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type BadgeProps = Partial<{
  size: string
  show: boolean
  color: string
  offsetX: string
  offsetY: string
  badgeContent: React.ReactNode
  cssOptions: (theme: Theme) => React.CSSProperties
}>

const useBadgeStyles = createUseStyles<'badge', BadgeProps, Theme>((theme) => ({
  badge: ({ cssOptions, size, offsetX, show, offsetY, color }) => ({
    position: 'relative',
    '& > *:first-child': {
      borderRadius: '50%',
      visibility: show && 'visible',
      background: color || theme ? theme.color.red : '#e32b3a',
      color: theme ? theme.color.white : '#fff',
      lineHeight: `${size}px`,
      minWidth: `${size}px`,
      height: `${size}px`,
      textAlign: 'center',
      position: 'absolute',
      right: offsetX || 0,
      top: offsetY || 0,
      transform: 'translate3d(50%,-50%,0)',
      transition: 'all .2s',
      ...cssOptions?.(theme),
    },
  }),
}))
const Badge = ({
  size = '10',
  show = true,
  cssOptions,
  offsetX,
  offsetY,
  color,
  badgeContent,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & BadgeProps) => {
  const classes = useBadgeStyles({ cssOptions, size, show, offsetX, offsetY })
  const computedClassNames = classnames(classes.badge, className)
  const renderBadgeContent = () => {
    if (typeof badgeContent == 'string' || !badgeContent) {
      return <sup>{badgeContent}</sup>
    }
    return badgeContent
  }
  return (
    <div aria-label="badge" className={computedClassNames} {...props}>
      {renderBadgeContent()}
      {children}
    </div>
  )
}

export default Badge
