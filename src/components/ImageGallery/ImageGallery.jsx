import PropTypes from 'prop-types';

import { ImageGallerySt } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ props, onClick }) => {
  return (
    <>
      <ImageGallerySt>
        {props.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              alt={tags}
              onClick={onClick}
              id={id}
            ></ImageGalleryItem>
          );
        })}
      </ImageGallerySt>
    </>
  );
};

ImageGallery.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
