import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Verdana, Open Sans, sans serif',
        colorScheme: 'dark',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
    }}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
}

export default appWithTranslation(App)