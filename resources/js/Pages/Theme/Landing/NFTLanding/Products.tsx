import React, { useState } from 'react';
import { Container, Row, Col, Nav, } from 'react-bootstrap';
import { productData } from '../../../../common/data';
import { Link } from '@inertiajs/react';

const Products = () => {
    const [nav, setNav] = useState("All");

    return (
        <React.Fragment>
            <section className="section bg-light" id="marketplace">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h2 className="mb-3 fw-semibold lh-base">Explore Products</h2>
                                <p className="text-muted mb-4">Collection widgets specialize in displaying many elements of the same type, such as a collection of pictures from a collection of articles.</p>
                                <Nav variant='pills' className="nav-pills filter-btns justify-content-center" role="tablist">
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("All")} className={nav === "All" ? " fw-medium active" : "fw-medium text-primary"}>All Items</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("artwork")} className={nav === "artwork" ? " fw-medium active" : "fw-medium text-primary"}>Artwork</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("music")} className={nav === "music" ? " fw-medium active" : "fw-medium text-primary"}>Music</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("games")} className={nav === "games" ? " fw-medium active" : "fw-medium text-primary"}>Games</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("crypto-card")} className={nav === "crypto-card" ? " fw-medium active" : "fw-medium text-primary"}>Crypto Card</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item role="presentation">
                                        <Nav.Link type="button" onClick={() => setNav("3d-style")} className={nav === "3d-style" ? " fw-medium active" : "fw-medium text-primary"}>3d Style</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {(productData.filter(({ categories }) => nav === categories || nav === "All")).map((item, key) => (
                            <Col key={key} lg={4} className={"product-item " + item.isClass}>
                                <div className="card explore-box card-animate">
                                    <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                                        <button type="button" className="btn btn-icon active" data-bs-toggle="button" aria-pressed="true"><i className="mdi mdi-cards-heart fs-16"></i></button>
                                    </div>
                                    <div className="explore-place-bid-img">
                                        <img src={item.img} alt="" className="card-img-top explore-img" />
                                        <div className="bg-overlay"></div>
                                        <div className="place-bid-btn">
                                            <Link href="#" className="btn btn-success"><i className="ri-auction-fill align-bottom me-1"></i> Place Bid</Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="fw-medium mb-0 float-end"><i className="mdi mdi-heart text-danger align-middle"></i> {item.likes} </p>
                                        <h5 className="mb-1"><Link href="/apps-nft-item-details" className='text-body'>{item.title}</Link></h5>
                                        <p className="text-muted mb-0">{item.category}</p>
                                    </div>
                                    <div className="card-footer border-top border-top-dashed">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 fs-14">
                                                <i className="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span className="fw-medium">{item.highest}</span>
                                            </div>
                                            <h5 className="flex-shrink-0 fs-14 text-primary mb-0">{item.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Products;