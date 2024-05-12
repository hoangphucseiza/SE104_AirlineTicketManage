import React, { useEffect, useContext, useCallback } from "react";

import { AppContext } from "../App";

function Alert() {
  const { alert, setAlert } = useContext(AppContext);

  const handleClose = useCallback(() => {
    setAlert(false);
  }, [setAlert]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [alert, handleClose]);

  return (
    <>
      {alert && (
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            display: "block",
            top: "80px",
            right: "4px",
            position: "fixed",
            zIndex: "9999",
            marginTop: "8px",
            maxWidth: "350px",
          }}
        >
          <div className="toast-header">
            <strong
              className={`me-auto ${
                alert.type === "success" ? "text-success" : "text-danger"
              }`}
              style={{
                fontSize: "1rem",
              }}
            >
              {alert.title}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="toast-body">{alert.data && alert.data}</div>
        </div>
      )}
    </>
  );
}

export default Alert;
