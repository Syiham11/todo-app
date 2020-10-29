import React from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Contents from './Contents';
import { useStateValue } from '../state';
import { baseUrl } from '../constants';
import { Todo } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={ value !== index }
      id={ `action-tabpanel-${index}` }
      aria-labelledby={ `action-tab-${index}` }
      { ...other }
    >
      { value === index && <Box p={ 3 }>{ children }</Box>}
    </Typography>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      minHeight: 100,
      marginTop: theme.spacing(9),
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }),
);

const Board: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [, setError] =React.useState('');
  const [{ todos }, dispatch] = useStateValue();

  React.useEffect(() => {
    void (async() => {
      try {
        const { data: todos } = await axios.get<Array<Todo>>(`${baseUrl}/todos`);
        dispatch({ type: 'SET_TODOS', payload: todos });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  const tabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const updateTodo = async (todo: Todo): Promise<void> => {
    try {
      await axios.put<Todo>(`${baseUrl}/todo/id/${todo.id}`, todo);
      dispatch({ type: 'ADD_TODO', payload: todo });
    } catch (err) {
      setError(err!.response!.data!.error);
      console.log(err);
    }
  }

  const deleteTodo = async (todo: Todo): Promise<void> => {
    try {
      await axios.delete<unknown>(`${baseUrl}/todo/id/${todo.id}`);
      dispatch({ type: 'DEL_TODO', payload: todo});
    } catch (err) {
      setError(err!.response!.data!.error);
      console.log(err);
    }
  }

  return (
    <div className={ classes.root }>
      <AppBar position="static" color="default">
        <Tabs
          value={ tab }
          onChange={ tabChange }
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="ALL" { ...a11yProps(0) } />
          <Tab label="COMPLETE" { ...a11yProps(1) } />
          <Tab label="INCOMPLETE" { ...a11yProps(2) } />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
        index={ tab }
      >
        <TabPanel value={ tab } index={ 0 } dir={ theme.direction }>
          <Contents todos={ Object.values(todos) } onUpdate={ updateTodo } onDelete={ deleteTodo } />
        </TabPanel>
        <TabPanel value={ tab } index={ 1 } dir={ theme.direction }>
          <Contents todos={ Object.values(todos).filter(todo => todo.flag) } onUpdate={ updateTodo } onDelete={ deleteTodo } />
        </TabPanel>
        <TabPanel value={ tab } index={ 2 } dir={theme.direction}>
          <Contents todos={ Object.values(todos).filter(todo => !todo.flag) } onUpdate={ updateTodo } onDelete={ deleteTodo } />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default Board;