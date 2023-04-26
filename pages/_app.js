import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const hideFooter = Component.hideFooter || false;

  return (
    <>
      <div
        className="w-screen h-screen top-0 justify-center items-center mobileDisabled"
        hidden
      >
        <h1>Mobile Site is disabled. Please visit us on a desktop!</h1>
      </div>
      <Nav />
      <Component {...pageProps} />
      {!hideFooter && <Footer />}
    </>
  );
}
