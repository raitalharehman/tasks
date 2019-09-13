import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { history } from '../..';
import { devicesUrl, settingsUrl, usersUrl } from '../App/routes';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function MyNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => history.push(devicesUrl)} label="Devices"  />
      <BottomNavigationAction onClick={() => history.push(usersUrl)} label="Users"  />
      <BottomNavigationAction onClick={() => history.push(settingsUrl)} label="Settings"  />
    </BottomNavigation>
  );
}
