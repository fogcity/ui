import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type RuleNames = 'grid'

type GridAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
type GridJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'

interface GridProps {
  row?: number
  col?: number
  rowGap?: string
  colGap?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}

const useStyles = createUseStyles<RuleNames, GridProps, Theme>((theme) => ({
  grid: ({ row, col, rowGap, colGap, cssOptions, ...props }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridAutoRows: '1fr',
    gridColumnGap: colGap,
    gridRowGap: rowGap,
    ...props,
    ...cssOptions?.(theme),
  }),
}))

const Grid = ({
  row,
  col,
  rowGap,
  colGap,
  cssOptions,
  children,
  className,
  ...restProps
}: GridProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    row,
    col,
    rowGap,
    colGap,
    cssOptions,
  })
  const computedClassNames = classnames(classes.grid, className)
  const childClasses = classnames('')
  return (
    <div className={computedClassNames} {...restProps}>
      {children}
    </div>
  )
}
export default Grid
