import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="p-7 container flex items-center justify-center min-h-screen">
            <div className="text-center bg-gray-800 px-10 py-12 rounded-lg border border-gray-700 shadow-lg">
                <h1 className="text-3xl font-bold tracking-wider">CRUD Application</h1>
                <h1 className="mb-4 text-3xl">with <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Mongo Dau Buoi</span></h1>
                <p className="mb-5 mx-auto w-3/5 text-lg text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt blanditiis quia vero assumenda error.</p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        to="products"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 -ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Products
                    </Link>
                    <Link
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        to="users"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 -ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Users
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
