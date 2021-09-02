import { useEffect, useState } from 'react'
import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import { debounce } from '../../utils'

type PullToRefreshProps = {
  triggerValue?: number
  delay?: number
  onPullStart?: () => any
  onPull?: (pullLength: number) => any
  onPullEnd?: () => any
  onRefresh?: (refreshOver: () => any) => any
  cssOptions?: (theme: Theme) => React.CSSProperties
}

type RefreshLoadingProps = {
  children?: React.ReactNode
  className?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}

const usePullToRefreshStyles = createUseStyles<
  'pullToRefresh',
  Pick<PullToRefreshProps, 'cssOptions' | 'triggerValue'> & {
    translateY: number
  },
  Theme
>((theme) => ({
  pullToRefresh: ({ translateY, cssOptions }) => ({
    height: '100%',
    overflow: 'hidden',
    '& > .refresh-container': {
      transform: `translate3d(0px, ${translateY}px, 0px)`,
      transition: '.3s all cubic-bezier(0, 0, 0.19, 1.25)',
      height: '100%',
      ...cssOptions?.(theme),
    },
  }),
}))

const useRefreshLoadingStyles = createUseStyles<'refresh-loading', Pick<RefreshLoadingProps, 'cssOptions'>, Theme>(
  (theme) => ({
    'refresh-loading': ({ cssOptions }) => {
      const pullToRefreshStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        left: 0,
        textAlign: 'center',
        transform: 'translateY(-100%)',
        ...cssOptions?.(theme),
      }
      return pullToRefreshStyle
    },
  }),
)
const PullToRefresh = ({
  triggerValue = 80,
  delay = 30,
  onPull,
  onPullStart,
  onPullEnd,
  onRefresh,
  className,
  children,
  cssOptions,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & PullToRefreshProps) => {
  const [pullLength, setPullLength] = useState(0)
  const [isRefresh, setIsRefresh] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const [startY, setStartY] = useState(0)
  const classes = usePullToRefreshStyles({
    translateY,
    triggerValue,
    cssOptions,
  })
  const computedRefreshClassNames = classnames(classes.pullToRefresh, className)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].pageY)
    onPullStart?.()
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startY != 0) {
      e.stopPropagation()
      debounce(() => {
        const length = Math.max(0, parseFloat((e.touches[0].clientY - startY).toFixed(2)))
        const pl = Math.min(triggerValue + delay, length)
        setTranslateY(pl > (delay as number) ? pl - (delay as number) : 0)
        setPullLength(length)
        onPull?.(length)
      }, 2)
    }
  }

  const handleReset = () => {
    setStartY(0)
    setTranslateY(0)
    setPullLength(0)
  }

  const handleTouchEnd = () => {
    onPullEnd?.()
    if (pullLength >= triggerValue + delay) {
      const ty = ((translateY / 1.2).toFixed(2) as any) * 1
      setTranslateY(ty)
      setIsRefresh(true)
      onRefresh?.(() => setIsRefresh(false))
    } else {
      handleReset()
    }
  }

  const handleChildrenRender = () => {
    return React.Children.map(children, (child: any, i) => {
      if (child.type.name == 'RefreshLoading') {
        return React.cloneElement(child as React.DetailedReactHTMLElement<any, HTMLElement>)
      }
      return React.cloneElement(child as React.DetailedReactHTMLElement<any, HTMLElement>, {
        style:
          translateY > 0
            ? {
                overflow: 'hidden',
              }
            : {},
      })
    })
  }

  useEffect(() => {
    if (!isRefresh) {
      handleReset()
    }
  }, [isRefresh])

  return (
    <div
      aria-label="pull-to-refresh"
      className={computedRefreshClassNames}
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={(e) => handleTouchEnd()}
      {...props}
    >
      <div aria-label="pull-to-refresh container" className="refresh-container">
        {handleChildrenRender()}
      </div>
    </div>
  )
}

const RefreshLoading = ({ children, className, cssOptions }: RefreshLoadingProps) => {
  const classes = useRefreshLoadingStyles({
    cssOptions,
  })
  const computedLoadingClassNames = classnames(classes['refresh-loading'], className)
  return (
    <div aria-label="pull-to-refresh loading" className={computedLoadingClassNames}>
      {children}
    </div>
  )
}

PullToRefresh.Loading = RefreshLoading
export default PullToRefresh
