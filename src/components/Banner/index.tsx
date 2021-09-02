import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type BannerProps = Partial<{
  closable: boolean
  className: string
  children: React.ReactNode
  cssOptions?: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'banner'

const useStyles = createUseStyles<RuleNames, BannerProps, Theme>((theme) => ({
  banner: ({ cssOptions }) => ({
    background: theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey) : '#F3F4F6',
    color: theme ? theme.color.primary : '#231F9C',
    padding: '.5em',
    ...cssOptions?.(theme),
  }),
}))
const Banner = ({ closable = false, cssOptions, className, children }: BannerProps) => {
  const classes = useStyles({ cssOptions })
  const computedClassNames = classnames(classes.banner, className)
  return <div className={computedClassNames}>children</div>
}
export default Banner
