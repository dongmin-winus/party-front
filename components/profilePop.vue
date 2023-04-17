<template>
    <div class="m-pop type01" id="pop2">
        <div class="m-pop-inner">
            <button class="btn-close m-script-pop" @click="close">
                <img src="/images/x.png" alt="" style="width:21px;">
            </button>
            <div class="nav-wrap">
                <profile-img id="img" :imgUrl="$auth.user.img.url" @change="(data) => this.changeData(data)"/>
            </div>
            <div class="m-input m-input-text type01">
                <input type="text" placeholder="이름 입력" v-model="form.nickname">
            </div>

            <div class="mt-20"></div>
            <button type="button" class="m-btn type02 bg-red width-100" @click="deleteImg">사진 삭제하기</button>
            <div class="mt-8"></div>
            <button type="button" class="m-btn type02 width-100" @click="save">수정하기</button>
        </div>
    </div>
</template>
<script>
// import InputThumbnail from "./form/posts/inputThumbnail.vue"
import ProfileImg from "./form/profileImg.vue"
export default {
    components: {
      // InputThumbnail,
      ProfileImg,
    },
    data() {
        return {
            item: "",

            form: {
                nickname: "",
                profile_photo: "",
            },

            errors: {},

            activeLinkPop: false,
        }
    },

    methods: {
        async save() {
            let result = true;

            await this.$axios.post("/api/auth/check-nickname", this.form).then((response) => {
                if(!response.data.result)
                    result = false;
            });

            if(!result)
                return alert("금지된 닉네임입니다.");

          let form = new FormData();
            form.append("_method","PUT");
            form.append("nickname",this.form.nickname);
          form.append("profile_photo",this.form.profile_photo);
          try {
            const { data } = await this.$axios.post('/api/auth/profile', form)
            .then(response => {
                alert(response.data.message);
                this.$auth.setUser(response.data.data);
                this.close();
            });
          } catch (error) {
            if (error.response && error.response.data)
              this.errors = error.response.data.errors;
          }

        },
        async deleteImg() {
            try {
                const { data } = await this.$axios.delete(`/api/user/${this.$auth.user.id}/delete`)
                .then(response => {
                    alert(response.data.message);
                });
            } catch (error) {
                if (error.response && error.response.data)
                this.errors = error.response.data.errors;
            }
        },
        changeData(data) {
          this.form.profile_photo = data;
        },
        close(){
            this.$emit("close");
        },



    },

    mounted() {
      this.form.nickname = this.$auth.user.nickname;
    }
}
</script>
<style scoped>
.image-wrapper {
      display: flex;
  justify-content: center;
  align-items: center;
}
.m-thumbnail.type03 {
    content:"";
    width:75px; height:75px;
    position:relative;
    background-size:cover; background-position:center; border-radius:100%;
    overflow:hidden;

}
</style>