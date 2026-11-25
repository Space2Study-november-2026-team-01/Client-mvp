export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 0,
    maxWidth: '400px',
    '& .MuiFormHelperText-root': {
      boxSizing: 'border-box',
      height: '20px',
      margin: 0,
      paddingLeft: '12px',
      lineHeight: '20px'
    },
    '@media (min-width:600px) and (max-width:1024.95px)': {
      maxWidth: '455px'
    },
    '@media (min-width:1025px)': {
      maxWidth: '460px'
    }
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    mb: '6px',
    '@media (max-width:1024.95px)': {
      gap: '8px',
      mb: '16px'
    },
    '@media (min-width:1025px)': {
      gap: '8px',
      mb: '16px'
    }
  },
  nameContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '6px', sm: '16px', md: '16px' },
    width: '100%',
    '& .MuiInputLabel-asterisk': {
      display: 'none'
    },
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      transform: 'translate(14px, 13px) scale(1)'
    },
    '@media (min-width:600px) and (max-width:1024.95px)': {
      flexDirection: 'row',
      gap: '16px'
    },
    '@media (min-width:1025px)': {
      flexDirection: 'row',
      gap: '16px',
      '& > .MuiFormControl-root': {
        '& .MuiInputBase-root': {
          height: '48px'
        }
      }
    },
    '@media (min-width:600px)': {
      '& > .MuiFormControl-root': {
        flex: '1 1 0',
        minWidth: 0,
        '& .MuiInputBase-root': {
          height: '48px'
        }
      }
    },
    '@media (max-width:599.95px)': {
      gap: '16px',
      '& > .MuiFormControl-root': {
        width: '100%',
        '& .MuiInputBase-root': {
          height: '48px'
        }
      }
    }
  },
  emailField: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '48px'
    },
    '& .MuiInputBase-input': {
      padding: '16px 12px',
      fontSize: '14px',
      lineHeight: '14px',
      letterSpacing: '0.25px'
    },
    '@media (min-width:1025px)': {
      '& .MuiInputBase-root': {
        height: '48px'
      }
    }
  },
  passwordField: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '48px',
      pr: '12px'
    },
    '& .MuiInputBase-input': {
      padding: '16px 12px',
      fontSize: '14px',
      lineHeight: '14px',
      letterSpacing: '0.25px'
    },
    '& .MuiSvgIcon-root': {
      width: '24px',
      height: '24px',
      color: '#607D8B'
    },
    '@media (min-width:1025px)': {
      '& .MuiInputBase-root': {
        height: '48px'
      }
    }
  },
  checkboxContainer: {
    display: 'flex',
    width: '100%',
    mb: '8px',
    mr: 0,
    ml: 0,
    minHeight: '40px',
    alignItems: 'center',
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.0025em',
      color: 'primary.900'
    }
  },
  checkbox: {
    p: '8px 12px 8px 0',
    color: 'primary.300',
    '& .MuiSvgIcon-root': {
      fontSize: '24px'
    },
    '&.Mui-checked': {
      color: 'primary.900'
    }
  },
  underlineText: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.0025em',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'primary.900'
  },
  signupButton: {
    width: '100%',
    height: '48px',
    padding: '7px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    mb: '8px'
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '32px',
    mb: '8px',
    '&::before, &::after': {
      content: '""',
      flex: 1,
      height: '1px',
      backgroundColor: '#CFD8DC'
    }
  },
  dividerText: {
    px: '11px',
    fontSize: '14px',
    lineHeight: 1,
    letterSpacing: '0.0025em',
    color: 'primary.900',
    backgroundColor: 'basic.white'
  }
}
