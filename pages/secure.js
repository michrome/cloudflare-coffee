export const config = {
  unstable_runtimeJS: false,
};

export default function Secure() {
  return (
    <>
      <h2>Secure</h2>
      <p>
        Access to this page is restricted to a particular user or a group of
        users.
      </p>
    </>
  );
}
