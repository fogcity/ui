import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { Theme } from '../../constants/theme'

type UploadProps = Partial<{
  onFileChange: (file: Blob, preview: string, e: React.ChangeEvent<HTMLInputElement>) => any
  cssOptions: (theme: Theme) => React.CSSProperties
}>

type RuleNames = 'upload'

const useStyles = createUseStyles<RuleNames, Omit<UploadProps, 'onFileChange'>, Theme>((theme) => ({
  upload: ({ cssOptions, ...props }) => ({
    ...props,
    cursor: ' pointer',
    ...cssOptions?.(theme),
  }),
}))

const Upload = ({
  onFileChange,
  children,
  cssOptions,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & UploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0]
    onFileChange?.(file, URL.createObjectURL(file), e)
  }
  const classes = useStyles({
    cssOptions,
  })
  const computedClassNames = classnames(classes.upload, className)
  return (
    <label aria-label="file upload input" className={computedClassNames} {...props}>
      <input hidden type="file" onChange={handleFileChange} />
      {children || 'Upload'}
    </label>
  )
}

export default Upload
