import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useStateValue } from '../../state';

const Alert = (props: AlertProps) => <MuiAlert elevation={ 6 } variant="filled" { ... props } />;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBar = () => {
  const classes = useStyles();
  const [ { signin, signout }, dispatch] = useStateValue();

  const handleSignIn = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'SIGNIN', payload: false });
  }

  const handleSignOut = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'SIGNOUT', payload: false });
  }

  return (
    <div className={ classes.root }>
      <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'center' } } open={ signin } autoHideDuration={ 2000 } onClose={ handleSignIn }>
        <Alert onClose={ handleSignIn } severity="success">
          Hello!, Successfully signed in
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'center' } } open={ signout } autoHideDuration={ 2000 } onClose={ handleSignOut }>
        <Alert onClose={ handleSignOut } severity="info">
          Good bye, Successfully signed out
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertBar;