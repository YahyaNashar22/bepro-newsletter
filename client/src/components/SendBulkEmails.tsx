import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const SendBulkEmails = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        Send
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SendBulkEmails;
