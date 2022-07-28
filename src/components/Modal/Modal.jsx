import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { CounterContext } from 'components/App/App';
import { ModalSt, ModalOverlaySt, BigPhoto } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = () => {
  // Пропси
  const { closeModal, largeImageURL } = useContext(CounterContext);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Закривання модального вікна по "Ескейпу"
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  // Закривання модального вікна по кліку на "Бекдроп"
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <ModalOverlaySt onClick={handleBackdropClick}>
      <ModalSt>
        <BigPhoto src={largeImageURL} alt="Photo" />
      </ModalSt>
    </ModalOverlaySt>,
    modalRoot
  );
};

export default Modal;

// const modalRoot = document.querySelector('#modal-root');

// class Modal extends Component {
//   // Ставлю слухач на цикл
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   //  Знімаю слухач з цикла
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   // Закривання модального вікна по "Ескейпу"
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   // Закривання модальноо вікна по кліку на "Бекдроп"
//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <ModalOverlaySt onClick={this.handleBackdropClick}>
//         <ModalSt>
//           <BigPhoto src={this.props.children} alt="qwwqwe" />
//         </ModalSt>
//       </ModalOverlaySt>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   children: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
//   onClose: PropTypes.func,
// };

// export default Modal;
