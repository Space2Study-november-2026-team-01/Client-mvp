import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

describe('AppContentSwitcher component', () => {
  const mockSwitchOptions = {
    left: { text: 'Learn from Experts', tooltip: 'Tooltip Left' },
    right: { text: 'Share your Experience', tooltip: 'Tooltip Right' }
  }

  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    expect(screen.getByText('Learn from Experts')).toBeInTheDocument()
    expect(screen.getByText('Share your Experience')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    const handleChange = vi.fn()

    render(
      <AppContentSwitcher
        active={false}
        onChange={handleChange}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    await userEvent.hover(screen.getByText('Learn from Experts'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Tooltip Left')

    await userEvent.unhover(screen.getByText('Learn from Experts'))
    await userEvent.hover(screen.getByText('Share your Experience'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Tooltip Right'
    )
  })
})
