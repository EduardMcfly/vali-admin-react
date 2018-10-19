import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import Backend from "i18next-chained-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
 import axios from "axios";
i18n
  .use(Backend)
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: ["es"],
    // have a common namespace used around the full app
    ns: ["general"],
    defaultNS: "general",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json"
    },
    debug: false,
    react: {
      wait: true
    }
  });
i18n.on("languageChanged", function(lng) {
  axios({
    method: "post",
    url: "./changLang",
    data: { lang: lng }
  });
  document.children["0"].dir = i18n.dir(lng);
});
export default i18n;
