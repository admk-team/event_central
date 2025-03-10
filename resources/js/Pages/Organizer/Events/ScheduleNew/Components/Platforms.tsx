import { Ellipsis } from "lucide-react";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";

export default function Platforms() {
    return (
        <>
            <div className="platforms">
                <div className="platforms-inner d-flex flex-column">
                    <div className="platform px-3 py-2 cursor-pointer d-flex justify-content-between align-items-center">
                        <div className="fw-semibold">Stage</div>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="light"
                                size="sm"
                                className="btn-icon"
                            >
                                <Ellipsis size={14} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"> Edit</Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="4"
                                    className="text-danger fw-semibold"
                                >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="platform px-3 py-2 cursor-pointer d-flex justify-content-between align-items-center">
                        <div className="fw-semibold">Room</div>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="light"
                                size="sm"
                                className="btn-icon"
                            >
                                <Ellipsis size={14} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"> Edit</Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="4"
                                    className="text-danger fw-semibold"
                                >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="text-center py-3">
                    <Button size="sm">
                        <i className="ri-add-fill"></i>
                        New Platform
                    </Button>
                </div>
            </div>
        </>
    );
}
