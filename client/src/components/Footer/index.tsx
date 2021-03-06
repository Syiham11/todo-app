import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={ classes.footer }>
      <Typography variant="body2" color="textSecondary" align="center">
        { 'Copyright © ' }
      <Link color="inherit" href="mailto://juseongkr@gmail.com">
        Juseong Park
      </Link>{ ' ' }
      {new Date().getFullYear()}
      { '.' }
      </Typography>
    </footer>
  );
}

export default Footer;