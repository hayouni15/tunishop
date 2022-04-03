import React, { useState, useEffect, useCallback } from "react";
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout/Checkout'
import DetailedProduct from "./components/DetailedProduct/DetailedProduct";
import { commerce } from './lib/commerce'
import Categories from './components/Categories/Categories'




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


let App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [page, setPage] = useState('1')
    const [pagesCount, setPagesCount] = useState(0)
    const [limit, setLimit] = useState(8)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('all')

    const fetchProducts = (page, category) => {
        console.log('page', page)
        commerce.products.list({
            limit,
            page,
            category_slug: category === 'all' ? [] : [category],
        }).then((products) => {
            setProducts(products.data);
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

    const getPagesNumber =
        async (category) => {
            const allProducts = await commerce.products.list({ category_slug: category === 'all' ? [] : [category] })
            setPagesCount(Math.ceil(allProducts.data.length / limit))
            console.log(pagesCount)
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

    useEffect(() => {
        getPagesNumber(category)
        setPage(1)
    }, [category]
    )
    useEffect(() => {
        fetchCategory();
        fetchCart()
        fetchProducts(page, category);
    }, [page, pagesCount, category])

    return (
        <Router>
            <div>
                <Navbar
                    cart={cart}>
                </Navbar>

                <Categories categories={categories} category={category} setCategory={setCategory} setPage={setPage}></Categories>


                <Routes>
                    <Route exact path="/" element={<Products products={products} onAddtoCart={handleAddToCart} page={page} setPage={setPage} pagesCount={pagesCount}></Products>} />
                    <Route exact path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty}
                        onAddToCart={handleAddToCart}
                        onRemovefromCart={removefromCart}
                        onEmptyCart={handleEmptyCart}
                        setPage={setPage} ></Cart>} />
                    <Route exact path="/checkout" element={<Checkout></Checkout>} />
                    <Route exact path="/productDetails/:ProductId" element={<DetailedProduct products={products}></DetailedProduct>} />
                </Routes>

            </div>
        </Router >


    )
}

export default App