import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import Email from "../assets/email_large.png";
import { User } from "../interfaces";
import { jwtDecode } from "jwt-decode";

const SendBulkEmails = ({
  handleCloseDialog,
}: {
  handleCloseDialog: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);

    setSubject(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);

    setContent(e.target.value);
  };

  const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png"];

      if (!validTypes.includes(selectedFile.type)) {
        setError(
          "Invalid file type. Please upload a valid image (.jpeg, .png)."
        );
        setLoading(false);
        setAttachment(null);
        e.target.value = ""; // Reset file input
        return;
      }

      setError(null); // Reset error on new file selection
      setSuccess(null); // Reset success message

      // setAttachment(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Send Base64 string to the backend
          setAttachment(reader.result.toString());
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (subject === "") {
        setError("Subject Field is Required!");
        return;
      }
      if (content === "") {
        setError("Content Field is Required!");
        return;
      }

      await axios.post(
        `${backendURL}/send-bulk-emails`,
        { subject, content, attachment, userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSubject("");
      setContent("");
      setSuccess("Email sent successfully");
      setTimeout(() => {
        handleCloseDialog();
      }, 1000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>; // Cast error to AxiosError

      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }

      console.error(axiosError);
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
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <img src={Email} width={64} height={64} alt="email icon" />
        <h1 className="form-title">Create Mail</h1>
      </div>

      <label className="login-label">
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={handleSubjectChange}
          className="file-input"
          placeholder="Subject"
        />
      </label>
      <label className="login-label">
        <textarea
          name="content"
          value={content}
          onChange={handleContentChange}
          className="file-input email-content"
          placeholder="Content"
        />
      </label>
      <label className="login-label">
        <input
          name="attachment"
          type="file"
          onChange={handleAttachmentChange}
          className="file-input"
          placeholder="attachment"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Sending..." : "Send"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default SendBulkEmails;
