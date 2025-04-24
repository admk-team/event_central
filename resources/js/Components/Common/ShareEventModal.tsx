import { Facebook, Share2, Twitter } from "lucide-react";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { SocialIcon } from 'react-social-icons'



type ShareEventModalProps = {
  show: boolean;
  onHide: () => void;
  event: any;
}

const ShareEventModal: React.FC<ShareEventModalProps> = ({ show, onHide, event }) => {
  return (
    <Modal show={show} onHide={onHide} centered={true}>
      <Modal.Body className="py-3">
        <div className="mt-2 text-center">
          <div className="pt-2 fs-15 mx-4 mx-sm-5">
            <h2 className="mb-4">Share</h2>
            <div className="d-flex justify-content-center flex-wrap gap-2">
              <Button variant="light rounded-circle p-0" style={{ width: '40px', height: '40px' }}>
                <SocialIcon url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(route('organizer.events.website', event.uuid))}`} className="w-100 h-100" target="_blank" />
              </Button>
              <Button variant="light rounded-circle p-0" style={{ width: '40px', height: '40px' }}>
                <SocialIcon network="x" url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.name)}&url=${encodeURIComponent(route('organizer.events.website', event.uuid))}`} className="w-100 h-100" target="_blank"  />
              </Button>
              <Button variant="light rounded-circle p-0" style={{ width: '40px', height: '40px' }}>
                <SocialIcon url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(route('organizer.events.website', event.uuid))}`} className="w-100 h-100" target="_blank"  />
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end mt-4">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onHide}
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareEventModal;
