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

import { ShoppingCart } from '@material-ui/icons/';

import { ProductActions } from '../../services/ducks';

import List from './List';
import { useDispatch } from 'react-redux';

export default function Products() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useTypedSelector((state) => state);
  const cart = state.cart.data;

  const products = state.products.data;

  useEffect(() => {
    dispatch(ProductActions.productsRequest());
  }, []);

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
            Products
          </Typography>
          <IconButton color='inherit' onClick={() => history.push('/cart')}>
            <Badge
              badgeContent={
                cart && cart.length >= 1
                  ? cart?.map((x) => x.qtd).reduce((t, a) => t && a && t + a)
                  : 0
              }
              color='secondary'
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <List products={products} dispatch={dispatch} classes={classes} />
            </Paper>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );
}
