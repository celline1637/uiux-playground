// TODO: FormSchema는 MUI 및 react-phone-number-input 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.

import { z as zod } from "zod"

// ----------------------------------------------------------------------

export type FormSchemaType = zod.infer<typeof FormSchema>

export const FormSchema = zod.object({
  fullName: zod.string().min(1, { message: "Full name is required!" }),
  email: zod.string().min(1, { message: "Email is required!" }).email({ message: "Email must be a valid email address!" }),
})
