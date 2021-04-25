import React, { useState, useEffect } from 'react';
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  Button,
  Typography,
  Modal,
} from '@material-ui/core';

import Title from './Title';

import { useDispatch } from 'react-redux';
import { CartActions } from '../../services/ducks';

import { toCurrency } from '../../utils/currency';

interface Product {
  id?: number;
  name?: string;
  qtd?: number;
  price?: number;
}

interface OrderProps {
  products: Product[];
  total: number | undefined;
}

export default function Orders({ products, total }: OrderProps) {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const rowsPerPage = 5;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  function removeFromCart(data) {
    dispatch(CartActions.cartRemove(data));
  }
  return (
    <>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>Products in cart</Title>
        <Typography>Total: {toCurrency(total || 0)}</Typography>
      </div>

      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{toCurrency(row.price || 0)}</TableCell>
                <TableCell>{row.qtd}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => removeFromCart(row.id)}
                  >
                    Remove
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
    </>
  );
}
