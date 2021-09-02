import * as React from 'react'
import classnames from 'classnames'
import { theme, Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type SegmentProps = Partial<{
  vertical: boolean
  cssOptions: (theme: Theme) => React.CSSProperties
}>
type SegmentItemProps = Partial<{
  itemkey: React.Key | null | undefined
  currentKey: React.Key | null | undefined
  onClickItem: (key: React.Key | null | undefined) => void
  cssOptions: (theme: Theme, isCurrent: boolean) => React.CSSProperties
}>

const useSegmentStyles = createUseStyles<
  'segment',
  Pick<SegmentProps, 'cssOptions'> & { left: number; key: number; fragmentLength: number; offsetX: number },
  Theme
>((theme) => ({
  segment: ({ cssOptions, key, left, offsetX, fragmentLength }) => ({
    height: '2em',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '4px',
    background: theme ? theme.color.greyLight : '#F3F4F6',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
    },
    '& > div:first-child': {
      boxShadow: `0px 0px 4px 0px ${theme ? theme.shadow.color : 'rgba(0,0,0,.1)'}`,
      borderRadius: '4px',
      width: `calc(${fragmentLength}% - ${offsetX}px)`,
      top: '4px',
      bottom: '4px',
      transform: `translateX(calc(${key == 0 ? offsetX : 100 * key}% + ${offsetX * key}px))`,
      background: theme ? theme.color.white : '#fff',
      transition: '.3s all',
    },
    ...cssOptions?.(theme),
  }),
}))

const useSegmentItemStyles = createUseStyles<
  'segment-item',
  Pick<SegmentItemProps, 'cssOptions'> & { isCurrent: boolean },
  Theme
>((theme) => ({
  'segment-item': ({ cssOptions, isCurrent }) => ({
    padding: '0 .4em',
    flex: 1,
    textAlign: 'center',
    color: isCurrent ? (theme ? theme.color.primary : '#231F9C') : theme ? theme.color.grey : '#6b7280',
    transition: '.3s all',
    fontWeight: isCurrent ? 700 : 500,
    ...cssOptions?.(theme, isCurrent),
  }),
}))

const Segment = ({
  cssOptions,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & SegmentProps) => {
  const fragmentLength = React.useRef(100 / (children as any).length)
  console.log(fragmentLength)
  const [offsetX, setOffsetX] = React.useState(0)
  const [left, setLeft] = React.useState(0)
  const [current, setCurrent] = React.useState(0)
  const classes = useSegmentStyles({
    left,
    key: current,
    fragmentLength: fragmentLength.current,
    offsetX,
    cssOptions,
  })
  const computedClassNames = classnames(classes.segment, className)
  const handleChildrenRender = () => {
    return React.Children.map(children, (child: any, i) => {
      const element = child as React.DetailedReactHTMLElement<any, HTMLElement>
      if (child.type.name == 'SegmentItem') {
        return React.cloneElement(element, {
          onClickItem: (key: any) => {
            setCurrent(key)
          },
          itemkey: i,
          currentKey: current,
        })
      }
      return undefined
    })
  }
  React.useEffect(() => {
    if (current == 0) {
      setOffsetX(4)
      setLeft(4)
    } else if (current == (children as any).length - 1) {
      setOffsetX(4)
      setLeft(0)
    } else {
      setOffsetX(0)
      setLeft(0)
    }
  }, [current])
  return (
    <div aria-label="segment button" role="button" className={computedClassNames} {...props}>
      <div></div>
      {children instanceof Array && <div>{handleChildrenRender()}</div>}
    </div>
  )
}

const SegmentItem = ({
  itemkey,
  currentKey,
  onClickItem,
  cssOptions,
  children,
  className,
}: React.ComponentPropsWithoutRef<'div'> & SegmentItemProps) => {
  const classes = useSegmentItemStyles({ isCurrent: itemkey == currentKey, ...cssOptions })
  const computedClassNames = classnames(classes['segment-item'], className)
  const handleClickSegmentItem = () => {
    onClickItem?.(itemkey)
  }
  return (
    <div aria-label="segment item" className={computedClassNames} onClick={handleClickSegmentItem}>
      {children}
    </div>
  )
}

Segment.Item = SegmentItem

export default Segment
