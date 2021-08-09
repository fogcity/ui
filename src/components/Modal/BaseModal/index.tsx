import * as React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../../constants/theme'
import Overlay from '../../Overlay'

export interface ModalProps {
  className?: string
  // 是否显示
  visible?: boolean
  // 标题
  title?: React.ReactNode
  // 内容
  content?: React.ReactNode
  // 内容区域高度
  height?: number
  // 关闭回调
  onClose?: (e: React.BaseSyntheticEvent) => any
  // 确定回调
  onOk?: () => Promise<any> | void
  // 是否显示取消按钮
  okCancel?: boolean
  // 关闭按钮文字
  closeText?: React.ReactNode
  // 确定按钮文字
  okText?: React.ReactNode
  // icon
  icon?: React.ReactNode
  // Modal的z-index
  zIndex?: number
  // 点击蒙层是否允许关闭
  maskClosable?: boolean
  // Modal类型
  type?: 'confirm' | 'info' | 'success' | 'warn' | 'error'
  // 底部内容
  footer?: React.ReactNode
  // children
  children?: React.ReactNode
}

const prefixCls = 'modal'

const useStyles = createUseStyles<typeof prefixCls | '@keyframes spin', ModalProps, Theme>((theme) => ({
  '@keyframes spin': {
    '0%': 'transform: rotate(0deg)',
    '100%': 'transform: rotate(360deg)',
  },
  modal: ({ height, zIndex }) => ({
    [`& .${prefixCls}-document`]: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: zIndex || theme.zIndex?.overlay,
      '& > div': {
        width: 260,
        borderRadius: 6,
        backgroundColor: theme.color?.white,
        overflow: 'hidden',
      },
    },
    [`& .${prefixCls}-header`]: {
      padding: 15,
      textAlign: 'center',
      [`& .${prefixCls}-title`]: {
        fontSize: 16,
      },
    },
    [`& .${prefixCls}-body`]: {
      margin: '0 15px 15px 15px',
      height: height ? height : 'auto',
      overflow: 'auto',
    },
    [`& .${prefixCls}-footer`]: {
      [`& .${prefixCls}-button-group`]: {
        display: 'flex',
        borderTop: `1px solid #ddd`,
        '& > a': {
          display: 'flex',
          flex: 1,
          height: 50,
          lineHeight: '50px',
          fontSize: 16,
          outline: 'none',
          textDecoration: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.color?.primary,
        },
        '& > a:first-child': {
          color: theme.color?.black,
        },
        '& > a:last-child': {
          borderLeft: `1px solid #ddd`,
        },
        '& > a:active': {
          backgroundColor: theme.color?.greyLight,
        },
      },
    },
    [`& .${prefixCls}-button-loading`]: {
      border: `2px solid ${theme.color?.grey}`,
      borderTop: `2px solid ${theme.color?.primary}`,
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      marginRight: 5,
      animation: '$spin 1s linear infinite',
    },
  }),
}))

const Modal = (props: ModalProps) => {
  const { title, content, icon, maskClosable, onOk, onClose, footer, className, children } = props
  let { okCancel, closeText, okText } = props
  const classes = useStyles({ ...props })
  const computedClassNames = classnames(classes.modal, className)
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const containerRef = React.useRef<HTMLElement>(document.body)
  const initRef = React.useRef<HTMLDivElement>(null)
  okCancel = 'okCancel' in props ? props.okCancel : true
  closeText = closeText || '取消'
  okText = okText || '确定'

  const onConfirm = () => {
    if (loading) {
      return
    }
    const ok = onOk && onOk()
    if (ok) {
      setLoading(true)
      ok.then((res) => {
        if (res) {
          setLoading(false)
        }
      }).catch(() => {
        setLoading(false)
      })
    } else {
      setVisible(false)
    }
  }

  const onCloseClick = (e: React.BaseSyntheticEvent) => {
    if (e.target === e.currentTarget) {
      setVisible(false)
      onClose && onClose(e)
    }
  }

  const cancelButton = okCancel && <a onClick={onCloseClick}>{closeText}</a>

  React.useEffect(() => {
    setVisible(props.visible || false)
  }, [props.visible])

  React.useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      if (visible) {
        initRef.current?.parentNode?.removeChild(initRef.current)
      }
    }
  }, [visible])

  return visible
    ? ReactDOM.createPortal(
        <div className={computedClassNames} ref={initRef}>
          <Overlay show={visible} />
          <div className={`${prefixCls}-document`} onClick={maskClosable ? onCloseClick : undefined}>
            <div>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-title`}>{title}</div>
              </div>
              <div className={`${prefixCls}-body`}>
                {icon}
                {children}
                {content}
              </div>
              <div className={`${prefixCls}-footer`}>
                {!footer ? (
                  <div className={`${prefixCls}-button-group`}>
                    {cancelButton}
                    <a onClick={onConfirm}>
                      {loading ? <div className={`${prefixCls}-button-loading`} /> : null}
                      {okText}
                    </a>
                  </div>
                ) : (
                  footer
                )}
              </div>
            </div>
          </div>
        </div>,
        containerRef.current,
      )
    : null
}

export default Modal
