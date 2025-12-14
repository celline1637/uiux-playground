import type koTranslation from "./langs/ko.json";
import type { defaultNS } from "./config-locales";

// www.i18next.com/overview/typescript
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      common: typeof koTranslation;
    };
  }
}
