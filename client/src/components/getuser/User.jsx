import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './user.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getALL");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg,{position:'top-right'})
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <Link to={`/edit/${user._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
