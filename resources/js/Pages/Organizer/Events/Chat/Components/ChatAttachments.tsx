import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ChatAttachments = ({ files }: { files: any[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [previewFile, setPreviewFile] = useState<any>(null);
  const maxVisible = 3; // Show only first 4
  const visibleFiles = files.slice(0, maxVisible);
  const hiddenCount = files.length - maxVisible;

  const openPreview = (file: any) => {
    setPreviewFile(file);
    setShowModal(true);
  };

  const renderFilePreview = (file: any, idx: number) => {
    if (file.file_type?.startsWith("image/")) {
      return (
        <div
          key={idx}
          style={{ width: "120px",textAlign: "center",wordBreak: "break-word"}}
        >
          <img
            src={file.file_path}
            alt={file.file_name}
            className="chat-image rounded mb-1"
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
            onClick={() => openPreview(file)}
          />
          <small>{file.file_name}</small>
        </div>
      );
    } else if (file.file_type?.startsWith("video/")) {
      return (
        <div
          key={idx}
          style={{width: "120px",textAlign: "center",wordBreak: "break-word"}}
        >
          <video
            src={file.file_path}
            controls
            className="chat-video rounded mb-1"
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
            onClick={() => openPreview(file)}
          />
          <small>{file.file_name}</small>
        </div>
      );
    } else {
      return (
        <div
          key={idx}
          style={{width: "120px",textAlign: "center",wordBreak: "break-word"}}
        >
          <a
            href={file.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-file-link d-flex align-items-center justify-content-center mb-1 rounded"
            style={{background: "#a7a8a8",padding: "10px",width: "100%",height: "100px",color: "#000",fontWeight: "bold",textAlign: "center"}}
          >
            📎
          </a>
          <small>{file.file_name}</small>
        </div>
      );
    }
  };


  return (
    <>
      {files && files.length > 0 && (
        <div className="chat-attachments mt-2 d-flex flex-wrap gap-2">
          {visibleFiles.map((file, idx) => renderFilePreview(file, idx))}

          {/* Show +N more box if there are more files */}
          {hiddenCount > 0 && (
            <div
              onClick={() => setShowModal(true)}
              className="more-files rounded d-flex align-items-center justify-content-center"
              style={{width: "120px",height: "120px",background: "#e9ecef",fontWeight: "bold",cursor: "pointer",fontSize: "18px"}}
            >
              +{hiddenCount} more
            </div>
          )}
        </div>
      )}

      {/* Modal for showing all files */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>All Attachments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap gap-3">
            {files.map((file, idx) => renderFilePreview(file, idx))}
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for Image/Video preview */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setPreviewFile(null);
        }}
        size="lg"
        centered
      >
        <Modal.Body className="text-center">
          {previewFile &&
            (previewFile.file_type?.startsWith("image/") ? (
              <img
                src={previewFile.file_path}
                alt={previewFile.file_name}
                style={{ maxWidth: "100%", maxHeight: "80vh" }}
              />
            ) : previewFile.file_type?.startsWith("video/") ? (
              <video
                src={previewFile.file_path}
                controls
                style={{ maxWidth: "100%", maxHeight: "80vh" }}
              />
            ) : null)}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatAttachments;
