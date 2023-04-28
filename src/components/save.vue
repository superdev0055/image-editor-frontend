<template>
  <div class="save-box">
    <Dropdown style="margin-left: 10px" @on-click="saveWith">
      <Button type="primary" size="small" style="font-size:11px" @click="saveJson">
        {{saveType}}
      </Button>
    </Dropdown>
  </div>
</template>

<script>
import select from '@/mixins/select';
import { v4 as uuid } from 'uuid';
import axios from "axios";
export default {
  name: 'saveBar',
  inject:["path","param_id"],
  mixins: [select],
  data() {
    return {
      saveType:"Save Image"
    };
  },

  mounted(){
    if(this.path.slice(8) == "create"){
      this.saveType = "Save Image"
    }else{
      this.saveType = "Edit Image"
    }
    
  },  
  methods: {
    saveWith(type) {
      this[type]();
    },
    
    saveJson() {
      if(this.saveType == "Save Image"){
        const dataUrl = this.canvas.editor.getJson();
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dataUrl, null, '\t')
        )}`;
        axios.post("http://localhost:3000/feed-image/create",{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
      }else{
        const dataUrl = this.canvas.editor.getJson();
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dataUrl, null, '\t')
        )}`;
        axios.post("http://localhost:3000/feed-image/edit/"+this.param_id,{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
        // this.downFile(fileStr, 'json');        
      }

    }
    }
};
</script>

<style scoped lang="less">
.save-box {
  display: inline-block;
}
</style>
