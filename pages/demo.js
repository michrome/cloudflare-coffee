export const config = {
  unstable_runtimeJS: false,
};

export default function Demo() {
  return (
    <>
      <h2>Salesforce Opportunities</h2>
      <table>
        <thead>
          <tr>
            <th>Opportunity Name</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody id="opportunities"></tbody>
      </table>
    </>
  );
}
