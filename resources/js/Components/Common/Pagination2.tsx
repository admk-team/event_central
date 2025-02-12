import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Button, Row } from "react-bootstrap";

const Pagination2 = ({ links }: any) => {
    return (
        <React.Fragment>
            <Row className="g-0 justify-content-end mb-4">
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
                                    <Link href={item.url} key={index}>
                                        <Button variant="link" className="page-item pagination-prev">
                                            Previous
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={item.url} key={index}>
                                        <Button variant="link" className="page-item pagination-next">
                                            Next
                                        </Button>
                                    </Link>
                                )
                            )
                        ))}

                        {/* {currentPage <= 1 ? (
                             <Button variant="link" className="page-item pagination-prev disabled">
                             Previous
                         </Button>
                        ) :
                            <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                  <Button variant="link" className="page-link" onClick={handleprevPage}>Previous</Button>
                            </li>
                        }
                        {pageNumbers.map((item, key) => (
                            <React.Fragment key={key}>
                                <li className="page-item">
                                <Button variant="link" className={currentPage === item ? "page-link active" : "page-link"} onClick={() => handleClick(item)}>{item}</Button>
                                </li>
                            </React.Fragment>
                        ))}
                        {currentPage >= pageNumbers.length ? (
                            <Button variant="link" className="page-item pagination-next disabled">

                            Next
                        </Button>
                        ) :
                            <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                <Button variant="link" className="page-link" onClick={handlenextPage}>Next</Button>
                            </li>
                        } */}
                    </ul>
                </div>
            </Row>
        </React.Fragment>
    );
}

export default Pagination2;