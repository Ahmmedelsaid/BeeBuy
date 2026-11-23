import React, { useEffect } from "react";
import firebase from "../../firebase";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  let map;
  let currentMarker;

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD9mLMTo7d-DKGa45I9Z29l7ZMvuPfLt8U`;
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 30.06263, lng: 31.24967 },
      zoom: 12,
    });

    const searchButton = document.getElementById("search-button");
    const sendSearchedLocationButton = document.getElementById("send-searched-location-button");

    searchButton.addEventListener("click", () => {
      const searchInput = document.getElementById("search-input");
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchInput.value }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          currentMarker = new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
          sendSearchedLocationButton.style.display = "inline-block";
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    });

    sendSearchedLocationButton.addEventListener("click", () => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const uid = user.uid;
          const firestore = firebase.firestore();
          firestore
            .collection("users")
            .doc(uid)
            .collection("orders")
            .add({
              latitude: currentMarker.getPosition().lat(),
              longitude: currentMarker.getPosition().lng(),
              city: document.getElementById("city").value,
              street: document.getElementById("street").value,
            })
            .then(() => {
              alert("Location saved successfully!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        } else {
          // إشعار المستخدم بتسجيل الدخول
          alert("Please log in to save the location.");
        }
      });
    });
  };

  return (
    <>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <div>
        <input type="text" id="search-input" placeholder="Search for a location" />
        <button id="search-button">Search</button>
        <button id="send-searched-location-button" style={{ display: "none" }}>
          Send Location
        </button>
      </div>
    </>
  );
};

export default MapComponent;
