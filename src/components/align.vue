<template>
  <div  class="box attr-item">
    <!-- Horizontal alignment -->
    <Tooltip :content="'left'">
      <Button  @click="left" size="small" type="text">
        <svg
          t="1650442284704"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2345"
          width="14"
          height="14"
        >
          <path d="M80 24h64v976H80zM198 227h448v190H198zM198 607h746v190H198z" p-id="2346"></path>
        </svg>
      </Button>
    </Tooltip>
    <Tooltip :content="'centerX'">
      <Button  @click="xcenter" size="small" type="text">
        <svg
          t="1650442754876"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1514"
          width="14"
          height="14"
        >
          <path
            d="M477.312 576V448H266.688a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32h210.624V34.688a34.688 34.688 0 0 1 69.376 0V192h210.624a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H546.688v128H896a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H546.688v157.312a34.688 34.688 0 1 1-69.376 0V832H128a32 32 0 0 1-32-32v-192A32 32 0 0 1 128 576h349.312z"
            fill="#666666"
            p-id="1515"
          ></path>
        </svg>
      </Button>
    </Tooltip>
    <Tooltip :content="'right'">
      <Button  @click="right" size="small" type="text">
        <svg
          t="1650442299564"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2543"
          width="14"
          height="14"
        >
          <path
            d="M944 1000h-64V24h64zM826 417H378V227h448zM826 797H80V607h746z"
            p-id="2544"
          ></path>
        </svg>
      </Button>
    </Tooltip>
    <!-- vertical alignment -->
    <Tooltip :content="'top'">
      <Button  @click="top" size="small" type="text">
        <svg
          t="1650442692910"
          class="icon"
          viewBox="0 0 1170 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1118"
          width="14"
          height="14"
        >
          <path
            d="M1170.285714 36.571429a36.571429 36.571429 0 0 1-36.571428 36.571428H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571429z m-219.428571 146.285714v512a36.571429 36.571429 0 0 1-36.571429 36.571428h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571428v-512a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z m-438.857143 0v804.571428a36.571429 36.571429 0 0 1-36.571429 36.571429h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571429v-804.571428a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z"
            fill="#666666"
            p-id="1119"
          ></path>
        </svg>
      </Button>
    </Tooltip>
    <Tooltip :content="'centerY'">
      <Button  @click="ycenter" size="small" type="text">
        <svg
          t="1650442732396"
          class="icon"
          viewBox="0 0 1243 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1316"
          width="14"
          height="14"
        >
          <path
            d="M548.571429 472.356571h146.285714V231.643429a36.571429 36.571429 0 0 1 36.571428-36.571429h219.428572a36.571429 36.571429 0 0 1 36.571428 36.571429v240.713142h179.785143a39.643429 39.643429 0 0 1 0 79.286858H987.428571v240.713142a36.571429 36.571429 0 0 1-36.571428 36.571429h-219.428572a36.571429 36.571429 0 0 1-36.571428-36.571429V551.643429h-146.285714V950.857143a36.571429 36.571429 0 0 1-36.571429 36.571428H292.571429a36.571429 36.571429 0 0 1-36.571429-36.571428V551.643429H76.214857a39.643429 39.643429 0 1 1 0-79.286858H256V73.142857A36.571429 36.571429 0 0 1 292.571429 36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571428v399.213714z"
            fill="#666666"
            p-id="1317"
          ></path>
        </svg>
      </Button>
    </Tooltip>
    <Tooltip :content="'bottom'">
      <Button  @click="bottom" size="small" type="text">
        <svg
          t="1650442674784"
          class="icon"
          viewBox="0 0 1170 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="920"
          width="14"
          height="14"
        >
          <path
            d="M1170.285714 987.428571a36.571429 36.571429 0 0 0-36.571428-36.571428H36.571429a36.571429 36.571429 0 0 0 0 73.142857h1097.142857a36.571429 36.571429 0 0 0 36.571428-36.571429z m-219.428571-146.285714v-512a36.571429 36.571429 0 0 0-36.571429-36.571428h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571428v512a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z m-438.857143 0V36.571429a36.571429 36.571429 0 0 0-36.571429-36.571429h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571429v804.571428a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z"
            fill="#666666"
            p-id="921"
          ></path>
        </svg>
      </Button>
    </Tooltip>
  </div>
</template>

<script>
import select from '@/mixins/select';

export default {
  name: 'ToolBar',
  mixins: [select],
  data() {
    return {
      id: '',
      list: [],
    };
  },
  methods: {
    // When it is not multi-selected, the combined alignment operation is prohibited
    notMultiple() {
      return this.mSelectMode !== 'multiple';
    },
    // align left
    left() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        activeObject.forEachObject((item) => {
          if(item.id != "virtural"){
            item.set({
              left: -activeObject.width/2
            });            
            this.canvas.c.renderAll();
          }
        });
      }
    },
    // right align
    right() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        const activeSelection = activeObject;
        const activeObjectLeft = activeObject.width / 2;
        activeSelection.forEachObject((item) => {
          if(item.id != "virtural"){
            item.set({
              left: activeObjectLeft - item.width * item.scaleX,
            });    
            item.setCoords();
            this.canvas.c.renderAll();
          }          
        });
      }      
    },
    // horizontal center alignment
    xcenter() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        const activeSelection = activeObject;
        activeSelection.forEachObject((item) => {
          if(item.id != "virtural"){
            item.set({
              left: 0 - (item.width * item.scaleX) / 2,
            });
            item.setCoords();
            this.canvas.c.renderAll();
          }          

        });
      }
    },
    // vertical center alignment
    ycenter() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        const activeSelection = activeObject;
        activeSelection.forEachObject((item) => {
          item.set({
            top: 0 - (item.height * item.scaleY) / 2,
          });
          item.setCoords();
          this.canvas.c.renderAll();
        });
      }
    },
    // align top
    top() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        const activeSelection = activeObject;
        const activeObjectTop = -(activeObject.height / 2);
        activeSelection.forEachObject((item) => {
          if(item.id != "virtural"){
            item.set({
              top: activeObjectTop,
            });
            item.setCoords();
            this.canvas.c.renderAll();
          }
        });
      }      
    },
    // Bottom alignment
    bottom() {
      const activeObject = this.canvas.c.getActiveObject();
      if (activeObject) {
        const activeSelection = activeObject;
        const activeObjectTop = activeObject.height / 2;
        activeSelection.forEachObject((item) => {
          if(item.id != "virtural"){
            item.set({
              top: activeObjectTop - item.height * item.scaleY,
            });
            item.setCoords();
            this.canvas.c.renderAll();
          }
        });
      }      
    },
    // horizontal average alignment
    xequation() {
      const activeObject = this.canvas.c.getActiveObject();

      // The width attribute is inaccurate, coordinate conversion is required
      function getItemWidth(item) {
        return item.aCoords.tr.x - item.aCoords.tl.x;
      }

      // Get all element heights
      function getAllItemHeight() {
        let count = 0;
        activeObject.forEachObject((item) => {
          count += getItemWidth(item);
        });
        return count;
      }
      // get average spacing
      function spacWidth() {
        const count = getAllItemHeight();
        const allSpac = activeObject.width - count;
        return allSpac / (activeObject._objects.length - 1);
      }

      // Get the height of all elements before the current element
      function getItemLeft(i) {
        if (i === 0) return 0;
        let width = 0;
        for (let index = 0; index < i; index++) {
          width += getItemWidth(activeObject._objects[index]);
        }
        return width;
      }

      if (activeObject && activeObject.type === 'activeSelection') {
        const activeSelection = activeObject;
        // to sort
        activeSelection._objects.sort((a, b) => a.left - b.left);

        // Average distance calculation
        const itemSpac = spacWidth();
        // Group Origin Height
        const yHeight = activeObject.width / 2;

        activeObject.forEachObject((item, i) => {
          // Get the height of all elements before the current element
          const preHeight = getItemLeft(i);
          // top-distance spacing * index + previous element height - origin height
          const top = itemSpac * i + preHeight - yHeight;
          item.set('left', top);
        });
        this.canvas.c.renderAll();
      }
    },
    // Vertical Average Alignment
    yequation() {
      const activeObject = this.canvas.c.getActiveObject();
      // The width attribute is inaccurate, coordinate conversion is required
      function getItemHeight(item) {
        return item.aCoords.bl.y - item.aCoords.tl.y;
      }
      // Get all element heights
      function getAllItemHeight() {
        let count = 0;
        activeObject.forEachObject((item) => {
          count += getItemHeight(item);
        });
        return count;
      }
      // get average spacing
      function spacHeight() {
        const count = getAllItemHeight();
        const allSpac = activeObject.height - count;
        return allSpac / (activeObject._objects.length - 1);
      }

      // Get the height of all elements before the current element
      function getItemTop(i) {
        if (i === 0) return 0;
        let height = 0;
        for (let index = 0; index < i; index++) {
          height += getItemHeight(activeObject._objects[index]);
        }
        return height;
      }

      if (activeObject && activeObject.type === 'activeSelection') {
        const activeSelection = activeObject;
        // to sort
        activeSelection._objects.sort((a, b) => a.top - b.top);

        //Average distance calculation
        const itemSpac = spacHeight();
        // Group Origin Height
        const yHeight = activeObject.height / 2;

        activeObject.forEachObject((item, i) => {
          // Get the height of all elements before the current element
          const preHeight = getItemTop(i);
          //top-distance spacing * index + previous element height - origin height
          const top = itemSpac * i + preHeight - yHeight;
          item.set('top', top);
        });
        this.canvas.c.renderAll();
      }
    },
  },
};
</script>

<style scoped lang="less">
.box {
  display: flex;
  align-items: center;
  .ivu-tooltip {
    text-align: center;
    flex: 1;
  }
}
/deep/ .ivu-btn[disabled] {
  svg {
    opacity: 0.2;
  }
}
</style>
