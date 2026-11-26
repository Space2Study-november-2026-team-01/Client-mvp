import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'

import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'

import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import Logo from '~/containers/logo/Logo'

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

const validations = {
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  agree
}

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()

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
    validations
  })
  const isFormValid = Object.entries(validations).every(
    ([field, validate]) => !validate(data[field], data)
  )

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
            isFormValid={isFormValid}
          />
          <GoogleLogin buttonWidth='100%' role={type} type='signup' />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
