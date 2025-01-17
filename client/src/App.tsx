import "./App.css";
import AddEmailManually from "./components/AddEmailManually";
import AvailableEmails from "./components/AvailableEmails";
import DeleteEmail from "./components/DeleteEmail";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import SendBulkEmails from "./components/SendBulkEmails";

function App() {
  return (
    <>
      <Header />
      <FileUpload />
      <AvailableEmails />
      <AddEmailManually />
      <SendBulkEmails />
      <DeleteEmail />
    </>
  );
}

export default App;
