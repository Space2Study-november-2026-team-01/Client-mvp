import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

const row = { _id: 'row-42', name: 'Ada Lovelace', age: 36 }

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'age', label: 'Age' }
]

const renderRow = (props = {}) => {
  const defaultProps = {
    columns,
    item: row,
    select: {
      handleSelectClick: vi.fn(),
      isSelected: vi.fn().mockReturnValue(false)
    },
    ...props
  }

  render(
    <MemoryRouter>
      <table>
        <tbody>
          <EnhancedTableRow {...defaultProps} />
        </tbody>
      </table>
    </MemoryRouter>
  )

  return defaultProps
}

describe('EnhancedTableRow', () => {
  it('should render a table row with correct data', () => {
    renderRow()

    expect(screen.getByRole('row')).toBeInTheDocument()
    expect(
      screen.getByRole('cell', { name: 'Ada Lovelace' })
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '36' })).toBeInTheDocument()
  })

  it('should call handleSelectClick when the checkbox is clicked', () => {
    const handleSelectClick = vi.fn()
    renderRow({
      isSelection: true,
      select: {
        handleSelectClick,
        isSelected: vi.fn().mockReturnValue(false)
      }
    })

    fireEvent.click(screen.getByRole('checkbox'))

    expect(handleSelectClick).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'change' }),
      row._id
    )
  })

  it('should display the action menu when the menu icon is clicked', () => {
    renderRow({
      rowActions: [
        { label: 'Edit', func: vi.fn() },
        { label: 'Delete', func: vi.fn() }
      ]
    })

    fireEvent.click(screen.getByTestId('menu-icon'))

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  it('should call the correct action when a menu item is clicked', async () => {
    const editAction = vi.fn()
    const deleteAction = vi.fn()
    const refetchData = vi.fn()

    renderRow({
      refetchData,
      rowActions: [
        { label: 'Edit', func: editAction },
        { label: 'Delete', func: deleteAction }
      ]
    })

    fireEvent.click(screen.getByTestId('menu-icon'))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))

    await waitFor(() => {
      expect(editAction).toHaveBeenCalledWith(row._id)
      expect(refetchData).toHaveBeenCalledTimes(1)
    })
    expect(deleteAction).not.toHaveBeenCalled()
  })

  it('should close the action menu when Escape is pressed', async () => {
    renderRow({
      rowActions: [
        { label: 'Edit', func: vi.fn() },
        { label: 'Delete', func: vi.fn() }
      ]
    })

    fireEvent.click(screen.getByTestId('menu-icon'))
    const menu = screen.getByRole('menu')

    fireEvent.keyDown(menu, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })
})
