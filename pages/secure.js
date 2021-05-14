export const config = {
  unstable_runtimeJS: false,
};

export default function Secure() {
  return (
    <>
      <h2>Secure Page</h2>
      <p>
        Access to this page is restricted to people with a{" "}
        <code>@cloudflare.com</code> or <code>@j4e.name</code> email address.
        users.
      </p>
      <p>
        Cloudflare is providing the restrictions with an Access Policy.{" "}
        <img
          src="/access-policy.png"
          width={2048}
          height={1018}
          alt="Cloudflare dashboard showing access policy"
        />
      </p>
    </>
  );
}
