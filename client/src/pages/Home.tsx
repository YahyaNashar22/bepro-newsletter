import { useEffect, useState } from "react";
import AvailableEmails from "../components/AvailableEmails";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import { User } from "../interfaces";
import { jwtDecode } from "jwt-decode";
import WelcomeDialog from "../components/WelcomeDialog";

export interface email {
  email: string;
  _id: string;
}

const Home = () => {
  const backendURL = import.meta.env.VITE_PORT;
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [emails, setEmails] = useState<[] | email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(`${backendURL}/get-emails/${user._id}`);
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
      <main className="home-container">
        <WelcomeDialog />
        <Header fetchEmails={fetchEmails} />
        <AvailableEmails
          emails={emails}
          loading={loading}
          fetchEmails={fetchEmails}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
