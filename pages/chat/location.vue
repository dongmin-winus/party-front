<template>
  <div>
    <headerType01 />
    <div class="sizebox">&nbsp;</div>
    <div class="map-body">
      <!-- <button class="current" @click="setCenter">내위치</button> -->
      <div class="btn-group">
        <div v-for="(btn, index) in menuBtn" :key="index">
          <button class="btn" :class="menu == btn.name ? 'active' : null" @click="btnClick(btn.name)">{{ btn.name
          }}</button>
        </div>
        <button @click="setCenter(lat, lon)" class="btn">내위치</button>
      </div>
      <div class="count">
        <p style="font-size: 15px; font-weight: 500;">현재 시각 기준</p>
        <p style="font-size: 30px; font-weight: 500;">{{ pos.length }}</p>
      </div>
      <div id="map" class="map"></div>
      <div class="map-bottom">
        <div @click="listbox = !listbox" class="blbs orange">
          아이콘
        </div>
      </div>
      <div v-if="listbox" class="listbox">
        <swiper class="swiper-container" :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="(slide, index) in pos" :key="index" v-if="index < 10">
            <div @click="setCenter(slide.y, slide.x)">
              <img class="list-img" src="/images/emoticon/애고미_이모티콘-01.png" alt="">
              <div>
              <span style="font-size: 14px;">{{ slide.title }}</span><br>
              <span style="font-size: 14px;">번호 </span><br>
              <span style="font-size: 14px;">시간 </span>
            </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
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
      myMarker:[],
      markers: [], // 마커 정보
      markersPos: [], //마커 위도 경도
      pos: [],
      posP: [], // 파라솔
      posH: [], // 현수막
      posJ: [], // 집회
      menuBtn: [
        {
          name: "파라솔"
        },
        {
          name: "현수막",
        },
        {
          name: "집회",
        },
      ],
      menu: "파라솔",
      title: null,
      listbox: false,
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
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


    initMap() {
      let self = this;

      // 맵 생성
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(35.902707, 127.72044),
        // center: new kakao.maps.LatLng(self.lat, self.lon),
        level: 13
      };

      self.map = new kakao.maps.Map(container, options);
      self.map.setMaxLevel(13);
      this.currentLocation()
      // 3초마다 실시간 위치 찾기
      // setInterval(() => {
      //  this.currentLocation()
    
      // }, 3000);
      this.makeMarkers();
        
      // self.makeClusterer();
      

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
      this.markersPos = this.pos.map(item => new kakao.maps.LatLng(item.y, item.x));
      for(let i = 0; i < this.markersPos.length; i++){
        var marker = new kakao.maps.Marker({
          map:this.map,
          position: this.markersPos[i]
        })
        this.markers.push(marker)
      }
    },
    // 현재 위치 가져오기
    currentLocation() {
      let self = this;
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          self.lat = position.coords.latitude; // 위도
          self.lon = position.coords.longitude; // 경도
          console.log(self.lat, self.lon)
          self.currentMarker(self.lat, self.lon)
        },this.error);
          navigator.geolocation.watchPosition((newPosition) => {
            self.myMarker.setMap(null); //현재 삭제 
            self.lat = newPosition.coords.latitude;
            self.lon = newPosition.coords.longitude;
            self.currentMarker(self.lat, self.lon) // 현재위치 불러오기
            self.pos.sort((a, b) => {
              const distanceA = Math.sqrt((a.y - self.lat) ** 2 + (a.x - self.lon) ** 2);
              const distanceB = Math.sqrt((b.y - self.lat) ** 2 + (b.x - self.lon) ** 2);
              return distanceA - distanceB;
          });
          })

         

        // }, this.error);

      } else {
        alert('위치 정보 사용 불가능.');
        return;
      }

    },
    error() {
      alert('위치수집 동의 해주세요.')
    },  
    currentMarker(lat, lon) {
      // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSrc = '/images/emoticon/애고미_이모티콘-02.png'
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      this.myMarker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(lat, lon),
        image: markerImage,
      })
    },

    // 현재 위치로 지도 이동
    setCenter(lat, lon) {
      this.map.setLevel(3);
      const moveLatLon = new kakao.maps.LatLng(lat, lon)
      this.map.setCenter(moveLatLon)
    },

    btnClick(menu) {
      this.menu = menu;
      if(this.menu == '파라솔'){
         this.markerDelete()
        this.pos = this.posP
        this.makeMarkers();
         return;
      } else if(this.menu == '현수막') {
         this.markerDelete()
        this.pos = this.posH
        this.makeMarkers();
        return;
      } else if(this.menu == '집회') {
         this.markerDelete()
        this.pos = this.posJ
        this.makeMarkers();
        return;
      }
      
    },

    markerDelete() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
    },



    // 파라솔 위치 가져오기
    async getApi() {
      await this.$axios.get('api/maps')
        .then((response) => {
          this.pos = response.data.data
        })
        .then(()=>{
          for(let i = 0; i < this.pos.length; i++) {
            if(this.pos[i].category == null) {
              this.posP.push(this.pos[i])
            } else if(this.pos[i].category == 2) {
              this.posH.push(this.pos[i])
            } else if (this.pos[i].category == 3) {
              this.posJ.push(this.pos[i])
            }
          }
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

.sizebox {
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

.count {
  position: absolute;
  top: 70px;
  right: 5%;
  z-index: 20;
  text-align: center;
}

.map-bottom {
  position: absolute;
  z-index: 20;
  bottom: 5%;
  right: 5%;
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

.listbox {
  height: 25vh;
  background-color: white;
  position: absolute;
  z-index: 10;
  bottom: 0;
  width: 100%;
}

.list-img {
  height: 80px;
  width: 150px;
}


.blbs {
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  height: 50px;
  width: 50px;
  transform: scale(1);
  animation: pulse-black 2s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}


.blbs.orange {
  background: #0baf00;
  box-shadow: 0 0 0 0 rgba(0, 128, 0, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 128, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 128, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 128, 0, 0);
  }
}
</style>