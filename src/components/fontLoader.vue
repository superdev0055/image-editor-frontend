<template>
  <div />
</template>

<script>
import FontFaceObserver from 'fontfaceobserver';

export default {
  props: {
    fontName: {
      type: String,
      required: true
    },
    fontUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    const font = new FontFaceObserver(this.fontName);
    const style = document.createElement('style');

    font.load().then(() => {
      style.innerHTML = `@font-face {
        font-family: '${this.fontName}';
        src: url('${this.fontUrl}');
      }`;
      document.head.appendChild(style);
      this.$emit('font-loaded');
    });
  }
};
</script>