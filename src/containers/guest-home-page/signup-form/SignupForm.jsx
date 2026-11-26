import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const SignupForm = ({
  data,
  errors,
  handleAgreeChange,
  handleBlur,
  handleChange,
  handleSubmit,
  loading
}) => {
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility()

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility()

  return (
    <Box component='form' noValidate onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.inputsContainer}>
        <Box sx={styles.nameContainer}>
          <AppTextField
            autoFocus
            data-testid='firstName'
            errorMsg={errors.firstName ? t(errors.firstName) : ''}
            fullWidth
            label={t('common.labels.firstName')}
            onBlur={handleBlur('firstName')}
            onChange={handleChange('firstName')}
            required
            size='large'
            value={data.firstName}
          />

          <AppTextField
            data-testid='lastName'
            errorMsg={errors.lastName ? t(errors.lastName) : ''}
            fullWidth
            label={t('common.labels.lastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleChange('lastName')}
            required
            size='large'
            value={data.lastName}
          />
        </Box>

        <AppTextField
          data-testid='email'
          errorMsg={errors.email ? t(errors.email) : ''}
          fullWidth
          label={t('common.labels.email')}
          onBlur={handleBlur('email')}
          onChange={handleChange('email')}
          required
          size='large'
          sx={styles.emailField}
          type='email'
          value={data.email}
        />

        <AppTextField
          InputProps={passwordVisibility}
          data-testid='password'
          errorMsg={errors.password ? t(errors.password) : ''}
          fullWidth
          label={t('common.labels.password')}
          onBlur={handleBlur('password')}
          onChange={handleChange('password')}
          required
          size='large'
          sx={styles.passwordField}
          type={showPassword ? 'text' : 'password'}
          value={data.password}
        />

        <AppTextField
          InputProps={confirmPasswordVisibility}
          data-testid='confirmPassword'
          errorMsg={errors.confirmPassword ? t(errors.confirmPassword) : ''}
          fullWidth
          label={t('common.labels.confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          onChange={handleChange('confirmPassword')}
          required
          size='large'
          sx={styles.passwordField}
          type={showConfirmPassword ? 'text' : 'password'}
          value={data.confirmPassword}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={data.agree}
            onChange={(event) =>
              handleAgreeChange('agree', event.target.checked)
            }
            sx={styles.checkbox}
          />
        }
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
      {errors.agree ? (
        <Typography sx={styles.agreeError}>{t(errors.agree)}</Typography>
      ) : null}

      <AppButton loading={loading} sx={styles.signupButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
