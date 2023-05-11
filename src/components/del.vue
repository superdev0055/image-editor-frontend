
<template>
  <DropdownItem size="small" @click="del">
    <Button @click="del" icon="ios-trash" type="text" size="small"></Button>
    <span style="font-size:10px">Delete</span>
  </DropdownItem>
</template>

<script>
import select from '@/mixins/select';

export default {
  name: 'ToolBar',
  mixins: [select],
  data() {
    return {};
  },
  methods: {
    warning (nodesc) {
        this.$Notice.warning({
            title: 'warning',
            desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        });
    },     
    del() {
      const activeObject = this.canvas.c.getActiveObjects();
      if (activeObject) {

        activeObject.map((item) => {
          if(item.id == "productImage" || item.id == "trimImage" || item.id == "nonBgImage"){
            return false;
          }else{
            this.canvas.c.remove(item)
          }
        });
        
      }
      
      this.canvas.c.requestRenderAll();
      this.canvas.c.discardActiveObject();
    },
  },
};
</script>

<style scoped lang="less"></style>
