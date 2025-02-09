import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import user from "../assets/user_large.png";

const CreateUser = () => {
  const backendURL = import.meta.env.VITE_PORT;


  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);
    setSuccess(false);

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${backendURL}/create-user`,
        { username, password, email, phone },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      setError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setPhone("");
      setUsername("");
    }
  };
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="file-upload-container"
    >
      <img src={user} width={64} height={64} alt="user icon" />
      <h1 className="form-title">Add Client</h1>

      <label className="login-label">
        username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="client username"
          className="file-input"
        />
      </label>

      <label className="login-label">
        email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="client email"
          className="file-input"
        />
      </label>

      <label className="login-label">
        phone:
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="client phone"
          className="file-input"
        />
      </label>

      <label className="login-label">
        password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="client password"
          className="file-input"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Creating..." : "Create"}
      </button>
      {error && (
        <p className="error-message">
          There was an error registering the client
        </p>
      )}
      {success && (
        <p className="success-message">Client registered successfully</p>
      )}
    </form>
  );
};

export default CreateUser;
