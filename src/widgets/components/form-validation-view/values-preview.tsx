// TODO: ValuesPreview 컴포넌트는 MUI 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.

type Props = {
  sx?: unknown
}

export function ValuesPreview(_props: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-muted-foreground">
        ValuesPreview 컴포넌트는 MUI 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.
      </p>
    </div>
  )
}
