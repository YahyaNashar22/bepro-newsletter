import axios from "axios";
import { useEffect, useState } from "react";

interface email {
  subject: string;
  content: string;
}

const EmailHistory = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [emails, setEmails] = useState<email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEmailHistory = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/get-email-history`,
        {},
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

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  return (
    <div>
      {loading ? (
        <p>getting your emails</p>
      ) : (
        <div>
          {emails.length > 0 ? (
            emails.map((email) => <p>{email.subject}</p>)
          ) : (
            <p>No previous emails</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
