import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, Col, Row } from 'react-bootstrap';

import "swiper/css";
import "swiper/css/pagination";

//Simple bar
import SimpleBar from "simplebar-react";

// import required modules
import { Autoplay, Mousewheel } from "swiper/modules";

//import images
import img3 from "../../../../images/products/img-3.png";
import img4 from "../../../../images/products/img-4.png";
import img5 from "../../../../images/products/img-5.png";
import img6 from "../../../../images/products/img-6.png";
import img8 from "../../../../images/products/img-8.png";

import avatar1 from "../../../../images/users/avatar-1.jpg";
import avatar2 from "../../../../images/users/avatar-2.jpg";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar4 from "../../../../images/users/avatar-4.jpg";
import avatar5 from "../../../../images/users/avatar-5.jpg";
import { Link } from '@inertiajs/react';

const EcommerceWidgets = () => {

    const [count , setCount] = useState<number>(2);

    const confirmPayment = (): void => {
        const selectedRadio = document?.querySelector<HTMLInputElement>('input[name=listGroupRadioGrid]:checked');
        const notificationOverlay = document.getElementById("notification-overlay") as HTMLElement;
        const notificationWarn = document.getElementById("notification-warn");
      
        if (selectedRadio) {
          notificationOverlay.style.visibility = "visible";
          notificationOverlay.style.opacity = "1";
      
          const checkedElem = selectedRadio.parentElement;
          const payamount = checkedElem?.querySelector(".pay-amount")?.innerHTML;
          const successPayElement = document.querySelector("#notification-overlay .success-pay");
          if (payamount && successPayElement) {
            successPayElement.innerHTML = payamount;
          }
        } else {
          if (notificationWarn) {
            notificationWarn.classList.remove("d-none");
            setTimeout(() => notificationWarn.classList.add("d-none"), 2000);
          }
        }
      };

    const backToHome = (): void => {
        const notificationOverlay: HTMLElement | null = document.getElementById("notification-overlay");
        if (notificationOverlay) {
          notificationOverlay.style.visibility = "hidden";
          notificationOverlay.style.opacity = "0";
        }
      };

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <h5 className="text-decoration-underline mb-3 mt-2 pb-3">Ecommerce Widgets</h5>
                </Col>
            </Row>

            <Row>
                <Col xl={3} md={6}>
                    <Card className="card-height-100">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Hot Products</h4>
                            <div className="flex-shrink-0">
                                <Link className="text-muted" href="#">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <Card.Body>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1.5}
                            spaceBetween={10}
                            mousewheel={true}
                            loop={false}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Mousewheel]}
                            className="mySwiper vertical-swiper"
                            >
                                <SwiperSlide style={{ maxWidth: "200px"}}>
                                    <div>
                                        <div className="bg-info-subtle rounded">
                                            <img src={img3} alt="" style={{maxHeight: "210px",maxWidth: "auto"}} />
                                        </div>
                                        <div className="pt-3">
                                            <h5 className="text-secondary">$99.94</h5>
                                            <Link href="#">
                                                <h6 className="fs-15 lh-base text-truncate mb-0">350 ml Glass Grocery Container</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide style={{ maxWidth: "200px"}}>
                                    <div>
                                        <div className="bg-success-subtle rounded">
                                            <img src={img4} alt="" style={{maxHeight: "210px",maxWidth: "auto"}} />
                                        </div>
                                        <div className="pt-3">
                                            <h5 className="text-secondary">$99.94</h5>
                                            <Link href="#">
                                                <h6 className="fs-15 lh-base text-truncate mb-0">Fabric Dual Tone Living Room Chair</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide style={{ maxWidth: "200px"}}>
                                    <div>
                                        <div className="bg-warning-subtle rounded">
                                            <img src={img5} alt="" style={{maxHeight: "210px",maxWidth: "auto"}} />
                                        </div>
                                        <div className="pt-3">
                                            <h5 className="text-secondary">$99.94</h5>
                                            <Link href="#">
                                                <h6 className="fs-15 lh-base text-truncate mb-0">Crux Motorsports Helmet</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide style={{ maxWidth: "200px"}}>
                                    <div>
                                        <div className="bg-secondary-subtle rounded">
                                            <img src={img6} alt="" style={{maxHeight: "210px",maxWidth: "auto"}} />
                                        </div>
                                        <div className="pt-3">
                                            <h5 className="text-secondary">$99.94</h5>
                                            <Link href="#">
                                                <h6 className="fs-15 lh-base text-truncate mb-0">Half Sleeve T-Shirts (Blue)</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} ms={6}>
                    <Card className="card-height-100">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <div className="avatar-sm me-3 flex-shrink-0">
                                    <div className="avatar-title bg-info-subtle rounded">
                                        <img src={img6} alt="" className="avatar-xs" />
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="text-muted mb-2">Adidas</p>
                                    <h5 className="fs-15 fw-bold mb-0">Half Sleeve T-Shirts (Blue)</h5>
                                </div>
                            </div>
                            <p className="text-muted pb-1">If you couldn't relate to the information in the previous point, you might be looking for the singlet T-shirt, which is also known as the half T-shirt.</p>

                            <Row className="mb-4">
                                <Col xl={6}>
                                    <h6 className="fs-14 mb-2">Sizes</h6>
                                    <ul className="clothes-size list-unstyled hstack gap-2 mb-0">
                                        <li>
                                            <input type="radio" name="sizes" id="color-1" disabled />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-1">S</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-2" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-2">M</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-3" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-3">L</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-4" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-4">XL</label>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xl={6}>
                                    <div>
                                        <h6 className="fs-14 mb-2">Colors</h6>
                                        <div className="d-flex flex-wrap gap-2 select-color">
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Out of Stock">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-primary" disabled>
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="03 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-secondary">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="03 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-success">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="02 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-info">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex mb-4 align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="text-primary fs-18 mb-0"><span>$22.45</span> <small className="text-decoration-line-through text-muted fs-13">$37.45</small></h5>
                                </div>
                                
                                <div className="input-step flex-shrink-0">
                                    <button type="button" className="minus" onClick={() => setCount(count - 1)}>–</button>
                                    <input type="number" className="product-quantity" defaultValue={count} min="0" max="100" />
                                    <button type="button" className="plus" onClick={() => setCount(count + 1)}>+</button>
                                </div>
                            </div>

                            <Link href="#" className="btn btn-soft-danger d-block">Add to Cart</Link>

                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} md={6}>
                    <Card>
                        <Card.Body className="position-relative">
                            <h5 className="mb-3 fw-semibold">Select Bank</h5>
                            <div className="vstack gap-2">
                                <div className="form-check card-radio">
                                    <input id="listGroupRadioGrid1" name="listGroupRadioGrid" type="radio" className="form-check-input" /> 
                                    <label className="form-check-label" htmlFor="listGroupRadioGrid1">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title bg-success-subtle text-success fs-18 rounded">
                                                        <i className="ri-visa-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">Visa Card</h6>
                                                <b className="pay-amount">$8,500</b>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="form-check card-radio">
                                    <input id="listGroupRadioGrid2" name="listGroupRadioGrid" type="radio" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="listGroupRadioGrid2">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title bg-info-subtle text-info fs-18 rounded">
                                                        <i className="ri-bank-card-2-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">Credit Card</h6>
                                                <b className="pay-amount">$8,326</b>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="form-check card-radio">
                                    <input id="listGroupRadioGrid3" name="listGroupRadioGrid" type="radio" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="listGroupRadioGrid3">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title bg-danger-subtle text-danger fs-18 rounded">
                                                        <i className="ri-mastercard-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">Mastercard Card</h6>
                                                <b className="pay-amount">$8,400</b>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                
                            <button type="button" className="btn btn-success w-100 mt-3" id="confirm-btn" onClick={confirmPayment}>Confirm</button>
                
                            <div id="notification-warn" className="position-absolute top-0 start-0 end-0 d-none">
                                <div className="alert alert-warning" role="alert">
                                    Select at list one item
                                </div>
                            </div>
                
                            <div className="notification-elem" id="notification-overlay">
                                <div className="text-center">
                                    <i className="bx bx-party display-4 text-success"></i>
                                    <div className="mt-4 pt-2">
                                        <h5 className="mb-1 success-pay">$6,201 Payment Successfully</h5>
                                        <p className="text-muted mx-4">Aww yeah, you successfully read this important message.</p>
                
                                        <div>
                                            <button type="button" className="btn btn-danger btn-sm w-sm" id="back-btn" onClick={backToHome}>Back to Home</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} ms={6}>
                    <Card className="card-height-100">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <div className="avatar-sm me-3 flex-shrink-0">
                                    <div className="avatar-title bg-info-subtle rounded">
                                        <img src={img8} alt="" className="avatar-xs" />
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="text-muted mb-2">Adidas</p>
                                    <h5 className="fs-15 fw-bold mb-0">Half Sleeve T-Shirts (Blue)</h5>
                                </div>
                            </div>
                            <p className="text-muted pb-1">If you couldn't relate to the information in the previous point, you might be looking for the singlet T-shirt, which is also known as the half T-shirt.</p>

                            <Row className="mb-4">
                                <Col xl={6}>
                                    <h6 className="fs-14 mb-2">Sizes</h6>
                                    <ul className="clothes-size list-unstyled hstack gap-2 mb-0">
                                        <li>
                                            <input type="radio" name="sizes" id="color-1" disabled />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-1">S</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-2" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-2">M</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-3" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-3">L</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="sizes" id="color-4" />
                                            <label className="avatar-xs btn btn-soft-primary p-0 d-flex align-items-center justify-content-center rounded-circle" htmlFor="color-4">XL</label>
                                        </li>
                                    </ul>
                                </Col>
                                <Col xl={6}>
                                    <div>
                                        <h6 className="fs-14 mb-2">Colors</h6>
                                        <div className="d-flex flex-wrap gap-2 select-color">
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Out of Stock">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-primary" disabled>
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="03 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-secondary">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="03 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-success">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="02 Items Available">
                                                <button type="button" className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-22 text-info">
                                                    <i className="ri-checkbox-blank-circle-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex mb-4 align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="text-primary fs-18 mb-0"><span>$22.45</span> <small className="text-decoration-line-through text-muted fs-13">$37.45</small></h5>
                                </div>
                                
                                <div className="input-step flex-shrink-0">
                                    <button type="button" className="minus" onClick={() => setCount(count - 1)}>–</button>
                                    <input type="number" className="product-quantity" defaultValue={count} min="0" max="100" />
                                    <button type="button" className="plus" onClick={() => setCount(count + 1)}>+</button>
                                </div>
                            </div>

                            <Link href="#" className="btn btn-soft-danger d-block">Add to Cart</Link>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className="col-xxl-5">
                    <Card>
                        <Row className="g-0">
                            <Col lg={6}>
                                <Card.Body className="border-end">
                                    <div className="search-box">
                                        <input type="text" className="form-control bg-light border-light" autoComplete="off" id="searchList" placeholder="Search candidate..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                    <SimpleBar style={{maxHeight: "190px"}} className="px-3 mx-n3">
                                        <ul className="list-unstyled mb-0 pt-2" id="candidate-list">
                                            <li>
                                                <Link href="#" className="d-flex align-items-center py-2">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="avatar-xs">
                                                            <img src={avatar1} alt="" className="img-fluid rounded-circle candidate-img" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-13 mb-1 text-truncate"><span className="candidate-name">Anna Adame</span> <span className="text-muted fw-normal">@Anna</span></h5>
                                                        <div className="d-none candidate-position">Web Developer</div>
                                                    </div>
                                                </Link>
                                            </li>
            
                                            <li>
                                                <Link href="#" className="d-flex align-items-center py-2">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="avatar-xs">
                                                            <img src={avatar2} alt="" className="img-fluid rounded-circle candidate-img" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-13 mb-1 text-truncate"><span className="candidate-name">Patricia Cavin</span> <span className="text-muted fw-normal">@Patricia</span></h5>
                                                        <div className="d-none candidate-position">Web Developer</div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="d-flex align-items-center py-2">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="avatar-xs">
                                                            <img src={avatar3} alt="" className="img-fluid rounded-circle candidate-img" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-13 mb-1 text-truncate"><span className="candidate-name">Jason Tran</span> <span className="text-muted fw-normal">@Jason</span></h5>
                                                        <div className="d-none candidate-position">Magento Developer</div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="d-flex align-items-center py-2">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="avatar-xs">
                                                            <img src={avatar4} alt="" className="img-fluid rounded-circle candidate-img" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-13 mb-1 text-truncate"><span className="candidate-name">Cheryl Moore</span> <span className="text-muted fw-normal">@Cheryl</span></h5>
                                                        <div className="d-none candidate-position">Product Designer</div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="d-flex align-items-center py-2">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="avatar-xs">
                                                            <img src={avatar5} alt="" className="img-fluid rounded-circle candidate-img" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-13 mb-1 text-truncate"><span className="candidate-name">Jennifer Bailey</span> <span className="text-muted fw-normal">@Jennifer</span></h5>
                                                        <div className="d-none candidate-position">Marketing Director</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </SimpleBar>
                                </Card.Body>
                            </Col>
                            <div className="col-lg-6">
                                <div className="card-body text-center">
                                    <div className="avatar-md mb-3 mx-auto">
                                        <img src={avatar1} alt="" id="candidate-img" className="img-thumbnail rounded-circle shadow-none" />
                                    </div>
            
                                    <h5 id="candidate-name" className="mb-0">Anna Adame</h5>
                                    <p id="candidate-position" className="text-muted">Web Developer</p>
            
                                    <div className="d-flex gap-2 justify-content-center mb-3">
                                        <button type="button" className="btn avatar-xs p-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Google">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-google-line"></i>
                                            </span>
                                        </button>
            
                                        <button type="button" className="btn avatar-xs p-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Linkedin">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-linkedin-line"></i>
                                            </span>
                                        </button>
                                        <button type="button" className="btn avatar-xs p-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Dribbble">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-dribbble-fill"></i>
                                            </span>
                                        </button>
                                    </div>
            
                                    <div>
                                        <button type="button" className="btn btn-success rounded-pill w-sm"><i className="ri-add-fill me-1 align-bottom"></i> Follow</button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default EcommerceWidgets;