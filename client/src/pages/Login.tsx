import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const Login = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const user = res.data.payload;

      console.log(user);

      // Store the token
      localStorage.setItem("token", user);
      window.location.reload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="wrapper">
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
          {loading ? "Logging in..." : "Log in"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </main>
  );
};

export default Login;
