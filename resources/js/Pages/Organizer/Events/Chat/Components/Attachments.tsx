import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Attachments = ({ showFileModal, setShowFileModal, sendFiles }: any) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Helper to check if file is image
  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <Modal show={showFileModal} onHide={() => setShowFileModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Attach Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="file"
          multiple
          className="form-control mb-3"
          onChange={handleFileChange}
        />

        {selectedFiles.length > 0 && (
          <div className="d-flex flex-wrap gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="border rounded p-2 text-center"
                style={{width: "120px",position: "relative",background: "#f8f9fa"}}
              >
                {/* Remove Button */}
                <button
                  type="button"
                  className="btn-close btn-sm"
                  style={{position: "absolute",top: "4px",right: "4px"}}
                  onClick={() => removeFile(index)}
                ></button>

                {/* File Preview */}
                {isImage(file) ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{width: "100%", height: "80px",objectFit: "cover",borderRadius: "4px" }}
                  />
                ) : file.type === "application/pdf" ? (
                  <div
                    style={{fontSize: "40px",color: "#d9534f",marginTop: "10px"}}
                  >
                    📄
                  </div>
                ) : (
                  <div
                    style={{fontSize: "40px",color: "#6c757d",marginTop: "10px"}}
                  >
                    📎
                  </div>
                )}

                {/* File Name */}
                <small
                  className="d-block text-truncate mt-1"
                  title={file.name}
                >
                  {file.name}
                </small>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFileModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={selectedFiles.length === 0}
          onClick={() => {
            sendFiles(selectedFiles);
            setSelectedFiles([]);
            setShowFileModal(false);
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Attachments;
