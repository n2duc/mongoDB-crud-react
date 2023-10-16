import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce, usePopupState, usePagination } from "../hooks";
import { Button, BackButton, SearchInput, UsersTable, Pagination, FormUser } from "../components";

const API_BASE = "https://mongo-db-crud-react.vercel.app";
const DEFAULT_VALUE = {
    fullname: "",
    username: "",
    gender: true,
    email: "",
    phone: "",
};

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [originalUser, setOriginalUser] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [userID, setUserID] = useState("");
    const { currentPage, setCurrentPage, displayedProducts, totalPages } = usePagination(users);

    const {
        value: newUser,
        show: popupAddNew,
        setShow: setPopupAddNew,
        handleClose: closePopup,
        handleChange: handleInputChange,
    } = usePopupState(DEFAULT_VALUE);

    const {
        value: updateData,
        setValue: setUpdateData,
        show: updatePopup,
        setShow: setUpdatePopup,
        handleClose: closeUpdatePopup,
        handleChange: handleInputChangeUpdate,
    } = usePopupState(DEFAULT_VALUE);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_BASE}/users`);
            setUsers(res.data);
            setOriginalUser(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        document.title = "Users Page";
    }, []);

    useEffect(() => {
        fetchData();
    }, [updateUI]);

    // Search filter
    const [searchUser, setSearchUser] = useState("");
    const searchDebouce = useDebounce(searchUser, 500);

    const handeAddNew = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/user`, newUser, {
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                console.log("Add new user successfully!");
            }
            setUpdateUI((prevState) => !prevState);
            closePopup();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_BASE}/user/${id}`);
            setUpdateUI((prevState) => !prevState);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleFetchUser = async (id) => {
        setUpdatePopup(true);
        setUserID(id); //user._id
        try {
            const res = await axios.get(`${API_BASE}/user/${id}`)
            setUpdateData(res.data)
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE}/user/${userID}`, updateData, {
                headers: { "Content-Type": "application/json" },
            });
            closeUpdatePopup();
            setUpdateUI((prevState) => !prevState);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    
    useEffect(() => {
        const dataFilter = originalUser.filter((user) =>
            user.fullname.toLowerCase().includes(searchDebouce.toLowerCase())
        );
        setUsers(dataFilter);
    }, [searchDebouce, originalUser]);

    return (
        <div className="p-7 container relative">
            <BackButton />
            <div className="flex items-center justify-between pb-4">
                <SearchInput
                    onChange={(e) => setSearchUser(e.target.value)}
                    placeholder="Search for user by name"
                ></SearchInput>
                <Button onClick={() => setPopupAddNew(true)}>Add new</Button>
            </div>
            <UsersTable
                usersData={displayedProducts}
                handleRemoveUser={deleteUser}
                handleFetchUser={handleFetchUser}
            ></UsersTable>
            {popupAddNew && (
                <FormUser
                    data={newUser}
                    title="Add new user"
                    handleClose={closePopup}
                    handleChange={handleInputChange}
                    handleSubmit={handeAddNew}
                    typeButton="Add new"
                ></FormUser>
            )}
            {updatePopup && (
                <FormUser
                    data={updateData}
                    title="Update user"
                    handleChange={handleInputChangeUpdate}
                    handleClose={closeUpdatePopup}
                    handleSubmit={handleUpdateSubmit}
                    typeButton="Update"
                ></FormUser>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setCurrentPage}
                ></Pagination>
            )}
        </div>
    );
};

export default UserPage;
