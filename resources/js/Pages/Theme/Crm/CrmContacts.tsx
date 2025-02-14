import React, { useEffect, useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash";

// Import Images
import avatar10 from "../../../../images/users/avatar-10.jpg"

import {
  Col,
  Container,
  Row,
  Card,
  Dropdown,
  Modal,
  Form,
  Table,
  Button,
} from "react-bootstrap";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import moment from "moment";

import dummyImg from "../../../../images/users/user-dummy-img.jpg"
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts/Theme";
import { onAddNewContact, onDeleteContact, onGetContacts, onUpdateContact } from "../../../slices/thunk";
import Select from "react-select";


const CrmContacts = () => {
  const dispatch: any = useDispatch();
  const selectContactState = (state: any) => state.Crm;
  const crmcontactData = createSelector(
    selectContactState,
    (state: any) => ({
      crmcontacts: state.crmcontacts,
      error: state.error,
    })
  );
  // Inside your component
  const {
    crmcontacts, error
  }: any = useSelector(crmcontactData);
  

  useEffect(() => {
    if (crmcontacts && !crmcontacts.length) {
      dispatch(onGetContacts());
    }
  }, [dispatch, crmcontacts]);

  useEffect(() => {
    setContact(crmcontacts);
  }, [crmcontacts]);

  useEffect(() => {
    if (!isEmpty(crmcontacts)) {
      setContact(crmcontacts);
      setIsEdit(false);
    }
  }, [crmcontacts]);


  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [contact, setContact] = useState<any>([]);


  //delete Conatct
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setContact(null);
      setSelectedImage('')
      setImgStore('')
    } else {
      setModal(true);
      setTag([]);
      setAssignTag([]);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
      dispatch(onDeleteContact(contact.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (contact: any) => {
    setContact(contact);
    setDeleteModal(true);
  };

  // Add Data
  const handleContactClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };


  // Date & Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
  };

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (contact && contact.id) || '',
      img: (contact && contact.img) || '',
      name: (contact && contact.name) || '',
      company: (contact && contact.company) || '',
      designation: (contact && contact.designation) || '',
      email: (contact && contact.email) || '',
      phone: (contact && contact.phone) || '',
      score: (contact && contact.score) || '',
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      img: Yup.string().required("Please Enter Image"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      score: Yup.string().required("Please Enter score"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          id: contact ? contact.id : 0,
          img: values.img,
          name: values.name,
          company: values.company,
          designation: values.designation,
          email: values.email,
          phone: values.phone,
          score: values.score,
          date: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        
        // update Contact
        dispatch(onUpdateContact(updateContact));
        validation.resetForm();
      } else {
        const newContact = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          img: values["img"],
          name: values["name"],
          company: values["company"],
          designation: values["designation"],
          email: values["email"],
          phone: values["phone"],
          score: values["score"],
          date: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // save new Contact
        
        dispatch(onAddNewContact(newContact));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleContactClick = useCallback((arg: any) => {
    const contact = arg;

    setContact({
      id: contact.id,
      img: contact.img,
      name: contact.name,
      company: contact.company,
      email: contact.email,
      designation: contact.designation,
      phone: contact.phone,
      score: contact.score,
      date: contact.date,
      // time: contact.time,
      tags: contact.tags,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };


  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState<any>([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      dispatch(onDeleteContact(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele: any = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const customStyles = {
    multiValue: (styles : any, { data } : any) => {
        return {
          ...styles,
          backgroundColor: "#3762ea",
        };
      },
      multiValueLabel: (styles : any, { data } : any) => ({
        ...styles,
        backgroundColor : "#405189" ,
        color: "white",
      }),
      multiValueRemove: (styles : any, { data } : any) => ({
        ...styles,
        color: "white",
        backgroundColor : "#405189" ,
        ':hover': {
          backgroundColor: "#405189" ,
          color: 'white',
        },
      }),
}

  // Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" className="form-check-input" id="checkBoxAll" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={cell.row.original.img}
                  alt=""
                  className="avatar-xs rounded-circle"
                />
              </div>
              <div className="flex-grow-1 ms-2 name">
                {cell.getValue()}
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Company",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "Email ID",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone No",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "Lead Score",
        accessorKey: "score",
        enableColumnFilter: false,
      },
      {
        header: "Tags",
        accessorKey: "tags",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {cell.getValue().map((item: any, key: any) => (<span className="badge bg-primary-subtle text-primary me-1" key={key}>{item}</span>))}
          </>
        ),
      },
      {
        header: "Last Contacted",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())},{" "}
            <small className="text-muted">{handleValidTime(cell.getValue())}</small>
          </>
        ),
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Call">
                <Link href="#" className="text-muted d-inline-block">
                  <i className="ri-phone-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit" title="Message">
                <Link href="#" className="text-muted d-inline-block">
                  <i className="ri-question-answer-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Dropdown>
                  <Dropdown.Toggle
                    href="#"
                    className="btn btn-soft-primary btn-sm dropdown arrow-none"
                    as="button"
                  >
                    <i className="ri-more-fill align-middle"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-end">
                    <Dropdown.Item className="dropdown-item" href="#"
                      onClick={() => { const contactData = cellProps.row.original; setInfo(contactData); }}
                    >
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
                    >
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; onClickDelete(contactData); }}
                    >
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleContactClick, checkedAll]
  );


  const [tag, setTag] = useState<any>();
  const [assignTag, setAssignTag] = useState<any>([]);

  const handlestag = (tags: any) => {
    setTag(tags);
    const assigned = tags.map((item: any) => item.value);
    setAssignTag(assigned);
  };

  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" }
  ];

  // Image Validation
  const [imgStore, setImgStore] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleClick = (item: any) => {
    const newData = [...imgStore, item];
    setImgStore(newData);
    validation.setFieldValue('img', newData)
  }

  useEffect(() => {
    setImgStore((contact && contact.img) || [])
  }, [contact])

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('img', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // SideBar Contact Deatail
  const [info, setInfo] = useState<any>([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Head title = "Contacts | Velzon - React Admin & Dashboard Template"/>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={crmcontacts}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteContact}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Contacts" pageTitle="CRM" />
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="flex-grow-1">
                      <button
                        className="btn btn-info add-btn"
                        onClick={() => {
                          setModal(true);
                        }}
                      >
                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                        Contacts
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="hstack text-nowrap gap-2">
                        {isMultiDeleteButton && <button className="btn btn-soft-danger" id="remove-actions"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <button className="btn btn-secondary">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button>
                        <button className="btn btn-soft-success" onClick={() => setIsExportCSV(true)}>Export</button>

                        <Dropdown>
                          <Dropdown.Toggle
                            href="#"
                            className="btn btn-soft-info arrow-none"
                            as="button"
                          >
                            <i className="ri-more-2-fill"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            <Dropdown.Item className="dropdown-item" href="#">All</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item" href="#">Last Week</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item" href="#">Last Month</Dropdown.Item>
                            <Dropdown.Item className="dropdown-item" href="#">Last Year</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                      </div>
                    </div>
                  </div>
                </Card.Header>
              </Card>
            </Col>
            <Col xxl={9}>
              <Card id="contactList">
                <Card.Body className="pt-0">
                  <div>
                    {crmcontacts && crmcontacts.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={(crmcontacts || [])}
                        isGlobalFilter={true}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-3"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        handleContactClick={handleContactClicks}
                        isContactsFilter={true}
                      />
                    ) : (<Loader error={error} />)
                    }
                  </div>

                  <Modal id="showModal" show={modal} onHide={toggle} centered>
                    <Modal.Header className="bg-primary-subtle p-3" closeButton>
                      <h5 className="modal-title">
                        {!!isEdit ? "Edit Contact" : "Add Contact"}
                      </h5>
                    </Modal.Header>

                    <Form className="tablelist-form" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <Modal.Body>
                        <Form.Control type="hidden" id="id-field" />
                        <Row className="g-3">
                          <Col lg={12}>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute  bottom-0 end-0">
                                  <Form.Label htmlFor="customer-image-input" className="mb-0">
                                    <div className="avatar-xs cursor-pointer">
                                      <div className="avatar-title bg-light border rounded-circle text-muted">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </Form.Label>
                                  <Form.Control className="form-control d-none" id="customer-image-input" type="file"
                                    accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}
                                  />
                                </div>
                                <div className="avatar-lg p-1" onClick={(item: any) => handleClick(item)}>
                                  <div className="avatar-title bg-light rounded-circle">
                                    <img src={selectedImage || validation.values.img || dummyImg} alt="dummyImg" id="customer-img" className="avatar-md rounded-circle object-fit-cover" />
                                  </div>
                                </div>
                              </div>
                              {validation.errors.img && validation.touched.img ? (
                                <Form.Control.Feedback type="invalid" className='d-block'> {validation.errors.img} </Form.Control.Feedback>
                              ) : null}
                            </div>

                            <div>
                              <Form.Label
                                htmlFor="name-field"
                                className="form-label"
                              >
                                Name
                              </Form.Label>
                              <Form.Control
                                name="name"
                                id="customername-field"
                                className="form-control"
                                placeholder="Enter Name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                              />
                              {validation.touched.name && validation.errors.name ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Form.Label
                                htmlFor="company_name-field"
                                className="form-label"
                              >
                                Company Name
                              </Form.Label>
                              <Form.Control
                                name="company"
                                id="company_name-field"
                                className="form-control"
                                placeholder="Enter Company Name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.company || ""}
                              />
                              {validation.touched.company && validation.errors.company ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.company}</Form.Control.Feedback>
                              ) : null}

                            </div>
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Form.Label
                                htmlFor="designation-field"
                                className="form-label"
                              >
                                Designation
                              </Form.Label>

                              <Form.Control
                                name="designation"
                                id="designation-field"
                                className="form-control"
                                placeholder="Enter Designation"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                              />
                              {validation.touched.designation && validation.errors.designation ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.designation}</Form.Control.Feedback>
                              ) : null}

                            </div>
                          </Col>

                          <Col lg={12}>
                            <div>
                              <Form.Label
                                htmlFor="emailid-field"
                                className="form-label"
                              >
                                Email ID
                              </Form.Label>

                              <Form.Control
                                name="email"
                                id="emailid-field"
                                className="form-control"
                                placeholder="Enter Email"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Form.Label
                                htmlFor="phone-field"
                                className="form-label"
                              >
                                Phone
                              </Form.Label>

                              <Form.Control
                                name="phone"
                                id="phone-field"
                                className="form-control"
                                placeholder="Enter Phone No."
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                              />
                              {validation.touched.phone && validation.errors.phone ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.phone}</Form.Control.Feedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Form.Label
                                htmlFor="score-field"
                                className="form-label"
                              >
                                Lead Score
                              </Form.Label>

                              <Form.Control
                                name="score"
                                id="score-field"
                                className="form-control"
                                placeholder="Enter Lead Score"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.score || ""}
                              />
                              {validation.touched.score && validation.errors.score ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.score}</Form.Control.Feedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Form.Label
                                htmlFor="taginput-choices"
                                className="form-label font-size-13 text-muted"
                              >
                                Tags
                              </Form.Label>
                              <Select
                                isMulti
                                value={tag}
                                onChange={(e: any) => {
                                  handlestag(e);
                                }}
                                className="mb-0"
                                options={tags}
                                id="taginput-choices"
                                styles={customStyles}
                              />

                              {validation.touched.tags &&
                                validation.errors.tags ? (
                                <Form.Control.Feedback type="invalid">
                                  {validation.errors.tags}
                                </Form.Control.Feedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Close </button>
                          <button type="submit" className="btn btn-success" id="add-btn"> {!!isEdit ? "Update" : "Add Contact"} </button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </Card.Body>
              </Card>
            </Col>

            <Col xxl={3}>
              <Card id="contact-view-detail">
                <Card.Body className="text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src={info.img || avatar10}
                      // process.env.REACT_APP_API_URL + "/images/users/" + 
                      alt=""
                      className="avatar-lg rounded-circle img-thumbnail"
                    />
                    <span className="contact-active position-absolute rounded-circle bg-success">
                      <span className="visually-hidden"></span>
                    </span>
                  </div>
                  <h5 className="mt-4 mb-1">{info.name || "Tonya Noble"}</h5>
                  <p className="text-muted">{info.company || "Nesta Technologies"}</p>

                  <ul className="list-inline mb-0">
                    <li className="list-inline-item avatar-xs">
                      <Link
                        href="#"
                        className="avatar-title bg-success-subtle text-success fs-15 rounded"
                      >
                        <i className="ri-phone-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        href="#"
                        className="avatar-title bg-danger-subtle text-danger fs-15 rounded"
                      >
                        <i className="ri-mail-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        href="#"
                        className="avatar-title bg-warning-subtle text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </li>
                  </ul>
                </Card.Body>
                <Card.Body>
                  <h6 className="text-muted text-uppercase fw-semibold mb-3">
                    Personal Information
                  </h6>
                  <p className="text-muted mb-4">
                    Hello, I'm {info.name || "Tonya Noble"}, The most effective objective is one
                    that is tailored to the job you are applying for. It states
                    what kind of career you are seeking, and what skills and
                    experiences.
                  </p>
                  <div className="table-responsive table-card">
                    <Table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">
                            Designation
                          </td>
                          <td>Lead Designer / Developer</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Email ID
                          </td>
                          <td>{info.email || "tonyanoble@velzon.com"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Phone No
                          </td>
                          <td>{info.phone || "414-453-5725"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Lead Score
                          </td>
                          <td>{info.score || "154"}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Tags
                          </td>
                          <td>
                            {(info.tags || ["Lead", "Partner"]).map((item: any, key: any) => (<span className="badge bg-primary-subtle text-primary me-1" key={key}>{item}</span>))}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Last Contacted
                          </td>
                          <td>
                            {handleValidDate(info.date || "2021-04-13T18:30:00.000Z")}{" "}
                            <small className="text-muted">{handleValidTime(info.date || "2021-04-13T18:30:00.000Z")}</small>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
CrmContacts.layout = (page:any) => <Layout children={page}/>
export default CrmContacts;
