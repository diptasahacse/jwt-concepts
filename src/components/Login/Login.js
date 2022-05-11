import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const loginOnSubmitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        // console.log(email, pass)
        const user = {
            email,
            pass
        }

        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    localStorage.setItem('accessToken', data.accessToken)
                    navigate('/orders')
                }
                else{
                    console.log(data.success)

                }

            })

    }
    return (
        <div>
            <Container>
                <h2>Login</h2>
                <div className='py-4'>
                    <Form onSubmit={loginOnSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required ref={emailRef} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required ref={passwordRef} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </Container>

        </div>
    );
};

export default Login;