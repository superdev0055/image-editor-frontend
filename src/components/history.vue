<template>
  <div style="display: inline-block">
    <!-- step back -->
    <Tooltip :content="$t('history.revocation') + `(${list.length})`">
      <Button @click="undo" type="text" size="small" :disabled="!list.length">
        <Icon type="ios-undo" size="20" />
      </Button>
    </Tooltip>

    <!-- redo -->
    <Tooltip :content="$t('history.redo') + `(${redoList.length})`">
      <Button @click="redo" type="text" size="small" :disabled="!redoList.length">
        <Icon type="ios-redo" size="20" />
      </Button>
    </Tooltip>

    <span class="time">
      {{ time }}
    </span>
  </div>
</template>

<script>
import select from '@/mixins/select';
import { keyNames, hotkeys } from '@/core/initHotKeys';

const maxStep = 10;

export default {
  name: 'ToolBar',
  mixins: [select],
  data() {
    return {
      index: 0,
      redoList: [],
      list: [],
      time: '',
    };
  },
  created() {
    // Record progress when there is an update
    this.canvas.c.on({
      'object:modified': this.save,
      'selection:updated': this.save,
    });

    hotkeys(keyNames.ctrlz, this.undo);
  },

  methods: {
    // record keeping
    save(event) {
      // Filter select element events
      const isSelect = event.action === undefined && event.e;
      if (isSelect) return;
      const data = this.canvas.editor.getJson();
      if (this.list.length > maxStep) {
        this.list.shift();
      }
      this.list.push(data);
      this.getTime();
    },
    getTime() {
      const myDate = new Date();
      const str = myDate.toTimeString();
      const timeStr = str.substring(0, 8);
      this.time = timeStr;
    },
    // step back
    undo() {
      if (this.list.length) {
        const item = this.list.pop();
        this.redoList.push(item);
        this.renderCanvas(item);
      }
    },
    // redo
    redo() {
      if (this.redoList.length) {
        const item = this.redoList.pop();
        this.list.push(item);
        this.renderCanvas(item);
      }
    },
    // render from data
    renderCanvas(data) {
      this.canvas.c.clear();
      this.canvas.c.loadFromJSON(data, this.canvas.c.renderAll.bind(this.canvas.c));
      this.canvas.c.requestRenderAll();
    },
  },
};
</script>

<style scoped lang="less">
span.active {
  svg.icon {
    fill: #2d8cf0;
  }
}
.time {
  color: #c1c1c1;
}
</style>
