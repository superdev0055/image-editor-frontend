<template>
  <DropdownItem  size="small">
    <Button @click="clone()" icon="ios-copy" type="text" size="small"></Button>
    <span style="font-size:10px">Duplicate layer1</span>
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
    clone() {
      this.canvas.editor.clone();
    },
  },
};
</script>

<style scoped lang="less"></style>
