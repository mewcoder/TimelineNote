<template>
  <div id="app">
    <h2 class="title">TimeLine Note</h2>
    <hr class="line" />
    <div class="btn">
      <el-button
        icon="el-icon-edit"
        type="warning"
        size="medium"
        @click="dialogVisible = true"
        >新 增</el-button
      >
    </div>
    <el-dialog title="输入笔记" :visible.sync="dialogVisible">
      <el-input
        type="textarea"
        rows="7"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="500"
        show-word-limit
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="addNote">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <timeline :noteList="noteList" @editItem="handleEdit"></timeline>
    </div>
  </div>
</template>

<script>
import Timeline from "./components/Timeline.vue";
let aid = 1;
export default {
  name: "app",
  components: {
    Timeline,
  },
  data() {
    return {
      eId: -1,
      textarea: "",
      noteList: [
        {
          id: "1",
          time: "2001-01-01 01:00:00",
          text: "第一步第一步第一步第一步第一步",
          status: 0,
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    addNote() {
      this.dialogVisible = false;
      console.log("addnote");
      let newtime = new Date().toISOString();
      if (this.textarea === "") return;
      if (this.eId !== -1) {
        console.log(this.eId);
        this.noteList.forEach((note) => {
          console.log(note);
          if (note.id === this.eId) {
            console.log(note.id);
            console.log(this.textarea);
            note.text = this.textarea;
          }
        });
        this.eId = -1;
      } else {
        console.log("aid:" + aid);
        this.noteList.unshift({
          id: ++aid,
          text: this.textarea,
          status: 0,
          time: newtime,
        });
      }
      this.textarea = "";
    },
    handleEdit(item) {
      console.log("handleEdit:" + item);
      this.dialogVisible = true;
      this.textarea = item.text;
      this.eId = item.id;
    },
  },
};
</script>

<style lang="sass" scoped>
#app
  position: relative
  margin-top: 10px
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  .title
    margin-left: 10px
    color: #303133
    text-shadow: #333333 1px 2px 2px
  .line
    color: #303133
  .btn
    position: absolute
    margin-left: 20px
    margin-top: 5px
</style>
