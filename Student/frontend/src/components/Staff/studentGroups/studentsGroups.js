import React, { createRef, Component } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/header';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed';
import "./ToggleSwitch.css";
import { BsPersonCircle, BsMessenger } from "react-icons/bs";
import { Link } from 'react-router-dom';



class studentsGroups extends Component {

    constructor(props) {
        super(props)

        this.state = {

            logUserId: '',
            topics: [],
            approvedTopics: [],
            groupDetails: '',
            researchField: '',
            status: '',
            groupName: '',
            researchTopic: '',
            isToggled: '',
            mongoid: '',
            updatedData: '',
            topicsStatus: true

        }
        this.getreserchtopic = this.getreserchtopic.bind(this);
        this.pendingMsgHandler = this.pendingMsgHandler.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.onChat = this.onChat.bind(this);

    }

    onChat(e) {
        console.log("eeeeeeeee", e)
        this.props.history.push(`/staffMsg/${e}`);
    }


    pendingMsgHandler(id, name, researchField, status, mongoid) {

        const value = status == "Pending" ? false : true

        console.log("stst", mongoid)

        this.setState({
            researchField: researchField,
            status: status,
            groupName: id,
            researchTopic: name,
            isToggled: value,
            mongoid: mongoid

        })

        console.log("...", id + " " + name)

        const data = {
            name: id
        }

        const url = 'http://localhost:8000/api/groupDetails/get'

        axios.post(url, data).then((res) => {

            this.setState({
                groupDetails: res.data.data
            })

            console.log("...a", this.state.groupDetails)

        })

    }

    getreserchtopic(loguser) {



        const data = {
            "name": loguser,
            "resStatus": "Pending"
        }

        const url = 'http://localhost:8000/api/reserchTpoic/getbySup'
        axios.post(url, data).then((res) => {



            const num = res.data.data.length == 0 ? true : false
            console.log("xoxo", num)

            this.setState({

                topicsStatus: num


            })

            this.setState({
                topics: res.data.data

            }, () => {

                this.setState({
                    topicsStatus: false

                })
                console.log("...", this.state.topics)
            })

        })
    }

    getAssignedreserchtopic(logUser) {



        const url = 'http://localhost:8000/api/reserchTpoic/getbySup'
        const data = {
            "name": logUser,
            "resStatus": "Approved"
        }

        axios.post(url, data).then((res) => {

            console.log(res.data.data)

            this.setState({
                approvedTopics: res.data.data
            }, () => {
                console.log("...", this.state.approvedTopics)
            })

        })


    }

    onToggle = (data) => {
        console.log("toogle1", data)
        const value = data ? false : true
        this.setState({ isToggled: value }, () => {
            console.log("sukitha", this.state.isToggled)
        })

    }

    updateStatus() {

        console.log("this.state.isToggled", this.state.isToggled)

        const state = this.state.isToggled ? "Approved" : "Pending"

        const data = {

            "status": state

        }
        const url = ` http://localhost:8000/api/groupDetails/update/${this.state.mongoid}`

        axios.put(url, data).then((res) => {

            const logUser = sessionStorage.getItem('LogUserId')
            const LogUserName = sessionStorage.getItem('LogUserName')



            this.getreserchtopic(LogUserName)

            this.getAssignedreserchtopic(LogUserName)


            if (res.data) {

                const value = res.data.status == "Pending" ? false : true

            }
            console.log(res.data)
            this.setState({
                updatedData: res.data,
                isToggled: value,
            })
        })


    }



    componentDidMount() {

        const logUser = sessionStorage.getItem('LogUserId')
        const LogUserName = sessionStorage.getItem('LogUserName')

        this.setState({
            logUserId: logUser

        });

        this.getreserchtopic(LogUserName)

        this.getAssignedreserchtopic(LogUserName)




    }

    // componentWillUnmount(){


    //     const logUser = sessionStorage.getItem('LogUserId')
    //     const LogUserName = sessionStorage.getItem('LogUserName')

    //     this.setState({
    //         logUserId: logUser

    //     });

    //     this.getreserchtopic(LogUserName)

    //     this.getAssignedreserchtopic(LogUserName)

    // }




    render() {
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />
                </div>
                <div className='app-body'>
                    <div className='body-wrapper' style={{ "backgroundColor": "#f8f9fa" }}>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>

                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "800px", "position": "absolute", "marginLeft": "470px", "height": "550px", "float": "right", "minHeight": "85vh", "borderRadius": "10px" }}>


                                <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "500", "WebkitTextStroke": "thin", "marginBottom": "5px", "fontSize": "40px" }}><span >{this.state.groupDetails.groupName}</span></div>



                                {this.state.groupDetails.groupName &&

                                    <><><><><div style={{ "marginLeft": "15px", "fontWeight": "400", "WebkitTextStroke": "thin" }}><p>ResearchField: &nbsp;{" "}{this.state.researchField}</p><p>ResearchTopic: &nbsp;{" "}{this.state.researchTopic}</p><p>Status: &nbsp;{" "}
                                        {this.state.status}</p></div>
                                        <Row>
                                            <Col>
                                                <label className="toggle-switch" style={{ "marginLeft": "13px" }}>
                                                    <input type="checkbox" checked={this.state.isToggled} onChange={() => this.onToggle(this.state.isToggled)} />
                                                    <span className="switch" />
                                                </label>
                                            </Col>
                                            <Col>

                                                <Button style={{ "marginBottom": "10px", "backgroundColor": "rgb(93 148 231 / 66%)", "float": "right", "marginRight": "20px" }} className="btn " variant="addDel" type="submit" onClick={this.updateStatus}>
                                                    Update
                                                </Button>




                                            </Col>
                                        </Row>
                                    </></><div style={{ "marginRight": "15px", "marginLeft": "15px", "marginTop": "10px" }}><table class="table table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">IT Number</th>
                                                <th scope="col">Chat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>{this.state.groupDetails.groupLeaderName}</td>
                                                <td>{this.state.groupDetails.groupLeaderId}</td>
                                                <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.groupLeaderId }}><Button><BsMessenger /> </Button></Link></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>

                                                <td>{this.state.groupDetails.memberTwoName}</td>
                                                <td>{this.state.groupDetails.memberTwoId}</td>
                                                <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberTwoId }}><Button><BsMessenger /> </Button></Link></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>{this.state.groupDetails.memberThreeName}</td>
                                                <td>{this.state.groupDetails.memberThreeId}</td>
                                                <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberThreeId }}><Button><BsMessenger /> </Button></Link></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>{this.state.groupDetails.memberFourName}</td>
                                                <td>{this.state.groupDetails.memberFourId}</td>
                                                <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberFourId }}><Button><BsMessenger /> </Button></Link></td>
                                            </tr>
                                        </tbody>
                                    </table></div></>
                                        <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "500", "WebkitTextStroke": "thin", "marginBottom": "5px", "fontSize": "25px" }}><span>Documents</span></div></>
                                }
                                {/* 

                                {this.state.groupDetails.groupName && this.state.updatedData &&

                                    <><div style={{ "marginLeft": "15px", "fontWeight": "400", "WebkitTextStroke": "thin" }}><p>ResearchField :{ }&nbsp;{" "}{this.state.researchField}</p><p>ResearchTopic :{ }&nbsp;{" "}{this.state.researchTopic}</p><p>Status: { }&nbsp;{" "}
                                        {this.state.status}</p></div>
                                        <Row>
                                            <Col>
                                                <label className="toggle-switch" style={{ "marginLeft": "13px" }}>
                                                    <input type="checkbox" checked={this.state.isToggled} onChange={() => this.onToggle(this.state.isToggled)} />
                                                    <span className="switch" />
                                                </label>
                                            </Col>
                                            <Col>

                                                <Button style={{ "marginBottom": "10px", "backgroundColor": "rgb(93 148 231 / 66%)", "float": "right", "marginRight": "20px" }} className="btn " variant="addDel" type="submit" onClick={this.updateStatus}>
                                                    Update
                                                </Button>


                                            </Col>
                                        </Row>
                                    </>


                                } */}



                            </div>
                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "460px", "position": "absolute", "height": "250px", "float": "left", "minHeight": "35vh", "borderRadius": "10px" }}>

                                <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px" }}><span >PENDING GROUPS</span></div>

                                {this.state.topics.length == 0 && <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px", "marginLeft": "100px", "marginTop": "30px", "fontSize": "50", "color": "#b9cad6" }}><span >NO DATA</span></div>}

                                <ScrollableFeed>

                                    {

                                        this.state.topics &&

                                        this.state.topics.map((obj, index) =>


                                            <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "20px", "fontWeight": "700", "WebkitTextStroke": "thin" }} onClick={() => this.pendingMsgHandler(obj.groupName, obj.researchTopic, obj.researchField, obj.status, obj._id)}>
                                                {index + 1}{". "}Group Name:{" "}&nbsp;{"  "}{obj.groupName} <br />{" "}<span style={{ "marginLeft": "18px" }}>researchTopic:{ }&nbsp;{" "}{obj.researchTopic}</span> </p>



                                        )

                                    }



                                </ScrollableFeed>

                            </div>

                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "460px", "position": "absolute", "height": "370px", "float": "left", "minHeight": "35vh", "borderRadius": "10px", "marginTop": "270px" }}>
                                <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "0px", "marginTop": "10px" }}><span style={{ "marginTop": "10px" }}>ASSIGNED GROUPS</span></div>
                                {this.state.approvedTopics.length == 0 && <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px", "marginLeft": "100px", "marginTop": "90px", "fontSize": "50", "color": "#b9cad6" }}><span >NO DATA</span></div>}
                                <ScrollableFeed>

                                    {

                                        this.state.approvedTopics &&

                                        this.state.approvedTopics.map((obj, index) =>


                                            <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "20px", "fontWeight": "700", "WebkitTextStroke": "thin" }} onClick={() => this.pendingMsgHandler(obj.groupName, obj.researchTopic, obj.researchField, obj.status, obj._id)}>
                                                {index + 1}{". "}Group Name:{" "}&nbsp;{"  "}{obj.groupName} <br />{" "}<span style={{ "marginLeft": "18px" }}>researchTopic:{ }&nbsp;{" "}{obj.researchTopic}</span> </p>



                                        )

                                    }



                                </ScrollableFeed>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default studentsGroups;