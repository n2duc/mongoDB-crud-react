const ProductTable = ({ productData, handleRemoveProduct, handleFetchProduct }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Brand Laptop
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productData.length > 0 && productData.map((product) => (
                        <tr key={product._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </th>
                            <td className="px-6 py-4">{product.color}</td>
                            <td className="px-6 py-4">{product.brand}</td>
                            <td className="px-6 py-4">${product.price}</td>
                            <td className="px-2 py-4">
                                <button onClick={() => handleFetchProduct(product._id)} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">
                                    Edit
                                </button>
                                <button onClick={() => handleRemoveProduct(product._id)} type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
