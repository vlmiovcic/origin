import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/CarouselImg.css";
import img1 from "../img/innovation.png";
import img2 from "../img/agil.png";
import img3 from "../img/continuous_deployement.png";

const CarouselImg = () => {
    return (
        <Carousel className="carouselImgMain" interval={5000}>
            <Carousel.Item className="carousel-item" id="carouselImgItemOne">
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item className="carousel-item" id="carouselImgItemTwo">
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second Slide"
                />
            </Carousel.Item>
            <Carousel.Item className="carousel-item" id="carouselImgItemThree">
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third Slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselImg;
