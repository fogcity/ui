import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type RowAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
type RuleNames = 'row'
interface RowProps {
  vertical?: boolean
  alignItems?: RowAlign
  justifyContent?: RowJustify
  gap?: string
  wrap?: boolean
  fullHeight?: boolean
  cssOptions?: (theme: Theme) => React.CSSProperties
}

const useStyles = createUseStyles<RuleNames, RowProps, Theme>((theme) => ({
  row: ({ vertical, wrap, cssOptions, fullHeight, alignItems, gap }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: vertical ? 'column' : 'row',
    height: fullHeight ? '100%' : 'initial',
    gridGap: gap,

    ...(vertical ? {} : { alignItems, flexWrap: wrap ? 'wrap' : 'nowrap' }),
    ...cssOptions?.(theme),
  }),
}))

const Row = ({
  vertical = false,
  alignItems = 'center',
  wrap = false,
  justifyContent,
  fullHeight,
  gap,
  cssOptions,
  children,
  className,
  ...props
}: RowProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    fullHeight,
    alignItems,
    justifyContent,
    gap,
    wrap,
    vertical,
    cssOptions,
  })
  const computedClassNames = classnames(classes.row, className)
  return (
    <div className={computedClassNames} {...props}>
      {children}
    </div>
  )
}
export default Row
