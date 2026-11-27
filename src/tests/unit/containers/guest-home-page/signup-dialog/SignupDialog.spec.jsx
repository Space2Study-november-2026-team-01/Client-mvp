import { fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { renderWithProviders } from '~tests/test-utils'
import { UserRoleEnum } from '~/types'

const { signUp, unwrap } = vi.hoisted(() => ({
  signUp: vi.fn(),
  unwrap: vi.fn()
}))

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useSignUpMutation: () => [signUp, { isLoading: false }]
  }
})

vi.mock('~/containers/guest-home-page/google-login/GoogleLogin', () => ({
  __esModule: true,
  default: () => <button type='button'>Google signup</button>
}))

describe('SignupDialog', () => {
  beforeEach(() => {
    unwrap.mockResolvedValue({
      userId: 'user-id',
      userEmail: 'jane.doe@example.com'
    })
    signUp.mockReturnValue({ unwrap })
  })

  it('submits backend fields and opens the informational email modal', async () => {
    renderWithProviders(<SignupDialog type={UserRoleEnum.Student} />)

    fireEvent.change(screen.getByLabelText(/common.labels.firstName/i), {
      target: { value: 'Jane' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.lastName/i), {
      target: { value: 'Doe' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.email/i), {
      target: { value: 'jane.doe@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.password/i), {
      target: { value: 'Password1' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.confirmPassword/i), {
      target: { value: 'Password1' }
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(
      screen.getByRole('button', { name: 'common.labels.signup' })
    )

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'Password1',
        role: UserRoleEnum.Student
      })
    })
    expect(
      await screen.findByText('signup.confirmEmailTitle')
    ).toBeInTheDocument()
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument()
    expect(screen.getByAltText('info')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'common.confirmButton' })
    )
    await waitFor(() => {
      expect(screen.queryByTestId('popup')).not.toBeInTheDocument()
    })
  })

  it('shows an error when signup fails', async () => {
    unwrap.mockRejectedValue({ data: { code: 'ALREADY_REGISTERED' } })
    renderWithProviders(<SignupDialog type={UserRoleEnum.Tutor} />)

    fireEvent.change(screen.getByLabelText(/common.labels.firstName/i), {
      target: { value: 'Jane' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.lastName/i), {
      target: { value: 'Doe' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.email/i), {
      target: { value: 'jane.doe@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.password/i), {
      target: { value: 'Password1' }
    })
    fireEvent.change(screen.getByLabelText(/common.labels.confirmPassword/i), {
      target: { value: 'Password1' }
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(
      screen.getByRole('button', { name: 'common.labels.signup' })
    )

    expect(
      await screen.findByText('errors.ALREADY_REGISTERED')
    ).toBeInTheDocument()
  })
})
