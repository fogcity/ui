import * as React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'
type UploadProps = Partial<{
  onFileChange?: (file: Blob, preview: string, e: React.ChangeEvent<HTMLInputElement>) => any
  cssOptions?: React.CSSProperties
}>

type RuleNames = 'upload'

const useStyles = createUseStyles<RuleNames, UploadProps, Theme>((theme) => ({
  upload: ({ cssOptions, ...props }) => ({
    ...props,
    cursor: ' pointer',
    ...cssOptions,
    '& > input': {
      display: 'none',
    },
  }),
}))

const Upload = ({
  onFileChange,
  children,
  cssOptions,
  className,
  ...props
}: UploadProps & React.ComponentProps<any>) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0]
    onFileChange?.(file, URL.createObjectURL(file), e)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes.upload, className)
  return (
    <label className={computedClassNames} {...props}>
      <input type="file" onChange={handleFileChange} />
      {children || 'Upload'}
    </label>
  )
}

export default Upload
