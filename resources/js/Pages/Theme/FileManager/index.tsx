import React, { useEffect, useState, useCallback } from 'react';
import { Card, Col, Container, Modal, Row, Dropdown, Form, Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { ToastContainer } from 'react-toastify';
import SimpleDonutCharts from './FileManagerCharts';
import DeleteModal from '../../../Components/Common/DeleteModal';
//redux
import { useSelector, useDispatch } from 'react-redux';

//import action

// Formik
import * as  Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from 'reselect';
import { Head, Link } from '@inertiajs/react';
import { onAddNewFile, onAddNewFolder, onDeleteFile, onDeleteFolder, onGetFiles, onGetFolders, onupdateFile, onupdateFolder } from '../../../slices/thunk';
import Layout from '../../../Layouts/Theme';


const FileManager = () => {

    const dispatch: any = useDispatch();

    const selectFileManagerState = (state: any) => state.FileManager;
    const selectFileManager = createSelector(
        selectFileManagerState,
        (state: any) => ({
            folders: state.folders,
            files: state.files,
        })
    );
    // Inside your component
    const
        { folders, files }: any
            = useSelector(selectFileManager);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const [deleteAlt, setDeleteAlt] = useState<boolean>(false);

    // Folders
    const [folder, setFolder] = useState<any>(null);
    const [modalFolder, setModalFolder] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        dispatch(onGetFolders());
    }, [dispatch]);

    useEffect(() => {
        setFolder(folders);
    }, []);

    const folderToggle = useCallback(() => {
        if (modalFolder) {
            setModalFolder(false);
            setFolder(null);
        } else {
            setModalFolder(true);
        }
    }, [modalFolder]);

    // Update Folder
    const handleFolderClick = useCallback((arg: any) => {
        const folder = arg;

        setFolder({
            id: folder.id,
            folderName: folder.folderName,
            folderFile: folder.folderFile,
            size: folder.size,
        });

        setIsEdit(true);
        folderToggle();
    }, [folderToggle]);

    // Add Folder
    const handleFolderClicks = () => {
        setFolder("");
        setModalFolder(!modalFolder);
        setIsEdit(false);
        folderToggle();
    };

    // Delete Folder
    const onClickFolderDelete = (folder: any) => {
        setFolder(folder);
        setDeleteModal(true);
    };

    const handleDeleteFolder = () => {

        if (deleteAlt) {
            if (folder) {
                dispatch(onDeleteFolder(folder.id));
                setDeleteModal(false);
                setDeleteAlt(false);
            }
        } else {
            if (file) {
                dispatch(onDeleteFile(file.id));
                setDeleteModal(false);
                sidebarClose("file-detail-show");
            }
        }

    };

    // Files
    const [file, setFile] = useState<any>(null);
    const [modalFile, setModalFile] = useState<boolean>(false);


    const [fileList, setFileList] = useState<any>(files);

    useEffect(() => {
        dispatch(onGetFiles());
    }, [dispatch]);

    useEffect(() => {
        setFile(files);
        setFileList(files);
    }, [files]);

    const fileToggle = useCallback(() => {
        if (modalFile) {
            setModalFile(false);
            setFile(null);
        } else {
            setModalFile(true);
        }
    }, [modalFile]);

    // Update File
    const handleFileClick = useCallback((arg: any) => {
        const file = arg;

        setFile({
            id: file.id,
            fileName: file.fileName,
            fileItem: file.fileItem,
            size: file.size,
        });

        setIsEdit(true);
        fileToggle();
    }, [fileToggle]);

    // Add File
    const handleFileClicks = () => {
        setFile("");
        setModalFile(!modalFile);
        setIsEdit(false);
        fileToggle();
    };

    // Delete File
    const onClickFileDelete = (file: any) => {
        setFile(file);
        setDeleteModal(true);
    };


    const [sidebarData, setSidebarData] = useState<any>("");

    const [filterActive, setFilterActive] = useState<any>("");

    const fileCategory = (e: any, ele: any) => {
        setFilterActive(ele);
        var folderList = document.getElementById("folder-list") as HTMLElement;
        folderList.style.display = "none";
        setFileList(
            files.filter((item: any) => item.fileType === e)
        );
    };


    // SideBar Open
    function sidebarOpen(value: any) {
        const element = document.getElementsByTagName('body')[0];
        element.classList.add(value);
    }

    // SideBar Close
    function sidebarClose(value: any) {
        const element = document.getElementsByTagName('body')[0];
        element.classList.remove(value);
    }

    useEffect(() => {
        sidebarOpen("file-detail-show");
    }, []);

    const favouriteBtn = (ele: any) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    const fileSidebar = () => {
        var folderOverview = document.getElementById("folder-overview") as HTMLElement
        folderOverview.style.display = "none";
        var fileOverview = document.getElementById("file-overview") as HTMLElement
        fileOverview.style.display = "block";
    };

    // Folder validation
    const folderValidation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            folderName: (folder && folder.folderName) || '',
            folderFile: (folder && folder.folderFile) || '',
            size: (folder && folder.size) || '',
        },
        validationSchema: Yup.object({
            folderName: Yup.string().required("Please Enter Folder Name"),
            folderFile: Yup.string().required("Please Enter Folder File"),
            size: Yup.string().required("Please Enter size"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateFolder = {
                    id: folder ? folder.id : 0,
                    folderName: values.folderName,
                    folderFile: values.folderFile,
                    size: values.size
                };
                // save edit Folder
                dispatch(onupdateFolder(updateFolder));
                folderValidation.resetForm();

            } else {
                const newFolder = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    folderName: values["folderName"],
                    folderFile: values["folderFile"],
                    size: values["size"],
                };
                // save new Folder
                dispatch(onAddNewFolder(newFolder));
                folderValidation.resetForm();
            }
            folderToggle();
        },
    });


    const dateFormat = () => {
        let d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
    };


    // File validation
    const fileValidation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            fileName: (file && file.fileName) || '',
            fileItem: (file && file.fileItem) || '',
            size: (file && file.size) || '',
        },
        validationSchema: Yup.object({
            fileName: Yup.string().required("Please Enter File Name"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateFile = {
                    id: file ? file.id : 0,
                    fileName: values.fileName,
                    fileItem: values.fileItem,
                    size: values.size
                };
                // save edit File
                dispatch(onupdateFile(updateFile));
                fileValidation.resetForm();

            } else {
                const newFile = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    fileName: values.fileName + ".txt",
                    fileItem: "0",
                    icon: "ri-file-text-fill",
                    iconClass: "secondary",
                    fileType: "Documents",
                    size: "0 KB",
                    createDate: dateFormat(),
                };
                // save new File
                dispatch(onAddNewFile(newFile));
                fileValidation.resetForm();
            }
            fileToggle();
        },
    });


    return (
        <React.Fragment>
            <Head title="File Manager | Velzon - React Admin & Dashboard Template" />

            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteFolder()}
                onCloseClick={() => setDeleteModal(false)}
            />

            <div className="page-content">
                <Container fluid>
                    <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <div className="file-manager-sidebar">
                            <div className="p-3 d-flex flex-column h-100">
                                <div className="mb-3">
                                    <h5 className="mb-0 fw-semibold">My Drive</h5>
                                </div>
                                <div className="search-box">
                                    <Form.Control type="text" className="form-control bg-light border-light" placeholder="Search here..." />
                                    <i className="ri-search-2-line search-icon"></i>
                                </div>
                                <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
                                    <ul className="list-unstyled file-manager-menu">
                                        <li>
                                            <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                                                <i className="ri-folder-2-line align-bottom me-2"></i> <span className="file-list-link">My Drive</span>
                                            </a>
                                            <div className="collapse show" id="collapseExample">
                                                <ul className="sub-menu list-unstyled">
                                                    <li>
                                                        <Button as='a' variant='link' className='p-0'>Assets</Button>
                                                    </li>
                                                    <li>
                                                        <Button as='a' variant='link' className='p-0'>Marketing</Button>
                                                    </li>
                                                    <li>
                                                        <Button as='a' variant='link' className='p-0'>Personal</Button>
                                                    </li>
                                                    <li>
                                                        <Button as='a' variant='link' className='p-0'>Projects</Button>
                                                    </li>
                                                    <li>
                                                        <Button as='a' variant='link' className='p-0'>Templates</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <Button as='a' variant='link' className={filterActive === "Documents" ? "active p-0" : "p-0"} onClick={() => fileCategory("Documents", "Documents")}><i className="ri-file-list-2-line align-bottom me-2"></i> <span className="file-list-link">Documents</span></Button>
                                        </li>
                                        <li>
                                            <Button as='a' variant='link' className={filterActive === "Media" ? "active p-0" : "p-0"} onClick={() => fileCategory("Media", "Media")}><i className="ri-image-2-line align-bottom me-2"></i> <span className="file-list-link">Media</span></Button>
                                        </li>
                                        <li>
                                            <Button as='a' variant='link' className={filterActive === "Recents" ? "active p-0" : "p-0"} onClick={() => fileCategory("Media", "Recents")}><i className="ri-history-line align-bottom me-2"></i> <span className="file-list-link">Recent</span></Button>
                                        </li>
                                        <li>
                                            <Button as='a' variant='link' className={filterActive === "Important" ? "active p-0" : "p-0"} onClick={() => fileCategory("Documents", "Important")}><i className="ri-star-line align-bottom me-2"></i> <span className="file-list-link">Important</span></Button>
                                        </li>
                                        <li>
                                            <Button as='a' variant='link' className={filterActive === "Deleted" ? "active p-0" : "p-0"} onClick={() => fileCategory("Deleted", "Deleted")}><i className="ri-delete-bin-line align-bottom me-2"></i> <span className="file-list-link">Deleted</span></Button>
                                        </li>
                                    </ul>
                                </SimpleBar>

                                <div className="mt-auto">
                                    <h6 className="fs-11 text-muted text-uppercase mb-3">Storage Status</h6>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <i className="ri-database-2-line fs-17"></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3 overflow-hidden">
                                            <div className="progress mb-2 progress-sm">
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "25%" }} ></div>
                                            </div>
                                            <span className="text-muted fs-12 d-block text-truncate"><b>47.52</b>GB used of <b>119</b>GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="file-manager-content w-100 p-3 py-0">
                            <div className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                                <div id="folder-list" className="mb-2">
                                    <Row className="justify-content-beetwen g-2 mb-3">

                                        <Col>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-2 d-block d-lg-none">
                                                    <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn">
                                                        <i className="ri-menu-2-fill align-bottom"></i>
                                                    </button>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h5 className="fs-16 mb-0">Folders</h5>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="col-auto">
                                            <div className="d-flex gap-2 align-items-start">
                                                <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="file-type">
                                                    <option value="">File Type</option>
                                                    <option value="All" defaultValue="all">All</option>
                                                    <option value="Video">Video</option>
                                                    <option value="Images">Images</option>
                                                    <option value="Music">Music</option>
                                                    <option value="Documents">Documents</option>
                                                </select>

                                                <button className="btn btn-success text-nowrap create-folder-modal flex-shrink-0" onClick={() => handleFolderClicks()}><i className="ri-add-line align-bottom me-1"></i> Create Folders</button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row id="folderlist-data">

                                        {(folders || []).map((item: any, key: number) => (
                                            <Col xxl={3} className="col-6 folder-card" key={key}>
                                                <Card className="bg-light shadow-none" id={"folder-" + item.id}>
                                                    <Card.Body>
                                                        <div className="d-flex mb-1">
                                                            <div className="form-check form-check-danger mb-3 fs-15 flex-grow-1">
                                                                <Form.Check.Input className="form-check-input" type="checkbox" value="" id={"folderlistCheckbox_" + item.id} />
                                                                <Form.Check.Label className="form-check-label" htmlFor={"folderlistCheckbox_" + item.id}></Form.Check.Label>
                                                            </div>

                                                            <Dropdown>
                                                                <Dropdown.Toggle as="button" className="arrow-none btn btn-ghost-primary btn-icon btn-sm dropdown">
                                                                    <i className="ri-more-2-fill fs-16 align-bottom" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu-end">
                                                                    <Dropdown.Item className="view-item-btn">Open</Dropdown.Item>
                                                                    <Dropdown.Item className="edit-folder-list" onClick={() => handleFolderClick(item)}>Rename</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { onClickFolderDelete(item); setDeleteAlt(true); }}>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>

                                                        </div>

                                                        <div className="text-center">
                                                            <div className="mb-2">
                                                                <i className="ri-folder-2-fill align-bottom text-warning display-5"></i>
                                                            </div>
                                                            <h6 className="fs-15 folder-name">{item.folderName}</h6>
                                                        </div>
                                                        <div className="hstack mt-4 text-muted">
                                                            <span className="me-auto"><b>{item.folderFile}</b> Files</span>
                                                            <span><b>{item.size}</b>GB</span>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>))}
                                    </Row>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center mb-3">
                                        <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">Recent File</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success createFile-modal" onClick={() => handleFileClicks()}><i className="ri-add-line align-bottom me-1"></i> Create File</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table align-middle table-nowrap mb-0">
                                            <thead className="table-active">
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">File Item</th>
                                                    <th scope="col">File Size</th>
                                                    <th scope="col">Recent Date</th>
                                                    <th scope="col" className="text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="file-list">
                                                {(fileList || []).map((item: any, key: number) => (
                                                    <tr key={key}>
                                                        <td>
                                                            <Form.Control className="form-control filelist-id" type="hidden" value="1" id="filelist-1" />
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                                                                    <i className={item.icon + " text-" + item.iconClass + " align-bottom"} />
                                                                </div>
                                                                <div className="flex-grow-1 filelist-name">{item.fileName}</div>
                                                                <div className="d-none filelist-type"> {item.fileType} </div>
                                                            </div>
                                                        </td>
                                                        <td>{item.fileItem}</td>
                                                        <td className="filelist-size">{item.size}</td>
                                                        <td className="filelist-create">{item.createDate}</td>
                                                        <td>
                                                            <div className="d-flex gap-3 justify-content-center">
                                                                <button type="button" className="btn btn-ghost-primary btn-icon btn-sm favourite-btn" onClick={(e) => favouriteBtn(e.target)}>
                                                                    <i className="ri-star-fill fs-13 align-bottom" />
                                                                </button>

                                                                <Dropdown dir='start'>
                                                                    <Dropdown.Toggle as="button" className="arrow-none btn btn-light btn-icon btn-sm dropdown" id="dropdown.MenuButton">
                                                                        <i className="ri-more-fill align-bottom" />
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu-end">
                                                                        <Dropdown.Item className="viewfile-list" onClick={() => { setSidebarData(item); fileSidebar(); sidebarOpen("file-detail-show"); }}>View</Dropdown.Item>
                                                                        <Dropdown.Item className="edit-list" onClick={() => handleFileClick(item)}>Rename</Dropdown.Item>
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item className="remove-list" onClick={() => onClickFileDelete(item)}>Delete</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </td>
                                                    </tr>))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <ul id="pagination" className="pagination pagination-lg"></ul>

                                    <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                        <div className="col-sm">
                                            <div className="text-muted">Showing<span className="fw-semibold">4</span> of <span className="fw-semibold">125</span> Results
                                            </div>
                                        </div>
                                        <div className="col-sm-auto">
                                            <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                                                <li className="page-item disabled">
                                                    <Button variant='link' className="page-link">←</Button>
                                                </li>
                                                <li className="page-item">
                                                    <Button variant='link' className="page-link">1</Button>
                                                </li>
                                                <li className="page-item active">
                                                    <Button variant='link' className="page-link">2</Button>
                                                </li>
                                                <li className="page-item">
                                                    <Button variant='link' className="page-link">3</Button>
                                                </li>
                                                <li className="page-item">
                                                    <Button variant='link' className="page-link">→</Button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="file-manager-detail-content p-3 py-0">
                            <SimpleBar className="mx-n3 pt-3 px-3 file-detail-content-scroll">
                                <div id="folder-overview">
                                    <div className="d-flex align-items-center pb-3 border-bottom border-bottom-dashed">
                                        <h5 className="flex-grow-1 fw-semibold mb-0">Overview</h5>
                                        <div>
                                            <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-overview" onClick={() => sidebarClose("file-detail-show")}>
                                                <i className="ri-close-fill align-bottom"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <SimpleDonutCharts dataColors='["--vz-info", "--vz-danger", "--vz-primary", "--vz-success"]' className="apex-charts mt-3" dir="ltr" />
                                    <div className="mt-4">
                                        <ul className="list-unstyled vstack gap-4">
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="avatar-xs">
                                                            <div className="avatar-title rounded bg-secondary-subtle text-secondary">
                                                                <i className="ri-file-text-line fs-17"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="mb-1 fs-15">Documents</h5>
                                                        <p className="mb-0 fs-12 text-muted">2348 files</p>
                                                    </div>
                                                    <b>27.01 GB</b>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="avatar-xs">
                                                            <div className="avatar-title rounded bg-success-subtle text-success">
                                                                <i className="ri-gallery-line fs-17"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="mb-1 fs-15">Media</h5>
                                                        <p className="mb-0 fs-12 text-muted">12480 files</p>
                                                    </div>
                                                    <b>20.87 GB</b>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="avatar-xs">
                                                            <div className="avatar-title rounded bg-warning-subtle text-warning">
                                                                <i className="ri-folder-2-line fs-17"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="mb-1 fs-15">Projects</h5>
                                                        <p className="mb-0 fs-12 text-muted">349 files</p>
                                                    </div>
                                                    <b>4.10 GB</b>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="avatar-xs">
                                                            <div className="avatar-title rounded bg-primary-subtle text-primary">
                                                                <i className="ri-error-warning-line fs-17"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="mb-1 fs-15">Others</h5>
                                                        <p className="mb-0 fs-12 text-muted">9873 files</p>
                                                    </div>
                                                    <b>33.54 GB</b>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pb-3 mt-auto">
                                        <div className="alert alert-danger d-flex align-items-center mb-0">
                                            <div className="flex-shrink-0">
                                                <i className="ri-cloud-line text-danger align-bottom display-5"></i>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h5 className="text-danger fs-14">Upgrade to Pro</h5>
                                                <p className="text-muted mb-2">Get more space for your...</p>
                                                <button className="btn btn-sm btn-danger"><i className="ri-upload-cloud-line align-bottom"></i> Upgrade Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="file-overview" className="h-100">
                                    <div className="d-flex h-100 flex-column">
                                        <div className="d-flex align-items-center pb-3 border-bottom border-bottom-dashed mb-3 gap-2">
                                            <h5 className="flex-grow-1 fw-semibold mb-0">File Preview</h5>
                                            <div>
                                                <button type="button" className="btn btn-ghost-primary btn-icon btn-sm fs-16 favourite-btn">
                                                    <i className="ri-star-fill align-bottom"></i>
                                                </button>
                                                <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-overview" onClick={() => sidebarClose("file-detail-show")}>
                                                    <i className="ri-close-fill align-bottom"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pb-3 border-bottom border-bottom-dashed mb-3">
                                            <div className="file-details-box bg-light p-3 text-center rounded-3 border border-light mb-3">
                                                <div className="display-4 file-icon">
                                                    <i className={sidebarData.icon + " text-" + sidebarData.iconClass}></i>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-icon btn-sm btn-ghost-success float-end fs-16"><i className="ri-share-forward-line"></i></button>
                                            <h5 className="fs-16 mb-1 file-name">{sidebarData.fileName}</h5>
                                            <p className="text-muted mb-0 fs-12"><span className="file-size">{sidebarData.size}</span>, <span className="create-date">{sidebarData.createDate}</span></p>
                                        </div>
                                        <div>
                                            <h5 className="fs-12 text-uppercase text-muted mb-3">File Description :</h5>

                                            <div className="table-responsive">
                                                <table className="table table-borderless table-nowrap table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row" style={{ width: "35%" }}>File Name :</th>
                                                            <td className="file-name">{sidebarData.fileName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">File Type :</th>
                                                            <td className="file-type">{sidebarData.fileType}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Size :</th>
                                                            <td className="file-size">{sidebarData.size}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Created :</th>
                                                            <td className="create-date">{sidebarData.createDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Path :</th>
                                                            <td className="file-path"><div className="user-select-all text-truncate">*:\projects\src\assets\images</div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div>
                                                <h5 className="fs-12 text-uppercase text-muted mb-3">Share Information:</h5>
                                                <div className="table-responsive">
                                                    <table className="table table-borderless table-nowrap table-sm">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ width: "35%" }}>Share Name :</th>
                                                                <td className="share-name">\\*\Projects</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Share Path :</th>
                                                                <td className="share-path">velzon:\Documents\</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto border-top border-top-dashed py-3">
                                            <div className="hstack gap-2">
                                                <button type="button" className="btn btn-soft-primary w-100"><i className="ri-download-2-line align-bottom me-1"></i> Download</button>
                                                <button type="button" className="btn btn-soft-danger w-100 remove-file-overview" onClick={() => onClickFileDelete(sidebarData)}><i className="ri-close-fill align-bottom me-1"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SimpleBar>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Folder Modal */}
            <Modal className="fade zoomIn" show={modalFolder} onHide={() => setModalFolder(!modalFolder)} id="createFolderModal" modalClassName="zoomIn" centered tabIndex={-1}>
                <Modal.Header className="p-3 bg-success-subtle" id="createFolderModalLabel" closeButton>
                    <h5 className='modal-title'>
                        {isEdit ? "Folder Rename" : "Create Folder"}
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <form autoComplete="off" className="needs-validation createfolder-form" id="createfolder-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            folderValidation.handleSubmit();
                            return false;
                        }}
                    >
                        <div className="mb-4">
                            <Form.Label htmlFor="foldername-input" className="form-label">Folder Name</Form.Label>
                            <Form.Control type="text" className="form-control" id="foldername-input"
                                name='folderName'
                                placeholder="Enter folder name"
                                required
                                onChange={folderValidation.handleChange}
                                onBlur={folderValidation.handleBlur}
                                value={folderValidation.values.folderName || ""}
                            />
                            {folderValidation.touched.folderName && folderValidation.errors.folderName ? (
                                <Form.Control.Feedback type="invalid">{folderValidation.errors.folderName}</Form.Control.Feedback>
                            ) : null}
                        </div>
                        <Row>
                            <Col lg={6}>
                                <Form.Label htmlFor="folderFile-input" className="form-label">Files</Form.Label>
                                <Form.Control type="text" className="form-control" id="folderFile-input"
                                    name='folderFile'
                                    placeholder="Enter file"
                                    required
                                    onChange={folderValidation.handleChange}
                                    onBlur={folderValidation.handleBlur}
                                    value={folderValidation.values.folderFile || ""}
                                />
                                {folderValidation.touched.folderFile && folderValidation.errors.folderFile ? (
                                    <Form.Control.Feedback type="invalid">{folderValidation.errors.folderFile}</Form.Control.Feedback>
                                ) : null}
                            </Col>
                            <Col lg={6}>
                                <Form.Label htmlFor="size-input" className="form-label">Size</Form.Label>
                                <Form.Control type="text" className="form-control" id="size-input"
                                    name='size'
                                    placeholder="Enter size"
                                    required
                                    onChange={folderValidation.handleChange}
                                    onBlur={folderValidation.handleBlur}
                                    value={folderValidation.values.size || ""}
                                />
                                {folderValidation.touched.size && folderValidation.errors.size ? (
                                    <Form.Control.Feedback type="invalid">{folderValidation.errors.size}</Form.Control.Feedback>
                                ) : null}
                            </Col>
                        </Row>
                        <div className="hstack gap-2 justify-content-end mt-3">
                            <button type="button" className="btn btn-ghost-success" onClick={() => setModalFolder(false)}><i className="ri-close-line align-bottom"></i> Close</button>
                            <button type="submit" className="btn btn-primary" id="addNewFolder">{isEdit ? "Save" : "Add Folder"}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* File Modal */}
            <Modal id="createFileModal" show={modalFile} onHide={fileToggle} dialogClassName="zoomIn" centered tabIndex={-1}>
                <Modal.Header className="p-3 bg-success-subtle" closeButton>
                    <h5 className='modal-title'>
                        {!!isEdit ? "File Rename" : "Create File"}
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <form className="needs-validation createfile-form" id="createfile-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            fileValidation.handleSubmit();
                            return false;
                        }}
                    >
                        <div className="mb-4">
                        <Form.Label htmlFor="filename-input" className="form-label">File Name</Form.Label>
                            <Form.Control type="text" className="form-control" id="filename-input"
                                name="fileName"
                                placeholder="Enter file name"
                                required
                                onChange={fileValidation.handleChange}
                                onBlur={fileValidation.handleBlur}
                                value={fileValidation.values.fileName || ""}
                            />
                            {fileValidation.touched.fileName && fileValidation.errors.fileName ? (
                                <Form.Control.Feedback type="invalid">{fileValidation.errors.fileName}</Form.Control.Feedback>
                            ) : null}
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-ghost-success" onClick={() => setModalFile(false)}><i className="ri-close-line align-bottom"></i> Close</button>
                            <button type="submit" className="btn btn-primary" id="addNewFile">{!!isEdit ? "Save" : "Create"}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
FileManager.layout = (page: any) => <Layout children={page} />
export default FileManager;