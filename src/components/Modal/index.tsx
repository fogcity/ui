import BaseModal from './BaseModal'
import confirm, { ModalFuncProps, withConfirm, withInfo, withSuccess, withWarn, withError } from './Confirm'
export { ModalProps } from './BaseModal'

const Modal = BaseModal as any

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props))
}

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props))
}

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props))
}

Modal.warn = function warnFn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props))
}

export default Modal
