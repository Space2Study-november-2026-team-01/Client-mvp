import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'

import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'

import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import Logo from '~/containers/logo/Logo'
import infoIcon from '~/assets/img/guest-home-page/info.svg'

import {
  agree,
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/signup'
import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'

const roleImages = {
  student: studentImg,
  tutor: tutorImg
}

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signUp, { isLoading }] = useSignUpMutation()

  const {
    handleSubmit,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false
    },
    validations: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agree
    },
    submitWithData: true,
    onSubmit: async (formData) => {
      try {
        const { userEmail } = await signUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: type
        }).unwrap()

        const description = (
          <Typography component='span'>
            {t('signup.confirmEmailMessage')}
            <Typography component='span' variant='subtitle2'>
              {userEmail}
            </Typography>
            {t('signup.confirmEmailDesc')}
          </Typography>
        )

        openModal({
          component: (
            <NotificationModal
              buttonTitle={t('common.confirmButton')}
              description={description}
              img={infoIcon}
              onClose={closeModal}
              title={t('signup.confirmEmailTitle')}
            />
          )
        })
      } catch (error) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${error?.data?.code ?? 'UNKNOWN_ERROR'}`
        })
      }
    }
  })

  return (
    <Box sx={styles.root}>
      <Box sx={styles.mobileHeader}>
        <Logo sx={styles.logo} />
      </Box>
      <Box sx={styles.imgContainer}>
        <Box
          alt={type}
          component='img'
          src={roleImages[type]}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h4'>
          {t(`signup.head.${type}`)}
        </Typography>

        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleAgreeChange={handleNonInputValueChange}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
            loading={isLoading}
          />
          <GoogleLogin buttonWidth='100%' role={type} type='signup' />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
