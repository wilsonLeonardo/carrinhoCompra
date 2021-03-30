import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  AppBar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core/';

import { useStyles } from './styles';
import { useTypedSelector } from '../../utils/hooks';

import { Home } from '@material-ui/icons/';

import List from './List';

export default function Products() {
  const classes = useStyles();
  const history = useHistory();

  const state = useTypedSelector((state) => state);
  const cart = state.cart.data;

  function totalPrice() {
    const soma = cart?.map((x) => {
      return x.price && x.qtd && x.price * x.qtd;
    });
    const total =
      soma && soma.length > 0 ? soma.reduce((t, a) => t && a && t + a) : 0;

    return total;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Cart
          </Typography>
          <IconButton color='inherit' onClick={() => history.push('/')}>
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <List products={cart} total={totalPrice()} />
            </Paper>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
