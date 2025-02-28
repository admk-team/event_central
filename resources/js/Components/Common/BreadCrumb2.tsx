import { Link } from '@inertiajs/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface BreadCrumbProps {
    title: string;
    items? : {
        title: string
        link: string
    }[];
}

const BreadCrumb2 = ({ title, items } : BreadCrumbProps) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{title}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {items && items.map((item, i) => (
                                    <li className="breadcrumb-item" key={i}><Link href={item.link}>{item.title}</Link></li>
                                ))}
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb2;