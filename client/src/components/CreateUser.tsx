import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateUser = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${backendURL}/create-user`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="file-upload-container"
    >
      <label>
        username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="your username"
          className="file-input"
        />
      </label>

      <label>
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="your password"
          className="file-input"
        />
      </label>
      <button type="submit" disabled={loading} className="upload-btn">
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateUser;
