import React, { useEffect, useState } from 'react'
import { Table, Toast, ToastBody, ToastHeader } from 'reactstrap'
import SwitchSelector from "react-switch-selector";
export default function Emails() {

    const [emailsList, setEmailsList] = useState([]);
    const [emailsFiltered, setEmailsFiltered] = useState(null);
    const [option, setOption] = useState({status:'SEND'});

    useEffect   (() => {
        getEmails()
    }, [])

    async function getEmails() {
        const response = await fetch('http://localhost:8080/emails');
        const emails = await response.json();
        setEmailsList(emails);
    }


    function retornarEmails() {
        let emails = null;
        if (emailsList != undefined) {
            if(emailsFiltered != null){
                emails = emailsFiltered;
            }else{
                emails = emailsList;
            }
            return(
                emails.map(email => {
                    if(option.status == email.statusEmail){
                        return (
                            <Toast className= "card">
                                <ToastHeader 
                                className={`card-header ${email.statusEmail.toLowerCase()}`}>
                                {email.subject}
                                </ToastHeader>
                                <ToastBody>
                                    <p>De: {email.emailFrom}</p>
                                    <p>Para: {email.emailTo}</p>
                                    <p>Data: {new Date(email.sendDateEmail).toLocaleDateString("pt-BR")}</p>
                                </ToastBody>
                            </Toast>
                        )
                    }

                    return null;
                })
            )
        } else {
            return null
        }
    }

    const options = [
        {
            label: <span>Enviado com sucesso</span>,
            value: {
                 status: 'SEND'
            },
            selectedBackgroundColor: "#287e00",
        },
        {
            label: <span>Falha ao enviar</span>,
            value: {
                status: 'ERROR'
            },
            selectedBackgroundColor: "#c70000"
        }
     ];
     
     const onChange = (newValue) => {
         setOption(newValue);
     };
     
     const initialSelectedIndex = options.findIndex(({value}) => value === "bar");

    return (
        <>
            <div className='header-title'>
                <h1>Emails</h1>
                <input
                className="pesquisa"
                placeholder="Busque um produto pelo nome"
                type="date"
                onChange={({ target }) => {
                    setEmailsFiltered(
                    emailsList.filter((e) =>
                        e.sendDateEmail
                        .toLocaleLowerCase()
                        .includes(target.value.toLocaleLowerCase()),
                    ),
                    );
                }}
                ></input>
            </div>
            <div className="your-required-wrapper" style={{width: '60%', height: 30, marginLeft: '20%'}}>
        <SwitchSelector
            onChange={onChange}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
            backgroundColor={"#353b48"}
            fontColor={"#f5f6fa"}
        />
    </div>
    <div className="container-cards">
                {retornarEmails()}
            </div>
            
        </>
    )
}