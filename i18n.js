import i18n from "i18next";
import LocizeBackend from "i18next-locize-backend";
import LocizeEditor from "locize-editor";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import axios from "axios";
i18n.use(LocizeBackend)
    .use(LocizeEditor)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: ["es"],
        /* appendNamespaceToCIMode: true, */
        // have a common namespace used around the full app
        ns: ["general"],
        defaultNS: "general",
        backend: {
            projectId: "07105b25-de1e-440d-9bcb-4098478f36dc", // <-- replace with your projectId
            apiKey: "b3f30c7c-5746-4449-b344-f9c4fb31ade3",
            referenceLng: "es"
        },
        debug: false,
        react: {
            wait: true
        },
        editor: {
            // trigger a reload on editor save
            onEditorSaved: function(lng, ns) {
                i18n.reloadResources(lng, ns);
            }
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
