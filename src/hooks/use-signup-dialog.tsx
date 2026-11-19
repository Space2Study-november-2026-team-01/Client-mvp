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
            '@media (min-width:600px) and (max-width:899.95px)': {
              width: 'min(662px, calc(100vw - 32px))',
              height: 'min(690px, calc(100vh - 32px))',
              boxSizing: 'border-box'
            }
          }
        }
      }),
    [openModal]
  )
}

export default useSignupDialog
