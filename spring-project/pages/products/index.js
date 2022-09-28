import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
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
                        <tr>
                            <td>
                                {product.title}
                            </td>
                            <td>
                                {product.description}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.active? 'Disponível' : 'Indisponível'}
                            </td>
                        </tr>
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
            <Table
            >
                <thead>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                           Descrição
                        </th>
                        <th>
                            Preço
                        </th>
                        <th>
                            Disponibilidade
                        </th>
                    </tr>
                </thead>
                <tbody>
                 {retornarProducts()}
                </tbody>
            </Table>
        </>
    )
}