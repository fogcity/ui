import * as React from 'react'
import classnames from 'classnames'
import { theme, Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'
import Button from '../Button'

interface TabsProps {
  noIndicator?: boolean
  onClickTab: (key: React.Key) => void
  cssOptions?: (theme: Theme) => React.CSSProperties
  tab: React.Key
}
type TabItemProps = Partial<{
  noIndicator: boolean
  tab: Readonly<React.Key>
  tabKey: React.Key
  children: React.ReactNode
  className: string
  onClick: (key: React.Key) => void
  cssOptions: (theme: Theme, isCurrentTab: boolean) => React.CSSProperties
}>
type TabsIndicatorProps = Partial<{
  children: React.ReactNode
  cssOptions?: (theme: Theme) => React.CSSProperties
}>

const useTabsStyles = createUseStyles<'tabs', Pick<TabsProps, 'cssOptions'>, Theme>((theme) => ({
  tabs: ({ cssOptions }) => ({
    display: 'flex',
    ...cssOptions,
  }),
}))
const useTabItemStyles = createUseStyles<'tabItem', Pick<TabItemProps, 'cssOptions'>, Theme>((theme) => ({
  tabItem: ({ cssOptions }) => ({
    position: 'relative',
    flex: 1,
    textAlign: 'center',
    ...cssOptions,
  }),
}))
const useTabsIndicatorStyles = createUseStyles<'tabsIndicator', Pick<TabsIndicatorProps, 'cssOptions'>, Theme>(
  (theme) => ({
    tabsIndicator: ({ cssOptions }) => ({
      position: 'absolute',
      height: '1px',
      background: 'white',
      bottom: 0,
      left: 0,
      right: 0,
      ...cssOptions,
    }),
  }),
)
const Tabs = ({
  onClickTab,
  noIndicator = false,
  tab,
  cssOptions,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'> & TabsProps) => {
  const classes = useTabsStyles({ cssOptions })
  const computedClassNames = classnames(classes.tabs, className)
  const handleChildrenRender = () => {
    return React.Children.map(children, (child: any, i) => {
      const element = child as React.DetailedReactHTMLElement<any, HTMLElement>
      if (child.type.name == 'TabItem') {
        return React.cloneElement(element, {
          onClick: () => {
            onClickTab?.(element.key || `${child.type.name}${i}`)
          },
          tab: tab,
          tabKey: element.key,
          noIndicator: noIndicator,
          ...{ ...element.props, key: element.key },
        })
      }
      return undefined
    })
  }
  const renderTab = (tab: React.ReactNode) => tab
  return (
    <nav aria-label="tabs" className={computedClassNames} {...props}>
      {typeof children === 'function' && children(renderTab)}
      {children instanceof Array && handleChildrenRender()}
    </nav>
  )
}

const TabItem = ({ tab, tabKey, onClick, noIndicator, cssOptions, children, className }: TabItemProps) => {
  const classes = useTabItemStyles({ cssOptions })
  const computedClassNames = classnames(classes.tabItem, className)
  const handleClickTab = () => {
    onClick?.(tabKey as React.Key)
  }
  const tabCssOptions = (theme: Theme) => ({
    borderRadius: '',
    ...cssOptions?.(theme, tab == tabKey),
  })
  return (
    <Button aria-label="tab item" className={computedClassNames} onClick={handleClickTab} cssOptions={tabCssOptions}>
      {children}
      {tab == tabKey && !noIndicator && <TabsIndicator />}
    </Button>
  )
}
const TabsIndicator = ({
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'> & TabsIndicatorProps) => {
  const classes = useTabsIndicatorStyles({ cssOptions })
  const computedClassNames = classnames(classes.tabsIndicator, className)
  return <span aria-label="tabs indicator" className={computedClassNames} {...props} />
}

Tabs.Item = TabItem
Tabs.Indicator = TabsIndicator
export default Tabs
