/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { clamp } from '../../utils';
type SwipeItem = {
  index: number;
  content: React.ReactNode;
};
type SwiperProps = {
  items: SwipeItem[];
  onSwipe?: (current: number, distance: number) => any;
  onSwipeStart?: (current: number) => any;
  onSwipeEnd?: (current: number) => any;
  onClick?: (index: number) => any;
  autoPlay?: boolean;
  loop?: boolean;
  delay?: number;
  vertical?: boolean;
  indicator?: (total: number, current: number) => React.ReactNode;
  className?: string;
};

const Swiper = ({
  items,
  autoPlay = false,
  vertical = false,
  loop = false,
  delay = 3000,
  onSwipeStart,
  onSwipeEnd,
  onSwipe,
  onClick,
  className,
}: SwiperProps) => {
  const computeCurrentItems = useCallback(() => {
    return items.length > 1 ? items.slice(-1).concat(items, items.slice(0, 1)) : items;
  }, [items]);
  const ref = useRef(null);
  const [touchResult, setTouchResult] = useState({ clientX: 0, clientY: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boundingInfos, setBoundingInfos] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [translateY, setTranslateY] = useState<string | number>(0);
  const [translateX, setTranslateX] = useState<string | number>(0);
  const theme = useTheme();

  const styles = css({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '& > ul': {
      transform: `${
        typeof translateX != 'string'
          ? `translate3d(${translateX}px,${translateY}px,0)`
          : `translate3d(${translateX},${translateY},0)`
      }`,
      '& > li': {
        display: 'inline-flex',
        width: '100%',
      },
    },
  });

  useEffect(() => {
    if (autoPlay) {
      const iv = setInterval(() => {
        // empty func
      }, delay);
      return clearInterval(iv);
    }
  }, []);

  useEffect(() => {
    setBoundingInfos((ref.current as any)?.getBoundingClientRect());
  }, [ref]);

  const handleTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    setIsTouching(true);
    setTouchResult(e.touches[e.touches.length - 1]);
    onSwipeStart?.(currentIndex);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    const currentTouchResult = e.touches[e.touches.length - 1];
    const diff = currentTouchResult[vertical ? 'clientY' : 'clientX'] - touchResult[vertical ? 'clientY' : 'clientX'];
    const isFirstItem = currentIndex == items[0].index && !loop;
    const isLastItem = currentIndex == items[items.length - 1].index && !loop;
    const currentNeededLength = boundingInfos[vertical ? 'height' : 'width'];
    const currentTranslate = currentIndex * currentNeededLength;
    console.log('currentTranslate', currentTranslate);
    const setTranslateXByDiff = (diffClamped: number) => {
      if (diff < 0) {
        setTranslateX(-currentTranslate + diffClamped);
      } else {
        setTranslateX(currentTranslate + diffClamped);
      }
    };
    if (isFirstItem) {
      const diffClamped = clamp(diff, -currentNeededLength, 0);
      setTranslateXByDiff(diffClamped);
    } else if (isLastItem) {
      const diffClamped = clamp(diff, 0, currentNeededLength);
      setTranslateXByDiff(diffClamped);
    } else setTranslateXByDiff(diff);
    onSwipe?.(currentIndex, diff);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLLIElement>) => {
    setIsTouching(false);
    const currentTouchResult = e.changedTouches[e.changedTouches.length - 1];
    const diff = currentTouchResult[vertical ? 'clientY' : 'clientX'] - touchResult[vertical ? 'clientY' : 'clientX'];
    const isRightDirection = diff < 0;
    const toggle = Math.abs(diff) >= boundingInfos[vertical ? 'height' : 'width'] / 2;
    const newCurrentIndex = currentIndex + (toggle ? (isRightDirection ? 1 : -1) : 0);
    setCurrentIndex(newCurrentIndex);
    if (vertical) {
      setTranslateY(`${newCurrentIndex * (isRightDirection ? -1 : 1) * 100}%`);
    } else {
      setTranslateX(`${newCurrentIndex * (isRightDirection ? -1 : 1) * 100}%`);
    }

    setTouchResult(currentTouchResult);
    onSwipeEnd?.(currentIndex);
  };
  return (
    <div css={styles} ref={ref} className={clsx(className)}>
      <ul>
        {items.map(v => {
          return (
            <li
              key={v.index + 'swipeitem'}
              onTouchStart={e => handleTouchStart(e)}
              onTouchMove={e => handleTouchMove(e)}
              onTouchEnd={e => handleTouchEnd(e)}
              onClick={e => onClick?.(v.index)}>
              {v.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Swiper;
