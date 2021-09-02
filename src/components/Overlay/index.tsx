import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type OverlayProps = Partial<{
  color: string
  show: boolean
  blur: boolean
  opacity: string | number
  children: React.ReactNode
  noAnimation: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  cssOptions: (theme: Theme) => React.CSSProperties
  className: string
}>

type RuleNames = 'overlay'

const useStyles = createUseStyles<RuleNames, Omit<OverlayProps, 'onClick'>, Theme>((theme) => ({
  overlay: ({ cssOptions, noAnimation, color, blur, opacity, show }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: color || theme?.color?.greyLight || '#F3F4F6',
    backdropFilter: blur ? 'blur(4px)' : '',
    zIndex: theme.zIndex?.overlay,
    opacity: 0,
    transition: noAnimation ? 'all .4s' : '',
    ...(show ? { opacity: opacity } : { display: 'none' }),
    ...cssOptions?.(theme),
  }),
}))

const Overlay = ({
  opacity = 1,
  noAnimation = false,
  blur = false,
  color,
  show = false,
  children,
  onClick,
  cssOptions,
  className,
}: OverlayProps) => {
  const classes = useStyles({ noAnimation,show, blur, color, opacity, cssOptions })
  const computedOverlayClassNames = classnames(classes.overlay, className)
  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e)
  }
  return (
    <aside className={computedOverlayClassNames} onClick={handleClickOverlay}>
      {children}
    </aside>
  )
}

export default Overlay
