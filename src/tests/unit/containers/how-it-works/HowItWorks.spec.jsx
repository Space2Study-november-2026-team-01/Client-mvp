import { fireEvent, screen } from '@testing-library/react'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

vi.mock('~/containers/guest-home-page/google-login/GoogleLogin', () => ({
  default: () => null
}))

describe('HowItWorks container', () => {
  it('opens the student signup dialog by default', () => {
    renderWithProviders(<HowItWorks />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'guestHomePage.whatCanYouDo.learn.actionLabel'
      })
    )

    expect(screen.getByText('signup.head.student')).toBeInTheDocument()
  })

  it('opens the tutor signup dialog after switching to tutor steps', () => {
    renderWithProviders(<HowItWorks />)

    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(
      screen.getByRole('button', {
        name: 'guestHomePage.whatCanYouDo.teach.actionLabel'
      })
    )

    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })
})
