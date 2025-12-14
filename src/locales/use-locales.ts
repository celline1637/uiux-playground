import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { allLangs } from "./all-langs";
import { fallbackLng, changeLangMessages as messages } from "./config-locales";

import type { LanguageValue } from "./config-locales";

// ----------------------------------------------------------------------

export function useTranslate(_ns?: string) {
  const { t, i18n } = useTranslation();

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find(
    (lang) => lang.value === (i18n.resolvedLanguage || i18n.language)
  );

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      try {
        const langChangePromise = i18n.changeLanguage(newLang);

        const currentMessages = messages[newLang] || messages.ko;

        toast.promise(langChangePromise, {
          loading: currentMessages.loading,
          success: () => currentMessages.success,
          error: currentMessages.error,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [i18n]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
