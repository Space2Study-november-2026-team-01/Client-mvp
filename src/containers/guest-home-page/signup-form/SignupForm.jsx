import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const SignupForm = () => {
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility()

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility()

  return (
    <Box component='form' sx={styles.form}>
      <Box sx={styles.inputsContainer}>
        <Box sx={styles.nameContainer}>
          <AppTextField
            autoFocus
            data-testid='firstName'
            fullWidth
            label={t('common.labels.firstName')}
            required
            size='large'
            withHelperText={false}
          />

          <AppTextField
            data-testid='lastName'
            fullWidth
            label={t('common.labels.lastName')}
            required
            size='large'
            withHelperText={false}
          />
        </Box>

        <AppTextField
          data-testid='email'
          fullWidth
          label={t('common.labels.email')}
          required
          size='large'
          sx={styles.emailField}
          type='email'
          withHelperText={false}
        />

        <AppTextField
          InputProps={passwordVisibility}
          data-testid='password'
          fullWidth
          label={t('common.labels.password')}
          required
          size='large'
          sx={styles.passwordField}
          type={showPassword ? 'text' : 'password'}
          withHelperText={false}
        />

        <AppTextField
          InputProps={confirmPasswordVisibility}
          data-testid='confirmPassword'
          fullWidth
          label={t('common.labels.confirmPassword')}
          required
          size='large'
          sx={styles.passwordField}
          type={showConfirmPassword ? 'text' : 'password'}
          withHelperText={false}
        />
      </Box>

      <FormControlLabel
        control={<Checkbox sx={styles.checkbox} />}
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')}{' '}
            <Typography
              component='span'
              sx={styles.underlineText}
              variant='body2'
            >
              {t('common.labels.terms')}
            </Typography>{' '}
            {t('signup.and')}{' '}
            <Typography
              component='span'
              sx={styles.underlineText}
              variant='body2'
            >
              {t('common.labels.privacyPolicy')}
            </Typography>
          </Typography>
        }
        sx={styles.checkboxContainer}
      />

      <AppButton sx={styles.signupButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
