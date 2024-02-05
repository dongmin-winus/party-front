<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">조직관리</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div>  
    <div class="container">
      <div class="notice">
        <span class="point">공지</span>&nbsp;<span>임원 해임 기준에 대한 안내</span>
      </div>
      <div class="content">
        <div class="m-title type01">
          <template v-if="position === '실행위원장'">
            {{ $auth.user.district.state }}
            <span class="point">
              {{ $auth.user.district.election }}
            </span>
            선거구
          </template>
          <template v-if="position === '동대표'">
            {{ $auth.user.district.state }}
            {{ $auth.user.district.city }}
            <span class="point">
              {{ $auth.user.district.district }}
            </span>
          </template>
        </div>
        <div class="mt-24 profile-container">
          <div class="profile-image"></div>
          <div class="profile-info">
            <div class="district">장위동 A팀</div>
            <div class="position">홍길동 실행위원</div>
          </div>
        </div>

        <div class="mt-12 ranking-container">
          <div class="shadow-box ranking">
              <div class="point">00위</div>
              <div class="title">마을랭킹</div>
          </div>
          <div class="shadow-box team">
              <div class="point">299명</div>
              <div class="title">장위동A팀</div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <nuxt-link to="/organization/manage/approvalRequests" class="mt-24 menus approval">
          <span style="color:white;">결재 리스트</span>
          <div class="right">
            <span style="color:white;">대기중</span>
            <span style="color:white">37</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/organization/manage/distribute" class="mt-8 menus distribution">
          <span style="color:#0baf00;">인원분배</span>
          <div class="right">
            <span style="color:#0baf00;">대기중</span>
            <span style="color:#0baf00">129</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/organization/manage/appoint" class="mt-8 menus border-grey">
          <span style="color:black;">후임 동대표 임명</span>
          <div class="right">
            <span style="color:black;">대기중</span>
            <span style="color:black">1</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/organization/manage/approval" class="mt-40 menus bg-lightGray">
          <span>결재서 작성</span>
          <span>＋</span>
        </nuxt-link>
        <nuxt-link to="/organization/manage/myApprovalList" class="mt-8 menus border-grey">
          <span>나의 결재현황</span>
          <span style="padding:5px;"><img src="@/assets/images/arrowRight-gray.png" alt=""  style="width:10px;"></span>
        </nuxt-link>
        <nuxt-link to="/organization/manage/resign" class="mt-8 menus border-grey">
          <span>사임서</span>
          <span style="padding:5px;"><img src="@/assets/images/arrowRight-gray.png" alt=""  style="width:10px;"></span>
        </nuxt-link>
        <div class="mt-8"></div>
      </div>
    </div>
    <navigation />
  </div>  
</template>

<script>
export default {
  data() {
    return {
      position: '실행위원장'
    }
  },
}
</script>

<style scoped>

  .notice {
    background-color: #fbefef;
    padding: 10px;
    font-size: 12px;
    color: #666;
    padding: 10px 25px;
  }
  .notice span {
    font-weight: 500;
    font-size: 18px;
    margin-right: 10px;
  }
  .notice .point {
    color: #ff0000;
  }
  .content {
    background: #eee;
    text-align: center;
    padding: 40px 20px;
  }

  .profile-container {
    height: 100px;;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
  }
  .profile-container .profile-image {
    background-image:url("@/assets/images/taegeuk.png");
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    margin-right: 5%;
  }

  .profile-container .profile-info .district {
    background-color: #ebf6e5;
    border-radius: 5px;
    width: fit-content;
    padding: 5px 10px;

    font-size: 18px;
    font-family: 'GmarketSans';
    font-weight: 400;
    color : #0baf00;
  }
  .profile-container .profile-info .position {
    font-size: 23px;
    font-weight: 500;
    /* font-family: 'GmarketSans'; */
  }

  .ranking-container {
    display: flex;
    justify-content: space-between;
  }

  .ranking-container .shadow-box {
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.30);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120px;
  }

  .shadow-box.ranking {
    width : 45%;  
  }

  .shadow-box.team {
    width : 52.5%;
  }

  .shadow-box .point {
    font-size: 28px;
    font-weight: 600;
    font-family: 'GmarketSans';
    color: #0baf00;
    text-align: center;
  }
  .shadow-box .title {
    font-size: 24px;
    font-weight: 400;
    /* font-family: 'GmarketSans'; */
    text-align: center;
  }

  .menus {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    border-radius: 10px;
    align-items: center;
    width: 100%;
    height: 70px;
  }
  .menus span {
    font-size: 24px;
    font-weight: 300;
  }
  .menus .right {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menus.approval {
    background-color: rgb(218, 12, 1);
  }
  .menus.distribution {
    border : 1px solid #0baf00;
  }
  .menus.border-grey {
    border : 1px solid #999;
  }

</style>