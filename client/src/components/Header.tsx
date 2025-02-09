import { useState } from "react";
import excel from "../assets/excel.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";
import email from "../assets/email.png";
import signout from "../assets/signout.png";
import history from "../assets/history.png";
import userIco from "../assets/user.png";
import signoutLarge from "../assets/signout_large.png";

import Dialog from "./Dialog";
import FileUpload from "./FileUpload";
import AddEmailManually from "./AddEmailManually";
import DeleteEmail from "./DeleteEmail";
import SendBulkEmails from "./SendBulkEmails";
import EmailHistory from "./EmailHistory";
import { jwtDecode } from "jwt-decode";
import { User } from "../interfaces";
import CreateUser from "./CreateUser";

const Header = ({ fetchEmails }: { fetchEmails: () => void }) => {
  const token = localStorage.getItem("token");
  const user: User = jwtDecode(token!);

  const [isExcelDialogOpen, setExcelDialogOpen] = useState<boolean>(false);
  const [isManualAddDialogOpen, setManualAddDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isEmailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);
  const [isEmailHistoryOpen, setEmailHistoryOpen] = useState<boolean>(false);
  const [isRegisterUserDialogOpen, setRegisterUserDialogOpen] =
    useState<boolean>(false);
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
  const openEmailHistoryDialog = () => {
    setEmailHistoryOpen(true);
  };
  const openRegisterUserDialog = () => {
    setRegisterUserDialogOpen(true);
  };
  const openSignoutDialog = () => {
    setSignoutDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setExcelDialogOpen(false);
    setManualAddDialogOpen(false);
    setDeleteDialogOpen(false);
    setEmailDialogOpen(false);
    setEmailHistoryOpen(false);
    setSignoutDialogOpen(false);
    setRegisterUserDialogOpen(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <nav>
        <ul className="navLinks">
          <li className="navLink" onClick={openExcelDialog}>
            <img src={excel} width={32} height={32} alt="nav icons" />
            <p>Excel</p>
          </li>
          <li className="navLink" onClick={openManualAddDialog}>
            <img src={plus} width={32} height={32} alt="nav icons" />
            <p>Add Mail</p>
          </li>
          <li className="navLink" onClick={openDeleteDialog}>
            <img src={trash} width={32} height={32} alt="nav icons" />
            <p>Trash</p>
          </li>
          <li className="navLink" onClick={openEmailDialog}>
            <img src={email} width={32} height={32} alt="nav icons" />
            <p>Create Mail</p>
          </li>
          <li className="navLink" onClick={openEmailHistoryDialog}>
            <img src={history} width={32} height={32} alt="nav icons" />
            <p>History</p>
          </li>
          {user.role === "admin" && (
            <li className="navLink" onClick={openRegisterUserDialog}>
              <img src={userIco} width={32} height={32} alt="nav icons" />
              <p>Register Client</p>
            </li>
          )}
          <li className="navLink" onClick={openSignoutDialog}>
            <img src={signout} width={32} height={32} alt="nav icons" />
            <p>Logout</p>
          </li>
        </ul>
      </nav>

      {isExcelDialogOpen && (
        <Dialog
          content={
            <FileUpload
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isManualAddDialogOpen && (
        <Dialog
          content={
            <AddEmailManually
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isDeleteDialogOpen && (
        <Dialog
          content={
            <DeleteEmail
              handleCloseDialog={handleCloseDialog}
              fetchEmails={fetchEmails}
            />
          }
          submitText="Remove"
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isEmailDialogOpen && (
        <Dialog
          content={<SendBulkEmails handleCloseDialog={handleCloseDialog} />}
          submitText="Send"
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isEmailHistoryOpen && (
        <Dialog
          content={<EmailHistory />}
          submitText="Send"
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isRegisterUserDialogOpen && (
        <Dialog
          content={<CreateUser />}
          onClose={handleCloseDialog}
          showSubmit={false}
          showTitle={false}
        />
      )}
      {isSignoutDialogOpen && (
        <Dialog
          content={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <img src={signoutLarge} width={64} height={64} alt="signout" />
              <h1 className="form-title">Sign Out</h1>
              <p style={{ fontSize: "1.2rem" }}>
                Are you sure you want to sign out?
              </p>
            </div>
          }
          submitText="sign out"
          onClose={handleCloseDialog}
          onSubmit={handleSignout}
          showTitle={false}
        />
      )}
    </>
  );
};

export default Header;
