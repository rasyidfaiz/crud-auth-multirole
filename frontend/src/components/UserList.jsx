const userList = () => {
  return (
    <>
      <h1 className="font-bold text-3xl">Users</h1>
      <h2>List of Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
            <td>check</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default userList;
