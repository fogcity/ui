import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import { debounce } from '../../utils'

type FloatingWindowProps = Partial<{
  adsorption?: boolean
  draggable?: boolean
  cssOptions: (theme: Theme) => React.CSSProperties
  position?: {
    left: number | string
    top: number | string
  }
}>

const useStyles = createUseStyles<'floating-window', FloatingWindowProps, Theme>((theme) => ({
  'floating-window': ({ position, cssOptions }) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    ...position,
    zIndex: theme ? theme.zIndex.floatingWindow : 700,
    transition: '.1s all',
    ...cssOptions?.(theme),
  }),
}))

const FloatingWindow = ({
  draggable = false,
  adsorption = false,
  position = {
    left: 0,
    top: 0,
  },
  children,
  cssOptions,
  className,
  ...props
}: FloatingWindowProps & React.ComponentPropsWithoutRef<'aside'>) => {
  const [computedPosition, setComputedPosition] = React.useState(position)
  const [timer, setTimer] = React.useState<any>()

  const [maxLeft, setMaxLeft] = React.useState(0)
  const [maxTop, setMaxTop] = React.useState(0)
  const [clientProperty, setClientProperty] = React.useState<any>(0)
  const classes = useStyles({ position: computedPosition, cssOptions })
  const computedClassNames = classnames(classes['floating-window'], className)
  const handleTouchStart = (e: any) => {
    if (!clientProperty) {
      setClientProperty({
        documentElement: e.touches[0].target.ownerDocument.documentElement,
        clientHeight: e.touches[0].target.clientHeight,
        clientWidth: e.touches[0].target.clientWidth,
      })
      setMaxTop(e.touches[0].target.ownerDocument.documentElement.clientHeight - e.touches[0].target.clientHeight)
      setMaxLeft(e.touches[0].target.ownerDocument.documentElement.clientWidth - e.touches[0].target.clientWidth)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    debounce(
      () =>
        setComputedPosition({
          left: Math.min(maxLeft, Math.max(0, parseFloat(e.touches[0].pageX.toFixed(2)))),
          top: Math.min(maxTop, Math.max(0, parseFloat(e.touches[0].pageY.toFixed(2)))),
        }),
      2,
    )
  }

  const handleTouchEnd = () => {
    if (adsorption) {
      if (computedPosition.left >= (clientProperty.documentElement.clientWidth * 3) / 4) {
        setComputedPosition((v: any) => ({
          ...v,
          left: maxLeft,
        }))
      }
      if (computedPosition.left <= clientProperty.documentElement.clientWidth / 4) {
        setComputedPosition((v: any) => ({
          ...v,
          left: 0,
        }))
      }
    }
  }

  const touchProps = draggable
    ? {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchMove: handleTouchMove,
      }
    : {}
  return (
    <aside {...touchProps} className={computedClassNames} {...props}>
      {children}
    </aside>
  )
}

export default FloatingWindow
