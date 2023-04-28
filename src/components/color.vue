
<template>
  <div class="box">
    <!-- color picker -->
    <ColorPicker v-if="!isGradient" v-model="fill" @on-change="changePureColor" alpha />

  </div>
</template>

<script>
import select from '@/mixins/select';
import { ColorPicker } from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';
import { fabric } from 'fabric';

function generateFabricGradientFromColorStops(handlers, width, height, orientation, angle) {
  // Angle Conversion Coordinates
  const gradAngleToCoords = (paramsAngle) => {
    const anglePI = -parseInt(paramsAngle, 10) * (Math.PI / 180);
    const angleCoords = {
      x1: Math.round(50 + Math.sin(anglePI) * 50) / 100,
      y1: Math.round(50 + Math.cos(anglePI) * 50) / 100,
      x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100,
      y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100,
    };
    return angleCoords;
  };

  // generate linear gradient
  function generateLinear(colorStops) {
    const angleCoords = gradAngleToCoords(angle);
    return new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: angleCoords.x1 * width,
        y1: angleCoords.y1 * height,
        x2: angleCoords.x2 * width,
        y2: angleCoords.y2 * height,
      },
      colorStops,
    });
  }

  // generate radial gradient
  function generateRadial(colorStops) {
    return new fabric.Gradient({
      type: 'radial',
      coords: {
        x1: width / 2,
        y1: height / 2,
        r1: 0,
        x2: width / 2,
        y2: height / 2,
        r2: width / 2,
      },
      colorStops,
    });
  }

  let bgGradient = {};
  const colorStops = [...handlers];
  if (orientation === 'linear') {
    bgGradient = generateLinear(colorStops);
  } else if (orientation === 'radial') {
    bgGradient = generateRadial(colorStops);
  }

  return bgGradient;
}

export default {
  name: 'ColorBox',
  mixins: [select],
  components: {
    newColorPicker: { ...ColorPicker },
  },
  props: {
    angleKey: {
      type: [String],
      default: 'gradientAngle',
    },
    color: {
      type: [Object, String],
      default: '',
    },
  },
  watch: {
    color(val) {
      this.checkColor(val);
    },
  },
  created() {
    this.checkColor(this.color);
  },
  data() {
    return {
      // Gradient
      isGradient: false,
      // solid color
      fill: '',
      // gradient
      visible: true,
      bgStr: 'background: linear-gradient(124deg, rgb(28, 27, 27) 0%, rgb(255, 0, 0) 100%);',
      gradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
          },
        ],
      },
    };
  },
  methods: {
    // echo color
    checkColor(val) {
      if (typeof val === 'string') {
        this.isGradient = false;
        this.fill = val;
      } else {
        // gradient
        this.isGradient = true;
        const activeObject = this.canvas.c.getActiveObjects()[0];
        if (activeObject) {
          // Control property settings
          this.fabricGradientToCss(val, activeObject);
          // bar background setting
          this.fabricGradientToBar(val);
        }
      }
    },
    changeGradientColor(val) {
      const activeObject = this.canvas.c.getActiveObjects()[0];
      if (activeObject) {
        const gradient = this.cssToFabricGradient(val, activeObject);
        this.$emit('change', gradient);

        // Save the angle for the next selected display
        activeObject.set(this.angleKey, val.degree);
        this.setGradientBar(val);
      }
    },
    // set gradient colorbar
    setGradientBar(val) {
      this.bgStr = `background:${val.style.replace('radial', 'linear')};`;
    },
    // Fabric gradient bar background setting
    fabricGradientToBar(val) {
      const str = val.colorStops.map((item) => `${item.color} ${item.offset * 100}%`);
      this.bgStr = `background: linear-gradient(124deg, ${str});`;
    },
    // Fabric gradient to css
    fabricGradientToCss(val, activeObject) {
      // gradient type
      this.gradient.type = val.type;
      this.gradient.degree = activeObject.get(this.angleKey, val.degree);
      this.gradient.points = val.colorStops.map((item) => {
        const [red, green, blue, alpha] = item.color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
        return {
          left: item.offset * 100,
          red: Number(red),
          green: Number(green),
          blue: Number(blue),
          alpha: Number(alpha),
        };
      });
    },
    // css to Fabric gradient
    cssToFabricGradient(val, activeObject) {
      const handlers = val.points.map((item) => ({
        offset: item.left / 100,
        color: `rgba(${item.red}, ${item.green}, ${item.blue}, ${item.alpha})`,
      }));
      const gradient = generateFabricGradientFromColorStops(
        handlers,
        activeObject.width,
        activeObject.height,
        val.type,
        val.degree
      );
      return gradient;
    },
    // solid color
    changePureColor(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style scoped lang="less">
.box {
  padding: 10px 0;
}
// gradient bar
.gradient-bar {
  width: 100%;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
}

.switch {
  margin-bottom: 10px;
}

// Prompt box
/deep/ .ivu-color-picker {
  display: block;
}
/deep/ .ivu-poptip-body {
  padding: 5px;
}
/deep/ .ivu-poptip {
  width: 100%;
  .ivu-poptip-rel {
    width: 100%;
  }
}

// gradient selector
/deep/ .ui-color-picker {
  .picker-area,
  .gradient-controls,
  .color-preview-area {
    padding: 0;
  }
}
</style>
