<template>
  <div id="app">
    <h2 class="title">TimeLine Note</h2>
    <hr class="line" />
    <div class="btn">
      <el-button @click="show = !show "  type="info" icon="el-icon-view" size="small">显 示</el-button>
      <el-button
        icon="el-icon-edit"
        type="warning"
        size="small"
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
    <transition name="el-zoom-in-top">
      <timeline
        v-show="show"
        :noteList="noteList"
        @editItem="handleEdit"
      ></timeline>
    </transition>
  </div>
</template>

<script>
import Timeline from "./components/Timeline.vue";

export default {
  name: "app",
  components: {
    Timeline,
  },
  data() {
    return {
      show: true,
      aId: -1,
      eId: -1,
      textarea: "",
      noteList: [],
      dialogVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      console.log("getList");
      this.$axios.get("/notes").then((res) => {
        this.noteList = res.data.reverse();
        this.aId = this.noteList[0].id;
      });
    },
    addNote() {
      this.dialogVisible = false;
      if (this.textarea === "") return;
      if (this.eId !== -1) {
        console.log(this.eId);
        this.noteList.forEach((note) => {
          console.log(note);
          if (note.id === this.eId) {
            note.text = this.textarea;
          }
        });
        this.eId = -1;
      } else {
        let newtime = new Date().toISOString();
        this.$axios
          .post("/notes", {
            id: ++this.aId,
            text: this.textarea,
            status: 0,
            time: newtime,
          })
          .then(() => {
            this.getList();
          });
        // this.noteList.unshift({
        //   id: ++aid,
        //   text: this.textarea,
        //   status: 0,
        //   time: newtime,
        // });
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
    left: 200px
    top: 20px
</style>
