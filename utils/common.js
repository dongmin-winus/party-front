export default {
  data() {
    return {
      activeSidebar: false,
      active: false,
      blob: null,
    }
  },
  methods: {
    handleBackdropClick(e, className) {
      // console.log(e.srcElement._prevClass,33223)
      if (e.srcElement._prevClass === className) {
        this.activeSidebar = false;
        this.active = false;
        this.$emit('cancel');
      }
    },
    validateDate(dateString) {
      // Check if the input is a number with 6 digits
      if (!/^\d{6}$/.test(dateString)) {
        return false;
      }

      // Extract the year, month, and day from the input
      const year = parseInt(dateString.substr(0, 2));
      const month = parseInt(dateString.substr(2, 2));
      const day = parseInt(dateString.substr(4, 2));

      // Check if the year is a valid 2-digit year (between 00 and 99)
      if (year < 0 || year > 99) {
        return false;
      }

      // Check if the month is a valid number (between 01 and 12)
      if (month < 1 || month > 12) {
        return false;
      }

      // Check if the day is a valid number for the given month and year
      const twenieMaxDay = new Date(year + 1900, month, 0).getDate();
      const twenieOneMaxDay = new Date(year + 2000, month, 0).getDate();

      //윤년 패스
      if (month == 2 && day == 29) {
        return true;
      }
      if (day < 1 || (day > twenieMaxDay || day > twenieOneMaxDay)) {
        return false;
      }

      return true;
    },
    validatePhone(phoneNumber) {
      return /^010\d{8}$/.test(phoneNumber)
    },

    replaceContent(content) {
      let replaced = content.replace(/<\/?[^>]+>/ig, " ").replace(/&\s?nbsp;/ig, " ").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return replaced;
    },

    replaceText(target, maskLength, mask = '...') {
      if (target.length <= maskLength) return target;
      return target.substring(0, maskLength) + mask;
    },

    aggregate(arr, prop) {
      return arr.reduce((acc, curr) => {
        const key = curr[prop];
        if (!acc[key]) {
          acc[key] = [curr];
        } else {
          acc[key].push(curr);
        }
        return acc;
      }, {});
    },
    countBy(arr, prop, legend = []) {
      const acc = arr.reduce((acc, curr) => {
        const key = curr[prop];
        if (!acc[key]) {
          acc[key] = 1;
        } else if (acc[key]) {
          acc[key]++;
        } else {
          acc[key] = 0;
        }
        return acc;
      }, {});
      //acc와 legend를 비교해서 legend에만 있는 key를 acc에 key:0으로 추가
      if (legend.length > 0) {
        legend.forEach((value) => {
          if (!acc[value]) {
            acc[value] = 0;
          }
        });
      }
      return acc;
    },
    convertObjByValueAsc(obj) {
      const arr = Object.entries(obj) // 객체를 [key, value] 배열의 배열로 변환
        .sort((a, b) => a[1] - b[1]) // value 값을 기준으로 내림차순 정렬
        .map(([key, value]) => ({ key: Number(key), value })); // 배열 요소를 { key, value } 형태의 객체로 변환

      return arr;
    },

    convertObjByValueDesc(obj) {
      const arr = Object.entries(obj) // 객체를 [key, value] 배열의 배열로 변환
        .sort((a, b) => b[1] - a[1]) // value 값을 기준으로 내림차순 정렬
        .map(([key, value]) => ({ key: Number(key), value })); // 배열 요소를 { key, value } 형태의 객체로 변환

      return arr;
    },

    convertObjByKeyAsc(obj) {
      const arr = Object.entries(obj) // 객체를 [key, value] 배열의 배열로 변환
        .sort(([aKey], [bKey]) => aKey - bKey) // key 값을 기준으로 오름차순 정렬
        .map(([key, value]) => ({ key: Number(key), value })); // 배열 요소를 { key, value } 형태의 객체로 변환

      return arr;
    },

    convertObjByKeyDesc(obj) {
      const arr = Object.entries(obj) // 객체를 [key, value] 배열의 배열로 변환
        .sort(([aKey], [bKey]) => bKey - aKey) // key 값을 기준으로 내림차순 정렬
        .map(([key, value]) => ({ key: Number(key), value })); // 배열 요소를 { key, value } 형태의 객체로 변환

      return arr;
    },

    maxVal(arr, key) {
      return Math.max.apply(null, arr.map(item => item[key]));
    },
  },
}