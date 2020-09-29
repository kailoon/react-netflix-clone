import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { HeaderContainer } from "../containers/header"
import { FooterContainer } from "../containers/footer"
import { FirebaseContext } from "../context/firebase"
import * as ROUTES from "../constants/routes"

export default function Signin() {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const isInvalid = password === "" || emailAddress === ""

    const handleSignin = (e) => {
        e.preventDefault()

        firebase
            .auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push(ROUTES.BROWSE)
            })
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
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignin} method="POST">
                        <Form.Input
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={({ target }) =>
                                setEmailAddress(target.value)
                            }
                        />
                        <Form.Input
                            type="password"
                            value={password}
                            autocomplete="off"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Submit
                        </Form.Submit>

                        <Form.Text>
                            New to Netflix?{" "}
                            <Form.Link to="/signup">Sign up now</Form.Link>
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
