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
import { baseUrl, pwRegex } from '../../constants';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';

interface Values {
  username: string;
  password: string;
  passwordCheck: string;
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState<string>('');
  const initValue: Values = {
    username: '',
    password: '',
    passwordCheck: '',
  }

  const validator = (values: Values): Partial<Values> => {
    const errors: Partial<Values> = {};

    if (!values.username) {
      errors.username = 'You must fill out email';
    }

    if (!values.password || !values.passwordCheck || values.password.length < 8 || !values.password?.match(pwRegex)) {
      errors.password = 'You must fill out password at least 8 characters including a number and a lowercase letter';
    }

    if (values.password !== values.passwordCheck) {
      errors.password = 'Please re-enter your password';
    }

    return errors;
  }

  const handleSubmit = async ({ username, password }: Values): Promise<void> => {
    try {
      await axios.post<any>(`${baseUrl}/auth/signup`, { username, password });
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
          Sign up
        </Typography>
        { error && <Alert severity="error">Unauthorized access</Alert> } 
        <Formik initialValues={ initValue } onSubmit={ handleSubmit } validate={ validator }>
        {
          ({ isValid, dirty, isSubmitting }) => {
            return (
              <Form className={ classes.form }>
                <Grid container spacing={ 2 }>
                  <Grid item xs={ 12 }>
                    <Field
                      component={ TextField }
                      variant="outlined"
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      name="username"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={ 12 }>
                    <Field
                      component={ TextField }
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={ 12 }>
                    <Field
                      component={ TextField }
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordCheck"
                      label="Re-enter Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                { isSubmitting && <div> <br/> <LinearProgress /> </div> }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={ classes.submit }
                  disabled={ !dirty || !isValid }
                >
                  Sign Up
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
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

export default SignUp;