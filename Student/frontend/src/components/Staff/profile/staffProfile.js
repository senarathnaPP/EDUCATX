import React, { createRef, Component } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/header';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';



class staffProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {

            logUserId: '',
            stfStaffId: "",
            stfName: "",
            stfEmail: "",
            stfPhonenNmber: "",
            stfJobRole: "",
            stfPanellMember: "N",
            stfResField: "",
            stfUserActive: "",
            stfUserPassword: "",

            stfUserQ1: "",
            stfUserQ2: "",
            staff: '',
            newPassword: '',
            reNewPassword: '',
            password:'',

            firstnameError: false,
            emailError: false,
            passwordError1: false,
            passwordError2: false,
            passwordError3: false,
            phoneNumberError: false,
            Jobrole: false,
            queone: false,
            queTwo: false,
            resfield: false,
            type:true,


        }
        this.formData = createRef();
        this.add = this.add.bind(this);
        this.getuserdata = this.getuserdata.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.changeRePasswordHandler = this.changeRePasswordHandler.bind(this);

        this.changePhonenumberHandler = this.changePhonenumberHandler.bind(this);
        this.changeJobroleHandler = this.changeJobroleHandler.bind(this);

        this.changePrevPasswordHandler = this.changePrevPasswordHandler.bind(this);

        this.changeQuesoneHandler = this.changeQuesoneHandler.bind(this);

        this.changeQuesTwoHandler = this.changeQuesTwoHandler.bind(this);

        this.changeResFieldHandler = this.changeResFieldHandler.bind(this);

    }

    changeFirstNameHandler = (event) => {

        if (!event.target.value) {
            this.state.firstnameError = true
        } else {
            this.state.firstnameError = false
        }
        this.setState({ stfName: event.target.value });
    }

    changeEmailHandler = (event) => {

        if (!event.target.value) {
            this.state.emailError = true
        } else {
            this.state.emailError = false
        }
        this.setState({ stfEmail: event.target.value });

    }


    changePasswordHandler = (event) => {

        if (!event.target.value) {
            this.state.passwordError1 = true
        } else {
            this.state.passwordError1 = false
        }

        this.setState({ newPassword: event.target.value });
    }

    changePrevPasswordHandler = (event) => {

        if (!event.target.value) {
            this.state.passwordError2 = true
        } else {
            this.state.passwordError2 = false
        }

        this.setState({ stfUserPassword: event.target.value });
    }

    changeRePasswordHandler = (event) => {

        if (!event.target.value) {
            this.state.passwordError3 = true
        } else {
            this.state.passwordError3 = false
        }

        this.setState({ reNewPassword: event.target.value });
    }


    changePhonenumberHandler = (event) => {

        this.setState({
            type:true
        })


        const values = event.target.value;
        const type = !isNaN(+values)
        console.log(type)


        if(!type){

            this.setState({
                type:false
            })

        }

        if (!event.target.value) {
            this.state.phoneNumberError = true
        } else {
            this.state.phoneNumberError = false
        }
        this.setState({ stfPhonenNmber: event.target.value });
    }

    changeJobroleHandler = (event) => {
        if (!event.target.value) {
            this.state.Jobrole = true
        } else {
            this.state.Jobrole = false
        }
        this.setState({ stfJobRole: event.target.value });
    }

    changeQuesoneHandler = (event) => {
        if (!event.target.value) {
            this.state.queone = true
        } else {
            this.state.queone = false
        }
        this.setState({ stfUserQ1: event.target.value });
    }

    changeQuesTwoHandler = (event) => {
        if (!event.target.value) {
            this.state.queTwo = true
        } else {
            this.state.queTwo = false
        }
        this.setState({ stfUserQ2: event.target.value });
    }



    changeResFieldHandler = (event) => {
        if (!event.target.value) {
            this.state.resfield = true
        } else {
            this.state.resfield = false
        }
        this.setState({ stfResField: event.target.value });
    }


    add = (event) => {

        console.log("inside add")
        event.preventDefault();

        const newClient = {
            stfName: this.formData.current.stfName.value,
            stfUserQ2: this.formData.current.stfUserQ2.value,
            stfUserQ1: this.formData.current.stfUserQ1.value,
            stfResField: this.formData.current.stfResField.value,
            stfEmail: this.formData.current.stfEmail.value,
            stfPhonenNmber: this.formData.current.stfPhonenNmber.value,
            stfJobRole: this.formData.current.stfJobRole.value ,
            stfUserPassword: this.formData.current.reNewPassword.value,
           
        }

        console.log("cc",newClient)
        if (this.formData.current.stfName.value && this.formData.current.stfUserQ2.value && this.formData.current.stfUserQ1.value
            && this.formData.current.stfResField.value && this.formData.current.stfEmail.value && this.formData.current.stfPhonenNmber.value &&
            this.formData.current.stfJobRole.value && this.formData.current.password.value  && this.formData.current.newPassword.value  && this.formData.current.reNewPassword.value) {

            if(this.formData.current.password.value != this.state.staff.stfUserPassword){
                alert("cureent password does bot match");
                return -1

                }

            if (this.formData.current.newPassword.value == this.formData.current.reNewPassword.value) {
                if (((this.formData.current.newPassword.value).length) < 10 && ((this.formData.current.newPassword.value).length) > 5) {

                   
                        const id = this.state.staff._id
                        const URL = `http://localhost:8000/api/staffRegister/update/${id}`;
                        axios.put(URL, newClient).then(() => {
                            alert("Student Updated")
                        }).catch((error) => {
                            alert(error);
                        })

                    





                } else {
                    alert(" Your password must contain at least 8 characters and max 10 characters");
                   
                }

            } else {

                alert("Password does not match")
               
            }

        } else {
          alert("Some fields are empty")
           

        }

    }


    getuserdata(data) {

        const obj = {
            "staffUser": data
        }
        const url = 'http://localhost:8000/api/staffRegister/getuser'

        axios.post(url, obj).then((res) => {

            this.setState({
                staff: res.data.data,
                stfName: res.data.data.stfName,
                stfEmail: res.data.data.stfEmail,
                stfJobRole: res.data.data.stfJobRole,
                stfPhonenNmber: res.data.data.stfPhonenNmber,
                stfResField: res.data.data.stfResField,
                stfUserQ1: res.data.data.stfUserQ1,
                stfUserQ2: res.data.data.stfUserQ2,


            })

            console.log(res.data.data)
        })

    }


    componentDidMount() {
        const logUser = sessionStorage.getItem('LogUserId')

        this.getuserdata(logUser);


        this.setState({
            logUserId: logUser

        });

    }

    render() {
        return (
            <div data-testid="profile" className='main-wrapper'>
                <div className='app-header'>
                    <Header />
                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>
                            

                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "800px", "position": "absolute", "marginLeft": "10px", "height": "550px", "float": "left", "minHeight": "80vh", "borderRadius": "10px" }}>


                                <div class="register_content" style={{"marginTop":"20px"}}>
                                    <div class="m-register">
                                        <Form onSubmit={this.add} ref={this.formData}>
                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Id Number</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="firstName" value={this.state.staff.stfStaffId} />



                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>First Name*</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="stfName" value={this.state.stfName} onChange={this.changeFirstNameHandler} />
                                                        {this.state.firstnameError && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter a first Name. </p>}



                                                    </Form.Group>


                                                </Col>


                                                <Col>



                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        {/* <Form.Label>JobRole*</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="firstName" value={this.state.Supervisor} onChange={this.changeJobroleHandler} /> */}

                                                        <Form.Label>JobRole*</Form.Label>
                                                        <Form.Select aria-label="Default select example" value={this.state.stfJobRole} name="stfJobRole"
                                                            onChange={this.changeJobroleHandler}>



                                                            {/* <option>Open this select menu</option> */}
                                                            {/* <option >{this.state.stfJobRole}</option> */}
                                                            <option >Supervisor</option>
                                                            <option >Co-Supervisor</option>

                                                        </Form.Select>
                                                        {this.state.Jobrole && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please select job role. </p>}

                                                    </Form.Group>


                                                </Col>

                                            </Row>

                                            <Row>


                                            </Row>


                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>phone number</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="stfPhonenNmber" value={this.state.stfPhonenNmber} onChange={this.changePhonenumberHandler} />
                                                        {this.state.phoneNumberError && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter phone number. </p>}
                                                        {!this.state.type && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}



                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>email</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="stfEmail" value={this.state.stfEmail} onChange={this.changeEmailHandler} />
                                                        {this.state.emailError && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter email. </p>}




                                                    </Form.Group>


                                                </Col>

                                            </Row>

                                            <Row></Row>

                                            <Row>

                                                <Col>


                                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                                        {/* <Form.Control type="text" placeholder="" name="firstName" value={this.state.stfResField} onChange={this.changeResFieldHandler} /> */}

                                                        <Form.Label>ReserchField</Form.Label>
                                                        <Form.Select aria-label="Default select example" value={this.state.stfResField} onChange={this.changeResFieldHandler} name="stfResField"
                                                        >



                                                            {/* <option>Open this select menu</option> */}
                                                            {/* <option >{this.state.stfJobRole}</option> */}
                                                            <option >CSNE</option>
                                                            <option >CS</option>
                                                            <option >SE</option>
                                                            <option >IT</option>

                                                        </Form.Select>

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Panel Status</Form.Label>
                                                        <Form.Control type="text" placeholder="" name="stfPanellMember" value={this.state.staff.stfPanellMember == "Y" ? "True" : "False"} />



                                                    </Form.Group>

                                                </Col>
                                                <Col></Col>



                                            </Row>



                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Question 1</Form.Label>
                                                        <Form.Control type="text" placeholder=" Question 1 : Favourit country to visite" name="stfUserQ1" value={this.state.stfUserQ1} onChange={this.changeQuesoneHandler} />
                                                        {this.state.queone && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter answear. </p>}




                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Question 2</Form.Label>
                                                        <Form.Control type="text" placeholder=" Question 2 : Favourit Sport" name="stfUserQ2" value={this.state.stfUserQ2} onChange={this.changeQuesTwoHandler} />
                                                        {this.state.queTwo && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter answear. </p>}



                                                    </Form.Group>


                                                </Col>

                                            </Row>


                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>previous password</Form.Label>
                                                        <Form.Control type="password" placeholder="" name="password" onChange={this.changePrevPasswordHandler} />
                                                        {this.state.passwordError2 && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter current password. </p>}



                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control type="password" placeholder="" name="newPassword" onChange={this.changePasswordHandler} />
                                                        {this.state.passwordError1 && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter new password. </p>}



                                                    </Form.Group>


                                                </Col>


                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Re Enter Password</Form.Label>
                                                        <Form.Control type="password" placeholder="" name="reNewPassword" onChange={this.changeRePasswordHandler} />
                                                        {this.state.passwordError3 && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter re new password. </p>}



                                                    </Form.Group>


                                                </Col>

                                            </Row>

                                            <Row>

                                                <Col>

                                                    <Button size="sm" className="btn btn-secondary" variant="add" type="submit" style={{ "color": "#000000", "background": "rgb(32 122 255 / 25%)", "font-size": "large", "marginTop": "15px" }}>
                                                        update
                                                    </Button >

                                                </Col>
                                                <Col></Col>




                                            </Row>


                                        </Form>
                                    </div>
                                </div>




                            </div>




                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "450px", "position": "absolute", "marginLeft": "830px", "height": "550px", "float": "right", "minHeight": "80vh", "borderRadius": "10px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default staffProfile;