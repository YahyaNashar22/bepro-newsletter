import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import password_large from "../assets/password_large.png";

import { User } from "../interfaces";

const ChangePassword = () => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `${backendURL}/edit-password/${user._id}`,
        { password },
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
    }
  };

  return (
    <form
      method="PATCH"
      onSubmit={handleSubmit}
      className="file-upload-container"
    >
      <img src={password_large} width={64} height={64} alt="user icon" />
      <h1 className="form-title">New Password</h1>

      <label className="login-label">
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="enter new password"
          className="file-input"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && (
        <p className="error-message">
          There was an error changing the password
        </p>
      )}
      {success && (
        <p className="success-message">Password changed successfully</p>
      )}
    </form>
  );
};

export default ChangePassword;
