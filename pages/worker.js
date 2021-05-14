export const config = {
  unstable_runtimeJS: false,
};

const workerCode = `const developersURL = "https://developers.cloudflare.com";

async function handleRequest(request) {
  const agent = await request.headers.get("user-agent");
  const cookies = request.headers.get("Cookie");
  if (agent?.includes("curl") && !cookies?.includes("cf-noredir=true")) {
    return Response.redirect(developersURL, 302);
  }
  return fetch(request);
}

addEventListener("fetch", async (event) => {
  event.respondWith(handleRequest(event.request));
});`;

const curl = `% curl -I https://www.cloudflare.coffee/worker

HTTP/2 302 
date: Thu, 13 May 2021 21:00:00 GMT
location: https://developers.cloudflare.com
cf-request-id: 0a092fb21d000054e143bfa000000001
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
server: cloudflare
cf-ray: 64eee8969d7b54e1-MAN`;

const curlWithCookie = `% curl -I "https://www.cloudflare.coffee/worker" \\
     -H 'Cookie: .	cf-noredir=true'

HTTP/2 200 
date: Thu, 13 May 2021 21:00:00 GMT
content-type: text/html; charset=utf-8
cf-ray: 64ef12c3bd27bfcf-MAN
vary: Accept-Encoding
via: 1.1 vegur
cf-cache-status: DYNAMIC
cf-request-id: 0a094a0e520000bfcf3eba6000000001
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
x-powered-by: Next.js
server: cloudflare`;

export default function Worker() {
  return (
    <>
      <h2>This Page Is Served via a Cloudflare Worker</h2>
      <p>
        The route <code>*.cloudflare.coffee/worker</code> triggers a worker
        named <code>redirect</code> which runs the following script.
      </p>
      <pre>
        <code>{workerCode}</code>
      </pre>
      <p>
        The script checks for requests made by cURL and redirects them to{" "}
        <a href="https://developers.cloudflare.com">
          https://developers.cloudflare.com
        </a>
        . All other browsers and clients are served this page.
      </p>
      <pre>
        <code>{curl}</code>
      </pre>
      <p>
        cURL clients can avoid the redirect by using a <code>cf-noredir</code>{" "}
        cookie with a value of <code>true</code>.
      </p>
      <pre>
        <code>{curlWithCookie}</code>
      </pre>
    </>
  );
}
