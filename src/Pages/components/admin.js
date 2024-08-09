import React, { useState, useEffect } from 'react';
import '../../styles/CSS/admin.css';
import theme from '../../styles/theme';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import { Container, TextField, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography } from '@mui/material';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [addProductForm, setAddProductForm] = useState({ title: '', price: '' });
  const [editProductForm, setEditProductForm] = useState({ id: '', title: '', price: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("There was an error fetching the products!", error));
  }, []);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddProductForm({ ...addProductForm, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm({ ...editProductForm, [name]: value });
  };

  const handleAddProduct = () => {
    if (!addProductForm.title || !addProductForm.price) {
      console.error("Product form is incomplete!");
      return;
    }

    const newProduct = { ...addProductForm, id: uuidv4() };
    console.log("Generated UUID:", newProduct.id);

    axios.post('https://fakestoreapi.com/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setAddProductForm({ title: '', price: '' });
        setAddDialogOpen(false);
      })
      .catch(error => console.error("There was an error adding the product!", error));
  };

  const handleEditProduct = (id) => {
    if (!editProductForm.title || !editProductForm.price) {
      console.error("Product form is incomplete!");
      return;
    }

    axios.put(`https://fakestoreapi.com/products/${id}`, editProductForm)
      .then(response => {
        setProducts(products.map(product => (product.id === id ? response.data : product)));
        setEditProductId(null);
        setEditProductForm({ id: '', title: '', price: '' });
      })
      .catch(error => console.error("There was an error updating the product!", error));
  };

  const handleDeleteProduct = (id) => {
    setDeleteDialogOpen(true);
    setDeleteProductId(id);
  };

  const handleConfirmDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${deleteProductId}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== deleteProductId));
        setDeleteDialogOpen(false);
        setDeleteProductId(null);
      })
      .catch(error => console.error("There was an error deleting the product!", error));
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditProductForm({ id: product.id, title: product.title, price: product.price });
  };

  const handleUpdateProduct = () => {
    handleEditProduct(editProductId);
  };

  return (
    <>
      <div className='head'>
        <h1>Product Management</h1>
        <Button onClick={() => setAddDialogOpen(true)} variant="contained" color="primary">Add Product</Button>
      </div>
      <div className='container'>
        <Container>
          <Grid container spacing={2} style={{ marginBottom: '20px'}}>
            <Grid item xs={6}>
              <Typography variant="h5" style={{ marginTop: '20px'}}>Product</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" style={{ marginTop: '20px'}}>Price</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" style={{ marginTop: '20px'}}></Typography>
            </Grid>
          </Grid>
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                {editProductId === product.id ? (
                  <div className='formPrdct'>
                    <TextField
                      label="Product Title"
                      name="title"
                      value={editProductForm.title}
                      onChange={handleEditInputChange}
                    />
                    <TextField
                      label="Product Price"
                      name="price"
                      value={editProductForm.price}
                      onChange={handleEditInputChange}
                    />
                    <Button onClick={handleUpdateProduct} variant="contained" className='btnUpdate'>Update</Button>
                  </div>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ListItemText primary={product.title} />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText primary={product.price} />
                    </Grid>
                    <Grid item xs={3} className='btnG1'>
                      <Button onClick={() => handleEditClick(product)} variant="contained" >Edit</Button>
                      <Button onClick={() => handleDeleteProduct(product.id)} variant="contained" >Delete</Button>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
            ))}
          </List>

          <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this product?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color='warning'>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">Delete</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
              <TextField
                label="Product Title"
                name="title"
                value={addProductForm.title || ''}
                onChange={handleAddInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Product Price"
                name="price"
                value={addProductForm.price || ''}
                onChange={handleAddInputChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)} color="primary">Cancel</Button>
              <Button onClick={handleAddProduct} color="primary">Add Product</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  );
};

export default AdminPanel;
