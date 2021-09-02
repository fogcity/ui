import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type SkeletonProps = {
  duration?: number
  delay?: number
  circle?: boolean
  width?: string
  height?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}
type RuleNames = 'skeleton' | '@keyframes loading'
const useStyles = createUseStyles<RuleNames, SkeletonProps, Theme>((theme) => ({
  skeleton: ({ cssOptions, circle, height, width, delay, duration }) => ({
    width: width,
    height: height,
    borderRadius: circle ? '50%' : '4px',
    background:
      'linear-gradient(90deg,rgba(255, 255, 255, 0) 40%,rgba(255, 255, 255, .5) 50%,rgba(255, 255, 255, 0) 60%) ' +
      theme
        ? theme.mode == 'light'
          ? theme.color.greyLight
          : theme.color.grey
        : '#F3F4F6',
    backgroundSize: '200% 100%',
    backgroundPositionX: '180%',
    animation: `${duration}s $loading  ${delay}s ease-in-out infinite`,
    ...cssOptions,
  }),

  '@keyframes loading': {
    to: {
      backgroundPositionX: '-20%',
    },
  },
}))
const Skeleton = ({
  duration = 1,
  delay = 0,
  circle = false,
  cssOptions,
  width,
  height = '100%',
  className,
  ...props
}: SkeletonProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    duration,
    delay,
    height,
    circle,
    width,
    cssOptions,
  })
  const computedClassNames = classnames(classes.skeleton, className)
  return <div aria-label="skeleton" className={computedClassNames} {...props} />
}

export default Skeleton
