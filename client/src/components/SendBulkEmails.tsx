import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const SendBulkEmails = ({
  handleCloseDialog,
}: {
  handleCloseDialog: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;

  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    switch (name) {
      case "subject":
        setSubject(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        break;
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
        { subject, content },
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
      console.error(error);
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
      <label>
        Subject:
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={handleChange}
          className="file-input"
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          name="content"
          value={content}
          onChange={handleChange}
          className="file-input"
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
