import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useContext } from "react";
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
import { Link, Outlet, useLocation } from "react-router-dom";
import { checkBoxStyle, textBlackStyle } from "./styles";

const drawerWidth = 240;

export const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleListItemClick = (event) => {
    setMobileOpen(!mobileOpen);
  };

  const { auth, setSharedData } = useContext(Context);
  const [user] = useAuthState(auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const signOut = async () => {
    auth.signOut();
  };

  let { pathname } = useLocation();

  const isStorePage = pathname === "/store";

  const onSearchChange = useCallback(
    ({ target }) => {
      setSharedData((prev) => ({
        ...prev,
        searchValue: target.value,
      }));
    },
    [setSharedData]
  );

  const categoriesList = (
    <List
      style={{
        overflow: "scroll",
        height: "310px",
        paddingLeft: "15px",
        ...textBlackStyle,
      }}
      component="nav"
      aria-label="categories list"
    >
      <ListItemButton>category 1</ListItemButton>
      <ListItemButton>category 2</ListItemButton>
      <ListItemButton>category 3</ListItemButton>
      <ListItemButton>category 4</ListItemButton>
      <ListItemButton>category 5</ListItemButton>
      <ListItemButton>category 6</ListItemButton>
      <ListItemButton>category 7</ListItemButton>
      <ListItemButton>category 8</ListItemButton>
      <ListItemButton>category 9</ListItemButton>
      <ListItemButton>category 10</ListItemButton>
      <ListItemButton>category 11</ListItemButton>
    </List>
  );

  const drawer = (
    <div>
      <div style={{ marginLeft: "15px" }}>Cateories: </div>
      {categoriesList}

      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton onClick={(event) => handleListItemClick(event, 4)}>
          <TextField
            id="search"
            onChange={onSearchChange}
            label="Search"
            variant="standard"
            color="secondary"
          />
        </ListItemButton>
      </List>
      <List component="nav" aria-label="secondary mailbox folder">
        <div style={{ padding: 16 }}>
          <div>Filters:</div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox sx={checkBoxStyle} defaultChecked />}
              label="Buy Out Only"
            />
            <FormControlLabel
              control={<Checkbox sx={checkBoxStyle} />}
              label="From my country"
            />
          </FormGroup>

          <p>Price:</p>
          <div style={{ display: "flex" }}>
            <TextField variant="standard" type="number" label="min" />
            <p style={{ marginLeft: "15px", marginRight: "15px" }}> - </p>
            <TextField variant="standard" type="number" label="max" />
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
        // sx={{
        //   width: { sm: `calc(100% - ${drawerWidth}px)` },
        //   ml: { sm: `${drawerWidth}px` },
        // }}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#F5F5F5",
            color: "#111111",
            zIndex: 2000,
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
              <Button
                sx={{ textTransform: "none" }}
                // onClick={signOut}
                component={Link}
                to={ROUTES.STORE}
                color="inherit"
              >
                Store
              </Button>

              <Button
                sx={{ textTransform: "none" }}
                // onClick={signOut}
                component={Link}
                to={ROUTES.ACCOUNT}
                color="inherit"
              >
                Account Details
              </Button>

              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                component={Link}
                to={ROUTES.CART}
              >
                Bids & Purchases
              </Button>

              {/*<p style={{ marginRight: "20px" }}>{user.email}</p>*/}
              <Button
                sx={{ textTransform: "none" }}
                onClick={signOut}
                color="inherit"
              >
                Sign Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/*side bar*/}
      {isStorePage && (
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            zIndex: 200,
          }}
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
                marginTop: "88px",
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      {/*main box*/}
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
