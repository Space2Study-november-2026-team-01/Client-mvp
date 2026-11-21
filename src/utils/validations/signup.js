import { emptyField, helperTextHandler } from './common'

const name = (value) => {
  if (!value) {
    return 'common.errorMessages.signupFieldRequired'
  }

  const length = value.trim().length

  if (length < 1 || length > 30) {
    return 'common.errorMessages.signupNameLength'
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
