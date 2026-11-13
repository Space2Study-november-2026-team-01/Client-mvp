import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const props = {
  defaultValue: 200,
  min: 100,
  max: 500,
  title: 'Price',
  onChange: vi.fn()
}

describe('SliderWithInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    props.onChange.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the title, input value, and slider value', () => {
    render(<SliderWithInput {...props} />)

    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('200')
    expect(screen.getByRole('slider')).toHaveValue('200')
  })

  it('calls onChange when the slider value changes', () => {
    render(<SliderWithInput {...props} />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('type', 'range')

    fireEvent.change(slider, { target: { value: '300' } })

    expect(slider).toHaveValue('300')
    expect(screen.getByRole('textbox')).toHaveValue('300')
    expect(props.onChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(props.onChange).toHaveBeenCalledWith(300)
  })

  it('keeps the input empty and calls onChange with min when cleared', () => {
    render(<SliderWithInput {...props} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '' } })

    expect(input).toHaveValue('')
    expect(props.onChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(props.onChange).toHaveBeenCalledWith(100)
  })

  it('clamps an input above max on blur and calls onChange with max', () => {
    render(<SliderWithInput {...props} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '600' } })
    expect(input).toHaveValue('600')

    fireEvent.blur(input)

    expect(input).toHaveValue('500')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(props.onChange).toHaveBeenCalledWith(500)
  })

  it('does not call onChange when an unchanged input loses focus', () => {
    render(<SliderWithInput {...props} />)

    fireEvent.blur(screen.getByRole('textbox'))

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(props.onChange).not.toHaveBeenCalled()
  })
})
