import React, { useEffect, useState } from 'react'
import { Container, Navbar, Button, NavbarBrand, Progress, Nav, NavItem, NavLink, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
export default function Register() {

    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [valor, setValor] = useState();
    const [mensagem, setMensagem] = useState('');
    const [disponivel, setDisponivel] = useState(false)

    useEffect(() => {
        console.log(nome)
    }, [nome])

    async function cadastrarProduto() {
        setMensagem('')
        const request = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: nome,
                description: descricao,
                price: valor,
                active: disponivel,
            }),
        });

        if (request.status === 201 || request.status === 200 && envioEmail.status === 200) {
            setMensagem("Produto cadastrado com sucesso! Você será redirecionado para a lista de produtos")
            setTimeout(() => {
                window.location.href = "/products"
            }, 2000);
            
        } else {
            console.log(request.status)
            setMensagem("Erro ao cadastrar. Revise os dados e tente novamente")
        }

    }

    function mostrarAviso() {
        if (mensagem != '') {
            if(mensagem == "Produto cadastrado"){
                document.getElementById("form-product").reset();
            }
            return (

                <Alert color="primary">
                    {mensagem}
                </Alert>
            )
        }
    }

    return (
        <>

            {mostrarAviso()}
            <h3>Cadastro de produtos</h3>
            <Form id="form-product">
                <FormGroup>
                    <Label for="nomeProduto">
                        Nome
                    </Label>
                    <Input
                        id="nomeProduto"
                        name="nome"
                        placeholder="Digite o nome do produto"
                        type="text"
                        onChange={(e) => {
                            e.preventDefault()
                            setNome(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">
                        Descrição
                    </Label>
                    <Input
                        id="descricaoProduto"
                        name="descricao"
                        placeholder="Digite a descricao do produto"
                        type="text"
                        onChange={(e) => {
                            e.preventDefault()
                            setDescricao(e.target.value)
                        }}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="descricao">
                        Valor em reais
                    </Label>
                    <Input
                        id="descricaoProduto"
                        name="descricao"
                        placeholder="Digite a descricao do produto"
                        type="real"
                        onChange={(e) => {
                            e.preventDefault()
                            setValor(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup check>
                    <Input type="checkbox"
                        id="disponivel"
                        name="disponivel"
                        onChange={(e) => {
                            setDisponivel(e.target.checked)
                        }} />
                    {' '}
                    <Label check
                    >
                        Disponível em estoque
                    </Label>
                </FormGroup>
                <Button onClick={cadastrarProduto}>
                    Cadastrar
                </Button>
            </Form>
        </>
    )
}