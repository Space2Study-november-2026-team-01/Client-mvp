import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { renderWithProviders } from '~tests/test-utils'

const label = 'Search subjects'
const options = ['Algebra', 'Advanced Algebra', 'Geometry']

const renderSearchAutocomplete = ({
  search = '',
  setSearch = vi.fn(),
  onSearchChange = vi.fn(),
  autocompleteOptions = options
} = {}) => {
  renderWithProviders(
    <SearchAutocomplete
      onSearchChange={onSearchChange}
      options={autocompleteOptions}
      search={search}
      setSearch={setSearch}
      textFieldProps={{ label }}
    />
  )

  return { setSearch, onSearchChange }
}

describe('SearchAutocomplete', () => {
  it('renders the search input with the current search value', () => {
    renderSearchAutocomplete({ search: 'Algebra' })

    expect(screen.getByRole('combobox')).toHaveValue('Algebra')
  })

  it('updates the search input when typing without committing the search', async () => {
    const user = userEvent.setup()
    const { setSearch } = renderSearchAutocomplete()
    const input = screen.getByRole('combobox')

    await user.type(input, 'Math')

    expect(input).toHaveValue('Math')
    expect(setSearch).not.toHaveBeenCalled()
  })

  it('filters options synchronously as the user types', async () => {
    const user = userEvent.setup()
    renderSearchAutocomplete()
    const input = screen.getByRole('combobox')

    await user.click(input)
    await user.type(input, 'alg')

    const listbox = await screen.findByRole('listbox')
    expect(
      within(listbox).getByRole('option', { name: 'Algebra' })
    ).toBeInTheDocument()
    expect(
      within(listbox).getByRole('option', { name: 'Advanced Algebra' })
    ).toBeInTheDocument()
    expect(
      within(listbox).queryByRole('option', { name: 'Geometry' })
    ).not.toBeInTheDocument()
  })

  it('commits the selected option when it is clicked', async () => {
    const user = userEvent.setup()
    const { setSearch, onSearchChange } = renderSearchAutocomplete()
    const input = screen.getByRole('combobox')

    await user.click(input)
    await user.type(input, 'Geom')
    await user.click(await screen.findByRole('option', { name: 'Geometry' }))

    expect(setSearch).toHaveBeenCalledWith('Geometry')
    expect(onSearchChange).toHaveBeenCalledTimes(1)
  })

  it('clears the search input when the clear button is clicked', async () => {
    const user = userEvent.setup()
    const { setSearch, onSearchChange } = renderSearchAutocomplete({
      search: 'Algebra'
    })
    const input = screen.getByRole('combobox')
    const [clearButton] = screen.getAllByRole('button')

    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(setSearch).toHaveBeenCalledWith('')
    expect(onSearchChange).toHaveBeenCalledTimes(1)
  })

  it('triggers search with the input value when the search button is clicked', async () => {
    const user = userEvent.setup()
    const { setSearch, onSearchChange } = renderSearchAutocomplete()
    const input = screen.getByRole('combobox')

    await user.type(input, 'Math')
    await user.click(screen.getByRole('button', { name: 'common.search' }))

    expect(setSearch).toHaveBeenCalledWith('Math')
    expect(onSearchChange).toHaveBeenCalledTimes(1)
  })
})
