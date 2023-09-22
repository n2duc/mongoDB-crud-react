const UsersTable = ({ usersData, handleFetchUser, handleRemoveUser }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Fullname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.length > 0 && usersData.map((user) => (
                        <tr key={user._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.fullname}
                            </th>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.gender ? "Male" : "Female"}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                            <td className="px-2 py-4">
                                <button onClick={() => handleFetchUser(user._id)} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">
                                    Edit
                                </button>
                                <button onClick={() => handleRemoveUser(user._id)} type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable