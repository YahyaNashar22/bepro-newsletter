import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

function FileUpload() {
  const backendURL = import.meta.env.VITE_PORT;

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please upload a valid Excel file (.xls or .xlsx)");
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("No file selected or invalid file type");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${backendURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FileUpload;
