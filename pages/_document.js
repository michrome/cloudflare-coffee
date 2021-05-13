import Document, { Html, Head, Main, NextScript } from "next/document";
import Mug from "../components/mug";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head />
        <body>
          <div className="px-4 py-4 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">
            <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
              <header>
                <h1 className="hidden">cloudflare.coffee</h1>
                <Mug />
              </header>
              <Main />
              <footer>
                <Mug />
              </footer>
            </article>
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
