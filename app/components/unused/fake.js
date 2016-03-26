import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

window.autocomplete=null;

window.initAutocomplete = ()=> {
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      //{types: ['geocode']});
      );

    autocomplete.addListener('place_changed', ()=>{
        console.log(autocomplete.getPlace().formatted_address);
        fml(autocomplete.getPlace().formatted_address); 
    });   
}

class Fake extends Component {

    render() {
       return ( <div></div> );
    }
}

export default scriptLoader(
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAMOszNOH-Bf1QX68qGtSD_9QGmJDLlP1g&signed_in=true&libraries=places&callback=initAutocomplete'
)(Fake);

        
// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
/*
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
*/
// [END region_geolocation]