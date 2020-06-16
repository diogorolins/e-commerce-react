import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Snack = (props) => {
  const { openSnack, handleCloseSnack, erros, severity } = props;

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity={severity} variant="filled">
          {erros}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Snack;
