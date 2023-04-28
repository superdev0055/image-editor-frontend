<template>
  <Tooltip :content="'lock'" v-if="mSelectMode === 'one'">
    <Button v-if="isLock" @click="doLock(false)" icon="md-lock" type="text"></Button>
    <Button v-else @click="doLock(true)" icon="ios-unlock-outline" type="text"></Button>
  </Tooltip>
</template>

<script>
import select from '@/mixins/select';

const lockAttrs = [
  'lockMovementX',
  'lockMovementY',
  'lockRotation',
  'lockScalingX',
  'lockScalingY',
];
export default {
  name: 'ToolBar',
  mixins: [select],
  data() {
    return {
      isLock: false,
    };
  },
  created() {
    this.event.on('selectOne', (items) => {
      this.isLock = !items[0].hasControls;
      this.mSelectActive = items[0];
    });
  },
  methods: {
    doLock(isLock) {
      isLock ? this.lock() : this.unLock();
    },
    lock() {
      // Modify custom properties
      this.mSelectActive.hasControls = false;
      // Modify default properties
      lockAttrs.forEach((key) => {
        this.mSelectActive[key] = true;
      });

      this.mSelectActive.selectable = false;

      this.isLock = true;
      this.canvas.c.renderAll();
    },
    unLock() {
      // Modify custom properties
      this.mSelectActive.hasControls = true;
      // Modify default properties
      lockAttrs.forEach((key) => {
        this.mSelectActive[key] = false;
      });
      this.mSelectActive.selectable = true;

      this.isLock = false;
      this.canvas.c.renderAll();
    },
  },
};
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
