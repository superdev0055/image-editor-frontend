<template>
<div>
  <canvas id="canvas" width=300 height=400></canvas>
</div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import {fabric} from "fabric";
import {transParent} from "@/utils/imgConstant"
export default {
  data(){
    return {
      alignCenter:true
    }
  },

  mounted(){
    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'lightgrey',
      width: 500,
      height: 500
    });

    var slot1 = new fabric.Rect({
      originX: 'left', 
      originY: 'top',
      left: 10, 
      top: 10,
      width: 200, 
      height: 400,
      fill: 'transparent',
      selectable: false
    });
    canvas.renderAll();
    
    var workspace = new fabric.Image();
         
    workspace.setSrc(transParent);    
    workspace.set({
      left: 0,
      top: 0,
      hoverCursor: 'default',
      // clipTo: function(ctx) {
      //     return this.clipBySlot(ctx, image, slot1);	 
      //   },  
      id: 'workspace',
    }); 
  //   image.scale(0.5);
    canvas.centerObject(workspace);
    canvas.add(workspace);
    canvas.renderAll();      
    // fabric.Image.fromURL('https://previews.123rf.com/images/kolibrico/kolibrico2002/kolibrico200200005/139369246-vector-empty-transparent-background-vector-transparency-grid-seamless-pattern.jpg', (image) => {
    //   image.scale(0.5);
    //   image.set({
    //     left: 0,
    //     top: 0,
    //     hoverCursor: 'default',
    //     clipTo: function(ctx) {
    //       return this.clipBySlot(ctx, image, slot1);	 
    //     }
    //   });
    //   var shadow = new fabric.Shadow({
    //     color: "gray",
    //     blur: 50,
    //     offsetX: 0,
    //     offsetY: 0,
    //   });
    //   image.set("shadow",shadow);
    //   // image.set('shadow', new this.fabric.Shadow(this.baseAttr.shadow));       
    //   this.scaleImageToSlot(image, slot1);
    //   canvas.centerObject(image);
    
    //   canvas.add(image);
    //   canvas.renderAll();
    // });
  },
  methods:{
    scaleImageToSlot(image, slot) {
      console.log("asdfasfasfd")
      // Find smallest ratio of slot:width / image:width and slot:height / image: height
      let ratio = Math.min(slot.width / image.width, slot.height / image.height);
      console.log(`ratio width ${slot.width/image.width}, height ${slot.height/image.height}`);
      console.log('=> ratio', ratio);
      
      if(ratio <= 1) {
        image.scaleToWidth(slot.width);
        let newHeight = image.height * image.scaleY;
        if(newHeight < slot.height) {
          image.scaleToHeight(slot.height);
        }
      }
      else {
        image.scaleToHeight(slot.height);
        let newWidth = image.width * image.scaleX;
        
        if(newWidth < slot.width) {
          image.scaleToWidth(slot.width);
        }
      }
      
      var shiftLeft = (slot.width - (image.width*image.scaleX)) / 2;
      var shiftTop = (slot.height - (image.height*image.scaleY)) / 2;
      console.log(`shift ${shiftLeft}x${shiftTop}`)
      
      if(this.alignCenter) {
        image.set("left",slot.left + shiftLeft);
        image.set("top",slot.top + shiftTop);
      }
      else {
        if(image.left < slot.left) {
          // align image to center.
          image.set("left",slot.left);
        }
        if(image.top < slot.top) {
          image.set("top",slot.top);
        }    
      }
      
    },

    clipBySlot(ctx, image, slot) {
      var scaleXTo1 = (1 / image.scaleX);
      var scaleYTo1 = (1 / image.scaleY);
      
      // Save context of the canvas so it can be restored after the clipping
      ctx.save();
      
      ctx.translate(0, 0);
      ctx.rotate(degToRad(image.angle * -1));
      ctx.scale(scaleXTo1, scaleYTo1);
      
      ctx.beginPath();
      
      const boundingRect = image.getBoundingRect();
      // console.log(`[left] ${image.left} - (${boundingRect.width} / 2)`);
      
      ctx.rect(
        slot.left - image.left - Math.floor(boundingRect.width / 2),
        slot.top - image.top - Math.floor(boundingRect.height / 2),
        slot.width,
        slot.height
      );
      ctx.stroke()
      ctx.closePath();
      
      // Restore the original context.
      ctx.restore();
    },

    // Since the `angle` property of the Image object is stored 
    // in degrees, we'll use this to convert it to radians.
    degToRad(degrees) {
      return degrees * (Math.PI / 180);
    }        
  }
}
</script>
