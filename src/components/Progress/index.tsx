import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type ProgressProps = {
  percent?: number
  backgroundColor?: string
  color?: string
  backgroundCssOptions?: (theme: Theme) => React.CSSProperties
  barCssOptions?: (theme: Theme) => React.CSSProperties
}
type RuleNames = 'progress'
const useStyles = createUseStyles<RuleNames, ProgressProps, Theme>((theme) => ({
  progress: ({ backgroundColor, color, percent, backgroundCssOptions, barCssOptions }) => ({
    height: '100%',
    backgroundColor:
      backgroundColor || theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey) : '#F3F4F6',
    ...backgroundCssOptions?.(theme),
    '& > .progress-bar': {
      height: '100%',
      width: percent + '%',
      backgroundColor: color || theme?.color?.primary || '#231F9C',
      ...barCssOptions?.(theme),
    },
  }),
}))
const Progress = ({
  percent = 0,
  backgroundColor,
  color,
  className,
  backgroundCssOptions,
  barCssOptions,
  ...props
}: ProgressProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    backgroundColor,
    color,
    percent,
    backgroundCssOptions,
    barCssOptions,
  })
  const computedClassNames = classnames(classes.progress, className)
  return (
    <div aria-label="progress" role="progressbar" className={computedClassNames} {...props}>
      <div className="progress-bar" />
    </div>
  )
}

export default Progress
