import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Dialog from "./Dialog";

import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";
import step5 from "../assets/step5.png";
import step6 from "../assets/step6.png";

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
          title="Instructions"
          content={<InstructionsDialog />}
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

export const InstructionsDialog = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const steps = [
    {
      title: "Step 1",
      description:
        "Go to 'Manage Your Google Account' and from the left pane click on 'Security'",
      image: step1,
    },
    {
      title: "Step 2",
      description:
        "Scroll Down to '2-Step Verification' and make sure it is activated ( mandatory )",
      image: step2,
    },
    {
      title: "Step 3",
      description:
        "After making sure '2-Step Verification' is activated, scroll down to 'App Passwords'",
      image: step3,
    },
    {
      title: "Step 4",
      description:
        "Create a new 'App Password' and name it whatever you want ( maybe something like mailer-app )",
      image: step4,
    },
    {
      title: "Step 5",
      description:
        "Make sure to save the generated password somewhere safe, as it is a one time only generated password and can't be accessed later on",
      image: step5,
    },
    {
      title: "Step 6",
      description:
        "Paste the app password that you copied each time you want to send an email. You can generate as much app passwords as you want and use them here",
      image: step6,
    },
  ];
  return (
    <div className="instructions-container">
      <h1 className="instructions-title">Instructions</h1>
      <div className="instructions-content">
        <h2 className="instructions-greetings">
          Welcome To Your New Emails Dashboard
        </h2>
        <h3 className="instructions-steps-title">
          Please follow the steps below to grant access for sending emails
        </h3>

        <div className="steps-list">
          {steps.map((step, index) => (
            <div className="step-container" key={index}>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-content">{step.description}</p>
              <Zoom>
                <img
                  src={step.image}
                  width={300}
                  className="step-image"
                  alt={`Step ${index + 1}`}
                  loading="lazy"
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>

      <p className="instructions-enjoy">Enjoy!</p>

      {/* Full-Screen Image Modal */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <img src={modalImage} className="modal-image" alt="Full View" />
        </div>
      )}
    </div>
  );
};
