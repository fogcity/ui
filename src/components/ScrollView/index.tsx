import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type ScrollViewProps = {
  triggerValue?: number
  onScrollToBottom?: (handleScrollToBottomOver: () => any) => any
  fetchNode?: React.ReactNode
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'scroll-view'

const useStyles = createUseStyles<RuleNames, Pick<ScrollViewProps, 'cssOptions'>, Theme>((theme) => ({
  'scroll-view': ({ cssOptions }) => {
    return {
      height: '100%',
      overflow: 'auto',
      ...cssOptions?.(theme),
    }
  },
}))
const ScrollView = ({
  fetchNode,
  triggerValue = 40,
  onScrollToBottom,
  cssOptions,
  className,
  children,
  ...props
}: ScrollViewProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    cssOptions,
  })

  const clsns = classnames(classes['scroll-view'], className)
  const [scrollTop, setScrollTop] = useState(0)
  const [isTouch, setIsTouch] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const handleScrollToBottomOver = () => {
    setIsFetching(false)
  }

  const handleScrollToBottom = () => {
    onScrollToBottom?.(handleScrollToBottomOver)
  }

  const handleScroll = (e: any) => {
    const element = e.target
    setScrollTop(element.scrollTop)
    if (element.scrollTop + element.clientHeight + triggerValue < element.scrollHeight || isFetching) return
    setIsFetching(true)
  }
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouch(true)
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scrollTop > 0 && isTouch) e.stopPropagation()
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouch(false)
  }
  useEffect(() => {
    if (!isFetching) return
    handleScrollToBottom()
  }, [isFetching])

  return (
    <div
      onScroll={handleScroll}
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
      className={clsns}
      {...props}
    >
      {children}
      {isFetching && fetchNode}
    </div>
  )
}

export default ScrollView
