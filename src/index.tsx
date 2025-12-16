import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import { CustomThemeProvider } from './contexts/ThemeContext';

import { BrowserRouter } from "react-router-dom";


const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}

i18n
  .use(LanguageDetector) // Usa el detector de idioma del navegador
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      es: {
        translation: translationES
      }
    },
    fallbackLng: 'en', // idioma predeterminado si no se puede detectar el idioma del navegador
    interpolation: {
      escapeValue: false // No es necesario escapar los valores de interpolación
    },
    detection: options
  });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </I18nextProvider>
  </BrowserRouter>
);
