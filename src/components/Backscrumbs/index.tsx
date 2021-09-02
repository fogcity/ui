import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type BackscrumbsItem = Partial<{
  link: boolean
  title: string
  onClick: () => any
}>
type BackscrumbsProps = Partial<{
  divider: React.ReactNode
  items: BackscrumbsItem[]
  cssOptions: (theme: Theme) => React.CSSProperties
}>

const useStyles = createUseStyles<'backscrumbs', BackscrumbsProps, Theme>((theme) => ({
  backscrumbs: ({ cssOptions }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    '& > *': {
      display: 'inline-flex',
    },
    ...cssOptions?.(theme),
  }),
}))

const Backscrumbs = ({
  divider = '/',
  items = [],
  cssOptions,
  children,
  className,
  ...props
}: BackscrumbsProps & React.ComponentPropsWithoutRef<'nav'>) => {
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes.backscrumbs, className)

  return (
    <nav className={computedClassNames} {...props}>
      {items.map((v, i) => {
        return (
          <div key={v.title}>
            <div onClick={v?.onClick}>{v.title}</div>
            {i != items.length - 1 &&
              (typeof divider == 'string' ? (
                <div
                  style={{
                    margin: '0em .4em',
                  }}
                >
                  {divider}
                </div>
              ) : (
                divider
              ))}
          </div>
        )
      })}
    </nav>
  )
}

export default Backscrumbs
