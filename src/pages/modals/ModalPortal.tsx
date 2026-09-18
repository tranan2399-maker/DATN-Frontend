import ReactDOM from 'react-dom'

function ModalPortal({ children }: { children: React.ReactNode}) {
  return ReactDOM.createPortal(
    <div id="modal-wrapper">{children}</div>,
    document.querySelector('.modal')!
  )
}

export default ModalPortal
