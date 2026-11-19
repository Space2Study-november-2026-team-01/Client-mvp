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
    '@media (min-width:600px) and (max-width:899.95px)': {
      width: '100%',
      minWidth: 0,
      height: '100%',
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
    pl: { md: '30px', lg: '90px' }
  },
  img: {
    width: '100%',
    objectFit: 'contain'
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
    '@media (min-width:600px) and (max-width:899.95px)': {
      width: '100%',
      height: '100%',
      minWidth: 0,
      px: 'clamp(24px, calc((100vw - 487px) / 2), 104px)',
      boxSizing: 'border-box'
    },
    '@media (max-width:599.95px)': {
      width: '100%',
      maxHeight: 'none',
      px: '12px',
      pt: '12px',
      pb: '24px',
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
    '@media (min-width:600px) and (max-width:899.95px)': {
      width: '100%',
      maxWidth: '455px',
      alignSelf: 'flex-start'
    },
    '@media (max-width:599.95px)': {
      width: '100%',
      maxWidth: '100%',
      overflow: 'visible',
      pt: '8px',
      pb: '16px'
    }
  }
}

export default styles
