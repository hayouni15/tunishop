import React, { useState, useEffect } from "react";
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout/Checkout'
import DetailedProduct from "./components/DetailedProduct/DetailedProduct";
import { commerce } from './lib/commerce'
import Categories from './components/Categories/Categories'
import Snackbar from '@mui/material/Snackbar';
import Footer from "./components/Footer/Footer";
import axios from "axios"



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
    const [ratings, setRatings] = useState([])


    const fetchProductsFromAPI = (category) => {
        let query = (category === 'all') ? {} : { "query": { "category": { "value": category, "isExact": true } } }
        axios({
            method: 'post',
            url: `http://localhost:5000/api/products/fetch?limit=${limit}&page=${page - 1}`,
            headers: {},
            data: query
        })
            .then(function (response) {
                // handle success
                setPagesCount(Math.ceil(response.data.count / limit))
                setProducts(response.data.products);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const searchProducts = (query) => {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/products/fetch`,
            headers: {},
            data: query
        })
            .then(function (response) {
                // handle success
                setPagesCount(Math.ceil(response.data.count / limit))
                setProducts(response.data.products);

                if (response.data.count > 0) {
                    setProducts(response.data.products);
                }
                else {
                    console.log('cant find any items')
                    setSearchSnackBar(true)
                }
            })
            .catch(function (error) {
                // handle error
                console.log('There was an error fetching the products', error)
            })
    }

    const fetchCategory = () => {
        let AllCategories = []
        axios({
            method: 'get',
            url: `http://localhost:5000/api/categories/fetch`,
            headers: {},
        })
            .then(function (response) {
                // handle success
                response.data.map((category) => (
                    AllCategories.push(category.category)
                ))
                setCategories(AllCategories);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const fetchRatings = (query) => {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/ratings/fetch`,
            headers: {},
            data: query
        })
            .then(function (response) {
                console.log(response)
                // handle success
                setRatings(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log('There was an error fetching the products', error)
            })
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
        setPage(1)
        console.log('here1')
    }, [category]
    )

    useEffect(() => {
        console.log('here2')
        fetchCategory();
        fetchCart()
        fetchProductsFromAPI(category);
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
                            handleAddToCart={handleAddToCart}
                            ratings={ratings}
                            fetchRatings={fetchRatings}
                        ></DetailedProduct>} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router >


    )
}

export default App