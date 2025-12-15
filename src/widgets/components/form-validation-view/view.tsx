import { useState } from 'react'

import { Typography } from '@/components/ui/typography'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { ComponentHero } from '../component-hero'
import { ComponentContainer } from '../component-block'

// ----------------------------------------------------------------------

export function FormValidationView() {
  const [debug, setDebug] = useState(true)

  const handleChangeDebug = (checked: boolean) => {
    setDebug(checked)
  }

  return (
    <>
      <ComponentHero>
        <Typography variant="h3" component="h1">
          Form validation
        </Typography>
      </ComponentHero>

      <ComponentContainer>
        <Typography variant="h4" className="mb-4">
          React hook form + Zod
        </Typography>
        <div className="flex items-center gap-2 mb-8">
          <Switch id="debug-switch" checked={debug} onCheckedChange={handleChangeDebug} />
          <Label htmlFor="debug-switch">Show Debug</Label>
        </div>

        <div className="border-t pt-8">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              ReactHookForm 컴포넌트는 MUI 의존성이 있어 현재 프로젝트 스타일에 맞게 재구현이 필요합니다.
            </p>
          </div>
        </div>
      </ComponentContainer>
    </>
  )
}
