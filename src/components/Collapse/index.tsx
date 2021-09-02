import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

export type CollapseProps = {
  title?: string
  expand?: boolean
  onClickExpand?: () => void
}

type RuleNames = 'collapse' | 'title' | 'icon' | 'arrow'

const useStyles = createUseStyles<RuleNames, CollapseProps, Theme>((theme) => ({
  collapse: {
    padding: '1em 0',
    '& > .flex': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  title: {
    flex: '8',
  },
  icon: {
    flex: '1',
  },
  arrow: ({ expand }) => ({
    marginLeft: 'auto',
    width: '0.6em',
    height: '0.6em',
    borderTop: `1px solid ${theme.color.black || '#111827'}`,
    borderRight: `1px solid ${theme.color.black || '#111827'}`,
    transform: `rotate(${expand ? '-45deg' : '135deg'})`,
    transition: 'transform 0.1s ease-in',
  }),
}))
const Collapse = ({
  title,
  expand = false,
  children,
  className,
  ...props
}: CollapseProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    expand,
  })
  const handleClickExpand = () => {
    props?.onClickExpand?.()
  }
  const computedClassNames = classnames(classes.collapse, className)
  const cnsIcon = classnames(classes.icon, className)
  const cnsArrow = classnames(classes.arrow)
  return (
    <div className={computedClassNames}>
      <div className="flex">
        <div className="title">{title}</div>
        <div className={cnsIcon}>
          <div className={cnsArrow} onClick={handleClickExpand} />
        </div>
      </div>
      {expand && children}
    </div>
  )
}

export default Collapse
