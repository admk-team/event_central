import { Link, router, useForm } from '@inertiajs/react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Flatpickr from "react-flatpickr";
import readXlsxFile from 'read-excel-file'
import Papa from 'papaparse';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Modal, Nav, Row, Spinner, Tab } from 'react-bootstrap';

interface ImportModalProps {
    importAttendeesModal: boolean;
    showModal: () => void;
    importType: string;
    availableAttributes: string[];
    onImportSuccess?: (result: any) => void;
}
function ImportModal({
    importAttendeesModal,
    showModal,
    importType,
    availableAttributes,
    onImportSuccess, }: ImportModalProps) {

    const [method, setMethod] = useState<string | null>(null);
    const [invalidFileType, setInvalidFileType] = useState(false);
    const [enableHeaderCheckBox, setEnableHeaderCheckBox] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const [firstRowHeader, setFirstRowHeader] = useState<boolean | undefined>(null);
    const [chooseFile, setChooseFile] = useState<File | null>(null);
    const [importText, setImportText] = useState<string | null>(availableAttributes.join(", "));
    const [defaultActiveKey, setDefaultActiveKey] = useState<string>("1");
    const [headers, setHeaders] = useState<string[]>([]); // Headers will be set later
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [attributeMapping, setAttributeMapping] = useState<Record<string, string>>({});
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [processing, setProcessing] = useState<boolean | undefined>(false);


    // styles for the import method cards
    const cardStyle = (isHovered: any) => ({
        transition: 'all 0.3s ease',
        borderColor: isHovered ? '#007bff' : '#dee2e6',
        cursor: 'pointer'
    });

    const contentStyle = (isHovered: any) => ({
        transition: 'color 0.3s ease',
        color: isHovered ? '#007bff' : '#38414a80'
    });

    // set the import method and move to the next step
    const selectImportMethod = (step: string, method: string) => {
        setDefaultActiveKey(step);
        setMethod(method);
    }

    const handleFirstRowContainsHeaderCheckBox = (e) => {
        if (e.target.checked) {
            setFirstRowHeader(true);
        } else {
            setFirstRowHeader(false);
        }
    }

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            let file = e.target.files[0];
            setChooseFile(file);
            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                setEnableHeaderCheckBox(true);
                setFirstRowHeader(true);
                setInvalidFileType(false);
            } else if (file.name.endsWith('.csv')) {
                setEnableHeaderCheckBox(false);
                setFirstRowHeader(false);
                setInvalidFileType(false);
            } else {
                setInvalidFileType(true);
            }
            setFileName(file.name);
        }
    }

    const handleContinue = () => {
        if (method === "file" && chooseFile && chooseFile.name.endsWith('.csv')) {
            // Parse the file using PapaParse
            Papa.parse(chooseFile, {
                complete: (result) => {
                    const data = result.data as string[][];
                    // console.log(data);
                    if (data.length > 0) {
                        setHeaders(data[0]); // Set headers from the first row
                        // setParsedData(data.slice(1)); // Set parsed data (excluding headers)
                        setParsedData(data); // Set parsed data (excluding headers)
                        setDefaultActiveKey("3"); // Move to "Map Attributes" tab
                    }
                },
                header: false,
                skipEmptyLines: true,
            });
        } else if (method === "file" && chooseFile && (chooseFile.name.endsWith('.xls') || chooseFile.name.endsWith('.xlsx'))) {
            console.log('excel');

            readXlsxFile(chooseFile).then((rows: any) => {
                if (rows.length > 0) {
                    setHeaders(rows[0]);
                    if (firstRowHeader) {
                        setParsedData(rows.slice(1));
                    } else {
                        setParsedData(rows);
                    }
                    setDefaultActiveKey("3");
                }
                // console.log(rows);
            })
        } else if (method === "manual" && importText) {
            // Parse the text using PapaParse
            const result = Papa.parse(importText, {
                header: false,
                skipEmptyLines: true,
            });
            const data = result.data as string[][];
            // console.log(result);

            if (data.length > 0) {
                setHeaders(data[0]);
                setParsedData(data.slice(1));
                setDefaultActiveKey("3");
            }
        }

        setFirstRowHeader(false);
        setChooseFile(null);
        setEnableHeaderCheckBox(false);
        setFileName('');
    };

    const handleMappingChange = (header: string, attribute: string) => {
        setAttributeMapping((prev) => ({ ...prev, [header]: attribute }));
    };


    const importData = async () => {
        setProcessing(true);
        const transformedData = parsedData.map((row) => {
            const newRow: Record<string, string> = {};
            headers.forEach((header, index) => {
                const attribute = attributeMapping[header];
                if (attribute) {
                    newRow[attribute] = row[index];
                }
            });
            return newRow;
        });

        // console.log(transformedData);

        try {
            const response = router.post(
                `/organizer/events/import/${importType}`, // URL
                { importType, data: transformedData }, // Data payload
                {
                    onSuccess: (page: any) => {
                        if (onImportSuccess) onImportSuccess(page.props);
                        showModal();
                        setDefaultActiveKey("1");
                        setMethod(null);
                        setChooseFile(null);
                        setImportText(null);
                        setHeaders([]);
                        setParsedData([]);
                        setAttributeMapping({});
                        setProcessing(false);
                    },
                    onError: (errors: any) => {
                        console.error(errors);
                    },
                }
            );
        } catch (error) {
            console.error(error);
            alert("An error occurred during import.");
        }
    };

    return (
        <Modal className='modal-dialog-centered' size='lg' centered show={importAttendeesModal} onHide={() => showModal()} backdrop={'static'}>
            <Modal.Header>
                <h5 className="modal-title text-capitalize" id="staticBackdropLabel">Import {importType}</h5>
                <Button type="button" className="btn-close"
                    onClick={() => {
                        showModal();
                    }} aria-label="Close"></Button>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <Tab.Container activeKey={defaultActiveKey} onSelect={(k: any) => setDefaultActiveKey(k)}>
                    <Row>
                        <Col lg={3}>
                            <Nav variant="pills" className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center">
                                <Nav.Item>
                                    <Nav.Link eventKey="1">
                                        <span className="border rounded-circle avatar-xs d-block mx-auto fs-5 mb-1 p-1">1</span>
                                        Import Method
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="2" disabled={!method}>
                                        <span className="border rounded-circle avatar-xs d-block mx-auto fs-5 mb-1 p-1">2</span>
                                        Upload Data
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="3" disabled={!headers.length || !parsedData.length}>
                                        <span className="border rounded-circle avatar-xs d-block mx-auto fs-5 mb-1 p-1">3</span>
                                        Map Attributes
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="4" disabled={Object.keys(attributeMapping).length === 0}>
                                        <span className="border rounded-circle avatar-xs d-block mx-auto fs-5 mb-1 p-1">4</span>
                                        Import Progress
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={9}>
                            <Tab.Content
                                className="text-muted mt-3 mt-lg-0"
                            >
                                <Tab.Pane eventKey="1" id="custom-v-pills-home">
                                    <div className="d-flex flex-column flex-md-row mb-4 align-items-center justify-content gap-4 p-2 p-md-5">
                                        <div
                                            className="card border px-2 py-4 p-md-5 rounded-4 w-50"
                                            style={cardStyle(hoveredCard === 'file')}
                                            onMouseEnter={() => setHoveredCard('file')}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            onClick={() => selectImportMethod('2', 'file')}
                                        >
                                            <i className="ri-download-cloud-2-line d-block fs-20 mb-1"
                                                style={contentStyle(hoveredCard === 'file')}>
                                            </i>
                                            <span style={contentStyle(hoveredCard === 'file')}>Import from file</span>
                                        </div>
                                        <div
                                            className="card border px-2 py-4 p-md-5 rounded-4 w-50"
                                            style={cardStyle(hoveredCard === 'manual')}
                                            onMouseEnter={() => setHoveredCard('manual')}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            onClick={() => selectImportMethod('2', 'manual')}

                                        >
                                            <i className="ri-file-edit-line d-block fs-20 mb-1" style={contentStyle(hoveredCard === 'manual')}>
                                            </i>
                                            <span style={contentStyle(hoveredCard === 'manual')}>Import Manually</span>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="2" id="custom-v-pills-profile" className="">
                                    {method === 'file' ? (
                                        <div className='d-flex flex-column align-items-center'>
                                            <div
                                                className="card border p-5 rounded-4 text-muted mt-5 w-100"
                                                style={cardStyle(hoveredCard === 'file')}
                                                onMouseEnter={() => setHoveredCard('file')}
                                                onMouseLeave={() => setHoveredCard(null)}
                                                onClick={() => document.getElementById('importFile')?.click()}
                                            >
                                                <i className="ri-download-cloud-2-line d-block fs-20 mb-1"
                                                    style={contentStyle(hoveredCard === 'file')}>
                                                </i>
                                                <span style={contentStyle(hoveredCard === 'file')}>Choose .csv, .xls, .xlsx file</span>
                                                <input type="file" name="importFile" id="importFile" style={{ display: 'none' }}
                                                    onChange={handleFileChange} accept=".csv,.xls,.xlsx" />
                                            </div>
                                            {invalidFileType && <Form.Control.Feedback type="invalid" className='d-block'>
                                                Invalid File Type Selected, only *.csv, *.xls, *.xlsx files are allowed
                                            </Form.Control.Feedback>}
                                            {chooseFile &&
                                                <Row className='w-100 mb-3 mt-2'>
                                                    <Col className='d-flex justify-content-start' md={3} lg={3}>Selected File : </Col>
                                                    <Col className='d-flex justify-content-start' md={9} lg={9}>{fileName}</Col>
                                                </Row>
                                            }
                                            {enableHeaderCheckBox && <Row className='d-flex justify-content-start w-100 mb-3'>
                                                <Col>
                                                    <Form.Check type="checkbox" id="first-row-contains-header" onChange={handleFirstRowContainsHeaderCheckBox}
                                                        checked={firstRowHeader} label="First Row Contains Header" disabled={!enableHeaderCheckBox} />
                                                </Col>
                                            </Row>}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="h6 text-start mb-0">
                                                Enter {importType} information below the given attributes respectively, separated by commas.
                                            </div>
                                            <span className="text-muted fw-normal text-start">Please don't change the given attributes</span>
                                            <textarea className="border p-3 rounded-3 w-100 mt-3" cols={30} rows={8}
                                                placeholder='e.g. name, email, phone number etc.'
                                                onChange={(e) => setImportText(e.target.value)}
                                                value={importText || ""}
                                            >
                                            </textarea>
                                        </>
                                    )}
                                    <Button className="btn btn-success text-end" disabled={(!chooseFile && !importText) || invalidFileType} onClick={handleContinue}>Continue</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="3" id="custom-v-pills-messages">
                                    <h6>Map Attributes</h6>
                                    <div className="card p-4">
                                        {headers?.map((header) => {
                                            // Get used attributes (excluding current header)
                                            const usedAttributes = Object.entries(attributeMapping)
                                                .filter(([key]) => key !== header)
                                                .map(([, value]) => value)
                                                .filter(Boolean);

                                            // Convert filteredAttributes to react-select format
                                            const filteredOptions = availableAttributes
                                                .filter((attr) => !usedAttributes.includes(attr))
                                                .map((attr) => ({ label: attr, value: attr }));

                                            return (
                                                <div key={header} className="d-flex align-items-center mb-3">
                                                    <span className="w-50 text-start text-capitalize">{header}</span>
                                                    <Select
                                                        className="w-50 text-start text-capitalize"
                                                        value={filteredOptions.find((opt) => opt.value === attributeMapping[header]) || null}
                                                        onChange={(selected) => handleMappingChange(header, selected ? selected.value : "")}
                                                        options={filteredOptions}
                                                        isClearable // Optional: Allows clearing the selection
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        className="btn btn-success mt-3"
                                        onClick={() => setDefaultActiveKey("4")}
                                        disabled={Object.keys(attributeMapping).length === 0}
                                    >
                                        Continue
                                    </Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="4" id="custom-v-pills-messages">
                                    <h6>Import Progress</h6>
                                    <p className='my-5 py-5 fs-2'>Ready to import <span className="">{parsedData.length}</span> records.</p>

                                    {/* <Button className="btn btn-success"  disabled={parsedData.length === 0}>
                                    </Button> */}
                                    <button className="btn btn-success" disabled={processing} onClick={importData}>
                                        {processing ? (
                                            <span className="d-flex gap-1 align-items-center">
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                Start Import
                                            </span>
                                        ) : (
                                            <span>Start Import</span>
                                        )}
                                    </button>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal >
    )
}

export default ImportModal
