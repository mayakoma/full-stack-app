const axios = require("axios");
const API_KEY = "AIzaSyBlnaXZZJwP7aBGd74MzBzz-al_3GPIVoo";
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  console.log(address);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  console.log(data);

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;

// {
//     "results" : [
//        {
//           "address_components" : [
//              {
//                 "long_name" : "94043",
//                 "short_name" : "94043",
//                 "types" : [ "postal_code" ]
//              }
//           ],
//           "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
//           "geometry" : {
//              "location" : {
//                 "lat" : 37.4267861,
//                 "lng" : -122.0806032
//              },
//              "location_type" : "ROOFTOP",
//              "viewport" : {
//                 "northeast" : {
//                    "lat" : 37.4281350802915,
//                    "lng" : -122.0792542197085
//                 },
//                 "southwest" : {
//                    "lat" : 37.4254371197085,
//                    "lng" : -122.0819521802915
//                 }
//              }
//           },
//           "place_id" : "ChIJtYuu0V25j4ARwu5e4wwRYgE",
//           "plus_code" : {
//              "compound_code" : "CWC8+R3 Mountain View, California, United States",
//              "global_code" : "849VCWC8+R3"
//           },
//           "types" : [ "street_address" ]
//        }
//     ],
//     "status" : "OK"
//  }
