/** @jsxImportSource @emotion/react */

import { Theme } from '../../constants/theme';
import clsx from 'clsx';
import { useTheme, css } from '@emotion/react';
// import * as ReactCSS from 'csstype';

type IconProps = {
  color?: string;
  src?: string;
  className?: string;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
};
const Icon = ({ color, co, src, className }: IconProps) => {
  const theme = useTheme() as Theme;
  const styles = css({
    background: color,
    mask: src,
    ...(typeof co == 'function' ? co(theme) : co),
  });
  const computedClassNames = clsx(className);
  return <div css={styles} className={computedClassNames} />;
};

export default Icon;