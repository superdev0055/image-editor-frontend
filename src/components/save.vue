<template>
  <div class="save-box">
    <Dropdown style="margin-left: 10px" @on-click="saveJson">
      <Button type="primary" size="small" style="font-size:11px" @click="saveJson">
        {{saveType}}
      </Button>
    </Dropdown>
  </div>
</template>

<script>
import select from '@/mixins/select';
import {createUserTemp,updateUserTemp} from "@/service/endpoint";
import {v4 as uuid} from "uuid";
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
    // saveJson() {

    //   const dataUrl = this.canvas.editor.getJson();
    //   const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    //     JSON.stringify(dataUrl, null, '\t')
    //   )}`;
    //   this.downFile(fileStr, 'json');
    // },
    // saveImg() {
    //   const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
    //   const { left, top, width, height } = workspace;
    //   const option = {
    //     name: 'New Image',
    //     format: 'png',
    //     quality: 1,
    //     left,
    //     top,
    //     width,
    //     height,
    //   };
    //   this.canvas.c.setViewportTransform([1, 0, 0, 1, 0, 0]);
    //   const dataUrl = this.canvas.c.toDataURL(option);
    //   this.downFile(dataUrl, 'png');
    // },    
    // downFile(fileStr, fileType) {
    //   const anchorEl = document.createElement('a');
    //   anchorEl.href = fileStr;
    //   anchorEl.download = `${uuid()}.${fileType}`;
    //   document.body.appendChild(anchorEl); // required for firefox
    //   anchorEl.click();
    //   anchorEl.remove();
    // },



    noticeMsg(title,desc=''){
      this.$Notice.warning({
          title: title,
          desc: desc
      });      
    },
    saveJson() {
      var name = '';
      if(document.getElementById("canvasName") != null){
        name = document.getElementById("canvasName").value;
      }      
      if(this.saveType == "Save Image"){
        const dataUrl = this.canvas.editor.getJson();


        dataUrl.template_id = uuid();
        dataUrl.template_name = name;
        dataUrl.template_image_url = this.canvas.editor.getImageUrl();

        createUserTemp({data:dataUrl}).then((res)=>{
          alert(res.data);
        });

      }else{
        const dataUrl = this.canvas.editor.getJson();
        dataUrl.template_id = this.param_id;
        dataUrl.template_name = name;
        dataUrl.template_image_url = this.canvas.editor.getImageUrl();     

        updateUserTemp(this.param_id,{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
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
