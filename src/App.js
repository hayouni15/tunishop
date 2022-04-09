import React, { useState, useEffect, useCallback } from "react";
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout/Checkout'
import DetailedProduct from "./components/DetailedProduct/DetailedProduct";
import { commerce } from './lib/commerce'
import Categories from './components/Categories/Categories'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "./components/Footer/Footer";



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Alert } from "@mui/material";


let App = () => {
    const [products, setProducts] = useState([])
    const [productByID, setProductByID] = useState()
    const [cart, setCart] = useState({})
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const limit = 8
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('all')
    const [searchSnackBar, setSearchSnackBar] = useState(false);
    const [paginationVisibility, setPaginationVisibility] = useState(true)

    const fetchProducts = (page, category) => {
        commerce.products.list({
            limit,
            page,
            category_slug: category === 'all' ? [] : [category],
        }).then((products) => {
            setProducts(products.data);
            console.log('products fetched')
        }).catch((error) => {
            console.log('There was an error fetching the products', error)
        });
    }

    const fetchCategory = () => {
        let AllCategories = []
        commerce.categories.list().then((allCategories) => {
            allCategories.data.map((category) => (
                AllCategories.push(category.name)
            ))
            setCategories(AllCategories)
        }).catch((error) => {
            console.log('There was an error fetching the products', error)
        });
    }

    const searchProducts = (query) => {
        commerce.products.list({
            query,
        }).then((prods) => {
            if (prods.data) {
                setProducts(prods.data);
                console.log(prods)
            }
            else {
                console.log('cant find any items')
                setSearchSnackBar(true)
            }
        }).catch((error) => {
            console.log('There was an error fetching the products', error)
        });
    }

    const getPagesNumber =
        async (category) => {
            const allProducts = await commerce.products.list({ category_slug: category === 'all' ? [] : [category] })
            setPagesCount(Math.ceil(allProducts.data.length / limit))
        }


    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }


    const handleAddToCart = (productID, quantity) => {
        commerce.cart.add(productID, quantity).then((newCart) => {
            setCart(newCart.cart)
        })
    }

    const handleUpdateCartQty = async (porudctID, quantity) => {
        const response = await commerce.cart.update(porudctID, { quantity });
        setCart(response.cart)
    }

    const removefromCart = async (productID) => {
        const response = await commerce.cart.remove(productID)
        setCart(response.cart)
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty()
        setCart(response.cart)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSearchSnackBar(false);
    };

    useEffect(() => {
        getPagesNumber(category)
        setPage(1)
        console.log('here')
    }, [category]
    )

    useEffect(() => {
        fetchCategory();
        fetchCart()
        console.log('here2')
        fetchProducts(page, category);
    }, [page, pagesCount, category])



    return (
        <Router>
            <div>
                <Navbar
                    cart={cart}>
                </Navbar>

                <Categories
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    setPage={setPage}
                    searchProducts={searchProducts}
                    setPaginationVisibility={setPaginationVisibility}
                ></Categories>

                <Snackbar
                    open={searchSnackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        No products match your search term!
                    </Alert>
                </Snackbar>

                <Routes>
                    <Route exact path="/" element={
                        <Products
                            products={products}
                            onAddtoCart={handleAddToCart}
                            page={page}
                            setPage={setPage}
                            pagesCount={pagesCount}
                            paginationVisibility={paginationVisibility}
                            setCategory={setCategory}
                            setPaginationVisibility={setPaginationVisibility}>
                        </Products>} />
                    <Route exact path="/cart" element={
                        <Cart
                            cart={cart}
                            onUpdateCartQty={handleUpdateCartQty}
                            onAddToCart={handleAddToCart}
                            onRemovefromCart={removefromCart}
                            onEmptyCart={handleEmptyCart}
                            setPage={setPage} ></Cart>} />
                    <Route exact path="/checkout" element={<Checkout></Checkout>} />
                    <Route exact path="/productDetails/:ProductId" element={
                        <DetailedProduct
                            searchProducts={searchProducts}
                            products={products}
                            setCategory={setCategory}
                            setPage={setPage}
                            setPagesCount={setPagesCount}
                            handleAddToCart={handleAddToCart}
                        ></DetailedProduct>} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router >


    )
}

export default App