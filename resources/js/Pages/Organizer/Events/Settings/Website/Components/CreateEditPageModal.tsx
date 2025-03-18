import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditPageModal({ show, hide, onHide, page }: { show: boolean, hide: () => void, onHide: () => void, page: any | null }) {
  const isEdit = page != null ? true : false;

  const headers = usePage()?.props?.headers as any;
  const footers = usePage()?.props?.footers as any;


  const { data, setData, post, processing, errors, reset } = useForm({
    _method: isEdit ? "PUT" : "POST",
    title: page?.title ?? '',
    slug: page?.slug ?? '',
    default_header: page?.default_header ?? true,
    header_id: page?.header_id ?? '',
    default_footer: page?.default_footer ?? true,
    footer_id: page?.footer_id ?? '',
  });

  const submit = (e: any) => {
    e.preventDefault();

    if (isEdit) {
      post(route('organizer.events.pages.update', page.id), {
        preserveScroll: true,
        onSuccess: () => {
          hide();
        }
      });
    } else {
      post(route('organizer.events.pages.store'), {
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
          {isEdit ? 'Edit Page' : 'Add Page'}
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
          <FormGroup className="mb-3">
            <Form.Label className="form-label">Slug</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              isInvalid={!!errors.slug}
            />
            {errors.slug && (
              <Form.Control.Feedback type="invalid">{errors.slug}</Form.Control.Feedback>
            )}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label className="form-label d-flex justify-content-between align-items-center">
              <div>Header</div>
              <div className="form-check form-switch mb-0">
                <Form.Check.Input
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="defaultHeaderSwitch" 
                  checked={data.default_header}
                  onChange={(e) => setData((prev) => ({...prev, default_header: e.target.checked}))}
                />
                <Form.Check.Label className="form-check-label" htmlFor="defaultHeaderSwitch">Use default</Form.Check.Label>
              </div>
            </Form.Label>
            <Form.Select 
              value={data.header_id}
              onChange={(e) => setData((prev) => ({...prev, header_id: e.target.value}))}
              disabled={data.default_header}
            >
              <option value="">Select</option>
              {headers.data.map((header: any) => (
                <option value={header.id}>{header.title}</option>
              ))}
            </Form.Select>
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label className="form-label d-flex justify-content-between align-items-center">
              <div>Footer</div>
              <div className="form-check form-switch mb-0">
                <Form.Check.Input
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="defaultFooterSwitch" 
                  checked={data.default_footer}
                  onChange={(e) => setData((prev) => ({...prev, default_footer: e.target.checked}))}
                />
                <Form.Check.Label className="form-check-label" htmlFor="defaultFooterSwitch">Use default</Form.Check.Label>
              </div>
            </Form.Label>
            <Form.Select 
              value={data.footer_id}
              onChange={(e) => setData((prev) => ({...prev, footer_id: e.target.value}))}
              disabled={data.default_footer}
            >
              <option value="">Select</option>
              {footers.data.map((footer: any) => (
                <option key={footer.id} value={footer.id}>{footer.title}</option>
              ))}
            </Form.Select>
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
