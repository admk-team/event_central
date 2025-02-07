import React, { useState } from "react";
import { Modal, ProgressBar, Dropdown, Form, Button, } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../../images/users/avatar-2.jpg";
import image4 from "../../../images/users/avatar-4.jpg";
import image3 from "../../../images/users/avatar-3.jpg";
import image5 from "../../../images/users/avatar-5.jpg";
import { Link } from "@inertiajs/react";

const EmailSidebar = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  return (
    <React.Fragment>
      <div className="email-menu-sidebar">
        <div className="p-4 d-flex flex-column h-100">
          <div className="pb-4 border-bottom border-bottom-dashed">
            <button
              type="button"
              className="btn btn-secondary w-100"
              data-bs-toggle="modal"
              data-bs-target="#composemodal"
              onClick={() => {
                setModal(true);
              }}
            >

              Compose
            </button>
          </div>

          <SimpleBar
            className="mx-n4 px-4 email-menu-sidebar-scroll"
            data-simplebar>
            <div className="mail-list mt-3">
              <div>
                <Button as="a" variant="link" className="active p-0">
                  <i className="ri-inbox-archive-fill me-3 align-middle fw-medium"></i>{" "}
                  {/* Inbox{" "} */}
                  <span className="mail-list-link">Inbox</span>
                  <span className="badge bg-success-subtle text-success ms-auto ">5</span>
                </Button>
              </div>
              <Button variant="link" className="p-0">
                <i className="ri-send-plane-2-fill me-3 align-middle fw-medium"></i>{" "}
                Sent
              </Button>
              <Button variant="link" className="p-0">
                <i className="ri-edit-2-fill me-3 align-middle fw-medium"></i>{" "}
                Draft
              </Button>
              <Button variant="link" className="p-0">
                <i className="ri-error-warning-fill me-3 align-middle fw-medium"></i>
                Spam
              </Button>
              <Button variant="link" className="p-0">
                <i className="ri-delete-bin-5-fill me-3 align-middle fw-medium"></i>
                Trash
              </Button>
              <Button variant="link" className="p-0">
                <i className="ri-star-fill me-3 align-middle fw-medium"></i>
                Starred
              </Button>
              <Button variant="link" className="p-0">
                <i className="ri-price-tag-3-fill me-3 align-middle fw-medium"></i>
                Important
              </Button>
            </div>

            <div>
              <h5 className="fs-12 text-uppercase text-muted mt-4">Labels</h5>

              <div className="mail-list mt-1">
                <Button variant="link" className="p-0">
                  <span className="ri-checkbox-blank-circle-line me-2 text-info"></span>{" "}
                  Theme Support{" "}
                  <span className="badge bg-success-subtle text-success ms-auto">3</span>
                </Button>
                <Button variant="link" className="p-0">
                  <span className="ri-checkbox-blank-circle-line me-2 text-warning"></span>{" "}
                  Freelance
                </Button>
                <Button variant="link" className="p-0">
                  <span className="ri-checkbox-blank-circle-line me-2 text-primary"></span>{" "}
                  Social
                </Button>
                <Button variant="link" className="p-0">
                  <span className="ri-checkbox-blank-circle-line me-2 text-danger"></span>{" "}
                  Friends
                  <span className="badge bg-success-subtle text-success ms-auto">2</span>
                </Button>
                <Button variant="link" className="p-0">
                  <span className="ri-checkbox-blank-circle-line me-2 text-success"></span>{" "}
                  Family
                </Button>
              </div>
            </div>

            <div className="p-0 border-top border-top-dashed pt-3 mt-3">
              <Button
                variant="link"
                className="btn btn-icon btn-sm btn-soft-info rounded-pill float-end"
              >
                <i className="bx bx-plus fs-16"></i>
              </Button>
              <h5 className="fs-12 text-uppercase text-muted mb-3">Chat</h5>

              <div className="mt-2 vstack gap-3 email-chat-list mx-n4">
                <Button variant="link" className="p-0 d-flex align-items-center active">
                  <div className="flex-shrink-0 me-2 avatar-xs">
                    <img
                      className="img-fluid rounded-circle"
                      src={image2}
                      alt=""
                    />
                  </div>

                  <div className="flex-grow-1 chat-user-box overflow-hidden">
                    <h5 className="fs-13 text-truncate mb-0">Scott Median</h5>
                    <small className="text-muted text-truncate mb-0">
                      Hello ! are you there?
                    </small>
                  </div>
                </Button>

                <Button variant="link" className="p-0 d-flex align-items-center">
                  <div className="flex-shrink-0 me-2 avatar-xs">
                    <img
                      className="img-fluid rounded-circle"
                      src={image4}
                      alt=""
                    />
                  </div>

                  <div className="flex-grow-1 chat-user-box overflow-hidden">
                    <h5 className="fs-13 text-truncate mb-0">Julian Rosa</h5>
                    <small className="text-muted text-truncate mb-0">
                      What about our next..
                    </small>
                  </div>
                </Button>

                <Button variant="link" className="p-0 d-flex align-items-center">
                  <div className="flex-shrink-0 me-2 avatar-xs">
                    <img
                      className="img-fluid rounded-circle"
                      src={image3}
                      alt=""
                    />
                  </div>

                  <div className="flex-grow-1 chat-user-box overflow-hidden">
                    <h5 className="fs-13 text-truncate mb-0">David Medina</h5>
                    <small className="text-muted text-truncate mb-0">
                      Yeah everything is fine
                    </small>
                  </div>
                </Button>

                <Button variant="link" className="p-0 d-flex align-items-center">
                  <div className="flex-shrink-0 me-2 avatar-xs">
                    <img
                      className="img-fluid rounded-circle"
                      src={image5}
                      alt=""
                    />
                  </div>

                  <div className="flex-grow-1 chat-user-box overflow-hidden">
                    <h5 className="fs-13 text-truncate mb-0">Jay Baker</h5>
                    <small className="text-muted text-truncate mb-0">
                      Wow that's great
                    </small>
                  </div>
                </Button>
              </div>
            </div>
          </SimpleBar>

          <div className="mt-auto">
            <h5 className="fs-13">1.75 GB of 10 GB used</h5>
            <ProgressBar variant="success" className="progress-sm" now={25} />
          </div>
        </div>
      </div>

      <Modal id="composemodal" className="modal-lg" show={modal} onHide={toggle} centered>
        <Modal.Header className="p-3 bg-light" closeButton>
          <h5 className="modal-title">
            New Message
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3 position-relative">
              <Form.Control
                type="text"
                className="form-control email-compose-input"
                defaultValue="support@themesbrand.com"
              />
              <div className="position-absolute top-0 end-0">
                <div className="d-flex">
                  <button
                    className="btn btn-link text-reset fw-semibold px-2"
                    type="button"
                  >
                    Cc
                  </button>
                  <button
                    className="btn btn-link text-reset fw-semibold px-2"
                    type="button"
                  >
                    Bcc
                  </button>
                </div>
              </div>
            </div>
            <div className="collapse" id="CcRecipientsCollapse">
              <div className="mb-3">
                <Form.Label>Cc:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Cc recipients"
                />
              </div>
            </div>
            <div className="collapse" id="BccRecipientsCollapse">
              <div className="mb-3">
                <Form.Label>Bcc:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Bcc recipients"
                />
              </div>
            </div>

            <div className="mb-3">
              <Form.Control type="text" className="form-control" placeholder="Subject" />
            </div>
            <div className="ck-editor-reverse">
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {

                }}
              />
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-ghost-danger"
            onClick={() => {
              setModal(false);
            }}
          >
            Discard
          </button>

          <Dropdown className="btn-group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setModal(false);
              }}
            >
              Send
            </button>
            <Dropdown.Toggle
              as="button"
              type="button"
              className="btn btn-success"
              split
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <li>
                <Dropdown.Item>
                  <i className="ri-timer-line text-muted me-1 align-bottom"></i>{" "}
                  Schedule Send
                </Dropdown.Item>
              </li>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EmailSidebar;
