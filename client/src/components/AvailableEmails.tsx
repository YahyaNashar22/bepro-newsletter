import { useState } from "react";
import { email } from "../pages/Home";
import TrashCan from "./TrashCan";
import axios from "axios";
import { User } from "../interfaces";
import { jwtDecode } from "jwt-decode";

const AvailableEmails = ({
  emails,
  loading,
  fetchEmails,
}: {
  emails: email[];
  loading: boolean;
  fetchEmails: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle checkbox change
  const handleCheckboxChange = (email: string) => {
    setSelectedEmails(
      (prevSelected) =>
        prevSelected.includes(email)
          ? prevSelected.filter((e) => e !== email) // Remove if already selected
          : [...prevSelected, email] // Add if not selected
    );
  };

  // Toggle Select All emails
  const toggleSelectAll = () => {
    if (selectedEmails?.length === emails?.length) {
      // If all emails are selected, deselect all
      setSelectedEmails([]);
    } else {
      // Otherwise, select all emails
      setSelectedEmails(emails?.map((email) => email.email));
    }
  };

  // Function to check if email is selected
  const isSelected = (email: string) => selectedEmails?.includes(email);

  const deleteSelected = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${backendURL}/delete-selected-emails`, {
        data: {
          userId: user._id,
          emails: selectedEmails,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSelectedEmails([]);
      fetchEmails();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="emails-main">
      <h1 className="title">
        {" "}
        <span id="normal"></span>Available Emails
      </h1>
      {selectedEmails?.length != 0 && (
        <button
          type="button"
          disabled={loading || isLoading}
          className="dialog-submit-btn"
          onClick={deleteSelected}
          style={{ marginLeft: "30px" }}
        >
          Delete
        </button>
      )}

      {emails?.length !== 0 && (
        <button
          className="dialog-submit-btn"
          onClick={toggleSelectAll}
          disabled={loading || isLoading}
          style={{ marginLeft: "30px" }}
        >
          {selectedEmails?.length !== emails?.length
            ? "Select All"
            : "Deselect All"}
        </button>
      )}

      <ul className="emails-container">
        {loading ? (
          <li className="loader">Getting your emails...</li>
        ) : emails?.length > 0 ? (
          emails?.map((email) => {
            return (
              <li className="email" key={email._id}>
                <input
                  type="checkbox"
                  checked={isSelected(email.email)}
                  onChange={() => handleCheckboxChange(email.email)}
                  className="checkbox"
                />
                {email.email}{" "}
                <span>
                  <TrashCan email={email.email} fetchEmails={fetchEmails} />
                </span>
              </li>
            );
          })
        ) : (
          <p className="no-emails-text">You don't have any emails!</p>
        )}
      </ul>
    </main>
  );
};

export default AvailableEmails;
