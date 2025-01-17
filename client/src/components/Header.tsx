import { useState } from "react";
import excel from "../assets/excel.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";
import Dialog from "./Dialog";
import FileUpload from "./FileUpload";
import AddEmailManually from "./AddEmailManually";
import DeleteEmail from "./DeleteEmail";

const Header = () => {
  const [isExcelDialogOpen, setExcelDialogOpen] = useState<boolean>(false);
  const [isManualAddDialogOpen, setManualAddDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const openExcelDialog = () => {
    setExcelDialogOpen(true);
  };
  const openManualAddDialog = () => {
    setManualAddDialogOpen(true);
  };
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setExcelDialogOpen(false);
    setManualAddDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleSubmit = () => {};
  return (
    <>
      <header>
        <nav>
          <ul>
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
          </ul>
        </nav>
      </header>

      {isExcelDialogOpen && (
        <Dialog
          title="Upload From Excel"
          content={<FileUpload />}
          submitText="Delete"
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isManualAddDialogOpen && (
        <Dialog
          title="Add Email Manually"
          content={<AddEmailManually />}
          submitText="Delete"
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
      {isDeleteDialogOpen && (
        <Dialog
          title="Remove Email"
          content={<DeleteEmail />}
          submitText="Remove"
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
          showSubmit={false}
        />
      )}
    </>
  );
};

export default Header;
