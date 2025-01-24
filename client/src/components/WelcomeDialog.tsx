import { useEffect, useState } from "react";
import Dialog from "./Dialog";

const WelcomeDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenDialog");
    if (!hasSeenDialog) {
      setIsDialogOpen(true);
    }
  }, []);

  const handleCloseDialog = () => {
    localStorage.setItem("hasSeenDialog", "true");
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && (
        <Dialog
          title="Welcome Hadiyya!"
          content={<WelcomeDialogContent />}
          onSubmit={handleCloseDialog}
          submitText="Continue!"
          showClose={false}
          showTitle={false}
        />
      )}
    </>
  );
};

export default WelcomeDialog;

const WelcomeDialogContent = () => {
  return (
    <div className="dashboard-welcome">
      <h1 className="dashboard-title">Hello Hadiyya!</h1>
      <h2 className="dashboard-subtitle">
        Welcome To Your New Emails Dashboard
      </h2>
      <p className="dashboard-version">This is version 2.0</p>
      <p className="dashboard-message">
        Additional enhancements can be done based on your request
      </p>
      <p className="dashboard-enjoy">Enjoy!</p>
    </div>
  );
};
