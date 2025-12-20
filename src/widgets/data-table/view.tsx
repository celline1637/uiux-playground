import DenseTableExample from "@/widgets/data-table/examples/dense-table-example"

import { ComponentBlock } from "@/shared/components/ui/component-block"
import BasicTableExample from "@/widgets/data-table/examples/basic-table-example"
import CustomCellTableExample from "@/widgets/data-table/examples/custom-cell-table-example"

// ----------------------------------------------------------------------

export function DataTableView() {
  return (
    <div className="space-y-8">
      <ComponentBlock title="기본 테이블">
        <BasicTableExample />
      </ComponentBlock>

      <ComponentBlock title="Dense 모드">
        <DenseTableExample />
      </ComponentBlock>

      <ComponentBlock title="커스텀 셀 렌더링">
        <CustomCellTableExample />
      </ComponentBlock>
    </div>
  )
}
