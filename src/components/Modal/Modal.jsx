import PropTypes from 'prop-types';
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
    justifyContent: 'center',
    alignItems: 'center',
    inset: 0,
  },
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ModalWrap = ({ modalIsOpen, onClose, largeImageURL, tags }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={customStyles}>
      <div onClick={onClose}>
        <img src={largeImageURL} alt={tags} loading="lazy" />
      </div>
    </Modal>
  );
};

ModalWrap.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
