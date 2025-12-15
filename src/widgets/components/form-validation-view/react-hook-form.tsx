// TODO: ReactHookForm 컴포넌트는 MUI 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.
// MUI를 사용하지 않는 현재 프로젝트에서는 이 컴포넌트를 사용할 수 없습니다.

type Props = {
  debug: boolean
}

export function ReactHookForm({ debug }: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-muted-foreground">
        ReactHookForm 컴포넌트는 MUI 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.
      </p>
      {debug && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Debug mode: ON</p>
        </div>
      )}
    </div>
  )
}
