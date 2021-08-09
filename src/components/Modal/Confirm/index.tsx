import * as ReactDOM from 'react-dom'
import BaseModal, { ModalProps } from '../BaseModal'

export default function confirm(config: ModalProps) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  config = {
    ...config,
    visible: true,
  }
  ReactDOM.render(<BaseModal {...config} />, div)
}

export function withConfirm(props: ModalProps): ModalProps {
  return {
    icon: '',
    okCancel: true,
    ...props,
    type: 'confirm',
  }
}

export function withInfo(props: ModalProps): ModalProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'info',
  }
}

export function withSuccess(props: ModalProps): ModalProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'success',
  }
}

export function withWarn(props: ModalProps): ModalProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'warn',
  }
}

export function withError(props: ModalProps): ModalProps {
  return {
    icon: '',
    okCancel: false,
    ...props,
    type: 'error',
  }
}
