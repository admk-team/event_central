import { useForm } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Modal, ModalBody, ModalDialog, ModalFooter, Spinner } from 'react-bootstrap';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Other() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = React.useState(false);
  const events = usePage().props.event as Record<string, string>;
  const closeRegistration = usePage().props.closeRegistration as Record<string, string>;
  const [registrationClosed, setRegistrationClosed] = React.useState(
    Boolean(Number(events.registration_closed))
  );


  const deleteForm = useForm({
    name: ''
  });

  const event = {
    id: events.id,
  };

  const handleDelete = () => {
    deleteForm.delete(route('organizer.events.settings.event.destroy'));
  }

  const handleCloseRegistration = () => {
    deleteForm.processing = true;

    deleteForm.post(route('organizer.events.settings.event.close.open.registration', event.id), {
      onSuccess: () => {
        setRegistrationClosed(true);
        setShowCloseConfirmation(false);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onFinish: () => {
        deleteForm.processing = false;
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Other</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-grid grid">
            <Form.Label>Permanently erase this event and all its data.</Form.Label>
            <Button variant="danger" onClick={() => setShowDeleteConfirmation(true)}><i className='bx bxs-trash'></i> Delete Event</Button>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className="d-grid grid">
            {closeRegistration ? (
              <>
                <Button variant="danger" onClick={handleCloseRegistration}>
                  <i className='bx bxs-lock-open'></i> Open Registration
                </Button>
                <small className=" text-muted mt-2">
                  Registration is currently closed. Click to reopen it and allow attendees to register.
                </small>
              </>
            ) : (
              <>
                <Button variant="danger" onClick={() => setShowCloseConfirmation(true)}>
                  <i className="bx bxs-lock"></i> Close Registration
                </Button>
                <small className="text-muted mt-2">
                  Registration is currently open. Click to close it and prevent further registrations.
                </small>
              </>
            )}
          </div>
        </CardBody>
      </Card>

      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered={true}>
        <Modal.Body className="py-3 px-5">
          <div className="mt-2 text-center">
            <i className="ri-error-warning-line display-5 text-danger"></i>
            <div className="mt-4 pt-2 fs-15">
              <h4>Are you sure you want to delete this event?</h4>
              <p className="text-muted mx-4 mb-3">
                Deleting your event will permanently remove all information.
              </p>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Type the name of event"
                  value={deleteForm.data.name}
                  onChange={(e) => deleteForm.setData({ ...deleteForm.data, name: e.target.value })}
                  isInvalid={!!deleteForm.errors.name}
                />
                {deleteForm.errors.name && (
                  <Form.Control.Feedback type="invalid">{deleteForm.errors.name}</Form.Control.Feedback>
                )}
              </Form.Group>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              data-bs-dismiss="modal"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
              onClick={handleDelete}
              disabled={deleteForm.processing}
            >
              {deleteForm.processing ? (
                <span className="d-flex gap-1 align-items-center">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Deleting
                </span>
              ) : (
                <span>Yes, Delete It!</span>
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Close Registration Modal */}
      <Modal show={showCloseConfirmation} onHide={() => setShowCloseConfirmation(false)} centered={true}>
        <Modal.Body className="py-3 px-5">
          <div className="mt-2 text-center">
            <i className="ri-error-warning-line display-5 text-danger"></i>
            <div className="mt-4 pt-2 fs-15">
              <h4>Are you sure you want to Close Registration of this event?</h4>
              <Form.Control
                type='hidden'
                value={event.id}
              >
              </Form.Control>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              data-bs-dismiss="modal"
              onClick={() => setShowCloseConfirmation(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
              onClick={handleCloseRegistration}
              disabled={deleteForm.processing}
            >
              {deleteForm.processing ? (
                <span className="d-flex gap-1 align-items-center">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Closing Registration
                </span>
              ) : (
                <span>Yes, Close It!</span>
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
