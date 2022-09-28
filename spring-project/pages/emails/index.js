import React, { useEffect, useState } from 'react'
import { Table, Toast, ToastBody, ToastHeader } from 'reactstrap'
export default function Emails() {

    const [emailsList, setEmailsList] = useState([]);

    useEffect   (() => {
        getEmails()
    }, [])

    async function getEmails() {
        const response = await fetch('http://localhost:8080/emails');
        const emails = await response.json();
        setEmailsList(emails);
    }


    function retornarEmails() {

        if (emailsList != undefined) {
            return(
                emailsList.map(email => {
                    return (
                        <Toast className= "card">
                            <ToastHeader className="card-header">
                            {email.subject}
                            </ToastHeader>
                            <ToastBody>
                                <p>De: {email.emailFrom}</p>
                                <p>Para: {email.emailTo}</p>
                                <p>Data: {email.sendDateEmail}</p>
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
            <h1>Emails</h1>
            <div className="container-cards">
                {retornarEmails()}
            </div>
            
        </>
    )
}