import React, { useContext, useState } from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
    CardFooter,
    Button
} from 'reactstrap';

import firebase from 'firebase/app';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Signup() {

    const context = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        firebase.
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            context.setUser({
                email: res.user.email,
                uid: res.user.uid
            });
        })
        .catch(err => 
            toast(err.message, { 
                type: 'error'
            })    
        );
    }
    const handleSubmit = e => {
        e.preventDefault();
        handleSignup();
    }

    if (context.user?.uid) {
        return <Redirect to="/" />;
    }
    return(
        <Container className='text-center'>
			<Row>
				<Col lg={6} className='offset-lg-3 mt-5'>
					<Card>
						<Form onSubmit={handleSubmit}>
							<CardHeader className=''>Signup here</CardHeader>
							<CardBody>
								<FormGroup row>
									<Label for='email' sm={3}>
										Email
									</Label>
									<Col sm={9}>
										<Input
											type='email'
											name='email'
											id='email'
											placeholder='provide your email'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</Col>
								</FormGroup>
							</CardBody>
							<CardFooter>
								<Button type='submit' block color='primary'>
									Sign Up
								</Button>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
    );
};
