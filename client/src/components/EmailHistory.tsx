import axios from "axios";
import { useEffect, useState } from "react";

import historyLarge from "../assets/history_large.png";

interface email {
  _id: string;
  subject: string;
  content: string;
}

const EmailHistory = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [query, setQuery] = useState<string>("");
  const [emails, setEmails] = useState<email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmail, setSelectedEmail] = useState<email | null>(null); // State to track selected email
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchEmailHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/get-email-history`,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmails(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchEmailHistory();
  };

  const handleOpenEmail = (email: email) => {
    setSelectedEmail(email);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmail(null);
  };

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  return (
    <div className="file-upload-container">
      <img
        src={historyLarge}
        alt="history"
        width={64}
        height={64}
        className="history-img"
      />
      <h1 className="form-title">Email History</h1>
      <form method="POST" onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          value={query}
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-btn"
          onClick={fetchEmailHistory}
        >
          Fetch!
        </button>
      </form>
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <ul className="history-container">
          {emails.length > 0 ? (
            emails.map((email) => (
              <li
                key={email._id}
                className="email clickable"
                onClick={() => handleOpenEmail(email)}
              >
                {email.subject}
              </li>
            ))
          ) : (
            <p>No Previous Emails Found</p>
          )}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && selectedEmail && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()} // Prevent click on modal content from closing the modal
          >
            <h2>{selectedEmail.subject}</h2>
            <p>{selectedEmail.content}</p>
            <button className="close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
