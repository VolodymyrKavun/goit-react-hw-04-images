import PropTypes from 'prop-types';

import {
  ImageGalleryItemSt,
  ImageGalleryItemImageSt,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, image, alt, onClick }) => {
  return (
    <ImageGalleryItemSt>
      <ImageGalleryItemImageSt
        id={id}
        src={image}
        alt={alt}
        onClick={onClick}
      />
    </ImageGalleryItemSt>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
