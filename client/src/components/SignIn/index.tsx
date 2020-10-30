import React from 'react';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress'
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../constants';

interface Values {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState<string>('');
  const initValue: Values = {
    username: '',
    password: '',
  }

  const validator = (values: Values): Partial<Values> => {
    const errors: Partial<Values> = {};

    if (!values.username || !values.password) {
      errors.username = 'You must fill out email and password';
    }

    return errors;
  }

  const handleSubmit = async ({ username, password }: Values): Promise<void> => {
    try {
      await axios.post<any>(`${baseUrl}/auth/signin`, { username, password });
      history.push('/');
    } catch (err) {
      setError(err!.response!.data!.error);
      console.log(err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        { error && <Alert severity="error">Unauthorized access</Alert> } 
        <Formik initialValues={ initValue } onSubmit={ handleSubmit } validate={ validator }>
        {
          ({ isValid, dirty, isSubmitting }) => {
            return (
            <Form className={ classes.form }>
              <Field
                component={ TextField }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <Field
                component={ TextField }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              { isSubmitting && <div> <br/> <LinearProgress /> </div> }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ classes.submit }
                disabled={ !dirty || !isValid }
              >
                Sign In
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    { "Don't have an account? Sign Up" }
                  </Link>
                </Grid>
              </Grid>
            </Form>
            );
          }
        }
        </Formik>
      </div>
    </Container>
  );
}

export default SignIn;