import { useCallback } from 'react'

import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { useModalContext } from '~/context/modal-context'
import { UserRoleEnum } from '~/types'

type SignupRole = UserRoleEnum.Student | UserRoleEnum.Tutor

const useSignupDialog = () => {
  const { openModal } = useModalContext()

  return useCallback(
    (type: SignupRole) =>
      openModal({
        component: <SignupDialog type={type} />,
        paperProps: {
          sx: {
            '@media (min-width:600px) and (max-width:1024.95px)': {
              width: 'min(606px, calc(100vw - 32px))',
              height: 'min(681px, calc(100vh - 32px))',
              overflowY: 'auto',
              boxSizing: 'border-box'
            },
            '@media (min-width:1025px)': {
              width: 'min(1128px, calc(100vw - 14px))',
              maxWidth: 'none',
              maxHeight: 'calc(100vh - 32px)',
              margin: '7px',
              boxSizing: 'border-box'
            }
          }
        }
      }),
    [openModal]
  )
}

export default useSignupDialog
