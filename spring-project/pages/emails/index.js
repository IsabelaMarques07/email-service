import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
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
                        <tr>
                            <td>
                                {email.emailTo}
                            </td>
                            <td>
                                {email.emailFrom}
                            </td>
                            <td>
                                {email.subject}
                            </td>
                            <td>
                                {email.sendDateEmail}
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
            <h1>Emails</h1>
            <Table
            >
                <thead>
                    <tr>
                        <th>
                            Email To
                        </th>
                        <th>
                            Email From
                        </th>
                        <th>
                            Assunto
                        </th>
                        <th>
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                 {retornarEmails()}
                </tbody>
            </Table>
        </>
    )
}