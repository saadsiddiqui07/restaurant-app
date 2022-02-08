import "../styles/globals.css";
import Head from "next/head";
import { StateProvider } from "../context-api/StateProvider";
import reducer, { initialState } from "../context-api/reducer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StateProvider initialState={initialState} reducer={reducer}>
          <Component {...pageProps} />
        </StateProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
