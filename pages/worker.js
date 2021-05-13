export const config = {
  unstable_runtimeJS: false,
};

const workerCode = `const developersURL = "https://developers.cloudflare.com";

async function handleRequest(request) {
  const agent = await request.headers.get("user-agent");
  if (agent?.includes("curl")) {
    return Response.redirect(developersURL, 302);
  }
  return fetch(request);
}

addEventListener("fetch", async (event) => {
  event.respondWith(handleRequest(event.request));
});
`;

const curl = `% curl -I https://www.cloudflare.coffee/worker

HTTP/2 302 
date: Thu, 13 May 2021 21:00:00 GMT
location: https://developers.cloudflare.com
cf-request-id: 0a092fb21d000054e143bfa000000001
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
server: cloudflare
cf-ray: 64eee8969d7b54e1-MAN`;

export default function Worker() {
  return (
    <>
      <h2>This Page Is Served via a Cloudflare Worker</h2>
      <p>
        The route <samp>*.cloudflare.coffee/worker</samp> triggers a worker
        named <var>redirect</var> which runs the following script.
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
    </>
  );
}
