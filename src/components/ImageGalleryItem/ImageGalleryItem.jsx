import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalWrap } from '../Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, tags, webformatWidth, largeImageURL } = image;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <GalleryItem onClick={openModal}>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          width={webformatWidth}
          loading="lazy"
        />
      </GalleryItem>
      <ModalWrap
        modalIsOpen={modalIsOpen}
        onClose={closeModal}
        largeImageURL={largeImageURL}
        tags={tags}
      />
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatWidth: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
