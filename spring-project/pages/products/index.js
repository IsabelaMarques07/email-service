import React, { useEffect, useState } from 'react'
import { Alert, Button, CloseButton, Table, Toast, ToastBody, ToastHeader } from 'reactstrap'
import SwitchSelector from "react-switch-selector";
export default function Products() {

    const [productsList, setProductsList] = useState([]);
    const [message, setMessage] = useState('');
    const [option, setOption] = useState(true);

    async function getProducts() {
        const response = await fetch('http://localhost:3001/products');
        const products = await response.json();
        setProductsList(products);
    }

    useEffect(() => {
        getProducts()
    }, [productsList])

    async function deleteProduct(id) {
        const rawResponse = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
    
        if (rawResponse.status === 200) {
          await setMessage('Produto sem estoque!');
          getProducts();
        }
      }

      const options = [
        {
            label: <span>Disponível</span>,
            value: true,
            selectedBackgroundColor: "#287e00",
        },
        {
            label: <span>Indisponível</span>,
            value: false,
            selectedBackgroundColor: "#c70000"
        }
     ];
     
     const onChange = (newValue) => {
         setOption(newValue);
     };
     
     const initialSelectedIndex = options.findIndex(({value}) => value === "bar");


    function retornarProducts() {

        if (productsList != undefined) {
            return (
                productsList.map(product => {
                    if(product.active === option){
                        return (
                            <Toast className="card">
                                <ToastHeader className="card-header">
                                    {product.title}
                                </ToastHeader>
                                <ToastBody>
                                    <p>Descrição: {product.description}</p>
                                    <p>Preço: R${product.price}</p>
                                    <p>{product.active ? 'Disponível' : 'Indisponível'}</p>
                                    <Button 
                                        color={product.active? "danger" : "secondary"}
                                        size='sm' 
                                        active={product.active}
                                        onClick={product.active? () => deleteProduct(product._id) : null}
                                        >
                                            Indisponibilizar
                                    </Button>
                                </ToastBody>
                            </Toast>
                        )
                    }
                    return null
                })
            )
        } else {
            return null
        }
    }

    function mostrarAviso() {
        if (message != '') {
            return (

                <Alert color="primary">
                    {message}
                </Alert>
            )
        }
    }
    return (
        <>
            {mostrarAviso()}
            <h1>Produtos</h1>
            <div className="your-required-wrapper" style={{width: '60%', height: 30, marginLeft: '20%'}}>
        <SwitchSelector
            onChange={onChange}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
            backgroundColor={"#353b48"}
            fontColor={"#f5f6fa"}
        />
    </div>
            <Button href='/products/register'>Adicionar Produto</Button>
            <div className="container-cards">
                {retornarProducts()}
            </div>
        </>
    )
}