<template>
  <div>
    <!-- 단답식 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <!-- <input type="file" class="input-text" /> -->
        
        <div class="filebox">
          <input type="search" class="upload-name" v-model="file_name" placeholder="첨부파일" disabled >
              <svg 
                v-if="file_name != '첨부파일'"
                @click="clearInputValue"
              xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M1.8389 1.66122L19.5166 19.3389M19.5166 1.66122L1.8389 19.3389" stroke="black" stroke-width="2" stroke-linecap="round"/>
              </svg>
          <label :for="item.id">파일찾기</label> 
         <input type="file" :id="item.id" accept="image/*" @change="changeFile" ref="file">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  name: 'File',
  components: {
    Label,
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    maxWidth: {
        default: () => {
            return 700;
        },
    },
    form_id: {
      type: String,
      default: null
    },
  },
  watch: {
    inputValue(val) {
      const response = {
        id: this.item.id,
        value: val
      }
      
      this.$emit('inputValue', response)
    }
  },
  data() {
    return {
      inputValue: '',
      file_name: '첨부파일',
    }
  },
  methods: {
        changeFile(event) {
            let files = event.target.files;
            let file = files[0];
            let self = this;
            let reader = new FileReader();
            let image = new Image();
            
            if (!(file instanceof Blob)) {
                console.error('Invalid file type');
                return;
            }
            if(files.length == 0) return;
            
            console.log(files)
            console.log(file.type)
            reader.readAsDataURL(file);

            reader.onload = function (readerEvent) {
              image.onload = function() {
                let result = self.resize(image);
                self.uploadImage(new File([result], file.name));
              }
              image.src = readerEvent.target.result;
                // this.inputValue = readerEvent.target.result;
            };
        },

        uploadImage(file){
            let form = new FormData();
            form.append("image", file);
            this.$axios.post(`/api/forms/images/${this.form_id}`,form)
                .then((response) => {
                  this.inputValue = response.data.data.original_url;
                  this.file_name = response.data.data.file_name;
                  //   this.$emit("change", {
                  //       file: file,
                  //       name: response.data.data.file_name,
                  //       url: response.data.data.original_url,
                  //       html : `<img src="${response.data.data.original_url}"/>`
                  //   });

                  //   this.$emit("changeFile", file);

                  //   this.$refs.file.value = null;
                });
        },

        resize(image){
            let width = image.width;
            let height = image.height;
            let canvas = document.createElement("canvas");

            height *= this.maxWidth / width;
            width = this.maxWidth;


            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/png');

            return this.dataURLtoBlob(dataUrl);
        },

        dataURLtoBlob(dataURI){
            const bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

            return new Blob([ia], { type: mime });
        },
        clearInputValue(){
          this.inputValue = '';
          this.file_name = '첨부파일';
        }
  },
}
</script>

<style scoped>
.filebox {
  position: relative;
}
.filebox svg {
  position: absolute;
  left: calc(100% - 150px);
  top: 10px;

}
.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: calc(100% - 120px);
    color: #999999;
}
.filebox label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    height: 40px;
    margin-left: 10px;
}
</style>