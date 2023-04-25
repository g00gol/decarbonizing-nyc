import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const hideFooter = Component.hideFooter || false;

  return (
    <>
      <Nav />
      <Component {...pageProps} />
      {!hideFooter && <Footer />}
    </>
  );
}
