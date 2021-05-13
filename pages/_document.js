import Document, { Html, Head, Main, NextScript } from "next/document";

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
              <header className="flex justify-center">
                <h1 className="hidden">cloudflare.coffee</h1>
                <img
                  src="/mug.png"
                  width={380}
                  height={321}
                  className="h-14 sm:h-28 w-auto filter drop-shadow-cf-orange"
                  alt="Coffee mug with 1.1.1.1 typed on it"
                />
              </header>
              <Main />
            </article>
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
