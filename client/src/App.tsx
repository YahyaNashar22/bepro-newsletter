import "./App.css";
import AddEmailManually from "./components/AddEmailManually";
import AvailableEmails from "./components/AvailableEmails";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <>
      <FileUpload />
      <AvailableEmails />
      <AddEmailManually />
    </>
  );
}

export default App;
