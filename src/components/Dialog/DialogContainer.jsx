import "./DialogContainer.scss";
import { Dialog, TextField, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DialogContainer = ({ open, handleClose }) => {
  const [data, setData] = useState({
    itemName: "",
    price: "",
    photoURL: "",
    description: "",
  });
  const [fileUpload, setFileUpload] = useState(null);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [snackStatus, setSnackStatus] = useState({
    open: false,
    message: "",
  });

  const handleSubmit = async () => {
    const collectionRef = collection(db, "items");
    try {
      await addDoc(collectionRef, data);
      setSnackStatus({
        open: true,
        message: "Item Added",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleImgUpload = async () => {
    if (!fileUpload) {
      setSnackStatus({
        open: true,
        message: "No files were found",
      });
    }
    try {
      const imgRef = ref(storage, `files/${fileUpload.name}`);
      await uploadBytes(imgRef, fileUpload);
      const downloadURL = await getDownloadURL(imgRef);
      setData({
        ...data,
        photoURL: downloadURL,
      });

      setSnackStatus({
        open: true,
        message: "File upload successful",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSnackClose = () => {
    setSnackStatus({
      open: false,
      message: "",
    });
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <div className="dialog-container">
        <TextField
          id="outlined-basic"
          label="Item Name"
          variant="outlined"
          type="text"
          name="itemName"
          value={data.itemName}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <div className="dialog-files">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <Button variant="contained" onClick={handleImgUpload}>
            SUBMIT
          </Button>
        </div>
        <div className="btn-container">
          <Button variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            CLOSE
          </Button>
        </div>
      </div>
      <Snackbar
        open={snackStatus.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={snackStatus.message}
      />
    </Dialog>
  );
};

export default DialogContainer;
