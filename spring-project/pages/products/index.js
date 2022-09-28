import React, { useEffect, useState } from 'react'
import { Button, Table, Toast, ToastBody, ToastHeader } from 'reactstrap'
export default function Products() {

    const [productsList, setProductsList] = useState([]);

    useEffect   (() => {
        getProducts()
    }, [])

    async function getProducts() {
        const response = await fetch('http://localhost:3001/products');
        const products = await response.json();
        setProductsList(products);
    }


    function retornarProducts() {

        if (productsList != undefined) {
            return(
                productsList.map(product => {
                    return (
                        <Toast className= "card">
                        <ToastHeader className="card-header">
                        {product.title}
                        </ToastHeader>
                        <ToastBody>
                            <p>Descrição: {product.description}</p>
                            <p>Preço: R${product.price}</p>
                            <p>{product.active? 'Disponível' : 'Indisponível'}</p>
                        </ToastBody>
                    </Toast>
                    )
                })
            )
        } else {
            return null
        }
    }
    return (
        <>
            <h1>Produtos</h1>
            <Button href='/products/register'>Adicionar Produto</Button>
            <div className="container-cards">
                 {retornarProducts()}
            </div>
        </>
    )
}