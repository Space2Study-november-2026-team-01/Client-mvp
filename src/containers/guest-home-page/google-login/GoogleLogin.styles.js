export const styles = {
  linesBox: {
    margin: { xs: '16px 0', sm: '12px 0', md: '23px 0' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '&:after, &:before': {
      content: '""',
      flex: 1,
      height: '1px',
      backgroundColor: 'primary.100'
    }
  },
  continue: {
    whiteSpace: 'nowrap',
    margin: '0 10px',
    fontSize: '14px'
  },
  underlineText: {
    fontWeight: '400',
    color: 'primary.900',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  signupLoginText: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    color: 'primary.900',
    cursor: 'pointer'
  },
  haveAccount: {
    display: 'flex',
    color: 'primary.700'
  }
}
