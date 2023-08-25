const ProductList = () => {
  return (
    <>
      <h1 className="font-bold text-3xl">Products</h1>
      <h2>List of Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
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

export default ProductList;
