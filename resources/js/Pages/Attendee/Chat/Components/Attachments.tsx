import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

type AttachmentsProps = {
  showFileModal: boolean;
  setShowFileModal: (v: boolean) => void;
  sendFiles: (files: File[]) => void;
};

const Attachments: React.FC<AttachmentsProps> = ({ showFileModal, setShowFileModal, sendFiles }) => {
  const { t } = useLaravelReactI18n();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // build/revoke object URLs to avoid memory leaks
  useEffect(() => {
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [selectedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    // clear input so the same file can be re-selected
    e.currentTarget.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <Modal show={showFileModal} onHide={() => setShowFileModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{t("Attach Files")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          type="file"
          multiple
          className="form-control mb-3"
          onChange={handleFileChange}
          aria-label={t("Attach Files")}
        />

        {selectedFiles.length > 0 && (
          <div className="d-flex flex-wrap gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="border rounded p-2 text-center"
                style={{ width: "120px", position: "relative", background: "#f8f9fa" }}
              >
                <button
                  type="button"
                  className="btn-close btn-sm"
                  style={{ position: "absolute", top: 4, right: 4 }}
                  onClick={() => removeFile(index)}
                  aria-label={t("Delete")}
                  title={t("Delete")}
                />

                {isImage(file) ? (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 4 }}
                  />
                ) : file.type === "application/pdf" ? (
                  <div style={{ fontSize: 40, color: "#d9534f", marginTop: 10 }} aria-hidden>
                    📄
                  </div>
                ) : (
                  <div style={{ fontSize: 40, color: "#6c757d", marginTop: 10 }} aria-hidden>
                    📎
                  </div>
                )}

                <small className="d-block text-truncate mt-1" title={file.name}>
                  {file.name}
                </small>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFileModal(false)}>
          {t("Cancel")}
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
          {t("Send")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Attachments;
