import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu.js";
import Layout from "../../components/Layout.js";
import toast from "react-hot-toast";

const Users = () => {

    const token = localStorage.getItem('token');  // Or wherever you're storing the token

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`  // Ensure 'Bearer' is followed by the token
      }
    };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/auth/all-users`,
        { withCredentials: true }
      );
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
