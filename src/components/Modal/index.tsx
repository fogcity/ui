/** @jsxImportSource @emotion/react */
import clsx from 'clsx';
import { css, keyframes, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import * as React from 'react';
import Overlay from '../Overlay';

type ModalProps = {
  shy?: boolean;
  visible: boolean;
  opacity?: number;
  animationType?: 'none' | 'slide' | 'fade' | string;
  handleModalVisibleChange?: () => void;
  children?: React.ReactNode;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  className?: string;
};

const Modal = ({
  visible = false,
  shy = true,
  opacity,
  handleModalVisibleChange,
  animationType = 'slide',
  children,
  co,
  className,
}: ModalProps) => {
  const theme = useTheme() as Theme;

  const mountAnim = keyframes(
    animationType == 'fade'
      ? {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        }
      : animationType == 'slide'
      ? {
          '0%': {
            opacity: 0,
            transform: 'translateY(10%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
        }
      : {},
  );

  const unmountAnim = keyframes(
    animationType == 'fade'
      ? {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        }
      : animationType == 'slide'
      ? {
          '100%': {
            opacity: 0,
            transform: 'translateY(10%)',
          },
          '0%': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
        }
      : {},
  );

  const styles = css({
    '& > *:first-child': {
      animation: `${visible ? mountAnim : unmountAnim} .3s`,
    },
    ...(typeof co == 'function' ? co(theme) : co),
  });

  const computedModalClassNames = clsx(className);

  return (
    <Overlay
      onClick={
        shy
          ? handleModalVisibleChange
          : () => {
              // empty func
            }
      }
      css={styles}
      opacity={opacity || 0}
      visible={visible}
      className={computedModalClassNames}>
      {children}
    </Overlay>
  );
};

export default Modal;
