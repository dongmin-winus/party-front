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
      pos: [],
    }
  },

  async mounted() {
    // if (!("geolocation" in navigator)) {
    //   return;
    // }
    await this.getApi()
    kakao.maps.load(()=>{
       if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        script.asyn = true;
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0b676e15765c46418fa53c1333910c0a&libraries=services,clusterer";
        document.head.appendChild(script);
      }


    });
   
  },
  methods: {
      // 내위치 마커와 인포윈도우 표시
    displayMarker(map,locPosition, message) {
      const marker = new kakao.maps.Marker({
        map: map,
        posiotion: locPosition
      });
      const iwContent = message;
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });
      infowindow.open(this.map, marker);
      // this.map.setCenter(locPosition);
    },
    initMap() {
      let self = this;

      // 맵 생성
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(36.702707, 127.522044),
        // center: new kakao.maps.LatLng(self.lat, self.lon),
        level: 13
      };

      self.map = new kakao.maps.Map(container, options);
      self.map.setMaxLevel(13);



      // 현재 내위치 가져오기
      if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          self.lat = position.coords.latitude; // 위도
          self.lon = position.coords.longitude; // 경도
          console.log(self.lat)
          console.log(self.lon)
          self.currentMarker(self.lat, self.lon)

        });

      } else {
        alert('위치를 허용해주세요.');
        return;
      }

      self.makeClusterer();
      // this.makeMarkers();

    },

    // 클러스터 표시
    makeClusterer() {
      new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: false, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        disableClickZoom: false,
        markers: this.makeMarkers()
      });
    },

    //마커 표시
     makeMarkers() {
      const positions = this.pos.map(item => new kakao.maps.LatLng(item.y, item.x));
      return positions.map(position => {
        return new kakao.maps.Marker({
          map: this.map,
          position,
          clickable: true
        })
      })
    },

    currentMarker(lat, lon) {
      const imageSrc = '/images/emojiOn.svg';
      const imageSize = new kakao.maps.Size(50, 65);
      const imageOption = {offset: new kakao.maps.Point(27, 69)};
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
     return new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(lat, lon),
        image: markerImage
      })
    },

    // 파라솔 위치 가져오기
    async getApi() {
     await this.$axios.get('api/maps')
        .then((response) => {
          this.pos = response.data
        })
    },

  }
}
</script>


<style></style>