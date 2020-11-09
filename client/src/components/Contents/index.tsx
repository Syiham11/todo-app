import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Todo } from '../../types';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  controller: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  cardHeader: {
    paddingTop: '15%',
    background: 'linear-gradient(135deg, #c3cfe2 0%, #5385d4 100%)',
  }
}));

type Props = {
  todos: Array<Todo>;
  onUpdate: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

const Contents: React.FC<Props> = ({ todos, onUpdate, onDelete }: Props) => {
  const classes = useStyles();

  return (
    <Container className={ classes.cardGrid } maxWidth="md">
      <Grid container spacing={ 4 }>
      { todos.map((todo: Todo, id: number) => (
        <Grid item key={ id } xs={ 12 } sm={ 6 } md={ 4 }>
          <Card className={ classes.card }>
            <div className={ classes.cardHeader } />
            <CardContent className={ classes.cardContent }>
              <Typography gutterBottom variant="h5" component="h2">
                { todo.title }
              </Typography>
              <Typography>
                { todo.description }
              </Typography>
            </CardContent>
            <CardActions className={ classes.controller }>
              <IconButton aria-label="check" onClick={ () => onUpdate({ ...todo, complete: !(todo.complete) }) }>
                { todo.complete ? <ClearIcon /> : <CheckIcon /> }
              </IconButton>
              <IconButton aria-label="favorite" onClick={ () => onUpdate({ ...todo, favorite: !(todo.favorite) }) }>
                { todo.favorite ? <Favorite /> : <FavoriteBorder /> }
              </IconButton>
              <IconButton aria-label="delete" onClick={ () => onDelete(todo) }>
                <DeleteIcon />
              </IconButton>
            </CardActions>
            </Card>
          </Grid>
      )) }
      </Grid>
    </Container>
    );
}

export default Contents;