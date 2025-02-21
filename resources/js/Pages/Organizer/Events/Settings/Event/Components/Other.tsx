import { useForm } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Modal, ModalBody, ModalDialog, ModalFooter } from 'react-bootstrap';

export default function Other() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);

  const deleteForm = useForm({
    name: ''
  });

  const handleDelete = () => {
    deleteForm.delete(route('organizer.events.settings.event.destroy'));
  }

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
                  onChange={(e) => deleteForm.setData({...deleteForm.data, name: e.target.value})}
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
            >
              Yes, Delete It!
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
