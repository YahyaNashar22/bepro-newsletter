import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

import Excel from "../assets/excel.png";
import { User } from "../interfaces";
import { jwtDecode } from "jwt-decode";

function FileUpload({
  handleCloseDialog,
  fetchEmails,
}: {
  handleCloseDialog: () => void;
  fetchEmails: () => void;
}) {
  const backendURL = import.meta.env.VITE_PORT;
    const token = localStorage.getItem("token");
    const user: User = jwtDecode(token!);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      setError(null); // Reset error on new file selection
      setSuccess(null); // Reset success message

      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please upload a valid Excel file (.xls or .xlsx)");
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("No file selected or invalid file type");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);

    try {
      setLoading(true);
      await axios.post(`${backendURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("File uploaded successfully!");
      fetchEmails();
      setTimeout(() => {
        handleCloseDialog();
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // Check for specific error message
        setError(
          error.response.data.message ||
            "An error occurred during the file upload."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="file-upload-container">
      <img src={Excel} width={64} height={64} alt="Excel icon" />
      <h1 className="form-title">Upload Excel File</h1>

      <input type="file" name="file" onChange={handleFileChange} className="file-input" />
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
}

export default FileUpload;
