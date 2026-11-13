import { fireEvent, render, screen } from '@testing-library/react'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import usePagination from '~/hooks/table/use-pagination'

const EnhancedTablePaginationHarness = () => {
  const pagination = usePagination({ itemsPerPage: 5, itemsCount: 25 })

  return <EnhancedTablePagination pagination={pagination} />
}

describe('EnhancedTablePagination', () => {
  it('should render the first page', () => {
    render(<EnhancedTablePaginationHarness />)

    expect(screen.getByLabelText('page 1')).toHaveAttribute(
      'aria-current',
      'true'
    )
    expect(screen.getByText('1-5 table.of 25')).toBeInTheDocument()
  })

  it('should change page from 1 to 2', () => {
    render(<EnhancedTablePaginationHarness />)

    fireEvent.click(screen.getByLabelText('Go to page 2'))

    expect(screen.getByLabelText('page 2')).toHaveAttribute(
      'aria-current',
      'true'
    )
    expect(screen.getByText('6-10 table.of 25')).toBeInTheDocument()
  })
})
