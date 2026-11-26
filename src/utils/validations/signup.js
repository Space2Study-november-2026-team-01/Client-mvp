import { emptyField, helperTextHandler } from './common'

const name = (value) => {
  const nameValue = String(value ?? '')

  if (!nameValue) {
    return 'common.errorMessages.signupFieldRequired'
  }

  if (nameValue.length > 30) {
    return 'common.errorMessages.signupNameLength'
  }

  if (!/^[a-zа-яєії]+$/i.test(nameValue)) {
    return 'common.errorMessages.signupNameFormat'
  }

  return ''
}

export const firstName = (value) => name(value)

export const lastName = (value) => name(value)

export const email = (value) =>
  helperTextHandler(value, 'email', 'common.errorMessages.signupFieldRequired')

export const password = (value) =>
  helperTextHandler(
    value,
    'password',
    'common.errorMessages.signupFieldRequired'
  )

export const confirmPassword = (value, data) => {
  return emptyField(
    value,
    'common.errorMessages.signupFieldRequired',
    value !== data.password ? 'common.errorMessages.passwordsDontMatch' : ''
  )
}

export const agree = (value) =>
  value === true ? '' : 'common.errorMessages.signupTermsRequired'
