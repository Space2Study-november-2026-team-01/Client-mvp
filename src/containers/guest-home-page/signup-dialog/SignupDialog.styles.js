import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { md: '40px', lg: '122px' },
    maxWidth: { sm: 'md', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    '@media (min-width:600px) and (max-width:1024.95px)': {
      width: '100%',
      minWidth: 0,
      height: 'auto',
      maxHeight: 'none',
      boxSizing: 'border-box'
    },
    '@media (max-width:599.95px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      gap: 0,
      width: '100%',
      maxWidth: '100%',
      minHeight: '100%',
      maxHeight: '100%',
      overflowY: 'auto',
      mt: 0
    },
    '@media (min-width:1025px)': {
      width: '100%',
      maxWidth: 'none',
      boxSizing: 'border-box',
      justifyContent: 'flex-start',
      gap: '48px',
      px: '24px',
      py: '36px'
    },
    '@media (min-width:1100px)': {
      px: '40px'
    }
  },
  mobileHeader: {
    display: { xs: 'flex', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    flexShrink: 0,
    px: '16px',
    borderBottom: '1px solid',
    borderColor: 'primary.100'
  },
  logo: {
    width: '114px',
    height: '24px'
  },
  imgContainer: {
    display: { xs: 'none', md: 'flex' },
    width: '472px',
    maxWidth: { md: '50%', lg: '472px' },
    maxHeight: 'inherit',
    pl: { md: '30px', lg: '90px' },
    '@media (min-width:900px) and (max-width:1024.95px)': {
      display: 'none'
    },
    '@media (min-width:1025px)': {
      display: 'flex',
      width: '50%',
      maxWidth: '520px',
      minWidth: 0,
      flex: '1 1 0%',
      alignItems: 'center',
      justifyContent: 'center',
      pl: 0
    },
    '@media (min-width:1040px)': {
      width: '472px',
      maxWidth: '472px',
      minWidth: '472px',
      flex: '0 0 472px',
      alignItems: 'center',
      justifyContent: 'center',
      pl: 0
    }
  },
  img: {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    '@media (min-width:1025px)': {
      display: 'block'
    },
    '@media (min-width:1040px)': {
      width: '472px',
      height: '347px',
      maxWidth: '472px',
      objectFit: 'contain'
    }
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '56px', md: '70px' },
    pb: { xs: '24px', sm: '56px', md: '70px' },
    pl: { xs: '8px', sm: '104px', md: '90px' },
    pr: { xs: '8px', sm: '104px', md: '90px' },
    '@media (min-width:600px) and (max-width:1024.95px)': {
      width: '100%',
      height: 'auto',
      maxHeight: 'none',
      minWidth: 0,
      px: 'clamp(24px, calc((100vw - 400px) / 2), 103px)',
      boxSizing: 'border-box'
    },
    '@media (max-width:599.95px)': {
      width: '100%',
      maxHeight: 'none',
      px: '12px',
      pt: '12px',
      pb: '24px',
      borderTop: 0
    },
    '@media (min-width:1025px)': {
      width: '460px',
      maxWidth: '460px',
      minWidth: '460px',
      flex: '0 0 460px',
      maxHeight: 'inherit',
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      borderTop: 0
    }
  },
  title: {
    mb: { xs: '16px', sm: '24px', md: '30px' },
    fontSize: { xs: '18px', sm: '32px', md: '35px' },
    lineHeight: { xs: '24px', sm: '32px', md: '35px' },
    fontWeight: 500,
    letterSpacing: '0.0025em',
    color: 'primary.900',
    '@media (max-width:599.95px)': {
      fontSize: '32px',
      lineHeight: '38px',
      letterSpacing: '0.25px',
      mb: '24px'
    },
    '@media (max-width:359.95px)': {
      fontSize: '28px',
      lineHeight: '34px'
    },
    '@media (min-width:1025px)': {
      mb: '24px',
      fontSize: '32px',
      lineHeight: '40px',
      whiteSpace: 'nowrap'
    }
  },
  form: {
    overflow: 'auto',
    width: { xs: '315px', sm: '455px', md: '400px' },
    maxWidth: { xs: '315px', sm: '455px', md: '400px' },
    minWidth: 0,
    height: 'auto',
    pt: '12px',
    ...scrollbar,
    '@media (min-width:600px) and (max-width:1024.95px)': {
      width: '100%',
      maxWidth: '400px',
      maxHeight: 'none',
      overflow: 'visible',
      alignSelf: 'flex-start'
    },
    '@media (max-width:599.95px)': {
      width: '100%',
      maxWidth: '100%',
      overflow: 'visible',
      pt: '8px',
      pb: '16px'
    },
    '@media (min-width:1025px)': {
      width: '100%',
      maxWidth: '460px',
      maxHeight: 'inherit',
      boxSizing: 'border-box'
    }
  }
}

export default styles
