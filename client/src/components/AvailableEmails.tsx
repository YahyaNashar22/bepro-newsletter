import axios from "axios";
import { useEffect, useState } from "react";
import TrashCan from "./TrashCan";

interface email {
  email: string;
  _id: string;
}

const AvailableEmails = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [emails, setEmails] = useState<[] | email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${backendURL}/get-emails`);
        setEmails(response.data.payload);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, [backendURL]);

  return (
    <main>
      <h1 className="title">Available Emails</h1>
      <ul className="emails-container">
        {loading ? (
          <li className="loader">Getting your emails...</li>
        ) : emails.length > 0 ? (
          emails.map((email) => {
            return (
              <li className="email" key={email._id}>
                {email.email}{" "}
                <span>
                  <TrashCan email={email.email} />
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
