import axios from "axios";

import trashCan from "../assets/trans_can.png";
import Dialog from "./Dialog";
import { useState } from "react";

const TrashCan = ({ email }: { email: string }) => {
  const backendURL = import.meta.env.VITE_PORT;

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${backendURL}/delete-email/${email}`);

      if (res.status == 200) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
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
          title="Delete Email"
          content={<p>Are you sure you want to delete {email}?</p>}
          submitText="Delete"
          onSubmit={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default TrashCan;
