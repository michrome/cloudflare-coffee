export const config = {
  unstable_runtimeJS: false,
};

const workerCode = `class HeaderInjector {
  constructor(headers) {
    this.headers = Object.fromEntries(headers);
    this.sortedHeaders = Object.keys(this.headers)
      .sort()
      .reduce((obj, key) => {
        obj[key] = this.headers[key];
        return obj;
      }, {});
  }
  element(element) {
    for (const header in this.sortedHeaders) {
      element.append(
      \`<tr>
          <td>
            <details>
              <summary className="focus:outline-none">
                <samp className="whitespace-nowrap">\${header}</samp>
              </summary>
              <samp className="ml-10">\${this.headers[header]}</samp>
            </details>
          </td>
        </tr>\`,
        { html: true }
      );
    }
  }
}

async function handleRequest(req) {
  const res = await fetch(req);
  return new HTMLRewriter()
    .on("tbody#headers", new HeaderInjector(req.headers))
    .transform(res);
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});`;

const webDynoTime = 0.539435;
const cfProxyTime = 0.492738;
const pagesTime = 0.191257;

const curlTimes = `% curl 'https://web-dyno.cloudflare.coffee' -s -o /dev/null -w "%{time_starttransfer}\\n"
${webDynoTime}

% curl 'https://www.cloudflare.coffee' -s -o /dev/null -w "%{time_starttransfer}\\n"
${cfProxyTime}

% curl 'https://pages.cloudflare.coffee' -s -o /dev/null -w "%{time_starttransfer}\\n"
${pagesTime}
`;

export default function Page() {
  return (
    <>
      <h2>Cloudflare Pages</h2>
      <p>
        Removing the <code>getServerSideProps</code> method from our home page
        allows us to statically export this site, so it can be hosted by
        Cloudflare Pages. You can see it at{" "}
        <a href="https://pages.cloudflare.coffee">
          https://<mark>pages</mark>.cloudflare.coffee
        </a>
        .
      </p>
      <h2>But What About the Headers?</h2>
      <p>
        <code>getServerSideProps</code> was providing our request headers, so we
        need to migrate this to the Edge, using a Cloudflare Worker with the
        following code.
      </p>
      <pre>
        <code>{workerCode}</code>
      </pre>
      <h2>Why?</h2>
      <p>
        Avoiding a trans-Atlantic crossing results in significant speed
        improvements:{" "}
        <strong>
          <mark>65% faster!</mark>
        </strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th className="text-right">Response time (ms)</th>
            <th className="text-right">Speed improvement (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <samp className="whitespace-nowrap">
                web-dyno.cloudflare.coffee
              </samp>
              <br />
              Cloudflare proxy to Heroku
            </td>
            <td className="text-right">{webDynoTime}</td>
            <td className="text-right">
              <span className="pr-6">—</span>
            </td>
          </tr>
          <tr>
            <td>
              <samp className="whitespace-nowrap">www.cloudflare.coffee</samp>
              <br />
              Cloudflare Argo tunnel to Heroku
            </td>
            <td className="text-right">{cfProxyTime}</td>
            <td className="text-right">
              <span className="pr-6">
                {Math.round(((webDynoTime - cfProxyTime) / webDynoTime) * 100)}
              </span>
            </td>
          </tr>
          <tr className="bg-yellow-100">
            <td>
              <samp className="whitespace-nowrap">pages.cloudflare.coffee</samp>
              <br />
              Cloudflare Pages & Cloudflare Worker
            </td>
            <td className="text-right">{pagesTime}</td>
            <td className="text-right">
              <span className="pr-6">
                {Math.round(((webDynoTime - pagesTime) / webDynoTime) * 100)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Speed Test Using cURL</h2>
      <pre>
        <code>{curlTimes}</code>
      </pre>
    </>
  );
}
