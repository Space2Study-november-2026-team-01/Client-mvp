import { fireEvent, screen } from '@testing-library/react'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

vi.mock('~/containers/guest-home-page/google-login/GoogleLogin', () => ({
  default: () => null
}))

describe('WhatCanYouDo container', () => {
  it('opens the student signup dialog from the learn card', () => {
    renderWithProviders(<WhatCanYouDo />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'guestHomePage.whatCanYouDo.learn.actionLabel'
      })
    )

    expect(screen.getByText('signup.head.student')).toBeInTheDocument()
  })

  it('opens the tutor signup dialog from the teach card', () => {
    renderWithProviders(<WhatCanYouDo />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'guestHomePage.whatCanYouDo.teach.actionLabel'
      })
    )

    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })
})
