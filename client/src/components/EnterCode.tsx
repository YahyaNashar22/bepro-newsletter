import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import code_large from "../assets/code_large.png";

import { User } from "../interfaces";

const ChangePassword = () => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [code, setCode] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError(false);
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `${backendURL}/edit-code`,
        { userId: user._id, code },
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
      <img src={code_large} width={64} height={64} alt="user icon" />
      <h1 className="form-title">New Code</h1>

      <label className="login-label">
        <input
          type="text"
          name="code"
          value={code}
          onChange={handleChange}
          placeholder="enter new code"
          className="file-input"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && (
        <p className="error-message">There was an error changing the code</p>
      )}
      {success && <p className="success-message">Code changed successfully</p>}
    </form>
  );
};

export default ChangePassword;
