// pages/_app.js
import "@/styles/globals.css";
import Header from "@/pages/Component/Header/header";
import Footer from "@/pages/Component/Footer/footer";
import { Provider as ReduxProvider } from "react-redux";

import Store from "@/Redux/store";

export default function App({ Component, pageProps }) {
 
  return (
    <>
      <ReduxProvider store={Store}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        {/* <Footer /> */}
      </ReduxProvider>
    </>
  );
}
