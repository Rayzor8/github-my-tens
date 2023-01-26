import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Poppins } from "@next/font/google";

const FontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={FontPoppins.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
