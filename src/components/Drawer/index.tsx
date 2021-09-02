import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
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
          top: '-' + height == 'auto' ? '100vh' : height,
        }
        to = {
          top: '0',
        }
        break
      case 'bottom':
        from = {
          bottom: '-' + height == 'auto' ? '100vh' : height,
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
          top: '-' + height == 'auto' ? '100vh' : height,
        }
        from = {
          top: '0',
        }
        break
      case 'bottom':
        to = {
          bottom: '-' + height == 'auto' ? '100vh' : height,
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
      closeStyle = {},
      openStyle = {}
    const baseYOffset = height != 'auto' ? height : '-100vh'
    const baseXOffset = '-' + width
    switch (position) {
      case 'left':
        contentStyle = {
          width: width,
          height: '100%',
          left: baseXOffset,
          top: '0',
          bottom: '0',
        }
        openStyle = { left: 0 }
        break
      case 'right':
        contentStyle = {
          width: width,
          height: '100%',
          right: baseXOffset,
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
          top: baseYOffset,
        }
        openStyle = { top: 0 }
        break
      case 'bottom':
        contentStyle = {
          width: '100%',
          height: height,
          left: 0,
          right: 0,
          bottom: baseYOffset,
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
      transition: 'all .3s',

      ...(open ? openStyle : { ...closeStyle }),
    }
  },
  drawer: ({ open }) => ({
    visibility: open ? 'visible' : 'hidden',
  }),
}))

const Drawer = ({
  width = '40vw',
  height = 'auto',
  position = 'left',
  open = false,
  onClose,
  showOverlay = true,
  shy = true,
  children,
  className,
  ...props
}: DrawerProps & React.ComponentPropsWithoutRef<'aside'>) => {
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
      {React.cloneElement(children as React.FunctionComponentElement<{ className: string }>, {
        className: computedChildClassNames,
      })}
      <Overlay
        show={open}
        onClick={handleClickOverlay}
        cssOptions={() => ({
          display: showOverlay ? 'flex' : 'none',
        })}
      />
    </aside>
  )
}

export default Drawer
