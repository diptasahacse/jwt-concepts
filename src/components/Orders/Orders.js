import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate()
    const [allProducts, setAllProducts] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/orders', {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                navigate('/login')
            }
            // console.log(res)
           return res.json()
        })
        .then(data => setAllProducts(data))
    },[])
    return (
        <div>
            <Container>
                <h2>Orders {allProducts.length}</h2>
            </Container>
            
        </div>
    );
};

export default Orders;