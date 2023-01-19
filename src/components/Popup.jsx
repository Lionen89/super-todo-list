import { useEscClose, useClickClose } from './utils/UseClose';

function Popup({ title, isOpen, onClose, onSubmit, children }) {
  useEscClose(isOpen, onClose);

  useClickClose(isOpen, onClose, 'popup_opened');

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name="add-task-form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save-button">
            Save
          </button>
        </form>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}
export default Popup;
