var map;
      var marker;

      if (navigator.geolocation) {
        // watch for user movement
        navigator.geolocation.watchPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          console.log(lat,lng);
          var myLatLng = {lat: lat, lng: lng}
          initMap(myLatLng);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      function initMap(myLatLng) {

        // create the map if it doesn't exist yet
        if(!map) {
          map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 17
          });
        }
        // optional for centering the map on each user movement:
        else {
          map.setCenter(myLatLng)
        }

        // create the marker if it doesn't exist yet
        if(!marker) {
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
          });
        } else {
          // update the markers position
          marker.setPosition(myLatLng);
        }

      }