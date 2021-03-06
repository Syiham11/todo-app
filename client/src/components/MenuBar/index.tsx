import React from 'react';
import axios from 'axios';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { useStateValue } from '../../state';
import { baseUrl } from '../../constants';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      marginTop: theme.spacing(4),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const MenuBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ { auth }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        await axios.get<void>(`${baseUrl}/auth/check`);
        dispatch({ type: 'SET_USER', payload: true });
      } catch (err) {
        dispatch({ type: 'SET_USER', payload: false });
      }
    })();
  }, [dispatch]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignIn = () => {
    handleMenuClose();
    history.push("/signin");
  }

  const handleSignOut = async (): Promise<void> => {
    try {
      handleMenuClose();
      await axios.get<void>(`${baseUrl}/auth/signout`);
      dispatch({ type: 'SET_USER', payload: false });
      dispatch({ type: 'SIGNOUT', payload: true });
    } catch (err) {
      console.log(err);
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={ anchorEl }
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      id={ menuId }
      keepMounted
      transformOrigin={ { vertical: 'top', horizontal: 'right' } }
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
    {
      auth ?
      <MenuItem onClick={ handleSignOut }>Sign out</MenuItem>
       : 
      <MenuItem onClick={ handleSignIn }>Sign in</MenuItem>
    }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={ mobileMoreAnchorEl }
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      id={ mobileMenuId }
      keepMounted
      transformOrigin={ { vertical: 'top', horizontal: 'right' } }
      open={ isMobileMenuOpen }
      onClose={ handleMobileMenuClose }
    >
      <MenuItem onClick={ handleProfileMenuOpen }>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={ classes.grow }>
      <AppBar position="fixed" style={ { background: '#2E3B55' } }>
        <Toolbar>
          <Typography className={ classes.title } variant="h6" noWrap>
            <Link href="/" color="inherit">
              Home
            </Link>
          </Typography>
          <div className={ classes.grow } />
          <div className={ classes.sectionDesktop }>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={ menuId }
              aria-haspopup="true"
              onClick={ handleProfileMenuOpen }
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={ classes.sectionMobile }>
            <IconButton
              aria-label="show more"
              aria-controls={ mobileMenuId }
              aria-haspopup="true"
              onClick={ handleMobileMenuOpen }
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu }
      { renderMenu }
    </div>
  );
}

export default MenuBar;