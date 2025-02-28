import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { connectData } from '../../../../common/data';
import { Link } from '@inertiajs/react';

const Connect = () => {
   
    return (
        <React.Fragment>
            <section className="section" id="wallet">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h2 className="mb-3 fw-bold lh-base">Connect NFT Marketplace</h2>
                                <p className="text-muted">A non-fungible token is a non-interchangeable unit of data stored on a blockchain, a form of digital ledger, that can be sold and traded.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {connectData.map((item, key) => (
                            <Col key={key} lg={4}>
                                <Card className="text-center border shadow-none">
                                    <Card.Body className="py-5 px-4">
                                        <img src={item.img} alt="" height="55" className="mb-3 pb-2" />
                                        <h5>{item.title}</h5>
                                        <p className="text-muted pb-1">{item.textContent}</p>
                                        <Link href="#" className={item.bgColor ? "btn btn-info" : "btn btn-soft-info" }>Connect Wallet</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export default Connect;