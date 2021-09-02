import * as React from 'react'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type CardProps = Partial<{
  title: string
  extra: React.ReactNode
  cssOptions: (theme: Theme) => React.CSSProperties
}>

const useCardStyles = createUseStyles<'card', CardProps, Theme>((theme) => ({
  card: ({ cssOptions }) => ({
    background: theme ? (theme.mode == 'light' ? theme.color.white : theme.color.black) : '#fff',
    '& > header': {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        marginLeft: 'auto',
      },
      '& > div:first-child': {
        marginLeft: '',
      },
    },
    ...cssOptions?.(theme),
  }),
}))

const useCardHeaderStyles = createUseStyles<'card-header', CardProps, Theme>((theme) => ({
  'card-header': ({ cssOptions }) => ({
    ...cssOptions?.(theme),
  }),
}))
const Card = ({
  title,
  extra,
  cssOptions,
  className,
  children,
  ...props
}: CardProps & React.ComponentPropsWithoutRef<'article'>) => {
  const classes = useCardStyles({ cssOptions })
  const computedClassNames = classnames(classes.card, className)
  const handleHeaderRender = () => {
    return React.Children.map(children, (child: any, i) => {
      const element = child as React.DetailedReactHTMLElement<any, HTMLElement>
      if (title || extra) {
        if (child.type.name == 'CardHeader') {
          return React.cloneElement(element, {
            ...element.props,
          })
        } else {
          return (
            <header>
              <div>{title}</div>
              <div>{extra}</div>
            </header>
          )
        }
      }
      return null
    })
  }
  return (
    <article className={computedClassNames} {...props}>
      {handleHeaderRender()}
      {children}
    </article>
  )
}

const CardHeader = ({
  title,
  extra,
  cssOptions,
  className,
  children,
  ...props
}: CardProps & React.ComponentPropsWithoutRef<'article'>) => {
  const classes = useCardHeaderStyles({ cssOptions })
  const computedClassNames = classnames(classes['card-header'], className)

  return (
    <header className={computedClassNames} {...props}>
      {children}
    </header>
  )
}

Card.Header = CardHeader
export default Card
