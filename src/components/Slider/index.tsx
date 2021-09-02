import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import { debounce } from '../../utils'
type SliderProps = Partial<{
  disable: boolean
  defaultValue: number
  step: number
  onSlide: (value: number) => any
  onSlideEnd: () => any
  onSlideStart: () => any
  max: number
  min: number
  backgroundColor: string
  color: string
  backgroundCssOptions: (theme: Theme) => React.CSSProperties
  barCssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'slider'
const useStyles = createUseStyles<RuleNames, SliderProps & { percent: number }, Theme>((theme) => ({
  slider: ({ backgroundColor, percent, color, backgroundCssOptions, barCssOptions }) => ({
    height: '1em',
    position: 'relative',
    borderRadius: '10px',
    backgroundColor:
      backgroundColor || theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey) : '#F3F4F6',
    ...backgroundCssOptions?.(theme),
    '& > .slider-bar': {
      position: 'absolute',
      height: '1em',
      width: percent + '%',
      borderRadius: '10px',
      backgroundColor: color || theme ? theme.color.primary : '#231F9C',

      willChange: 'width',
      ...barCssOptions?.(theme),
    },
    '& > .slider-circle': {
      height: '2em',
      width: '2em',
      position: 'absolute',
      borderRadius: '50%',
      left: percent + '%',
      top: 0,
      backgroundColor: color || theme?.color?.white || '#fff',
      transform: 'translate3d(-50%,-25%,0)',
      cursor: 'pointer',
      border: `1px solid ${theme ? theme.color.primary : '#231F9C'}`,

      willChange: 'left',
      ...barCssOptions?.(theme),
    },
  }),
}))

const Slider = ({
  defaultValue = 0.3,
  min = 0,
  max = 1,
  step = 0.01,
  onSlide,
  onSlideEnd,
  onSlideStart,
  backgroundColor,
  color,
  className,
  backgroundCssOptions,
  barCssOptions,
  ...props
}: SliderProps & React.ComponentPropsWithoutRef<'div'>) => {
  const ref = React.useRef(null)
  const [direction, setDirection] = React.useState('left')
  const [startX, setStartX] = React.useState(0)
  const [currentValue, setCurrentValue] = React.useState(defaultValue)
  const [displacement, setDisplacement] = React.useState(0)
  const [percent, setPercent] = React.useState((defaultValue / max) * 100)
  const classes = useStyles({
    backgroundColor,
    percent,
    color,
    backgroundCssOptions,
    barCssOptions,
  })
  const handleSlideStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].pageX)
    onSlideStart?.()
  }
  const handleSlideStartByDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setStartX(e.pageX)
    onSlideStart?.()
  }
  const handleSlide = (e: React.TouchEvent<HTMLDivElement>) => {
    debounce(() => {
      const dis = parseFloat((e.touches[0].clientX - startX).toFixed(2))
      setStartX(e.touches[0].clientX)
      const xfragment = parseFloat((dis / (ref.current as any)?.clientWidth).toFixed(2))
      if (dis >= 0) {
        const fragment = parseFloat((step / max).toFixed(2))
        if (xfragment >= fragment) {
          setPercent(Math.min(100, parseFloat(((currentValue + step * (xfragment / fragment)) / max).toFixed(2)) * 100))
          const cv = parseFloat((currentValue + step).toFixed(2))
          setCurrentValue(cv)
          onSlide?.(cv)
        }
      } else {
        const fragment = -parseFloat((step / max).toFixed(2))
        if (xfragment <= fragment) {
          setPercent(Math.max(0, parseFloat(((currentValue - step * (xfragment / fragment)) / max).toFixed(2)) * 100))
          const cv = parseFloat((currentValue - step).toFixed(2))
          setCurrentValue(cv)
          onSlide?.(cv)
        }
      }
    }, step)
  }
  const handleSlideByDrag = (e: React.DragEvent<HTMLDivElement>) => {
    debounce(() => {
      const dis = parseFloat((e.clientX - startX).toFixed(2))
      setStartX(e.clientX)
      const xfragment = parseFloat((dis / (ref.current as any)?.clientWidth).toFixed(2))
      if (dis >= 0) {
        const fragment = parseFloat((step / max).toFixed(2))
        if (xfragment >= fragment) {
          setPercent(Math.min(100, parseFloat(((currentValue + step * (xfragment / fragment)) / max).toFixed(2)) * 100))
          const cv = parseFloat((currentValue + step).toFixed(2))
          setCurrentValue(cv)
          onSlide?.(cv)
        }
      } else {
        const fragment = -parseFloat((step / max).toFixed(2))
        if (xfragment <= fragment) {
          setPercent(Math.max(0, parseFloat(((currentValue - step * (xfragment / fragment)) / max).toFixed(2)) * 100))
          const cv = parseFloat((currentValue - step).toFixed(2))
          setCurrentValue(cv)
          onSlide?.(cv)
        }
      }
    }, step)
  }
  const handleSlideEnd = () => {
    onSlideEnd?.()
  }
  const computedClassNames = classnames(classes.slider, className)

  return (
    <div ref={ref} aria-label="slider" role="sliderbar" className={computedClassNames} {...props}>
      <div className="slider-bar" />
      <div
        className="slider-circle"
        onTouchStart={handleSlideStart}
        onTouchMove={handleSlide}
        onTouchEnd={handleSlideEnd}
        onDragStart={handleSlideStartByDrag}
        onDragOver={handleSlideByDrag}
        onDragEnd={handleSlideEnd}
      />
    </div>
  )
}

export default Slider
