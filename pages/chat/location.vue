<template>
  <div>
    <headerType01 />
    <div class="sizebox">&nbsp;</div>
    <div class="map-body">
      <!-- <button class="current" @click="setCenter">내위치</button> -->
      <div class="btn-group">
        <div v-for="(btn,index) in menuBtn" :key="index">
          <button class="btn" :class="menu == btn.name ? 'active' : null "  @click="btnClick(btn.name)">{{ btn.name }}</button>
        </div>
        <button @click="setCenter" class="btn">...더보기</button>
      </div>
      <div id="map" class="map"></div>
    </div>
    <navigation />
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
      menuBtn: [
        {
          name: "파라솔"
        },
        {
          name: "현수막",
        },
        {
          name:"집회",
        },
      ],
      menu:"파라솔"
    }
  },

  async mounted() {
    // if (!("geolocation" in navigator)) {
    //   return;
    // }
    await this.getApi()
    kakao.maps.load(() => {
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
    displayMarker(map, locPosition, message) {
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
        center: new kakao.maps.LatLng(35.302707, 127.522044),
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
          self.currentMarker(self.lat, self.lon)

        });

      } else {
        alert('위치를 허용해주세요.');
        return;
      }

      // self.makeClusterer();
      this.makeMarkers();

    },

    // 클러스터 표시
    makeClusterer() {
      new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: false, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        disableClickZoom: false,
        markers: this.makeMarkers(),
        styles: [{
          width: '45px', height: '45px',
          background: 'rgba(255, 80, 80, .8)',
          borderRadius: '30px',
          color: '#000',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '45px'
        }]
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
      // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSrc = '/images/emoticon/애고미_이모티콘-02.png'
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      return new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(lat, lon),
        image: markerImage
      })
    },

    // 현재 위치로 지도 이동
    setCenter() {
      this.map.setLevel(3);
      const moveLatLon = new kakao.maps.LatLng(this.lat, this.lon)
      this.map.setCenter(moveLatLon)
    },

    btnClick(menu) {
      this.menu = menu;
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


<style scoped>

.map-body {
  position: relative;
}
.map {
  height: calc(100vh - 130px);
}
.sizebox{
  height: 60px;
}

.btn-group {
  position: absolute;
  top: 15px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.btn {
  padding: 10px 15px;
  background-color: white;
  border-radius: 25px;
}

.active {
  background-color: red;
  color: white;
}
</style>