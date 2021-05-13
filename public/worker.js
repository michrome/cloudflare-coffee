const developersURL = "https://developers.cloudflare.com";

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
});
