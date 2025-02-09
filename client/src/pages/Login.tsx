import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import person from "../assets/person.png";

const Login = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    if (name === "identifier") setIdentifier(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/login`,
        { identifier, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const user = res.data.payload;

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
        className="file-upload-container login-form"
      >
        <img src={person} width={64} height={64}  alt="person" className="person" />
        <label  className="login-label">
          <input
            type="text"
            name="identifier"
            value={identifier}
            onChange={handleChange}
            placeholder="Username or Email"
            className="login-input"
          />
        </label>

        <label className="login-label">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="login-input"
          />
        </label >
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Log in"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </main>
  );
};

export default Login;
