import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Button, Row } from "react-bootstrap";

const Pagination = ({ links }: any) => {
    return (
        <React.Fragment>
            <Row className="g-0 justify-content-end">
                <div className="col-sm-auto">
                    <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                        {links.map((item: any, index: number) => (
                            ![0, links.length - 1].includes(index) ? (
                                <React.Fragment key={index}>
                                    <li className="page-item">
                                        <Link href={item.url} key={index}>
                                            <Button variant="link" className={item.active ? "page-link active" : "page-link"}>
                                                {item.label}
                                            </Button>
                                        </Link>
                                    </li>
                                </React.Fragment>
                            ) : (
                                index === 0 ? (
                                    <li key={index} className="page-item">
                                        <Link href={item.url}>
                                            <Button variant="link" className="page-link pagination-prev">
                                                Previous
                                            </Button>
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={index} className="page-item">
                                        <Link href={item.url}>
                                            <Button variant="link" className="page-link pagination-next">
                                                Next
                                            </Button>
                                        </Link>
                                    </li>
                                )
                            )
                        ))}
                    </ul>
                </div>
            </Row>
        </React.Fragment>
    );
}

export default Pagination;