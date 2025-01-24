import { useState } from "react";
import excel from "../assets/excel.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";
import email from "../assets/email.png";
import signout from "../assets/signout.png";

import Dialog from "./Dialog";
import FileUpload from "./FileUpload";
import AddEmailManually from "./AddEmailManually";
import DeleteEmail from "./DeleteEmail";
import SendBulkEmails from "./SendBulkEmails";

const Header = ({ fetchEmails }: { fetchEmails: () => void }) => {
  const [isExcelDialogOpen, setExcelDialogOpen] = useState<boolean>(false);
  const [isManualAddDialogOpen, setManualAddDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isEmailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);
  const [isSignoutDialogOpen, setSignoutDialogOpen] = useState<boolean>(false);

  const openExcelDialog = () => {
    setExcelDialogOpen(true);
  };
  const openManualAddDialog = () => {
    setManualAddDialogOpen(true);
  };
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };
  const openSignoutDialog = () => {
    setSignoutDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setExcelDialogOpen(false);
    setManualAddDialogOpen(false);
    setDeleteDialogOpen(false);
    setEmailDialogOpen(false);
    setSignoutDialogOpen(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
        <nav>
          <ul className="navLinks">
            <li className="navLink">
              <img
                src={excel}
                width={64}
                height={64}
                alt="nav icons"
                onClick={openExcelDialog}
              />
            </li>
            <li className="navLink">
              <img
                src={plus}
                width={64}
                height={64}
                alt="nav icons"
                onClick={openManualAddDialog}
              />
            </li>
            <li className="navLink">
              <img
                src={trash}
                width={64}
                height={64}
                alt="nav icons"
                onClick={openDeleteDialog}
              />
            </li>
            <li className="navLink">
              <img
                src={email}
                width={64}
                height={64}
                alt="nav icons"
                onClick={openEmailDialog}
              />
            </li>
            <li className="navLink">
              <img
                src={signout}
                width={64}
                height={64}
                alt="nav icons"
                onClick={openSignoutDialog}
              />
            </li>
          </ul>
        </nav>

      {isExcelDialogOpen && (
        <Dialog
          title="Upload From Excel"
          content={
            <FileUpload
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          submitText="Delete"
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isManualAddDialogOpen && (
        <Dialog
          title="Add Email Manually"
          content={
            <AddEmailManually
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          submitText="Delete"
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isDeleteDialogOpen && (
        <Dialog
          title="Remove Email"
          content={
            <DeleteEmail
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          submitText="Remove"
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isEmailDialogOpen && (
        <Dialog
          title="Send Email"
          content={<SendBulkEmails handleCloseDialog={handleCloseDialog} />}
          submitText="Send"
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isSignoutDialogOpen && (
        <Dialog
          title="Sign Out"
          content={
            <p style={{ fontSize: "1.2rem" }}>
              Are you sure you want to sign out?
            </p>
          }
          submitText="sign out"
          onClose={handleCloseDialog}
          onSubmit={handleSignout}
        />
      )}
    </>
  );
};

export default Header;
