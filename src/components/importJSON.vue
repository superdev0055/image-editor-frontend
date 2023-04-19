<template>
    <DropdownItem @click="insert"><Icon type="md-keypad" /><span style="margin-left:10px">Json</span></DropdownItem>
</template>

<script>
import select from '@/mixins/select';
import { selectFiles, downFontByJSON } from '@/utils/utils';

export default {
  name: 'ToolBar',
  mixins: [select],
  methods: {
    insert() {
      selectFiles({ accept: '.json' }).then((files) => {
        const [file] = files;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          this.insertSvgFile(reader.result);
        };
      });
    },
    insertSvgFile(jsonFile) {
      // Import after loading fonts
      downFontByJSON(jsonFile).then(() => {
        this.canvas.c.loadFromJSON(jsonFile, () => {
          this.canvas.c.renderAll.bind(this.canvas.c);
          setTimeout(() => {
            const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
            workspace.set('selectable', false);
            workspace.set('hasControls', false);
            this.canvas.c.requestRenderAll();
            this.canvas.editor.editorWorkspace.setSize(workspace.width, workspace.height);
            this.canvas.c.renderAll();
            this.canvas.c.requestRenderAll();
          }, 100);
        });
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
