import React from "react";
import { Carousel, Image } from "react-bootstrap";

// Carousel images
import img1 from "../../../../../../images/small/img-1.jpg";
import img2 from "../../../../../../images/small/img-2.jpg";
import img3 from "../../../../../../images/small/img-3.jpg";
const Slide = () => {
  return (
    <React.Fragment>
       <Carousel controls={false} indicators={false}>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </React.Fragment>
  );
};

export default Slide;
