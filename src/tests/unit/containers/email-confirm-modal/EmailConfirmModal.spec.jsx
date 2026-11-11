import { act, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'

const closeModal = vi.fn()
const openModal = vi.fn()

vi.mock('~/hooks/use-axios')

describe('EmailConfirmModal test', () => {
  const props = {
    confirmToken: 'test',
    closeModal,
    openModal
  }

  it('should render negative-scenario image and message (BAD_CONFIRM_TOKEN)', () => {
    const fakeData = {
      error: { code: 'BAD_CONFIRM_TOKEN' },
      loading: false,
      response: null
    }

    useAxios.mockImplementation(() => fakeData)

    renderWithProviders(<EmailConfirmModal {...props} />)

    expect(screen.getByAltText('info')).toBeInTheDocument()
    expect(screen.getByText('modals.emailNotConfirm')).toBeInTheDocument()
    expect(screen.getByText('modals.emailReject.badToken')).toBeInTheDocument()
  })

  it('should render negative-scenario image and message (EMAIL_ALREADY_CONFIRMED)', () => {
    const fakeData = {
      error: { code: 'EMAIL_ALREADY_CONFIRMED' },
      loading: false,
      response: null
    }

    useAxios.mockImplementation(() => fakeData)

    renderWithProviders(<EmailConfirmModal {...props} />)

    expect(screen.getByAltText('info')).toBeInTheDocument()
    expect(screen.getByText('modals.emailAlreadyConfirm')).toBeInTheDocument()
    expect(
      screen.getByText('modals.emailReject.alreadyConfirmed')
    ).toBeInTheDocument()
  })

  it('should render Loader when useAxios is loading', () => {
    const fakeData = {
      error: null,
      loading: true,
      response: null
    }

    useAxios.mockImplementation(() => fakeData)

    renderWithProviders(<EmailConfirmModal {...props} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render success message when email is confirmed', () => {
    const fakeData = {
      error: null,
      loading: false,
      response: undefined
    }

    let onResponseCallback

    useAxios.mockImplementation(({ onResponse }) => {
      onResponseCallback = onResponse
      return fakeData
    })

    renderWithProviders(<EmailConfirmModal {...props} />)

    act(() => {
      onResponseCallback()
    })

    expect(screen.getByAltText('info')).toBeInTheDocument()
    expect(screen.getByText('modals.emailConfirm')).toBeInTheDocument()
  })
})
