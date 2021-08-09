import BaseModal, { ModalProps } from './BaseModal'
import confirm, { withConfirm, withInfo, withSuccess, withWarn, withError } from './Confirm'
export { ModalProps } from './BaseModal'

type ModalFunc = (props: ModalProps) => void

type ModalStaticFunctions = Record<NonNullable<ModalProps['type']>, ModalFunc>

type ModalType = typeof BaseModal & ModalStaticFunctions

const Modal = BaseModal as ModalType

Modal.confirm = function confirmFn(props: ModalProps) {
  return confirm(withConfirm(props))
}

Modal.info = function infoFn(props: ModalProps) {
  return confirm(withInfo(props))
}

Modal.success = function successFn(props: ModalProps) {
  return confirm(withSuccess(props))
}

Modal.warn = function warnFn(props: ModalProps) {
  return confirm(withWarn(props))
}

Modal.error = function errorFn(props: ModalProps) {
  return confirm(withError(props))
}

export default Modal
