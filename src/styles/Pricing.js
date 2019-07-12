const PricingStyles = theme => ({
  pricingTable: {
    marginTop: '-64px'
  },
  card: {
    textAlign: 'center',
    cursor: 'default',
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  title: {
    fontSize: '1rem',
    overflow: 'hidden',
    marginBottom: theme.spacing.unit,
    whiteSpace: 'nowrap',
    letterSpacing: '.01rem',
    textOverflow: 'ellipsis',
  },
  subheader: {
    textTransform: 'capitalize',
    fontSize: '12px',
  },
  price: {
    fontSize: '2.5rem',
    fontWeight: 900,
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  symbol: {
    fontSize: '1rem',
    verticalAlign: 'super'
  },
  period: {
    fontSize: '0.8125rem',
    display: 'inline-block',
    padding: 0,
    opacity: '.7',
  },
  feature: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  description: {
    fontSize: '14px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1
  },
  inactive: {
    color: theme.palette.text.secondary
  },
  centered: {
    margin: '0 auto'
  },
  label: {
    color: '#ffffff'
  }
});

export default PricingStyles;