import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import Plus from "../assets/plus_large.png";
import { User } from "../interfaces";
import { jwtDecode } from "jwt-decode";

const AddEmailManually = ({
  handleCloseDialog,
  fetchEmails,
}: {
  handleCloseDialog: () => void;
  fetchEmails: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/add-email`,
        { email, userId: user._id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status == 201) {
        setSuccess("Email added successfully");
        fetchEmails();
        setTimeout(() => {
          handleCloseDialog();
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.status == 400) setError("Email already exists");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="file-upload-container"
    >
      <img src={Plus} width={64} height={64} alt="email icon" />
      <h1 className="form-title">Add Email Manually</h1>
      <label className="login-label">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="email@provider.com..."
          className="file-input"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default AddEmailManually;
