import { fireEvent, screen, within } from '@testing-library/react'
import { vi } from 'vitest'

import { renderWithProviders } from '~tests/test-utils'

import AppChipList from '~/components/app-chips-list/AppChipList'

const items = Array.from({ length: 10 }, (_, index) => `Chip ${index + 1}`)

describe('AppChipList component', () => {
  it('renders the provided chips', () => {
    const visibleItems = ['Math', 'Science', 'History']

    renderWithProviders(
      <AppChipList defaultQuantity={visibleItems.length} items={visibleItems} />
    )

    visibleItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('displays the "+3" indicator when there are 10 items and defaultQuantity is 7', () => {
    renderWithProviders(<AppChipList defaultQuantity={7} items={items} />)

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('displays exactly 7 initial chips when the popover is closed', () => {
    renderWithProviders(<AppChipList defaultQuantity={7} items={items} />)

    expect(screen.getAllByTestId('chip')).toHaveLength(7)
  })

  it('displays all 10 chips inside the popover after clicking "+3"', async () => {
    renderWithProviders(<AppChipList defaultQuantity={7} items={items} />)

    fireEvent.click(screen.getByTestId('amount-of-chips'))

    const popover = await screen.findByTestId('app-popover')
    const popoverChips = within(popover).getAllByTestId('chip')

    expect(popoverChips).toHaveLength(10)
    items.forEach((item) => {
      expect(within(popover).getByText(item)).toBeInTheDocument()
    })
  })

  it('calls handleChipDelete with the deleted item', () => {
    const handleChipDelete = vi.fn()

    renderWithProviders(
      <AppChipList
        defaultQuantity={items.length}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )

    const firstChip = screen.getAllByTestId('chip')[0]
    fireEvent.click(within(firstChip).getByTestId('close-btn'))

    expect(handleChipDelete).toHaveBeenCalledWith(items[0])
  })
})
