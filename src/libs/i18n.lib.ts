import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const lng = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    i18nFormat: {
      localeData: lng,
    },
    lng,
    fallbackLng: 'en',
    pluralSeparator: '_',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['home', 'auth', 'property-details', 'create-property', 'wishlist', 'account-settings', 'bookings', 'owner-properties'],

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
