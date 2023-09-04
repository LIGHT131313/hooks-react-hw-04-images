import { Component } from 'react';
import { GlobalStyle } from './GlobalStyles';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { fetchQuery } from 'api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loadMore: false,
    loading: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value;

    if (!value.trim()) {
      toast.error('Please enter a non-empty search query');
    } else {
      this.setState({
        query: `${Date.now()}/${value}`,
        images: [],
        page: 1,
      });
    }
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(pState => ({
      page: pState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const newQuery = query.slice(14);
        const { hits, totalHits } = await fetchQuery(newQuery, page);

        if (!hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState(pState => ({
            images: [...pState.images, ...hits],
            loadMore: page < Math.ceil(totalHits / 12),
          }));
        }
      } catch (error) {
        toast.error('Something went wrong, please try again!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { images, loadMore, loading } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {loadMore && images.lengthgi && (
          <Button onClick={this.handleLoadMore} />
        )}
        <GlobalStyle />
        <Toaster position="top-right" />
      </Layout>
    );
  }
}
