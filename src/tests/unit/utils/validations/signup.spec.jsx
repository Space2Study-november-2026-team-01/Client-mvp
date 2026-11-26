import {
  agree,
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/signup'

describe('signup validations', () => {
  describe('firstName and lastName', () => {
    it('requires a value', () => {
      expect(firstName('')).toBe('common.errorMessages.signupFieldRequired')
      expect(lastName('')).toBe('common.errorMessages.signupFieldRequired')
    })

    it('allows alphabetic names up to 30 characters', () => {
      expect(firstName('John')).toBe('')
      expect(lastName('Іван')).toBe('')
      expect(firstName('a'.repeat(30))).toBe('')
    })

    it('rejects names longer than 30 characters or containing non-letters', () => {
      expect(firstName('a'.repeat(31))).toBe(
        'common.errorMessages.signupNameLength'
      )
      expect(lastName('Jane Doe')).toBe('common.errorMessages.signupNameFormat')
      expect(firstName('John2')).toBe('common.errorMessages.signupNameFormat')
    })
  })

  describe('email', () => {
    it('requires a value', () => {
      expect(email('')).toBe('common.errorMessages.signupFieldRequired')
    })

    it('accepts a valid email address', () => {
      expect(email('jane.doe@example.com')).toBe('')
    })

    it('rejects an invalid email address', () => {
      expect(email('invalid-email')).toBe('common.errorMessages.emailValid')
    })
  })

  describe('password', () => {
    it('requires a value', () => {
      expect(password('')).toBe('common.errorMessages.signupFieldRequired')
    })

    it('accepts passwords with a letter and digit, 8 to 25 characters long', () => {
      expect(password('Password1')).toBe('')
      expect(password('a1'.repeat(4))).toBe('')
      expect(password(`a1${'b'.repeat(23)}`)).toBe('')
    })

    it('rejects passwords that are too short, too long, or lack a letter or digit', () => {
      expect(password('Abc1234')).toBe('common.errorMessages.passwordLength')
      expect(password(`a1${'b'.repeat(24)}`)).toBe(
        'common.errorMessages.passwordLength'
      )
      expect(password('Password')).toBe('common.errorMessages.passwordValid')
      expect(password('12345678')).toBe('common.errorMessages.passwordValid')
    })
  })

  describe('confirmPassword', () => {
    it('requires a value', () => {
      expect(confirmPassword('', { password: 'Password1' })).toBe(
        'common.errorMessages.signupFieldRequired'
      )
    })

    it('accepts a value matching the password', () => {
      expect(confirmPassword('Password1', { password: 'Password1' })).toBe('')
    })

    it('rejects a value that does not match the password', () => {
      expect(confirmPassword('Password2', { password: 'Password1' })).toBe(
        'common.errorMessages.passwordsDontMatch'
      )
    })
  })

  describe('agree', () => {
    it('accepts true', () => {
      expect(agree(true)).toBe('')
    })

    it('requires explicit agreement', () => {
      expect(agree(false)).toBe('common.errorMessages.signupTermsRequired')
    })
  })
})
