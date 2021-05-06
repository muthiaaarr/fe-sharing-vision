import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCol, CContainer, CDataTable, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import './Delete.css'

const fields = ["id", "name", "username"]

export default function Delete() {
    const [run, isRun] = useState(true);
    const [show, isShown] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [visible, isVisible] = useState(false);
    const [success, isSuccess] = useState(false);

    const getDataUsers = () => {
        const url = 'https://sharingvision-backend.herokuapp.com/user'
        axios.get(url)
        .then(res => {
            for (let i=0; i<res.data.data.length; i++) {
                setData(res.data.data)
            }
            console.log(data)
            if (res.status === 200) {
                isRun(false)
                isShown(true)
            }
        })
    }

    const deleteUser = () => {
        const url = 'https://sharingvision-backend.herokuapp.com/user/' + id
        axios.delete(url)
        .then(res => {
            if (res.status === 200) {
                isSuccess(true)
            }
        })
    }

    useEffect(() => {
        console.log(id)
        if (run) {
            getDataUsers()
        }

        if (success) {
            isVisible(false)
        }
    })

    return(
        <div className="c-app c-default-layout flex-row align-items-center" id='delete'>
            <CContainer>
                <CRow className='justify-content-center'>
                    <CCol xs={7}>
                        <CCard>
                            <CCardHeader id='header'>User Lists</CCardHeader>
                            <CCardBody>
                                {success ? <CCardText>ID {id} has been deleted</CCardText> : <span> </span>}
                                {show ?
                                    <CDataTable
                                        items={data}
                                        fields={fields}
                                        itemsPerPage={5}
                                        pagination
                                    ></CDataTable>
                                : 
                                    <div>
                                        <CSpinner color='primary'></CSpinner>
                                        <span>  Getting Data...</span>
                                    </div>
                                }
                            </CCardBody>
                            <CCardFooter>
                                <CButton 
                                    shape='square' 
                                    color='danger' 
                                    id='button-delete'
                                    onClick={() => isVisible(true)}
                                >
                                    Enter id you want to delete
                                </CButton>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                    <CModal show={visible} onDismiss={() => isVisible(false)}>
                        <CModalHeader onDismiss={() => isVisible(false)}>
                        <CModalTitle>DELETE USER</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CFormGroup>
                                <CLabel htmlFor="id">ID you want to delete</CLabel>
                                <CInput 
                                    id='id' 
                                    placeholder="Input your ID" 
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                    type='number'
                                />
                            </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                        <CButton color="secondary" onClick={() => isVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={() => deleteUser()}>Delete ID</CButton>
                        </CModalFooter>
                    </CModal>
                </CRow>
            </CContainer>
        </div>
    )
}