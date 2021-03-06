/** @jsxImportSource @emotion/react */

import { Theme } from '../../styles/themes';
import { Base, Margin, Position, Padding } from '../props';
import { usePadding, useMargin, useFunctionLikeValue } from '../../styles/css';
import { css, useTheme } from '@emotion/react';

type ContainerProps = Base &
  Margin &
  Position &
  Padding & {
    background?: ((theme: Theme) => string) | string;

    fullHeight?: boolean;
    fullScreen?: boolean;
  };

const Container = ({ background, fullHeight = false, fullScreen = false, co, children, ...props }: ContainerProps) => {
  const theme = useTheme() as Theme;
  const styles = css({
    height: fullScreen ? '100vh' : fullHeight ? '100%' : 'auto',
    ...useMargin(props),
    ...usePadding(props),
    background: useFunctionLikeValue(theme, background),

    ...useFunctionLikeValue(theme, co),
  });

  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};

export default Container;
