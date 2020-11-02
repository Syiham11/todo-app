import React from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, LinearProgress } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { baseUrl } from '../../constants';
import { Alert } from '@material-ui/lab';
import { useStateValue } from '../../state';

interface Values {
  title: string;
  description: string;
  favorite?: Array<string>;
}

interface Props {
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PostForm: React.FC<Props> = ({ onClose }: Props) => {
  const classes = useStyles();
  const [{ auth }, ] = useStateValue();
  const initValue: Values = {
    title: '',
    description: '',
    favorite: [],
  }

  const validator = (values: Values): Partial<Values> => {
    const errors: Partial<Values> = {};

    if (!values.title) {
      errors.title = 'You must fill out title';
    }
    
    if (!values.description) {
      errors.description = 'You must fill out description';
    }

    return errors;
  }

  const handleSubmit = async ({ title, description, favorite }: Values): Promise<void> => {
    try {
      const flag = favorite?.length === 0 ? false : true;
      await axios.post(`${baseUrl}/todo`, { title, description, favorite: flag, complete: false });
      //dispatch({ type: '', payload: '' });
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      { auth ? <div /> : <Alert severity="error">Please sign in before upload</Alert> }
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
                label="Title"
                type="text"
                name="title"
                autoFocus
              />
              <Field
                component={ TextField }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                type="test"
                name="description"
                multiline
                rows={ 6 }
              />
              <FormControlLabel
                control={ <Field component={ Checkbox } icon={ <FavoriteBorder /> } checkedIcon={ <Favorite /> } type="checkbox" name="favorite" value="favorite" /> }
                label="Favorite"
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
                Add
              </Button>
            </Form>
          );
        }
      }
      </Formik>
    </div>
  );
}

export default PostForm;