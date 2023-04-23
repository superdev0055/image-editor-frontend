<template>
  <div v-if="!mSelectMode" style="float:right;margin-top:22px">
    <Button @click="set_bg" size="small">{{bg_set_title}}</Button>
    <ColorPicker v-if="showColor" v-model="color" @on-change="setThisColor" alpha size="small" transfer />
  </div>
</template>

<script>
import select from '@/mixins/select';

export default {
  name: 'bgBar',
  inject: ['canvas', 'fabric'],
  mixins: [select],
  data() {
    return {
      bg_set_title:"Add color",
      showColor: false,
      color: '',
      imgFile: '',
      colorList: [
        {
          label: this.$t('scenary_x', { number: 1 }),
          color: ['#5F2B63', '#B23554', '#F27E56', '#FCE766'],
        },
        {
          label: this.$t('scenary_x', { number: 2 }),
          color: ['#86DCCD', '#E7FDCB', '#FFDC84', '#F57677'],
        },
        {
          label: this.$t('scenary_x', { number: 3 }),
          color: ['#5FC2C7', '#98DFE5', '#C2EFF3', '#DDFDFD'],
        },
        {
          label: this.$t('scenary_x', { number: 4 }),
          color: ['#9EE9D3', '#2FC6C8', '#2D7A9D', '#48466d'],
        },
        {
          label: this.$t('scenary_x', { number: 5 }),
          color: ['#61c0bf', '#bbded6', '#fae3d9', '#ffb6b9'],
        },
        {
          label: this.$t('scenary_x', { number: 6 }),
          color: ['#ffaaa5', '#ffd3b6', '#dcedc1', '#a8e6cf'],
        },
      ],
    };
  },
  methods: {
    clearColor(){
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      workspace.set('fill', '');
      this.canvas.c.renderAll();
    },    
    set_bg(){
      if(this.showColor == true){
        this.showColor = false;
      }else{
        this.showColor = true;
        this.clearColor();
      }
      // this.showColor ?this.showColor = false:this.showColor = true;
    },
    // background color setting
    setThisColor() {
      this.setColor(this.color);
    },
    // background color setting
    setColor(color) {
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      workspace.set('fill', color);
      this.canvas.c.renderAll();
    },
  },
};
</script>
