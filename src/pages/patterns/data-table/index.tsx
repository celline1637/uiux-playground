import { Container } from "@/shared/components/ui/container"
import { Stack } from "@/shared/components/ui/stack"
import { Typography } from "@/shared/components/ui/typography"
import { DataTableView } from "@/widgets/data-table/view"
import { Helmet } from "react-helmet-async"

// ----------------------------------------------------------------------

const metadata = { title: "Data Table" }

function DataTablePage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <Container maxWidth="xl" className="py-8">
        <Stack spacing={4}>
          <div>
            <Typography variant="h3">Data Table</Typography>
            <Typography variant="caption" className="text-muted-foreground">
              use-table 훅을 활용한 정렬, 페이지네이션, 선택 기능을 가진 데이터 테이블
            </Typography>
          </div>

          <DataTableView />
        </Stack>
      </Container>
    </>
  )
}

export default DataTablePage
