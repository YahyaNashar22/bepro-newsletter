import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import Trash from "../assets/trash_large.png";

const DeleteEmail = ({
  handleCloseDialog,
  fetchEmails,
}: {
  handleCloseDialog: () => void;
  fetchEmails: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;

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
      const res = await axios.delete(`${backendURL}/delete-email/${email}`);

      if (res.status == 200) {
        setSuccess("Email removed successfully");
        fetchEmails();
        setTimeout(() => {
          handleCloseDialog();
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.status == 404) setError("Email does not exist");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      method="DELETE"
      onSubmit={handleSubmit}
      className="file-upload-container"
    >
      <img src={Trash} width={64} height={64} alt="trash icon" />
      <h1 className="form-title">Remove Email</h1>
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
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default DeleteEmail;
