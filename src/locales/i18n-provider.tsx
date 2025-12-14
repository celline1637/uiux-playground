import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import resourcesToBackend from "i18next-resources-to-backend"
import { I18nextProvider as Provider, initReactI18next } from "react-i18next"

import { localStorageGetItem } from "@/shared/utils/storage-available"
import { defaultNS, fallbackLng, i18nOptions } from "./config-locales"

// ----------------------------------------------------------------------

/**
 * [1] localStorage
 * Auto detection:
 * const lng = localStorageGetItem('i18nextLng')
 */
const lng = localStorageGetItem("i18nextLng", fallbackLng)

/**
 * 언어 코드를 파일명에 매핑
 * 'cn' → 'zh_cn', 'en' → 'en', 'ko' → 'ko'
 */
const mapLangToFileName = (lang: string): string => {
  const langMap: Record<string, string> = {
    cn: "zh_cn",
    en: "en",
    ko: "ko",
  }
  return langMap[lang] || lang
}

/**
 * namespace에 따라 파일 경로 생성
 * - namespace가 없거나 defaultNS인 경우: langs/ko.json
 * - namespace가 있는 경우: langs/ko/{ns}.json
 */
const getResourcePath = (lang: string, ns?: string): string => {
  const mappedLang = mapLangToFileName(lang)

  // namespace가 없거나 defaultNS인 경우 기존 파일 구조 사용
  if (!ns || ns === defaultNS) {
    return `./langs/${mappedLang}.json`
  }

  // namespace가 있는 경우 폴더 구조 사용
  return `./langs/${mappedLang}/${ns}.json`
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns?: string) => import(getResourcePath(lang, ns))))
  .init({ ...i18nOptions(lng), detection: { caches: ["localStorage"] } })

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export function I18nProvider({ children }: Props) {
  return <Provider i18n={i18next}>{children}</Provider>
}
