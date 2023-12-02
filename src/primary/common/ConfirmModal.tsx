import IconButton from '@/primary/common/buttons/IconButton.tsx';
import styled from '@emotion/styled';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-opacity);
  .modal-container {
    text-align: center;
    max-width: 30rem;
    .modal-content {
      background: var(--color-light);
      padding: 2rem;
      border-radius: 0.5rem;
    }
    .modal-title {
      font-size: 3rem;
      margin-top: 0;
      text-align: center;
      margin-bottom: 1.5rem;
      color: var(--color-alert);
    }
    .modal-message {
      font-size: 1.6rem;
    }
    .modal-sub-message {
      font-size: 1.6rem;
      margin-top: 1.5rem;
      margin-bottom: 3rem;
      font-weight: bold;
      color: var(--color-alert);
    }
    .modal-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
    }
  }
`
const ConfirmModal = ({onConfirm, onCancel, message, subMessage}: { onConfirm: () => void, onCancel: () => void, message: string, subMessage?: string }) => {
  return (
    <Modal>
      <div className="modal-container">
        <h4 className="modal-title">Warning</h4>
        <div className="modal-content">
          <div className="modal-message">{message}</div>
          {subMessage && <div className="modal-sub-message">&#9888;&#65039; {subMessage} &#9888;&#65039;</div>}
          <div className="modal-actions">
            <IconButton icon="close" onPress={onCancel} shadowColor='alert-dark' color='alert-dark' backgroundColor='alert'/>
            <IconButton icon="check" onPress={onConfirm} shadowColor='valid-dark' color='valid-dark' backgroundColor='valid'/>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal