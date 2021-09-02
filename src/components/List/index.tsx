import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type ListProps = {
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type ListItemProps = {
  swipe?: boolean
  onSwipe?: () => any
  onSwipeStart?: () => any
  onSwipeEnd?: () => any
  rightContent?: React.ReactNode
  className?: string
  children?: React.ReactNode
  cssOptions?: (theme: Theme) => React.CSSProperties
}

const useListStyles = createUseStyles<'list', Pick<ListProps, 'cssOptions'>, Theme>((theme) => ({
  list: ({ cssOptions }) => {
    return {
      overflow: 'hidden',
      ...cssOptions?.(theme),
    }
  },
}))

const useListItemStyles = createUseStyles<'list-item', Pick<ListProps, 'cssOptions'> & { translateX: number }, Theme>(
  (theme) => ({
    'list-item': ({ cssOptions, translateX }) => {
      return {
        position: 'relative',
        transform: `translate3d(-${translateX}px,0,0)`,
        transition: 'transform 0.1s cubic-bezier(0.4, 0, 1, 1) 0s',
        ...cssOptions?.(theme),
        '& > :nth-child(2)': {
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate3d(100%,0,0)',
        },
      }
    },
  }),
)
const List = ({ cssOptions, className, children, ...props }: ListProps & React.ComponentPropsWithoutRef<'section'>) => {
  const classes = useListStyles({
    cssOptions,
  })

  const computedClassNames = classnames(classes.list, className)

  return (
    <section aria-label="list" role="list" className={computedClassNames} {...props}>
      {children}
    </section>
  )
}

const ListItem = ({
  swipe,
  onSwipeStart,
  rightContent,
  onSwipe,
  onSwipeEnd,
  children,
  className,
  cssOptions,
}: ListItemProps) => {
  const [swipeLength, setSwipeLength] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [startX, setStartX] = useState(0)
  const classes = useListItemStyles({
    translateX,
    cssOptions,
  })
  const rightContentRef = React.useRef<any>({})
  const computedClassNames = classnames(classes['list-item'], className)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].pageX)
    onSwipeStart?.()
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    length = Math.max(0, parseFloat((startX - e.touches[0].clientX).toFixed(2)))
    const sl = Math.min(length, rightContentRef.current.clientWidth)
    setSwipeLength(sl)
    setTranslateX(sl)
    onSwipe?.()
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (swipeLength > rightContentRef.current.clientWidth / 2) {
      setTranslateX(rightContentRef.current.clientWidth)
    } else {
      setTranslateX(0)
    }
    setSwipeLength(0)
    onSwipeEnd?.()
  }

  const renderRightContent = () => {
    console.log(
      React.cloneElement(rightContent as React.DetailedReactHTMLElement<any, HTMLElement>, {
        ref: rightContentRef,
      }),
    )

    // return React.cloneElement(rightContent as React.DetailedReactHTMLElement<any, HTMLElement>, {
    //   ref: rightContentRef,
    // })
  }

  const props = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
  return (
    <div aria-label="list item" role="listitem" {...(swipe ? props : {})} className={computedClassNames}>
      {children}
      {rightContent && renderRightContent()}
    </div>
  )
}
List.Item = ListItem
export default List
