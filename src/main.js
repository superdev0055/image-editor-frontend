import { createApp } from 'vue';
import App from './App.vue';
import VueLazyLoad from 'vue3-lazyload';
import ViewUiPlus from 'view-ui-plus';
import VueClipboard from 'vue3-clipboard';
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import router from './router/index'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import "./styles/main.css"
import './styles/index.less';
// custom font file
import '@/assets/fonts/font.css';
import i18n from './language';
const app = createApp(App);
app
  .use(router)
  .use(i18n)
  .use(VueLazyLoad, {})
  .use(ViewUiPlus)
  .use(VueClipboard, {
    appendToBody: true,
  })
  .use(BootstrapVue3)
  .mount('#app');

