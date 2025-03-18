import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditFooterModal({ show, hide, onHide, page }: { show: boolean, hide: () => void, onHide: () => void, page: any | null }) {
  const isEdit = page != null ? true : false;

  const { data, setData, post, processing, errors, reset } = useForm({
    _method: isEdit ? "PUT" : "POST",
    title: page?.title ?? '',
  });

  const submit = (e: any) => {
    e.preventDefault();

    if (isEdit) {
      post(route('organizer.events.footers.update', page.id), {
        preserveScroll: true,
        onSuccess: () => {
          hide();
        }
      });
    } else {
      post(route('organizer.events.footers.store'), {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          hide();
        }
      });
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light p-3" closeButton>
        <h5 className="modal-title">
          {isEdit ? 'Edit Footer' : 'Add Footer'}
        </h5>
      </Modal.Header>

      <Form onSubmit={submit} className="tablelist-form">
        <Modal.Body>
          <FormGroup className="mb-3">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              isInvalid={!!errors.title}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            )}
          </FormGroup>
        </Modal.Body>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={hide}
            >
              Close
            </button>

            <button type="submit" className="btn btn-success" disabled={processing}>
              {processing ? (
                <span className="d-flex gap-1 align-items-center">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {isEdit ? 'Updating' : 'Creating'}
                </span>
              ) : (
                <span>{isEdit ? 'Update' : 'Create'}</span>
              )}
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
