import React, { ReactNode } from "react";

interface DialogProps {
  title: string;
  content: ReactNode;
  submitText: string;
  onSubmit: () => void;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  submitText,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2 className="dialog-title">{title}</h2>
        <div className="dialog-content">{content}</div>
        <div className="dialog-actions">
          <button className="dialog-close-btn" onClick={onClose}>
            Close
          </button>
          <button className="dialog-submit-btn" onClick={onSubmit}>
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
