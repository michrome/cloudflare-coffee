export const config = {
  unstable_runtimeJS: false,
};

const buildpack = `#!/bin/sh

build_dir=$1
env_dir=$3
working_dir=\`pwd\`

# Download cloudflared. It will be at /app/vendor/cloudflared on dyno
wget -q https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz
mkdir -p $build_dir/vendor
tar -C $build_dir/vendor -xzf cloudflared-stable-linux-amd64.tgz
# Add cloudflared to PATH
mkdir -p $build_dir/.profile.d
echo 'PATH=$PATH:$HOME/vendor' > $build_dir/.profile.d/cloudflared.sh
# Pull config from ENV
mkdir -p $build_dir/.cloudflared
cp $env_dir/TUNNEL_CERT $build_dir/.cloudflared/cert.pem
tunnel_id=\`cat $env_dir/TUNNEL_ID\`
cp $env_dir/TUNNEL_CONFIG $build_dir/.cloudflared/\${tunnel_id}.json`;

export default function Home({ headers }) {
  const headerRows = [];
  for (const header in headers) {
    headerRows.push(
      <tr key={header}>
        <td>
          <details>
            <summary className="focus:outline-none">
              <samp className="whitespace-nowrap">{header}</samp>
            </summary>
            <samp className="ml-10">{headers[header]}</samp>
          </details>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h2>What Is This?</h2>
      <p>
        The body of the HTTP response you’re viewing is HTML generated by a
        Next.js server running on Heroku. The table below lists all the HTTP
        headers that were included in your request.
      </p>
      <table>
        <thead>
          <tr>
            <th>HTTP Header</th>
          </tr>
        </thead>
        <tbody>{headerRows}</tbody>
      </table>
      <p>
        We can confirm traffic is proxied using the Cloudflare dashboard and we
        can see <code>cf-*</code> headers in the table above.
        <img
          src="/proxy-through-cloudflare.png"
          width={2048}
          height={406}
          alt="Cloudflare dashboard showing traffic to www.cloudflare.coffee is proxied through Cloudflare"
        />
      </p>
      <h2 id="secure-communication-between-your-browser-and-cloudflare">
        Secure Communication Between Your Browser and Cloudflare
      </h2>
      <p>
        The communication between your broswer and Cloudflare is encrypted. The
        encryption is enabled using two settings in the Cloudflare dashboard:
      </p>
      <ol>
        <li>
          Edge Certificates
          <img
            src="/edge-certificates.png"
            width={1922}
            height={560}
            alt="Cloudflare dashboard showing edge certificates"
          />
        </li>
        <li>
          Always Use HTTPS
          <img
            src="/always-use-https.png"
            width={1922}
            height={368}
            alt="Cloudflare dashboard showing always use HTTPS"
          />
        </li>
      </ol>
      <h2 id="secure-communication-between-cloudflare-and-the-origin-server">
        Secure Communication Between Cloudflare and the Origin Server
      </h2>
      <p>
        If you visit this site using the URL{" "}
        <a href="https://web-dyno.cloudflare.coffee/">
          https://<mark>web-dyno</mark>.cloudflare.coffee
        </a>
        , the communication between Cloudflare and the Origin Server is
        encrypted. The encryption is enabled using the <code>Full</code>{" "}
        encryption mode in the Cloudflare dashboard, taking advantage of the
        certification provided by Heroku.
        <img
          src="/full-encryption-mode.png"
          width={1922}
          height={1108}
          alt="Cloudflare dashboard showing full encryption"
        />
      </p>
      <h2>
        Communication Between Cloudflare and the Origin Server Using an Argo
        Tunnel
      </h2>
      <p>
        If you visit this site using the URL{" "}
        <a href="https://www.cloudflare.coffee/">
          https://<mark>www</mark>.cloudflare.coffee
        </a>
        , the communication between Cloudflare and the Origin Server is
        protected by an Argo Tunnel.
      </p>
      <p>
        The tunnel is created by running <code>cloudflared</code> on a Heroku
        dyno that cannot receive inbound HTTP requests. <code>cloudflared</code>{" "}
        is installed using a{" "}
        <a href="https://github.com/michrome/heroku-buildpack-cloudflared">
          Heroku buildpack
        </a>{" "}
        that downloads the <code>cloudflared</code> binary and applies the
        certification and configuration files from secure Heroku environment
        variables.
      </p>
      <pre>
        <code>{buildpack}</code>
      </pre>
      <p>
        As shown in the diagram below, there are three ways to reach this page:
      </p>
      <ol>
        <li>
          <a href="https://cloudflare-coffee.herokuapp.com">
            https://cloudflare-coffee.herokuapp.com
          </a>
          <p>
            This URL does not go via Cloudflare. You can verify this because
            there are no <code>cf-*</code> headers listed at the top of the
            page. The page is served from a web dyno.
          </p>
        </li>
        <li>
          <a href="https://web-dyno.cloudflare.coffee">
            https://<mark>web-dyno</mark>.cloudflare.coffee
          </a>
          <p>
            This URL is via Cloudflare as described{" "}
            <a href="#secure-communication-between-cloudflare-and-the-origin-server">
              above
            </a>
            . The page is served from a web dyno.
          </p>
        </li>
        <li>
          <a href="https://www.cloudflare.coffee">
            https://<mark>www</mark>.cloudflare.coffee
          </a>
          <p>
            This URL is via Cloudflare using an Argo tunnel. The advantage of
            this method is the web dyno can be turned off, removing as{" "}
            <a href="https://cloudflare-coffee.herokuapp.com">
              https://cloudflare-coffee.herokuapp.com
            </a>{" "}
            as an attack vector. Note the{" "}
            <code>cf-cloudflared-proxy-tunnel-hostname</code> header confirming
            the tunnel is in use.
          </p>
        </li>
      </ol>
      <img
        src="/argo-tunnel.png"
        width={1922}
        height={1108}
        alt="Diagram showing different traffic routes for hostnames"
      />
      <h2>Cloudflare Worker</h2>
      <p>
        See <a href="/worker">a page served via a Cloudflare worker.</a>
      </p>
      <h2>Secure Page</h2>
      <p>
        An email account at the domain <code>@cloudflare.com</code> or{" "}
        <code>@j4e.name</code> is required to access{" "}
        <a href="/secure">the secure page</a>.
      </p>
      <p>
        <em>
          Note: it is possible to side-step this protection because this demo
          allows access via the <code>herokuapp.com</code> domain
        </em>
        .
      </p>
      <h2>Summary</h2>
      <h3>How Could This Be Improved?</h3>
      <p>Our site is secure and performant:</p>
      <ul>
        <li>
          The Argo tunnel avoids the need to run our app on the{" "}
          <code>herokuapp.com</code>
          domain;
        </li>
        <li>Image assets are cached at the edge by Cloudflare; and</li>
        <li>
          The tunnel provides Argo Smart Routing to minimise network congestion.
        </li>
      </ul>
      <p>
        However, every request we make requires a trip to North Virginia because
        that‘s where the compute that renders the request headers happens. For a
        user in Harrogate, the images can be served by a Cloudflare cache in
        Manchester but the HTML requires a 7,000 mile round trip!
      </p>
      <img
        src="/distance-between-pops.png"
        width={1647}
        height={1884}
        alt="Diagram showing there are 3500 miles between Harrogate and North Virginia"
      />
      <p>
        A more performant solution would be to use Cloudflare Pages in
        combination with a Cloudflare Worker. Because this is a{" "}
        <a hre="https://nextjs.org">Next.js</a> application, it can be exported
        as static HTML, making it compatible with Cloudflare Pages. The dynamic
        element of the page (the request headers) could be added to the HTML
        using the Cloudflare Worker{" "}
        <code>
          <a href="https://developers.cloudflare.com/workers/runtime-apis/html-rewriter">
            HTMLRewriter
          </a>
        </code>{" "}
        Runtime API.
      </p>
      <h3>Learnings</h3>
      <p>My main learnings from this project are:</p>
      <ul>
        <li>
          Cloudflare greatly simplifies the process of setting up certificates
          and security;
        </li>
        <li>
          Cloudflare Access Policies are a powerful way to secure content on the
          web without having to add any security or authentication logic into
          your app’s source code,{" "}
          <strong>
            provided you take care with the host names serving your app
          </strong>
          ;
        </li>
        <li>
          It is possible to use Argo tunnels with{" "}
          <abbr title="Platforms as a Service">PaaS</abbr>, such as Heroku; and
        </li>
        <li>
          Cloudflare Pages and Workers are the “Edge” future for many apps,
          because of the security and performance they provide.
        </li>
      </ul>
      <h3>Source Code</h3>
      <ul>
        <li>
          This app is published at{" "}
          <a href="https://github.com/michrome/cloudflare-coffee">
            https://github.com/michrome/cloudflare-coffee
          </a>
        </li>
        <li>
          The <code>cloudflared</code> buildpack is published at{" "}
          <a href="https://github.com/michrome/heroku-buildpack-cloudflared">
            https://github.com/michrome/heroku-buildpack-cloudflared
          </a>
        </li>
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const sortedHeaders = Object.keys(context.req.headers)
    .sort()
    .reduce((obj, key) => {
      obj[key] = context.req.headers[key];
      return obj;
    }, {});
  return {
    props: {
      headers: { ...sortedHeaders },
    },
  };
}
