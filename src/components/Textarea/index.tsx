import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type TextareaProps = {
  cssOptions?: (theme: Theme) => React.CSSProperties
}
type RuleNames = 'textarea'

const useStyles = createUseStyles<RuleNames, TextareaProps, Theme>((theme) => ({
  textarea: ({ cssOptions }) => ({
    width: '100%',
    padding: '12px',
    backgroundColor: theme ? (theme.mode == 'light' ? theme.color.greyLight : theme.color.white) : 'transparent',
    color: theme ? (theme.mode == 'light' ? theme.color.black : theme.color.white) : '#111827',
    ...cssOptions?.(theme),
  }),
}))

/**
 * Textarea:
 * if has prefix or suffix, the property flex is required.
 */
const Textarea = ({ cssOptions, className, ...props }: TextareaProps & React.ComponentPropsWithoutRef<'textarea'>) => {
  const classes = useStyles({ cssOptions })
  const computedClassNames = classnames(classes.textarea, className)
  return <textarea className={computedClassNames} {...props} />
}

export default Textarea
