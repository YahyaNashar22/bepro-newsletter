import { useEffect, useState } from "react";
import AvailableEmails from "../components/AvailableEmails";
import Header from "../components/Header";
import axios from "axios";

export interface email {
  email: string;
  _id: string;
}

const Home = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [emails, setEmails] = useState<[] | email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    fetchEmails();
  }, [backendURL]);

  return (
    <>
      <Header fetchEmails={fetchEmails} />
      <AvailableEmails emails={emails} loading={loading} fetchEmails={fetchEmails} />
    </>
  );
};

export default Home;
