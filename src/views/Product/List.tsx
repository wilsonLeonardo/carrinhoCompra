import React, { useState, useEffect, Fragment, memo } from 'react';
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  Button,
  Modal,
  TextField,
} from '@material-ui/core';

import Title from './Title';

import { CartActions, ProductActions } from '../../services/ducks';

import { CurrencyMask } from '../../components/InputMask';

import { toCurrency, parseCurrency } from '../../utils/currency';

export default function Orders({ products, dispatch, classes }) {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [newProduct, setNew] = useState({
    name: '',
    price: '',
  });
  const rowsPerPage = 5;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  function addToCart(data) {
    dispatch(CartActions.cartAdd(data));
  }

  function handleChangeValue(event) {
    setNew({ ...newProduct, [event.target.name]: event.target.value });
  }

  function createProduct() {
    if (newProduct.name === '' || newProduct.price === '')
      return window.alert('Fill in all fields!');
    dispatch(
      ProductActions.productsNew(
        newProduct.name,
        parseCurrency(newProduct.price)
      ),
      setModal(false),
      setNew({ name: '', price: '' })
    );
  }
  return (
    <Fragment>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={modal}
        className={classes.modal}
      >
        <div className={classes.paperModal}>
          <h2 id='server-modal-title'>Create product</h2>
          <div style={{ flexDirection: 'column', display: 'flex' }}>
            <TextField
              name='name'
              label='Name'
              value={newProduct.name}
              onChange={(event) => handleChangeValue(event)}
              variant='outlined'
            />
            &nbsp;
            <TextField
              value={newProduct.price}
              name='price'
              label='Price'
              onChange={(event) => handleChangeValue(event)}
              variant='outlined'
              InputProps={{
                inputComponent: CurrencyMask,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '20px 0 0 20px',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                setModal(false), setNew({ name: '', price: '' });
              }}
            >
              Cancel
            </Button>
            &nbsp;
            <Button variant='contained' color='primary' onClick={createProduct}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>Products</Title>
        <Button variant='contained' onClick={() => setModal(true)}>
          New
        </Button>
      </div>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='center'>Price</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align='center'>{toCurrency(row.price)}</TableCell>
                <TableCell align='right'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => addToCart(row)}
                  >
                    Add to cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div'
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Fragment>
  );
}
