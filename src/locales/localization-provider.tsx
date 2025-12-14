import { useEffect } from "react";

import "dayjs/locale/en";
import "dayjs/locale/ko";
import "dayjs/locale/zh-cn";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useTranslate } from "./use-locales";

// ----------------------------------------------------------------------

dayjs.extend(utc);
dayjs.extend(timezone);

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  // currentLang이 변경될 때마다 dayjs locale 업데이트
  useEffect(() => {
    dayjs.locale(currentLang.adapterLocale);
    dayjs.tz.setDefault(currentLang.timezone);
  }, [currentLang]);

  return <>{children}</>;
}
