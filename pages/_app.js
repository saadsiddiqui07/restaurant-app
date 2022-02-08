import "../styles/globals.css";
import { StateProvider } from "../context-api/StateProvider";
import reducer, { initialState } from "../context-api/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
