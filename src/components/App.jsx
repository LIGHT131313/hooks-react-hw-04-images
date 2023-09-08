import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyles';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchQuery } from 'api';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadmore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value;

    if (!value.trim()) {
      toast.error('Please enter a non-empty search query');
    } else {
      setQuery(`${Date.now()}/${value}`);
      setImages([]);
      setPage(1);
    }

    evt.target.reset();
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);
        const newQuery = query.slice(14);
        const { hits, totalHits } = await fetchQuery(newQuery, page);

        if (!hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setImages([...images, ...hits]);
          setLoadmore(page < Math.ceil(totalHits / 12));
        }
      } catch (error) {
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleLoadMore = () => setPage(page + 1);

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length > 0 && loadMore && <Button onClick={handleLoadMore} />}
      <GlobalStyle />
      <Toaster position="top-right" />
    </Layout>
  );
};
