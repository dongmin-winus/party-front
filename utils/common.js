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
    formatDate(dateString, delimiter = '.') {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}${delimiter}${month}${delimiter}${day}`;
    },
    dateDiffInDays(dateStr1, dateStr2) {
      if (!dateStr1 || !dateStr2) return;
      // Date 객체를 생성하여 날짜 문자열을 파싱합니다.
      const date1 = new Date(dateStr1);
      const date2 = new Date(dateStr2);

      // 날짜가 유효한지 확인합니다.
      if (isNaN(date1) || isNaN(date2)) {
        throw new Error("Invalid date format");
      }

      // 24시간(1일)의 밀리초(ms) 값
      const oneDayMs = 24 * 60 * 60 * 1000;

      // 날짜의 차이를 일수로 계산합니다.
      const diffInMs = Math.abs(date1 - date2);
      const diffInDays = Math.floor(diffInMs / oneDayMs);

      return diffInDays;
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
    formatPhone(phoneNumber) {
      if (!phoneNumber) return;
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    },
    replaceContent(content) {
      let replaced = content.replace(/<\/?[^>]+>/ig, " ").replace(/&\s?nbsp;/ig, " ").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return replaced;
    },

    replaceText(target, maskLength, mask = '...') {
      if (target === null || target === undefined) return;
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

    areObjectsEqual(obj1, obj2) {
      // Check if the objects have the same number of properties
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }

      // Iterate over the properties of obj1
      for (let prop in obj1) {
        // Check if the property exists in both objects
        if (obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) {
          // Compare the property values
          if (obj1[prop] !== obj2[prop]) {
            return false;
          }
        } else {
          // One of the objects is missing the property
          return false;
        }
      }

      // All properties have the same values
      return true;
    },


    //객체배열에서 프로퍼티를 지정해 중복된 값들을 찾아 배열로 리턴
    findDuplicatedValuesForProp(arr, propName) {
      const propValues = {};
      const result = [];
      for (let obj of arr) {
        const prop = obj[propName];
        if (prop !== undefined) {
          if (propValues[prop] && result.indexOf(prop) === -1) {
            result.push(prop);
          } else {
            propValues[prop] = true;
          }
        }
      }
      return result;
    },
    transGroup(groupNumber) {
      if (groupNumber < 1 || groupNumber > 26) {
        return "Invalid number";
      }
      return String.fromCharCode(parseInt(groupNumber) + 64);
    },
    calculateDdays(startDate, endDate = startDate) {
      //오늘 날짜와 파라미터 날짜를 비교하여 파라미터보다 이전이면 d-day를 계산하고, 이후면 '종료'를 리턴
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      if (today < start) {
        const diff = start.getTime() - today.getTime();
        const dday = Math.ceil(diff / (1000 * 3600 * 24));
        return `D-${dday}`;
      }
      if (today >= start && today <= end) return '진행중';
      if (today > end) return '종료';
    },
    seperateString(str, seperator = ',') {
      return str.split(seperator).map(item => item.trim());
    }
  },


}