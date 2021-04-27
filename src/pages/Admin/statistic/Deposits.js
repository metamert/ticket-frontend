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

export default function Deposits({info}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Kazanılan miktar</Title>
      <Typography component="p" variant="h1">
        {info?.Total}{" "}<span style={{fontSize:32}}>try</span>
      </Typography>
     
    </React.Fragment>
  );
}