import { createI18n } from 'vue-i18n';
import zh from 'view-ui-plus/dist/locale/zh-CN';
import en from 'view-ui-plus/dist/locale/en-US'; //The new version changed 'iview' to 'view-design'
import US from './en.json';
import { getLocal, setLocal } from '@/utils/local';
import { LANG } from '@/config/constants/app';

const messages = {
  en: Object.assign(US, en), //Combine your own English package with the one provided by iview
};

function getLocalLang() {
  let localLang = getLocal(LANG);
  if (!localLang) {
    let defaultLang = navigator.language;
    if (defaultLang) {
      // eslint-disable-next-line prefer-destructuring
      defaultLang = defaultLang.split('-')[0];
      // eslint-disable-next-line prefer-destructuring
      localLang = defaultLang.split('-')[0];
    }
    setLocal(LANG, defaultLang);
  }
  return localLang;
}
const lang = getLocalLang();

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: lang,
  messages: messages,
});

export default i18n;
