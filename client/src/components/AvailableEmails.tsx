import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      <h1>AvailableEmails:</h1>
      {loading ? (
        <p>loading</p>
      ) : emails.length > 0 ? (
        emails.map((email) => {
          return <div key={email._id}>{email.email}</div>;
        })
      ) : (
        <p>no emails</p>
      )}
    </div>
  );
};

export default AvailableEmails;
