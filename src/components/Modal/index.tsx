import * as React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import Overlay from '../Overlay'

interface ModalProps {
  /** 是否显示 */
  visible: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 关闭回调 */
  onClose?: (e: React.SyntheticEvent) => any
  /** 底部内容 */
  footer?: React.ReactNode
}

const prefixCls = 'modal'

const useStyles = createUseStyles<typeof prefixCls, ModalProps, Theme>((theme) => ({
  modal: () => ({
    '& .modal-document': {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.overlay,
      '& > div': {
        width: '260px',
        backgroundColor: theme.color.white,
      },
    },
  }),
}))

const Modal = (props: ModalProps & React.ComponentProps<'div'>) => {
  const { visible, title, className, children } = props
  const classes = useStyles({ visible })
  const computedClassNames = classnames(classes.modal, className)
  const containerRef = React.useRef<HTMLElement>(document.body)

  return visible
    ? ReactDOM.createPortal(
        <div className={computedClassNames}>
          <Overlay show={visible} />
          <div className={`${prefixCls}-document`}>
            <div>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-title`}>{title}</div>
              </div>
              <div className={`${prefixCls}-content`}>{children}</div>
              <div className={`${prefixCls}-footer`}></div>
            </div>
          </div>
        </div>,
        containerRef.current,
      )
    : null
}

export default Modal
