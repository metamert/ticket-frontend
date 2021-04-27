import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Box({info,title}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h1">
        {info}{" "}
      </Typography>
     
    </React.Fragment>
  );
}