<template>
  <div class="timeline">
    <div v-for="item in noteList" class="timeline-item" :key="item.id">
      <div class="time">{{ item.time | dateFormat }}</div>
      <div class="dot" ref="circular"></div>
      <div class="text" @click="edit(item)">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn"); //设置语言 或 moment.lang('zh-cn');
export default {
  name: "Timeline",
  props: {
    noteList: Array,
  },
  data() {
    return {};
  },
  filters: {
    dateFormat: (time) => {
      if (time === "" || !time) {
        return "——";
      } else {
        return moment(time).format("YYYY-MM-DD ddd HH:mm");
      }
    },
  },
  methods: {
    edit(item) {
      console.log("edit:"+item);
      this.$emit("editItem", item);
    },
  },
};
</script>


<style lang="sass" scoped>

.timeline 
  position: relative;
  .timeline-item
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .time
      text-align: center;
      width: 100px;
      font-size: 0.8rem;
      border: 1px solid #DCDFE6;
      padding: 5px;
      border-radius: 5px;
      &::before
        position: absolute;
        content: "";
        top: 0;
        width: 1px;
        height: 100%;
        background-color: lighten(#000, 80%);
        margin-left: 120px; 
    .dot
      width: 15px;
      height: 15px;
      background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
      background-blend-mode: normal, lighten, soft-light;
      border-radius: 50%;
      z-index: 10;
      margin-left: 10px;
      margin-right: 10px;
    .text
      width: 500px;
      padding: 10px;
      font-size: 0.9rem;
      color: #303133;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
     

</style>
