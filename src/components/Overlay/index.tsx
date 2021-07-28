import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

interface OverlayProps {
  color?: string
  show: boolean
  blur?: boolean
  opacity?: string | number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  cssOptions?: React.CSSProperties
  className?: string
}

type RuleNames = 'overlay'

const useStyles = createUseStyles<RuleNames, Omit<OverlayProps, 'onClick'>, Theme>((theme) => ({
  overlay: ({ cssOptions, color, blur, opacity, show }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: color || 'rgba(0,0,0,0.48)',
    backdropFilter: blur ? 'blur(4px)' : '',
    zIndex: theme.zIndex.overlay,
    opacity: 0,
    transition: 'all .4s',
    ...(show ? { opacity: opacity } : { display: 'none' }),
    ...cssOptions,
  }),
}))

const Overlay = ({ opacity = 1, blur = false, color, show = false, onClick, cssOptions, className }: OverlayProps) => {
  const classes = useStyles({ show, blur, color, opacity, cssOptions })
  const computedOverlayClassNames = classnames(classes.overlay, className)
  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e)
  }
  return <aside className={computedOverlayClassNames} onClick={handleClickOverlay} />
}

export default Overlay
