import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CFormText, CInput, CLabel, CRow } from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import './Create.css'

export default function Create() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [warning, setWarning] = useState("Required")

    const [nameLength, isNameLength] = useState(false)
    const [usernameLength, isUsernameLength] = useState(false)
    const [passwordLength, isPasswordLength] = useState(false)

    const validateName = () => {
        if (name.length > 0 && name.length < 3) {
            isNameLength(false)
            setWarning("Too short")
        } else {
            isNameLength(true)
        }
    }

    const validateUsername = () => {
        if (username.length > 0 && username.length < 3) {
            isUsernameLength(false)
            setWarning("Too short")
        } else {
            isUsernameLength(true)
        }
    }

    const validatePassword = () => {
        if (password.length > 0 && password.length < 7) {
            isPasswordLength(false)
            setWarning("Too short")
        } else {
            isPasswordLength(true)
        }
    }

    const createNewUser = () => {
        validateName()
        validateUsername()
        validatePassword()

        const url = 'https://sharingvision-backend.herokuapp.com/user'
        const data = {
            name: name,
            username: username,
            password: password
        }
        axios.post(url, data)
        .then(res => {
            if (res.status === 200) {
                // FAILED KARENA ADA ISSUE CORS
                console.log("Submit success")
            }
        })
    }

    return(
        <div className="c-app c-default-layout flex-row align-items-center" id='create'>
            <CContainer>
                <CRow className='justify-content-center'>
                    <CCol xs={7}>
                        <CCard>
                            <CCardHeader id='header'>Create New User Form</CCardHeader>
                            <CCardBody>
                                <CFormGroup>
                                    <CLabel htmlFor="name">Name*</CLabel>
                                    {nameLength ? 
                                        <CInput 
                                            id='name' 
                                            placeholder="Enter your name" 
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            valid
                                            required
                                        />
                                    :
                                        <div>
                                            <CInput 
                                                id='name' 
                                                placeholder="Enter your name" 
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                invalid
                                                required
                                            />
                                            <CFormText>{warning}</CFormText>
                                        </div>
                                    }
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="username">Username*</CLabel>
                                    {usernameLength ? 
                                        <CInput 
                                            id='username' 
                                            placeholder="Enter your name" 
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            valid
                                            required
                                        />
                                    :
                                        <div>
                                            <CInput 
                                                id='username' 
                                                placeholder="Enter your name" 
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username}
                                                invalid
                                                required
                                            />
                                            <CFormText>{warning}</CFormText>
                                        </div>
                                    }
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="password">Password*</CLabel>
                                    {passwordLength ? 
                                        <CInput 
                                            id='password' 
                                            type='password'
                                            placeholder="Enter your name" 
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            valid
                                            required
                                        />
                                    :
                                        <div>
                                            <CInput 
                                                id='password' 
                                                type='password'
                                                placeholder="Enter your name" 
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                invalid
                                                required
                                            />
                                            <CFormText>{warning}</CFormText>
                                        </div>
                                    }
                                </CFormGroup>
                                <CRow className='justify-content-center'>
                                    <CCol>
                                        <CButton 
                                            block 
                                            type='submit' 
                                            shape='square' 
                                            color='success' 
                                            id='button-submit'
                                            onClick={() => createNewUser()}
                                        >
                                            Submit
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}