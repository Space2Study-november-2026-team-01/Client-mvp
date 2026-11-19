import { useCallback, useEffect, useRef } from 'react'
import { useHref } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGoogleAuthMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { scrollToHash } from '~/utils/hash-scroll'
import useBreakpoints from '~/hooks/use-breakpoints'
import googleIcon from '~/assets/img/login-dialog/google.svg'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/guest-home-page/google-button/GoogleButton.styles'

const GoogleButton = ({ role, route, buttonWidth, type }) => {
  const buttonContainerRef = useRef(null)
  const { t } = useTranslation()
  const ref = useHref(route)
  const mediaQuery = useBreakpoints().isLaptopAndAbove ? 'md' : 'xs'
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [googleAuth] = useGoogleAuthMutation()

  const handleCredentialResponse = useCallback(
    //Фікс для відповідності формату токену на бекенд
    async ({ credential }) => {
      try {
        await googleAuth({ token: credential, role }).unwrap()
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e.data.code}`
        })
        if (e.data.code === 'USER_NOT_FOUND') {
          closeModal()
          scrollToHash(ref)
        }
      }
    },
    [googleAuth, role, closeModal, setAlert, ref]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id
    const buttonContainer = buttonContainerRef.current

    if (!buttonContainer) return

    googleId.initialize({
      client_id: import.meta.env.VITE_GMAIL_CLIENT_ID,
      callback: handleCredentialResponse
    })

    const configuredWidth =
      typeof buttonWidth === 'string' ? buttonWidth : buttonWidth[mediaQuery]
    let renderedWidth

    const renderGoogleButton = () => {
      const width = configuredWidth.endsWith('%')
        ? buttonContainer.clientWidth
        : Number.parseInt(configuredWidth, 10)

      if (!width || width === renderedWidth) return

      buttonContainer.replaceChildren()
      googleId.renderButton(buttonContainer, {
        size: 'large',
        width,
        locale: 'en',
        text: `${type}_with`
      })
      renderedWidth = width
    }

    renderGoogleButton()

    window.addEventListener('resize', renderGoogleButton)

    return () => window.removeEventListener('resize', renderGoogleButton)
  }, [handleCredentialResponse, buttonWidth, type, mediaQuery])

  return (
    <div style={styles.google}>
      <div aria-hidden='true' style={styles.buttonContent}>
        <img alt='' src={googleIcon} style={styles.googleIcon} />
        <span>{t(`${type}.googleButton`)}</span>
      </div>
      <div ref={buttonContainerRef} style={styles.googleButtonOverlay} />
    </div>
  )
}

export default GoogleButton
