/** @jsxImportSource @emotion/react */

import clsx from 'clsx';
import { css, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import React, { useState, useEffect } from 'react';

type SortButtonProps = {
  state?: -1 | 1 | 0;
  onClick?: ((state: any) => void) | undefined;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  children?: React.ReactNode;
  color?: string;
};

const SortButton = ({
  color,
  children,
  onClick,
  state,
  co,
  className,
  ...props
}: SortButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
  const theme = useTheme() as Theme;
  const primary = color ? color : theme.color.primary;
  const gray = '#979797';
  const [count, setCount] = useState<number>(state || 0);
  const [titleColor, setTitleColor] = useState<string | undefined>('black');
  const [color1, setColor1] = useState<string | undefined>(gray);
  const [color2, setColor2] = useState<string | undefined>(gray);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      if (count === 0) {
        setCount(count + 1);
        setTitleColor(primary);
        setColor1(primary);
        setColor2(gray);
        onClick?.(count + 1);
      }
      if (count === 1) {
        setCount(count - 2);
        setColor1(gray);
        setColor2(primary);
        setTitleColor(primary);
        onClick?.(count - 2);
      }
      if (count === -1) {
        setCount(count + 1);
        setColor1(gray);
        setColor2(gray);
        setTitleColor('black');
        onClick?.(count + 1);
      }
    }
  };

  useEffect(() => {
    setCount(state || 0);
    if (state == 0) {
      setColor1(gray);
      setColor2(gray);
      setTitleColor('black');
    }
  }, [state]);

  const styles = css({
    display: 'flex',
    alignItems: 'center',
    '& > .animal': {
      marginLeft: '.5em',
      '& > .positiveTriangle': {
        borderRight: '5px solid transparent',
        borderLeft: '5px solid transparent',
        borderRadius: '5px',
        height: 0,
        width: 0,
        marginBottom: '3px',
      },
      '& > .invertedTriangle': {
        borderRight: '5px solid transparent',
        borderLeft: '5px solid transparent',
        borderRadius: '5px',
        height: 0,
        width: 0,
      },
    },
    ...(typeof co == 'function' ? co(theme) : co),
  });
  const computedClassNames = clsx(className);

  return (
    <button css={styles} className={computedClassNames} {...props} onClick={handleClick}>
      <div style={{ color: `${titleColor}` }} className={`text`}>
        {children}
      </div>
      <div className={`animal`}>
        <div className={`positiveTriangle`} style={{ borderBottom: `5px solid ${color1}` }} />
        <div className={`invertedTriangle`} style={{ borderTop: `5px solid ${color2}` }} />
      </div>
    </button>
  );
};

export default SortButton;
