import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import React from 'react'
import { Theme } from '../../constants/theme'
import Overlay from '../Overlay'

type RuleNames = 'drawer' | 'drawer-content' | '@keyframes drawerIn' | '@keyframes drawerOut'
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'
interface DrawerProps {
  width?: string
  height?: string
  position?: DrawerPosition
  showOverlay?: boolean
  shy?: boolean
  open?: boolean
  onClose: (e: any) => any
}

const useStyles = createUseStyles<RuleNames, Omit<DrawerProps, 'onClose' | 'shy'>, Theme>((theme) => ({
  '@keyframes drawerIn': ({ position, width, height }) => {
    let from: any = {
      left: '-' + width,
    }
    let to: any = {
      left: '0',
    }

    switch (position) {
      case 'right':
        from = {
          right: '-' + width,
        }
        to = {
          right: '0',
        }
        break
      case 'top':
        from = {
          top: '-' + height,
        }
        to = {
          top: '0',
        }
        break
      case 'bottom':
        from = {
          bottom: '-' + height,
        }
        to = {
          bottom: '0',
        }
        break
      default:
        break
    }

    return {
      from: from,
      to: to,
    }
  },
  '@keyframes drawerOut': ({ position, width, height }) => {
    let to: any = {
      left: '-' + width,
    }
    let from: any = {
      left: '0',
    }
    switch (position) {
      case 'right':
        to = {
          right: '-' + width,
        }
        from = {
          right: '0',
        }
        break
      case 'top':
        to = {
          top: '-' + height,
        }
        from = {
          top: '0',
        }
        break
      case 'bottom':
        to = {
          bottom: '-' + height,
        }
        from = {
          bottom: '0',
        }
        break
      default:
        break
    }

    return {
      from: from,
      to: to,
    }
  },
  'drawer-content': ({ open, position, width, height }) => {
    let contentStyle = {},
      openStyle = {}

    const closeStyle = {}
    const baseOffset = '-' + height
    switch (position) {
      case 'left':
        contentStyle = {
          width: width,
          height: '100%',
          left: baseOffset,
          top: '0',
          bottom: '0',
        }
        openStyle = { left: 0 }
        break
      case 'right':
        contentStyle = {
          width: width,
          height: '100%',
          right: baseOffset,
          top: '0',
          bottom: '0',
        }
        openStyle = { right: 0 }
        break
      case 'top':
        contentStyle = {
          width: '100%',
          height: height,
          left: 0,
          right: 0,
          top: baseOffset,
        }
        openStyle = { top: 0 }
        break
      case 'bottom':
        contentStyle = {
          width: '100%',
          height: height,
          left: 0,
          right: 0,
          bottom: baseOffset,
        }
        openStyle = { bottom: 0 }
        break
      default:
        break
    }
    return {
      position: 'fixed',
      zIndex: theme.zIndex.drawer,
      ...contentStyle,
      transition: 'all .4s',

      ...(open ? openStyle : { ...closeStyle }),
    }
  },
  drawer: ({ open }) => ({
    visibility: open ? 'visible' : 'hidden',
  }),
}))

const Drawer = ({
  width = '40vh',
  height = '18em',
  position = 'left',
  open = false,
  onClose,
  showOverlay = true,
  shy = true,
  children,
  className,
  ...props
}: DrawerProps & React.ComponentProps<'aside'>) => {
  const classes = useStyles({ open, width, height, position })
  const computedClassNames = classnames(classes.drawer)
  const computedChildClassNames = classnames(classes['drawer-content'], className)
  const handleClickOverlay = (e: any) => {
    if (shy) {
      onClose(e)
    }
  }

  return (
    <aside className={computedClassNames} {...props}>
      {typeof children == 'string'
        ? children
        : React.cloneElement(children as React.FunctionComponentElement<{ className: string }>, {
            className: computedChildClassNames,
          })}
      <Overlay
        blur
        show={open}
        onClick={handleClickOverlay}
        cssOptions={{
          display: showOverlay ? 'flex' : 'none',
        }}
      />
    </aside>
  )
}

export default Drawer
