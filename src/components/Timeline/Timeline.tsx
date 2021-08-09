import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
export type TimelineItem = {
  title?: string
  content?: string
  direction: 'left' | 'right'
}
export type TimelineProps = {
  data: TimelineItem[]
  lineColor?: string
  lineWidth?: number
}

type RuleNames = 'timeline' | 'container' | 'left' | 'right' | 'content' | '@media screen and (max-width: 600px)'

const useStyles = createUseStyles<RuleNames, Omit<TimelineProps, 'data'>, Theme>((theme) => ({
  timeline: {
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
    '&:after': ({ lineColor, lineWidth }) => ({
      content: '""',
      position: 'absolute',
      width: `${lineWidth}px`,
      backgroundColor: lineColor || theme?.color.white || 'white',
      top: '0',
      bottom: '0',
      left: '50%',
      marginLeft: -(lineWidth as number) / 3,
    }),
  },

  container: {
    padding: '10px 40px',
    position: 'relative',
    backgroundColor: 'inherit',
    width: '50%',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      right: -17,
      backgroundColor: 'white',
      border: '4px solid #ff9f55',
      top: 15,
      borderRadius: '50%',
      zIndex: '1',
    },
  },

  left: {
    left: '0',
    '&:before': {
      content: '" "',
      height: '0',
      position: 'absolute',
      top: 22,
      width: '0',
      zIndex: '1',
      right: 30,
      border: 'medium solid white',
      borderWidth: '10px 0 10px 10px',
      borderColor: 'transparent transparent transparent white',
    },
  },
  right: {
    left: '50%',
    '&:before': {
      content: '" "',
      height: '0',
      position: 'absolute',
      top: 22,
      width: '0',
      zIndex: '1',
      left: 30,
      border: 'medium solid white',
      borderWidth: '10px 10px 10px 0',
      borderColor: 'transparent white transparent transparent',
    },
    '&:after': {
      left: -16,
    },
  },

  content: {
    padding: '20px 30px',
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 6,
  },
  '@media screen and (max-width: 600px)': {
    'timeline::after': {
      left: 31,
    },
    container: {
      width: '100%',
      paddingLeft: 70,
      paddingRight: 25,
      '&:before': {
        left: 60,
        border: 'medium solid white',
        borderWidth: '10px 10px 10px 0',
        borderColor: 'transparent white transparent transparent',
      },
    },

    'left :after,  right :after': {
      left: 15,
    },
    right: {
      left: '0%',
    },
  },
}))
const Timeline = ({
  lineWidth = 6,
  lineColor,
  data = [],
  className,
}: TimelineProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({ lineWidth, lineColor })
  const computedClassNames = classnames(classes.timeline, className)

  const cnsChildContent = classnames(classes.content)

  const getTimelineItemClassNames = (item: TimelineItem) => {
    return classnames(classes.container, item.direction == 'left' ? classes.left : classes.right)
  }
  return (
    <div className={computedClassNames}>
      {data &&
        data.map((v, i) => (
          <div key={i} className={getTimelineItemClassNames(v)}>
            <div className={cnsChildContent}>
              <h2>{v.title}</h2>
              <p>{v.content}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Timeline
