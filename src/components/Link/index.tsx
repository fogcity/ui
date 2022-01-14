/** @jsxImportSource @emotion/react */
import clsx from 'clsx';
import { css, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';

import * as React from 'react';
import { getLuminance } from '../../constants/style';
import Button from '../Button';

type LinkProps = {
  indicatorColor: string;
  indicatorWidth: string;
  indicatorHeight: string;
  color?: string;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
};

const Link = ({
  disabled,
  indicatorColor,
  indicatorWidth,
  indicatorHeight,
  co,
  onClick,
  className,
  children,
  ...props
}: LinkProps & React.ComponentProps<'button'>) => {
  const theme = useTheme() as Theme;

  const styles = css({
    borderBottomWidth: indicatorWidth,
    borderBottom: `${indicatorHeight || '1px'} solid  ${indicatorColor || theme?.color?.primary || '#231F9C'}`,
    ...(typeof co == 'function' ? co(theme) : co),
  });

  const handleClickLink = (e: any) => {
    onClick?.(e);
  };
  return (
    <Button text onClick={handleClickLink} css={styles} className={clsx(className)} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default Link;
