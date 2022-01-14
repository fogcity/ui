/** @jsxImportSource @emotion/react */
import clsx from 'clsx';
import { css, keyframes, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import * as React from 'react';

type LoadingProps = {
  bit?: boolean;
  duration?: string;
  className?: string;
  width?: string;
  backgroundColor?: ((theme: Theme) => string) | string;
  color?: ((theme: Theme) => string) | string;
  borderWidth?: string;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
};

const Loading = ({
  duration = '1.2s',
  width = '4em',
  borderWidth = '2px',
  color = '#555',
  backgroundColor: backgroundColor = '#f3f3f3',
  bit = false,
  co,
  className,
}: LoadingProps & React.ComponentPropsWithoutRef<'div'>) => {
  const theme = useTheme() as Theme;
  const kfSpin = keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });
  const kfBit = keyframes({
    '0%, 20%, 80%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.5)',
    },
  });
  const styles = css({
    '& .normal': {
      border: `${borderWidth} solid ${typeof backgroundColor == 'string' ? backgroundColor : backgroundColor?.(theme)}`,
      borderTop: `${borderWidth} solid ${
        typeof color == 'function' ? (color as (theme: Theme) => string)(theme) : color
      }`,
      borderRadius: '50%',
      width: width,
      height: width,
      animation: `${kfSpin} ${duration} linear infinite`,
    },
    '& .bit': {
      display: 'inline-block',
      position: 'relative',
      width: width,
      height: width,
      '& span': {
        position: 'absolute',
        width: '6px',
        height: '6px',
        background: color,
        borderRadius: '50%',
        animation: `${kfBit} ${duration} linear infinite`,
        '&:nth-child(1)': {
          animationDelay: '0s',
          top: '37px',
          left: '66px',
        },
        '&:nth-child(2)': {
          animationDelay: '-0.1s',
          top: '22px',
          left: '62px',
        },
        '&:nth-child(3)': {
          animationDelay: '-0.2s',
          top: '11px',
          left: '52px',
        },
        '&:nth-child(4)': {
          animationDelay: '-0.3s',
          top: '7px',
          left: '37px',
        },
        '&:nth-child(5)': {
          animationDelay: '-0.4s',
          top: '11px',
          left: '22px',
        },
        '&:nth-child(6)': {
          animationDelay: '-0.5s',
          top: '22px',
          left: '11px',
        },
        '&:nth-child(7)': {
          animationDelay: '-0.6s',
          top: '37px',
          left: '7px',
        },
        '&:nth-child(8)': {
          animationDelay: '-0.7s',
          top: '52px',
          left: '11px',
        },
        '&:nth-child(9)': {
          animationDelay: '-0.8s',
          top: '62px',
          left: '22px',
        },
        '&:nth-child(10)': {
          animationDelay: '-0.9s',
          top: '66px',
          left: '37px',
        },
        '&:nth-child(11)': {
          animationDelay: '-1s',
          top: '62px',
          left: '52px',
        },
        '&:nth-child(12)': {
          animationDelay: '-1.1s',
          top: '52px',
          left: '62px',
        },
      },
    },

    ...(typeof co == 'function' ? co(theme) : co),
  });
  const computedClassNames = clsx(className);
  return (
    <div css={styles} className={computedClassNames}>
      {!bit ? (
        <div className={`normal`} />
      ) : (
        <div className={`bit`}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
};

export default Loading;
