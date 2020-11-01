import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }),
);

const PostButton = () => {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <Fab color="primary" className={ classes.fab }>
        <AddIcon onClick={ () => console.log("add!") } />
      </Fab>
    </div>
  );
}

export default PostButton;