const developersURL = "https://developers.cloudflare.com";

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
