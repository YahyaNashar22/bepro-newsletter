import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const AddEmailManually = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/add-email`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status == 201) {
        setSuccess("Email added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.status == 400) setError("Email already exists");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        email:
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="email@provider.com..."
        />
      </label>
      <button type="submit" disabled={loading}>
        Add
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default AddEmailManually;
