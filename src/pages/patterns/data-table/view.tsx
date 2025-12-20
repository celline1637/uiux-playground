import { ComponentBlock } from "@/pages/components/ui/component-block"
import BasicTableExample from "./examples/basic-table-example"
import CustomCellTableExample from "./examples/custom-cell-table-example"
import DenseTableExample from "./examples/dense-table-example"

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
