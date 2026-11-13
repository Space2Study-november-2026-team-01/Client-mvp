import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

const renderSearchFilterInput = (updateFilter = vi.fn()) => {
  render(
    <SearchFilterInput
      textFieldProps={{ placeholder: 'Search offers' }}
      updateFilter={updateFilter}
    />
  )

  return { updateFilter }
}

describe('SearchFilterInput', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('renders the search input', () => {
    renderSearchFilterInput()

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('updates the displayed text when typing without calling updateFilter', async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderSearchFilterInput()
    const input = screen.getByRole('textbox')

    await user.type(input, 'Math')

    expect(input).toHaveValue('Math')
    expect(updateFilter).not.toHaveBeenCalled()
  })

  it("clears the input and calls updateFilter('') when clicking the clear icon", async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderSearchFilterInput()
    const input = screen.getByRole('textbox')

    await user.type(input, 'Math')
    await user.click(screen.getByTestId('clearIcon'))

    expect(input).toHaveValue('')
    expect(updateFilter).toHaveBeenCalledTimes(1)
    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it("calls updateFilter('Math') when clicking the search button", async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderSearchFilterInput()
    const input = screen.getByRole('textbox')

    await user.type(input, 'Math')
    await user.click(screen.getByRole('button', { name: 'common.search' }))

    expect(updateFilter).toHaveBeenCalledTimes(1)
    expect(updateFilter).toHaveBeenCalledWith('Math')
  })

  it("calls updateFilter('Math') when pressing Enter", async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderSearchFilterInput()
    const input = screen.getByRole('textbox')

    await user.type(input, 'Math')
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(updateFilter).toHaveBeenCalledTimes(1)
    expect(updateFilter).toHaveBeenCalledWith('Math')
  })
})
