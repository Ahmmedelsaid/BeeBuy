import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/slidez.css";

export default class Slider extends Component {
  render() {
    return (
      <>
       
      <Carousel fade className="SlideSize">
      <Carousel.Item className="img">
        <img
          className="d-block w-100 "
          src="https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png"
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img"
          src="https://www.arkonwebsolutions.com/img/ecom.png"
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img"
          src="https://www.viralamazingnews.com/wp-content/uploads/2021/02/ecommerce-website.jpg"
          alt="Third slide"
        />

   
      </Carousel.Item>
    </Carousel>
      </>
    );
  }
}
