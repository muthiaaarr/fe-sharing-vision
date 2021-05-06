import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCol, CContainer, CDataTable, CRow, CSpinner } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import './Dashboard.css'

const fields = ["id", "name", "username"]

export default function Dashboard() {
    const [run, isRun] = useState(true);
    const [show, isShown] = useState(false);
    const [data, setData] = useState([]);

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

    useEffect(() => {
        if (run) {
            getDataUsers()
        }
    })

    return(
        <div className="c-app c-default-layout flex-row align-items-center" id='dashboard'>
            <CContainer>
                <CRow className='justify-content-center'>
                    <CCol xs={7}>
                        <CCard>
                            <CCardHeader id='header'>USER MANAGEMENT</CCardHeader>
                            <CCardBody>
                                {show ?
                                    <div>
                                        <CCardText className='text-center'>User Lists</CCardText>
                                        <CDataTable
                                            items={data}
                                            fields={fields}
                                            itemsPerPage={5}
                                            pagination
                                        ></CDataTable>
                                    </div>
                                : 
                                    <div>
                                        <CSpinner color='primary'></CSpinner>
                                        <span>  Getting Data...</span>
                                    </div>
                                }
                            </CCardBody>
                            <CCardFooter>
                            <CRow className="justify-content-end"> 
                                <CButton 
                                    shape='square' 
                                    color='danger' 
                                    id='button-delete'
                                    href='/delete'
                                >
                                    Delete User
                                </CButton>
                                <CButton
                                    shape='square'
                                    color='warning'
                                    id='button-create'
                                    href='/create'
                                >
                                    + New User
                                </CButton>
                            </CRow>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
} 