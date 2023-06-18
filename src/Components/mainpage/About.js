import React from "react";
import NavBar from "../ComonentsSmall/NavBar";
import "../style/About.css";
import "../style/MallCard.css";

export default function About() {
  return (
    <div>
      <NavBar></NavBar>

        <section className="">
          <div  className="about"> About Us</div>
          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <h1 className=" color" >
                      Our Mission
                  </h1>
                  <p className="Pragraph">
                    Where some suffer from some laziness in buying things or
                    going to the malls for shopping, some don’t have the ability
                    to go or need assistance in their daily lives or the
                    shopping place is far from their location.
                      So, it is our mission to make it easier for everyone to
                      shop in the malls while they are at home without needing
                      assistance of others, This is for the user to open his/her
                      phone and be able to shop as if inside the mall and choose
                      the things he wants, and it will be sent to him.
                   
                  </p>

                  <h1 className=" color">
                    What we Do
                  </h1>
                  <p className="Pragraph">
                    Ease of delivery of products available in the malls Reducing
                    crowding in the malls, which leads to customer rights of
                    maintaining health.
                   
                      Ensuring purchases and refunds from known and trusted
                      places,Facilitate browsing the application's content from
                      product pages by providing advanced search solutions to
                      search within certain price limits or for certain brand
                      products (Filters Advanced Search), The type of delivery
                      vehicle depends on the customer’s request (Motorcycle or
                      pick-up truck), Tracking the movement of shipment and
                      delivery to maintain working time and There is an
                      additional shipping service to deliver the product within
                      24 hours
                   
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
