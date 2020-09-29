import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { HeaderContainer } from "../containers/header"
import { FooterContainer } from "../containers/footer"
import { Form } from "../components"
import * as ROUTES from "../constants/routes"
import { FirebaseContext } from "../context/firebase"

export default function Signup() {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const [firstName, setFirstName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const isInvalid = firstName === "" || password === "" || emailAddress === ""
    const handleSignup = (e) => {
        e.preventDefault()

        firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((result) =>
                result.user
                    .updateProfile({
                        displayName: firstName,
                        photoURL: Math.floor(Math.random() * 5) + 1,
                    })
                    .then(() => {
                        history.push(ROUTES.BROWSE)
                    })
            )
            .catch((error) => {
                setEmailAddress("")
                setPassword("")
                setError(error.message)
            })
    }

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign Up</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignup} method="POST">
                        <Form.Input
                            placeholder="First Name"
                            value={firstName}
                            onChange={({ target }) =>
                                setFirstName(target.value)
                            }
                        ></Form.Input>
                        <Form.Input
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={({ target }) =>
                                setEmailAddress(target.value)
                            }
                        ></Form.Input>
                        <Form.Input
                            type="Password"
                            placeholder="Password"
                            autocomplete="off"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        ></Form.Input>
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign Up
                        </Form.Submit>
                        <Form.Text>
                            Already a user?{" "}
                            <Form.Link to="/signin">Signin now.</Form.Link>
                        </Form.Text>
                        <Form.TextSmall>
                            This page is protected by Google reCAPTCHA.
                        </Form.TextSmall>
                    </Form.Base>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    )
}
