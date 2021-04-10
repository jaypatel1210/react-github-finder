import React from 'react'
import { Container } from 'reactstrap'

export default function Footer() {
    return (
        <Container 
            fluid
            tag="footer"
            className="text-center bg-info text-white text-uppercase fixed-bottom p-3"
        >
            JAY Github Finder App
        </Container>
    )
}
