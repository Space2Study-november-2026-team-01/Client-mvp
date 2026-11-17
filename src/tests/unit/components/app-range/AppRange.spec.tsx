import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AppRange from '~/components/app-range/AppRange'

describe('AppRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly', () => {
    render(<AppRange max={100} min={10} onChange={vi.fn()} />)

    const inputs = screen.getAllByRole('textbox')

    expect(inputs[0]).toHaveValue('10')
    expect(inputs[1]).toHaveValue('100')
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  it('should call onChange when the slider is moved', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)

    fireEvent.change(screen.getAllByRole('slider')[0], {
      target: { value: '20' }
    })

    expect(onChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).toHaveBeenCalledWith([20, 100])
  })

  it('should call onChange when a number is entered', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '30' }
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).toHaveBeenCalledWith([30, 100])
  })

  it('should not call onChange when a non-number is entered', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: 'abc' }
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onChange with the minimum when the input is empty on blur', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)
    const input = screen.getAllByRole('textbox')[0]

    fireEvent.change(input, { target: { value: '' } })
    fireEvent.blur(input)

    expect(input).toHaveValue('10')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).toHaveBeenCalledWith([10, 100])
  })

  it('should update the range when a value above max is blurred', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)
    const input = screen.getAllByRole('textbox')[1]

    fireEvent.change(input, { target: { value: '120' } })
    fireEvent.blur(input)

    expect(input).toHaveValue('100')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).toHaveBeenCalledWith([10, 100])
  })

  it('should not call onChange when the input value is unchanged on blur', () => {
    const onChange = vi.fn()
    render(<AppRange max={100} min={10} onChange={onChange} />)

    fireEvent.blur(screen.getAllByRole('textbox')[0])

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onChange).not.toHaveBeenCalled()
  })
})
