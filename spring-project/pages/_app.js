import Head from 'next/head'
import { Container } from 'reactstrap'
import Menu from '../components/Menu/Menu'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
      </Head>
      <Menu/>
      <Container className='container'>
        <Component {...pageProps} />
      </Container>
      
    </>
    )
}

export default MyApp
