<template>
  <div>
    <DropdownItem @click="() => addText()" :draggable="true" @dragend="onDragend('text')"><Icon type="logo-tumblr"/><span style="margin-left:10px">Text</span></DropdownItem>
    <DropdownItem @click="() => addRect()" :draggable="true" @dragend="onDragend('rect')"><Icon type="ios-square-outline" /><span style="margin-left:10px">Rectangle</span></DropdownItem>
    <DropdownItem @click="() => addCircle()" :draggable="true" @dragend="onDragend('circle')"><Icon type="ios-radio-button-off" /><span style="margin-left:10px">Circle</span></DropdownItem>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import initializeLineDrawing from '@/core/initializeLineDrawing';
import select from '@/mixins/select';

// default property
const defaultPosition = { shadow: '', fontFamily: 'arial' };
// drag properties
const dragOption = {
  left: 0,
  top: 0,
};
export default {
  name: 'ToolBar',
  mixins: [select],
  inject: ['canvas', 'fabric'],
  data() {
    return {
      isDrawingLineMode: false,
      isArrow: false,
    };
  },
  created() {
    // line drawing
    this.drawHandler = initializeLineDrawing(this.canvas.c, defaultPosition);
    this.canvas.c.on('drop', (opt) => {
      // The distance of the canvas element from the left and top of the browser
      const offset = {
        left: this.canvas.c.getSelectionElement().getBoundingClientRect().left,
        top: this.canvas.c.getSelectionElement().getBoundingClientRect().top,
      };

      // Convert mouse coordinates to canvas coordinates (unscaled and translated coordinates)
      const point = {
        x: opt.e.x - offset.left,
        y: opt.e.y - offset.top,
      };

      // Transformed coordinates, restorePointerVpt is not affected by viewport transformation
      const pointerVpt = this.canvas.c.restorePointerVpt(point);
      dragOption.left = pointerVpt.x;
      dragOption.top = pointerVpt.y;
    });
  },
  methods: {
    // Record the type of element currently intended to be created when dragging starts
    onDragend(type) {
      // todo drag and drop optimization this.canvas.editor.dragAddItem(event, item);
      switch (type) {
        case 'text':
          this.addText(dragOption);
          break;
        case 'textBox':
          this.addTextBox(dragOption);
          break;
        case 'rect':
          this.addRect(dragOption);
          break;
        case 'circle':
          this.addCircle(dragOption);
          break;
        case 'triangle':
          this.addTriangle(dragOption);
          break;
        default:
      }
    },

    addText(option) {
      const text = new this.fabric.IText("everything is fine", {
        ...defaultPosition,
        ...option,
	      fontFamily: 'Courier New',
        fontSize: 60,
        id: uuid(),
      });
      text.set("width",text.width);
      var rect = new fabric.Rect({
          height: 0,
          width: 0,
          fill: '',
          strokeWidth:0,
          opacity: 100,
          id:"virtural",
      });
      var group = new fabric.Group([rect, text]);
      group.set({
        id:uuid(),
        left:0-group.width,
        customType:"text",
        item_name:this.canvas.editor.getName("text"),
        angle:0,
        layerShowPeriod:{
          mode:'',
          startDate:'',
          endDate:''
        },
        texthandle:"automatic",
        position:{
          positionX:"left",
          positionY:"top"
        },
		    originPoistion:"left",        
      });
      
	    group.setCoords();
      this.canvas.c.add(group);
      rect.set("width",group.width*group.scaleX);
      rect.set("height",group.height*group.scaleY);
      this.canvas.c.centerObject(group);
      this.canvas.c.setActiveObject(group);
    },
    
    addImg(e) {
      const imgEl = e.target.cloneNode(true);
      const imgInstance = new this.fabric.Image(imgEl, {
        ...defaultPosition,
        id: uuid(),
        name: 'picturedefault',
      });
      this.canvas.c.add(imgInstance);
      this.canvas.c.renderAll();
    },
    addTextBox(option) {
      const text = new this.fabric.Textbox('everything_goes_well', {
        ...defaultPosition,
        ...option,
        splitByGrapheme: true,
        width: 400,
        fontSize: 80,
        id: uuid(),
      });
      this.canvas.c.add(text);
      if (!option) {
        text.center();
      }
      this.canvas.c.centerObject(text);
      this.canvas.c.setActiveObject(text);
    },
    addTriangle(option) {
      const triangle = new this.fabric.Triangle({
        ...defaultPosition,
        width: 400,
        height: 400,
        fill: '#92706B',
      });
      this.canvas.c.add(triangle);
      if (!option) {
        triangle.center();
      }
      this.canvas.c.setActiveObject(triangle);
    },
    addCircle(option) {
      var name = this.canvas.editor.getName("circle");
      // this.getName('circle');
      const circle = new this.fabric.Circle({
        left:-200,
        radius: 150,
        fill: 'yellow',
        id: uuid(),
        item_name: name,
        layerShowPeriod:{
          mode:'',
          startDate:'',
          endDate:''
        }        
      });
      this.canvas.c.add(circle);
      this.canvas.c.centerObject(circle);
      this.canvas.c.setActiveObject(circle);
    },
    
    addRect(option) {
     var name = this.canvas.editor.getName("rect"); 
      const rect = new this.fabric.Rect({
        left:-200,
        fill: 'blue',
        width: 400,
        height: 400,
        id: uuid(),
        item_name: name,
        tempValueForPadding:0,
        layerShowPeriod:{
          mode:'',
          startDate:'',
          endDate:''
        }        
      });
      this.canvas.c.add(rect);
      this.canvas.c.centerObject(rect);
      this.canvas.c.setActiveObject(rect);
    },

    drawingLineModeSwitch(isArrow) {
      this.isArrow = isArrow;
      this.isDrawingLineMode = !this.isDrawingLineMode;
      this.drawHandler.setMode(this.isDrawingLineMode);
      this.drawHandler.setArrow(isArrow);
      
      this.canvas.c.forEachObject((obj) => {
        if (obj.id !== 'workspace') {
          obj.selectable = !this.isDrawingLineMode;
          obj.evented = !this.isDrawingLineMode;
        }
      });
    },

  },
};
</script>

<style scoped lang="less">
.tool-box {
  display: flex;
  justify-content: space-around;
  span {
    flex: 1;
    text-align: center;
    padding: 5px 0;
    background: #f6f6f6;
    margin-left: 2px;
    cursor: pointer;
    &:hover {
      background: #edf9ff;
      svg {
        fill: #2d8cf0;
      }
    }
  }
  .bg {
    background: #d8d8d8;

    &:hover {
      svg {
        fill: #2d8cf0;
      }
    }
  }
}
.img {
  width: 20px;
}
</style>
