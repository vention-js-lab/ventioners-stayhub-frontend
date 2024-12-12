import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { appTheme } from '#/styles/theme';
import '#/styles/root.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryClientConfig } from './configs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '#/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazyRoute } from './utils/router.util';
import Box from '@mui/material/Box';
import { contentWrapperStyles } from './styles';

const { Footer } = lazyRoute(() => import('./shared/components/footer'), 'Footer');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient(QueryClientConfig);

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <ToastContainer />
            <Box sx={contentWrapperStyles.main}>
              <Box sx={contentWrapperStyles.content}>
                <RouterProvider router={router} />
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
