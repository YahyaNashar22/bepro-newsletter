import { useEffect, useState } from "react";
import { User } from "../interfaces";
import axios from "axios";

import usersLarge from "../assets/users_large.png";
import block from "../assets/block.png";
import check from "../assets/check.png";

import Dialog from "./Dialog";

const ListClients = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserInfoOpen, setUserInfoOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/get-all-users`,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUsers(res.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleBlock = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendURL}/block-user/${selectedUser!._id}`
      );

      if (res.status == 200) {
        fetchUsers();
        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setUserInfoOpen(true);
  };

  return (
    <div className="file-upload-container">
      <img
        src={usersLarge}
        alt="users"
        width={64}
        height={64}
        className="users-img"
      />
      <h1 className="form-title">Registered Clients</h1>
      <form method="POST" onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={query}
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn" onClick={fetchUsers}>
          Fetch!
        </button>
      </form>
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <ul className="history-container">
          {users.length > 0 ? (
            users.map(
              (user) =>
                user.role !== "admin" && (
                  <li key={user._id} className="email">
                    <span onClick={() => handleUserClick(user)}>
                      {" "}
                      {user.email ?? user.username}
                    </span>
                    <img
                      width={32}
                      height={32}
                      src={user.blocked ? check : block}
                      onClick={() => {
                        setSelectedUser(user);
                        setDialogOpen(true);
                      }}
                    />
                  </li>
                )
            )
          ) : (
            <p>No Registered Users Found</p>
          )}
        </ul>
      )}

      {/* Modal */}
      {isDialogOpen && selectedUser && (
        <Dialog
          title={
            selectedUser.blocked
              ? `block ${selectedUser.email ?? selectedUser.username}`
              : `Un-block ${selectedUser.email ?? selectedUser.username}`
          }
          content={
            <p>
              {selectedUser.blocked
                ? `Are you sure you want to block ${
                    selectedUser.email ?? selectedUser.username
                  }`
                : `Are you sure you want to un-block ${
                    selectedUser.email ?? selectedUser.username
                  }`}
            </p>
          }
          submitText={loading ? "Loading..." : "Confirm"}
          onSubmit={handleBlock}
          onClose={handleClose}
        />
      )}

      {/* User Info Modal */}
      {isUserInfoOpen && selectedUser && (
        <Dialog
          title={`User Info: ${selectedUser.email ?? selectedUser.username}`}
          content={
            <div>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone ?? "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.blocked ? "Blocked" : "Active"}
              </p>
            </div>
          }
          submitText="Close"
          showSubmit={false}
          onSubmit={() => setUserInfoOpen(false)}
          onClose={() => setUserInfoOpen(false)}
        />
      )}
    </div>
  );
};

export default ListClients;
