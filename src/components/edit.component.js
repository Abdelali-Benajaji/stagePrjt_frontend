import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
 
export default function EditProduct() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [image, setImage] = useState('')
    const [nom,setNom] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    useEffect(()=>{
        fetchProduct();
    },[])

    const fetchProduct = async() =>{
        await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            .then(({ data }) => {
                const { nom, email,role } = data.product
                setNom(nom)
                setEmail(email)
                setRole(role)
            }).catch(({ response: {data} }) => {
                console.log(data.message)
            })
    }

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        if (image !== null) {
            formData.append('image', image)
        }
        formData.append('nom', nom)
        formData.append('email', email)
        formData.append('role', role)
        
        

        await axios.post('http://127.0.0.1:8000/api/products/' + id, formData)
            .then(({ data }) => {
                console.log(data.message)
                navigate('/')
            }).catch(({ response }) => {
                if (response.status == 422) {
                    console.log(response.data.errors)
                } else {
                    console.log(response.data.message)
                }
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"> Edit Form</h3>
                            <hr></hr>
                            <div className="from-wrapper">

                                <form onSubmit={updateProduct}>

                                <div className="mb-3">
                                        <label className="form-label">image  </label>
                                        <input type="file" className="form-control"
                                         
                                            onChange={changeHandler}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Nom  </label>
                                        <input type="text" className="form-control" 
                                        value={nom}
                                        onChange={(e)=>{setNom(e.target.value)}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email  </label>
                                        <input type="email" className="form-control" 
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Role  </label>
                                        <input type="text" className="form-control" 
                                        value={role}
                                        onChange={(e)=>{setRole(e.target.value)}}
                                        />
                                    </div>
                                   

                                    

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary mb-3">  Save</button>
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary mb-3">  Update</button>
                                    </div>

                                </form>



                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )




}