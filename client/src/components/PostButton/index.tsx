import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import PostForm from '../PostForm';

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

const PaperComponent: React.FC = (props: PaperProps) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={ '[class*="MuiDialogContent-root"]' }>
      <Paper {...props} />
    </Draggable>
  );
}

const PostButton: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={ classes.root }>
      <Fab color="primary" className={ classes.fab }>
        <AddIcon onClick={ handleClickOpen } />
      </Fab>
      <Dialog
        open={ open }
        onClose={ handleClose }
        PaperComponent={ PaperComponent }
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={ { cursor: 'move' } } id="draggable-dialog-title">
          Add Todo
        </DialogTitle>
        <DialogContent>
          <PostForm onClose={ handleClose } />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostButton;