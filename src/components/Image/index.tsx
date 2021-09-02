import * as React from 'react'
import classnames from 'classnames'
import * as CSS from 'csstype'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
type RuleNames = 'image'

type ImageProps = {
  center?: boolean
  circle?: boolean
  caption?: string
  fit?: CSS.Property.ObjectFit
  width?: string
  height?: string
  cssOptions?: (theme: Theme) => React.CSSProperties
}
const useStyles = createUseStyles<RuleNames, ImageProps, Theme>((theme) => ({
  image: ({ cssOptions, center, fit, circle }) => ({
    borderRadius: (circle as boolean) && '50%',
    '& > img': {
      objectFit: fit,
      width: '100%',
      height: '100%',
      ...cssOptions?.(theme),
    },
    '& > figcaption': {
      textAlign: 'center',
    },
  }),
}))
const Image = ({
  circle = false,
  src,
  alt,
  center,
  caption,
  fit,
  width = '100%',
  height = 'auto',
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'img'> & ImageProps) => {
  const classes = useStyles({ circle, center, cssOptions, width, height })
  const computedClassNames = classnames(classes.image, className)
  return (
    <figure className={computedClassNames}>
      <img src={src} alt={alt} {...props} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default Image
