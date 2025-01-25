import { email } from "../pages/Home";
import TrashCan from "./TrashCan";

const AvailableEmails = ({
  emails,
  loading,
  fetchEmails,
}: {
  emails: email[];
  loading: boolean;
  fetchEmails: () => void;
}) => {
  return (
    <main className="emails-main">
      <h1 className="title">
        {" "}
        <span id="normal"></span>Available Emails
      </h1>
      <ul className="emails-container">
        {loading ? (
          <li className="loader">Getting your emails...</li>
        ) : emails.length > 0 ? (
          emails.map((email) => {
            return (
              <li className="email" key={email._id}>
                {email.email}{" "}
                <span>
                  <TrashCan email={email.email} fetchEmails={fetchEmails} />
                </span>
              </li>
            );
          })
        ) : (
          <p className="no-emails-text">You don't have any emails!</p>
        )}
      </ul>
    </main>
  );
};

export default AvailableEmails;
