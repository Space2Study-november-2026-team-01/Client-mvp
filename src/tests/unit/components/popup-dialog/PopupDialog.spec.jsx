import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { ModalProvider, useModalContext } from '~/context/modal-context'

const closeModal = vi.fn()
const closeModalAfterDelay = vi.fn()
const setFullScreen = vi.fn()

const props = {
  content: 'test',
  closeModal,
  closeModalAfterDelay,
  timerId: null,
  isFullScreen: true,
  setFullScreen
}

const ModalHarness = () => {
  const { openModal } = useModalContext()

  return (
    <button onClick={() => openModal({ component: <div>modal content</div> })}>
      Open modal
    </button>
  )
}

const renderModal = () => {
  render(
    <ModalProvider>
      <ModalHarness />
    </ModalProvider>
  )

  fireEvent.click(screen.getByRole('button', { name: 'Open modal' }))
}

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ checkConfirmation: () => true })
  }
})

describe('Popup dialog test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have content text', () => {
    render(<PopupDialog {...props} />)
    const content = screen.getByText(props.content)

    expect(content).toBeInTheDocument()
  })

  it('should close when the close button is clicked', () => {
    renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument()
  })

  it('should remain open when the backdrop is clicked', () => {
    renderModal()
    const popup = screen.getByTestId('popup')

    fireEvent.mouseDown(popup)
    fireEvent.click(popup)

    expect(popup).toBeInTheDocument()
    expect(screen.getByText('modal content')).toBeInTheDocument()
  })
})

describe('Popup dialog test with timerId', () => {
  const propsWithTimerId = { ...props, timerId: 21 }
  beforeEach(() => {
    vi.clearAllMocks()
    render(<PopupDialog {...propsWithTimerId} />)
  })

  it('should close popup after delay', async () => {
    const popupContent = screen.getByTestId('popupContent')

    fireEvent.mouseEnter(popupContent)
    fireEvent.mouseLeave(popupContent)

    await waitFor(() => expect(closeModalAfterDelay).toHaveBeenCalled())
  })
})
