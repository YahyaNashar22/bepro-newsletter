import axios from "axios";

import trashCan from "../assets/trash.png";
import Dialog from "./Dialog";
import { useState } from "react";

const TrashCan = ({
  fetchEmails,
  email,
}: {
  email: string;
  fetchEmails: () => void;
}) => {
  const backendURL = import.meta.env.VITE_PORT;

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${backendURL}/delete-email/${email}`);

      if (res.status == 200) {
        fetchEmails();
        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src={trashCan}
        width={32}
        height={32}
        alt="trash can"
        onClick={() => setDialogOpen(true)}
      />
      {isDialogOpen && (
        <Dialog
          title="Remove Email"
          content={<p>Are you sure you want to delete {email}?</p>}
          submitText={loading ? "Removing..." : "Remove"}
          onSubmit={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default TrashCan;
