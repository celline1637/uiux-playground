// ----------------------------------------------------------------------

export type LanguageValue = "cn" | "en" | "ko";

export const fallbackLng = "ko";
export const languages = ["cn", "en", "ko"];
export const defaultNS = "common";
export const cookieName = "i18next";

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  ko: {
    success: "언어가 변경되었습니다!",
    error: "언어 변경 중 오류가 발생했습니다!",
    loading: "로딩중...",
  },
  en: {
    success: "Language changed successfully!",
    error: "Failed to change language!",
    loading: "Loading...",
  },
  cn: {
    success: "语言已更改！",
    error: "更改语言时出错！",
    loading: "加载中...",
  },
};
