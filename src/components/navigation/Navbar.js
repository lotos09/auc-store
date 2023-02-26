import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";
import { ROUTES } from "../../constants/router";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";

const drawerWidth = 240;

export const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleListItemClick = (event) => {
    setMobileOpen(!mobileOpen);
  };

  const { auth, sharedData, setSharedData } = useContext(Context);
  const [user] = useAuthState(auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const signOut = async () => {
    auth.signOut();
  };

  let { pathname } = useLocation();

  const onSearchChange = useCallback(({ target }) => {
    setSharedData((prev) => ({
      ...prev,
      searchValue: target.value,
    }));
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          component={Link}
          to={ROUTES.MAIN_PAGE}
          selected={pathname === ROUTES.MAIN_PAGE}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="main" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to={ROUTES.STORE}
          selected={pathname === ROUTES.STORE}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Store" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to={ROUTES.ACCOUNT}
          selected={pathname === ROUTES.ACCOUNT}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account details" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to={ROUTES.CART}
          selected={pathname === ROUTES.CART}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Bids & Purchases" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton onClick={(event) => handleListItemClick(event, 4)}>
          <TextField
            id="search"
            onChange={onSearchChange}
            label="Search"
            variant="standard"
          />
        </ListItemButton>
      </List>
      <List component="nav" aria-label="secondary mailbox folder">
        <div style={{ padding: 16 }}>
          <div>filters:</div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Buy Out Only"
            />
            <FormControlLabel control={<Checkbox />} label="From my country" />
          </FormGroup>
          <p>Price range:</p>
          <div style={{ display: "flex" }}>
            <TextField type="number" label="min" />
            <p style={{ marginLeft: "15px", marginRight: "15px" }}> - </p>
            <TextField type="number" label="max" />
          </div>
        </div>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Auction House
          </Typography>

          {user && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "20px" }}>{user.email}</p>
              <Button onClick={signOut} color="inherit">
                Exit
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
