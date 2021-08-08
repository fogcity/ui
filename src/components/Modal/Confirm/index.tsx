import * as React from 'react'

export interface ModalFuncProps {
  className?: string
  visible?: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  width?: string | number
  onOk?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  icon?: React.ReactNode
  okCancel?: boolean
  zIndex?: number
  type?: 'confirm' | 'info' | 'success' | 'warn' | 'error'
}

export default function confirm(config: ModalFuncProps) {
  return <div>hello</div>
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '',
    okCancel: true,
    ...props,
    type: 'confirm',
  }
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'info',
  }
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'success',
  }
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'warn',
  }
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'error',
  }
}
