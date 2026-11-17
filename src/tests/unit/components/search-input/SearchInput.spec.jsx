import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput component tests', () => {
  const mockSetSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render text correctly', () => {
    render(<SearchInput search='Initial search' setSearch={mockSetSearch} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Initial search')
  })

  it('should call setSearch when search icon is clicked', async () => {
    render(<SearchInput search='test query' setSearch={mockSetSearch} />)
    const searchIcon = screen.getByTestId('search-icon')

    fireEvent.click(searchIcon)
    expect(mockSetSearch).toHaveBeenCalledWith('test query')
  })

  it('should setState with empty string when delete icon is clicked', () => {
    render(<SearchInput search='some text' setSearch={mockSetSearch} />)
    const deleteIcon = screen.getByTestId('delete-icon')

    fireEvent.click(deleteIcon)
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', async () => {
    const user = userEvent.setup()
    render(<SearchInput search='enter test' setSearch={mockSetSearch} />)
    const input = screen.getByRole('textbox')

    await user.type(input, '{enter}')
    expect(mockSetSearch).toHaveBeenCalled()
  })

  it('should have hidden class if search is empty', () => {
    render(<SearchInput search='' setSearch={mockSetSearch} />)
    const deleteButton = screen.getByTestId('delete-icon')
    expect(deleteButton).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    render(<SearchInput search='active search' setSearch={mockSetSearch} />)
    const deleteButton = screen.getByTestId('delete-icon')
    expect(deleteButton).toHaveClass('visible')
  })
})
