/** @jsxImportSource @emotion/react */

import { Theme } from '../../constants/theme';
import React from 'react';
import clsx from 'clsx';
import { useTheme, css } from '@emotion/react';
import Button from '../Button';

interface TabsProps {
  noIndicator?: boolean;
  onClickTab: (key: React.Key) => void;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  tab: React.Key;
}

type TabItemProps = Partial<{
  noIndicator: boolean;
  tab: Readonly<React.Key>;
  tabKey: React.Key;
  children: React.ReactNode;
  className: string;
  onClick: (key: React.Key) => void;
  co: (theme: Theme, isCurrentTab: boolean) => React.CSSProperties;
}>;

type TabsIndicatorProps = Partial<{
  children: React.ReactNode;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
}>;

const Tabs = ({
  onClickTab,
  noIndicator = false,
  tab,
  co,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'> & TabsProps) => {
  const theme = useTheme() as Theme;
  const computedClassNames = clsx(className);
  const handleChildrenRender = () => {
    return React.Children.map(children, (child: any, i) => {
      const element = child as React.DetailedReactHTMLElement<any, HTMLElement>;
      if (child.type.name == 'TabItem') {
        return React.cloneElement(element, {
          onClick: () => {
            onClickTab?.(element.key || `${child.type.name}${i}`);
          },
          tab: tab,
          tabKey: element.key,
          noIndicator: noIndicator,
          ...{ ...element.props, key: element.key },
        });
      }
      return undefined;
    });
  };
  const renderTab = (tab: React.ReactNode) => tab;
  return (
    <nav
      css={css({
        display: 'flex',
        ...(typeof co == 'function' && co(theme)),
      })}
      aria-label='tabs'
      className={computedClassNames}
      {...props}>
      {typeof children === 'function' && children(renderTab)}
      {children instanceof Array && handleChildrenRender()}
    </nav>
  );
};

const TabItem = ({ tab, tabKey, onClick, noIndicator, co, children, className }: TabItemProps) => {
  const theme = useTheme() as Theme;
  const tabsIndicatorStyles = css({
    position: 'relative',
    flex: 1,
    textAlign: 'center',
    ...(typeof co == 'function' && co(theme, tab == tabKey)),
  });
  const computedClassNames = clsx(className);
  const handleClickTab = () => {
    onClick?.(tabKey as React.Key);
  };
  const tabCssOptions = (theme: Theme) => ({
    borderRadius: '',
    ...co?.(theme, tab == tabKey),
  });
  return (
    <Button
      css={tabsIndicatorStyles}
      aria-label='tab item'
      className={computedClassNames}
      onClick={handleClickTab}
      co={tabCssOptions}>
      {children}
      {tab == tabKey && !noIndicator && <TabsIndicator />}
    </Button>
  );
};

const TabsIndicator = ({ co, className, ...props }: React.ComponentPropsWithoutRef<'span'> & TabsIndicatorProps) => {
  const theme = useTheme() as Theme;
  const tabsIndicatorStyles = css({
    position: 'absolute',
    height: '1px',
    background: 'white',
    bottom: 0,
    left: 0,
    right: 0,
    ...(typeof co == 'function' && co(theme)),
  });
  const computedClassNames = clsx(className);
  return <span css={tabsIndicatorStyles} aria-label='tabs indicator' className={computedClassNames} {...props} />;
};

Tabs.Item = TabItem;
Tabs.Indicator = TabsIndicator;
export default Tabs;
