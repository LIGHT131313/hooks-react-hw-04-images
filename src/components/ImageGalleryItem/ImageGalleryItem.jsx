import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalWrap } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
    setIsOpen: false,
  };

  openModal = () => {
    this.setState({ setIsOpen: true, modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ setIsOpen: false, modalIsOpen: false });
  };

  render() {
    const { webformatURL, tags, webformatWidth, largeImageURL } =
      this.props.image;
    const { modalIsOpen } = this.state;

    return (
      <div>
        <GalleryItem onClick={this.openModal}>
          <GalleryItemImage
            src={webformatURL}
            alt={tags}
            width={webformatWidth}
            loading="lazy"
          />
        </GalleryItem>
        <ModalWrap
          modalIsOpen={modalIsOpen}
          onClose={this.closeModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatWidth: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
