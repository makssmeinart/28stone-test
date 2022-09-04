import { useDispatch, useSelector } from "react-redux";
import { updateErrorMessage } from "src/main/bll/reducers/appReducer";
import { selectError } from "src/main/bll/selectors";
import { Snackbar } from "src/main/components"

export const ErrorSnackbar = () => {
  const error = useSelector(selectError)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updateErrorMessage(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={3000}
      onClose={handleClose}
      error={error ? error : ""}
    />
  );
};