import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';
import ImageService from '../services/image.service';
import Swal from 'sweetalert2';
import $ from 'jquery';


class profileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            roles: [],
            tutors: [],
            id: null,
            name: null,
            departmentId: null,
            roleId: null,
            email: sessionStorage.getItem("userEmail"),
            tutorId: null,
            comment: "",
            image: null,
            imageId: null
        };
    }

    componentDidMount() {
        //Professional info
        this.queryProfessionals();
        //Dropdowns
        this.queryDepartments();
        this.queryRoles();
        this.queryTutors();
    }

    queryProfessionals() {
        ProfessionalService.getWithEmail({ email: this.state.email })
            .then(res => {
                if (res.data.success) {
                    const { id, name, departmentId, roleId, tutorId, comment, imageId } = res.data.data[0];

                    this.setState({
                        id: id,
                        name: name,
                        departmentId: departmentId,
                        roleId: roleId,
                        tutorId: tutorId,
                        comment: comment,
                        imageId: imageId
                    });

                    if (imageId != null) {
                        ImageService.get(imageId).then(res => {
                            this.setState({ image: res.data.data[0] });
                            //console.log("MI IMAGEN "+JSON.stringify(this.state.image));
                            this.cargarImagen(this.state.image);

                        }).catch(err => {
                            console.log('ERROR server ' + err);
                        });
                    } else {
                        console.log('No hay imagen asociada a esta cuenta.');

                    }
                    //this.setState(id,name,departmentId,roleId,tutorId,comment,imageId);
                } else {
                    console.log('Error quering professional EDIT');
                }
            })
            .catch(err => {
                console.log('ERROR server' + err);
            });
    }

    queryDepartments() {
        DepartmentService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ departments: data });
                } else {
                    console.log('Error quering departments EDIT');
                }
            })
            .catch(err => {
                console.log('ERROR server' + err);
            });
    }

    queryRoles() {
        RoleService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ roles: data });
                } else {
                    console.log('Error quering roles EDIT');
                }
            })
            .catch(err => {
                console.log('ERROR server' + err);
            });
    }

    queryTutors() {
        TutorService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ tutors: data });
                } else {
                    console.log('Error quering tutors EDIT');
                }
            })
            .catch(err => {
                console.log('ERROR server' + err);
            });
    }

    render() {
        return (
            <div class="container p-4">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group ">
                                    <input type="text"
                                        value={this.state.name}
                                        onChange={(value) => this.setState({ name: value.target.value })}
                                        class="form-control" name="nombre" placeholder="Nombre" autofocus
                                    />
                                </div>

                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.departmentId}
                                                onChange={(value) => this.setState({ departmentId: value.target.value })} >
                                                <option selected disabled>Departamento</option>
                                                {this.loadDepartments()}

                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.roleId}
                                                onChange={(value) => this.setState({ roleId: value.target.value })} >
                                                <option selected disabled >Rol</option>
                                                {this.loadRoles()}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.tutorId}
                                                onChange={(value) => this.setState({ tutorId: value.target.value })} >
                                                <option selected disabled >Tutoría</option>
                                                {this.loadTutors()}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <textarea class="form-control"
                                        value={this.state.comment}
                                        onChange={(value) => this.setState({ comment: value.target.value })}
                                        placeholder="Introduzca si lo desea algún comentario: Me gusta J"
                                        rows="3"></textarea>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-success" onClick={() => this.updateProfessional()}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <form class="md-form">
                                    <div class="file-field">
                                        <div class="md-4" >
                                            <img src={require("../images/profile-picture.jpg")}
                                                ref={profilePicture => this.myProfilePicture = profilePicture}
                                                id="blah"
                                                class="rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail" alt="avatar"
                                            />

                                            <div style={{ marginTop: "10px" }} class="d-flex" >
                                                <div class="btn btn-mdb-color btn-rounded float-left custom-file">
                                                    <input style={{ width: "100%" }} ref={(myElement) => this.myFileElement = myElement}
                                                        type="file"
                                                        id="imgInput"
                                                        className="custom-file-input btn btn-primary"
                                                        onChange={(value) => { this.readURL(value.target) }}
                                                    />
                                                    <label class="custom-file-label" for="customFile">Perfil</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    loadDepartments() {
        return this.state.departments.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    loadRoles() {
        return this.state.roles.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    loadTutors() {
        return this.state.tutors.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    readURL(input) {
        if (input.files && input.files[0]) {
            const myValue = input.files[0];

            console.log('antes de cargar');
            console.log(myValue);

            if (myValue.type.includes("image")) {
                const reader = new FileReader();
                let miImagen = {
                    name: myValue.name,
                    type: myValue.type
                }

                reader.onload = (event) => {
                    console.log("imagen ya lista para cargar exitosamente");
                    console.log(event.target.result);
                    $('#blah').attr('src', event.target.result);
                }
                reader.readAsDataURL(myValue); // convert to base64 string, al finalizar llama a onloadend
                reader.onloadend = async () => {
                    //IMAGEN EN BASE 64 = reader.result
                    miImagen.data = await reader.result;
                    this.state.image = miImagen;
                    console.log("imagen pasada a base 64");
                    console.log(this.state.image.data);
                }
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Sólo archivos de tipo imagen!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    cargarImagen(imagenDeBBDD) {
        if (imagenDeBBDD.type.includes("image")) {
            //CONSEGUIR IMAGEN
            console.log("imagen traida de bbdd");
            console.log(imagenDeBBDD);
            
            //EN LA BBDD GUARDO COD BASE 64 pero me devuelve un buffered array :(
            
            //const blob = new Blob([imagenDeBBDD.data.data], { type: "image/jpeg" });
            //console.log("imagen en formato blob");
            //console.log(blob);

            //CARGAR IMAGEN
            const imagenListaParaLeer = "";
            //$('#blah').attr('src', imagenListaParaLeer);
        } else {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Sólo archivos de tipo imagen!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    validateFields() {
        let emptyFields = "";
        let count = 0;
        const nombre = this.state.name;

        if (nombre.replace(/\s/g, "").length == 0) {
            emptyFields += " Nombre ";
            count++;
        }
        if (this.state.departmentId == null) {
            emptyFields += " Departamento ";
            count++;
        }
        if (this.state.roleId == null) {
            emptyFields += " Rol ";
            count++;
        }

        //If there are errors
        if (count > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: (count == 1 ? "Falta el campo" : "Faltan los campos: ") + emptyFields,
                showConfirmButton: false,
                timer: 2000
            })
            return false;
        } else {
            return true;
        }

    }

    updateProfessional() {
        if (this.validateFields() == false) {
            return;
        }

        // parametros de datos post
        const datapost = {
            id: this.state.id,
            name: this.state.name,
            departmentId: this.state.departmentId,
            roleId: this.state.roleId,
            email: this.state.email,
            tutorId: this.state.tutorId,
            comment: this.state.comment,
            image: this.state.image,
            imageId: this.state.imageId
        }
        console.log("imagen introducida en bbdd");
        console.log(datapost.image);
        console.log(JSON.stringify(datapost));

        ProfessionalService.update(datapost)
            .then(res => {
                if (res.data.success) {
                    //alert(res.data.message);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Profesional actualizado correctamente!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    //this.props.history.push('/list'); 
                }
                else {
                    alert("Error");
                }
            }).catch(error => {
                alert("Error 34 " + error);
            });
    }
}



export default profileComponent;