import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ['es'],
    /* appendNamespaceToCIMode: true, */
    // have a common namespace used around the full app
    ns: ['general'],
    defaultNS: 'general',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    react: {
      wait: true,
    },
    editor: {
      // trigger a reload on editor save
      onEditorSaved: function(lng, ns) {
        i18n.reloadResources(lng, ns);
      },
    },
  });
i18n.on('languageChanged', function(lng) {
  axios({
    method: 'post',
    url: './changLang',
    data: { lang: lng },
  });
  document.children['0'].dir = i18n.dir(lng);
});
export default i18n;
