<template>
  <div class="map-body">
    <div id="map" style="height:100vh;"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      map: null,
      lat: null, // 위도
      lon: null, // 경도
    }
  },
  mounted() {
    // if (!("geolocation" in navigator)) {
    //   return;
    // }
    kakao.maps.load();
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0b676e15765c46418fa53c1333910c0a";
      document.head.appendChild(script);
    }

  },
  methods: {
    initMap() {
      let self = this;
      if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          self.lat = position.coords.latitude; // 위도
          self.lon = position.coords.longitude; // 경도
          console.log(self.lat)
          console.log(self.lon)
        });

      } else {
        alert('위치를 허용해주세요.');
        return;
      }
      setTimeout(function () {
        const container = document.getElementById("map");
        if (!self.map) {
          const coords = new kakao.maps.LatLng(self.lat, self.lon);
          const options = {
            center: coords,
            level: 13,
          };

          
          // 마커 표시
          self.map = new kakao.maps.Map(container, options);
          const positions = [
          new kakao.maps.LatLng(37.6112114, 127.0513664),
          new kakao.maps.LatLng(37.6113114, 127.0513664),
          new kakao.maps.LatLng(37.6114114, 127.0513664),

          ];
          // 결과값으로 받은 위치를 마커로 표시합니다
         var marker = new kakao.maps.Marker({
            map: self.map,
            position: coords
          });
          marker.setMap(self.map);
          positions.forEach(function(pos){
          new kakao.maps.Marker({
            map:self.map,
            position: pos // 마커위치
        });

        // 마커위에 인포윈도우 표시
        const iwContent = '<div>내위치</div>';
        const iwPosition = new kakao.maps.LatLng(self.lat,self.lon);
        const infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent
        });

        // 마커 위에 인포 윈도우 표시
        infowindow.open(self.map, marker);

      })
        }
      }, 300);


    },
  }
}
</script>


<style></style>