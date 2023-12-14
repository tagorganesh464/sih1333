import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DropFileInput from '../drop-file-input/DropFileInput';
import UploadButton from '../upload-button/UploadButton';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import './UploadVideo.css';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false); // New state variable

  const onFileChange = (files) => {
    const currentFile = files[0];
    setFile(currentFile);
    console.log(files);
  };

  const handleClick = () => {
    if (file === null) return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log('Error:', error);
      },
      () => {
        console.log('Upload complete!');
        setUploadComplete(true); // Set upload complete status
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
        });
      }
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Reset state when the modal is closed
    setUploadProgress(0);
    setUploadComplete(false);
  };

  const handleShow = () => {
    setShow(true);
    setUploadProgress(0);
    setUploadComplete(false);
  };

  return (
    <div>
      <Button className="btn btn-dark d-block ms-auto p-3 mt-2 mx-2 " onClick={handleShow}>
        <i className="fa-solid fa-cart-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <DropFileInput onFileChange={(files) => onFileChange(files)} />
          <br />
          <UploadButton onClick={() => handleClick()}>Upload</UploadButton>

          {/* Display the progress bar */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress-container">
              <ProgressBar now={uploadProgress} label={`${uploadProgress.toFixed(2)}%`} />
            </div>
          )}

          {/* Display upload complete message */}
          {uploadComplete && uploadProgress === 100 && (
            <p className="text-success">Upload complete!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadVideo;
