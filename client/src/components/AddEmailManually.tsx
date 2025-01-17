import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const AddEmailManually = () => {
  const backendURL = import.meta.env.VITE_PORT;

  const [email, setEmail] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendURL}/add-email`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error(error);
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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEmailManually;
