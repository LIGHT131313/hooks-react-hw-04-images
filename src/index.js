import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { App } from 'components/App.jsx';

const theme = {
  colors: {
    beige: 'beige',
    white: '#fff',
    red: 'red',
    green: '#a3d0c3',
  },
  borRad: '0px 0px 4px 4px',
  boxSh: {
    one: '0px 1px 6px rgba(46, 47, 66, 0.08)',
    two: '0px 1px 1px rgba(46, 47, 66, 0.16)',
    three: '0px 2px 1px rgba(46, 47, 66, 0.08)',
  },
  spacing: value => `${value * 4}px`,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
