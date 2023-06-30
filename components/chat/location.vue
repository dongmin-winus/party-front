<template>
  <section class="test">
    <div id="map"></div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      markers:[],
      latitude: 0,
      longitude: 0,
    }
  },
  created() {
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
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.564343, 126.947613),
        level: 5,
      };
      var map = new kakao.maps.Map(mapContainer, mapOption);
      var positions = [
        {
          latlng: new kakao.maps.LatLng(37.562632898194835, 126.9454282268269),
        },
        {
          latlng: new kakao.maps.LatLng(37.562195884514403, 126.94922601468826),
        },
      ];

      //마커 생성
      positions.forEach(function(pos){
        var marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커위치
        });
        // 마커가 지도 위에 표시 되도록 설정
        marker.setMap(map);

      })
    },
  }
}
</script>


<style>
.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>