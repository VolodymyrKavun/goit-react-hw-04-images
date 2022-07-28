import { useState, useEffect, createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { AppSt } from './App.styled';
import Button from 'components/Button';
import Modal from 'components/Modal';
import * as ImageService from 'service/image-service';
import Loader from 'components/Loader';
import { showWarning } from '../../utils/toastMessage';
import ErrorImage from 'components/ErrorImage';

export const CounterContext = createContext();

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    // Отримання фото через "Фетч"
    const getPhotos = async (query, page) => {
      if (!query) return;
      setIsLoading(true);
      try {
        const { hits, total, totalHits } = await ImageService.getImages(
          query,
          page
        );

        if (hits.length === 0) {
          setIsEmpty(true);
          showWarning('Sorry. there are no images ... 😅');
          return;
        }
        setImages(state => [...state, ...hits]);
        setIsVisible(page < Math.ceil(total / totalHits));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(query, page);
  }, [page, query]);

  // Закривання та відкривання модалки
  const closeModal = () => {
    setLargeImageURL('');
  };

  // Отримання фото на модалку
  const getBigPhoto = e => {
    const id = e.target.id;
    const result = images.find(el => el.id === +id);
    setLargeImageURL(result.largeImageURL);
  };

  // Скидання до початкового стану при "Сабміті"
  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
  };

  // Логіка кнопки "Завантажити ще"
  const onLoadMore = () => {
    setIsVisible(false);
    setPage(state => state + 1);
  };

  return (
    <AppSt>
      <CounterContext.Provider
        value={{ onSubmit, onLoadMore, closeModal, largeImageURL }}
      >
        <Searchbar />
        {error && `❌Something went wrong - ${error}`}
        {isEmpty && <ErrorImage />}
        <ImageGallery props={images} onClick={getBigPhoto}></ImageGallery>
        {largeImageURL && <Modal></Modal>}
        {isLoading && <Loader />}
        {isVisible && <Button onLoad={isLoading} />}
        <ToastContainer />
      </CounterContext.Provider>
    </AppSt>
  );
};

export default App;

// todo Old Class

// class App extends Component {
//   state = {
//     images: [],
//     showModal: false,
//     query: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     isEmpty: false,
//     isVisible: false,
//     largeImageURL: '',
//   };

//   // Життєвий цикл для оновлення з перевіркою
//   componentDidUpdate = (_, prevState) => {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getPhotos(query, page);
//     }
//   };

//   // Отримання фото через "Фетч"
//   getPhotos = async (query, page) => {
//     if (!query) return;
//     this.setState({ isLoading: true });
//     try {
//       const { hits, total, totalHits } = await ImageService.getImages(
//         query,
//         page
//       );

//       if (hits.length === 0) {
//         this.setState({ isEmpty: true });
//         showWarning('Sorry. there are no images ... 😅');
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         isVisible: page < Math.ceil(total / totalHits),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   // Отримання фото на модалку
//   getBigPhoto = e => {
//     const { images } = this.state;
//     const id = e.target.id;
//     const result = images.find(el => el.id === +id);
//     this.setState({ largeImageURL: result.largeImageURL });
//     this.toggleModal();
//   };

//   // Закривання та відкривання модалки
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   // Скидання до початкового стану при "Сабміті"
//   onSubmit = query => {
//     this.setState({
//       query,
//       images: [],
//       page: 1,
//       isVisible: false,
//       isEmpty: false,
//     });
//   };

//   // Логіка кнопки "Завантажити ще"
//   onLoadMore = () => {
//     this.setState(prevState => ({
//       isVisible: false,
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const {
//       isEmpty,
//       images,
//       isVisible,
//       showModal,
//       error,
//       isLoading,
//       largeImageURL,
//     } = this.state;

//     return (
//       <AppSt>
//         <Searchbar onSubmit={this.onSubmit} />
//         {error && `❌Something went wrong - ${error}`}
//         {isEmpty && <ErrorImage />}

//         <ImageGallery props={images} onClick={this.getBigPhoto}></ImageGallery>

//         {largeImageURL && showModal && (
//           <Modal onClose={this.toggleModal}>{largeImageURL}</Modal>
//         )}
//         {isLoading && <Loader />}
//         {isVisible && <Button onClick={this.onLoadMore} onLoad={isLoading} />}
//         <ToastContainer />
//       </AppSt>
//     );
//   }
// }

// export default App;
