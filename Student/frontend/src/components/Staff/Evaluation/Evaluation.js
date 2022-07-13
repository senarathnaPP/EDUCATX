import React, { createRef, Component } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/header';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed';

import { BsPersonCircle, BsMessenger, BsFillSave2Fill, BsFilePdfFill, BsPlusLg } from "react-icons/bs";
import { Link } from 'react-router-dom';

class Evaluation extends Component {


    constructor(props) {

        super(props)

        this.state = {

            markingSchemas: [],
            approvedTopics: [],
            groupDetails: '',
            submissions: [],
            selectedmarking: '',
            selectedname: '',
            row1: 0,
            row2: 0,
            row3: 0,
            row4: 0,
            row5: 0,
            row6: 0,
            row7: 0,
            row8: 0,
            total: 0,
            markingDiscription:'',
            groupname:'',
            logUser:'',
            submissionsLink:[]


        }

        this.getAllMarkingSchemas = this.getAllMarkingSchemas.bind(this);
        this.handleSearchArea = this.handleSearchArea.bind(this);
        this.pendingMsgHandler = this.pendingMsgHandler.bind(this);
        this.selectMarking = this.selectMarking.bind(this);
        this.selectedName = this.selectedName.bind(this);
        this.creditschange = this.creditschange.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.addEvaluation = this.addEvaluation.bind(this);

    }



    addEvaluation() {

        this.setState({

            row1: 0,
            row2: 0,
            row3: 0,
            row4: 0,
            row5: 0,
            row6: 0,
            row7: 0,
            row8: 0,
            total: 0

        })

        const url = 'http://localhost:8000/api/eveluation/post'

         let num = this.state.total
         let tot = num.toString();
        const data = {

            "markingschemaTit": this.state.selectedmarking,
            "markingschemaDis": this.state.markingDiscription,
            "groupName": this.state.groupname,
            "memeberName":this.state.selectedname,
            "totalMarks":tot,
            "submission": this.state.submissions,
            "supervisor": this.state.logUser


        }

        axios.post(url,data).then((res)=>{

        console.log("res me",res)

        })


    }




    creditschange = (event) => {
        console.log('..............', event.target.value)
        console.log('.............. name ', event.target.name)


        const num = parseInt(event.target.value)
        switch (event.target.name) {
            case "1":

                this.setState({
                    row1: num,


                })
                break;

            case "2":



                this.setState({
                    row2: num,

                })
                break;
            case "3":

                this.setState({
                    row3: num,

                })
                break;
            case "4":

                this.setState({
                    row4: num,

                })
                break;
            case "5":

                this.setState({
                    row5: num,

                })
                break;
            case "6":

                this.setState({
                    row6: num,

                })
                break;
            case "7":

                this.setState({
                    row7: num,

                })
                break;
            case "8":

                this.setState({
                    row8: num,

                }, () => {

                })
                break;

        }


        // let { row1,row2,row3,row4,row5,row6,row7,row8 } = this.state

        // setTimeout(()=>{

        //     this.setState({
        //         total:row1+row2+row3+row4+row6+row7+row8
        //     })
        // },2000)






    }



    getTotal() {

        let { row1, row2, row3, row4, row5, row6, row7, row8 } = this.state



        this.setState({
            total: row1 + row2 + row3 + row4+ row5+ row6 + row7 + row8
        }, () => {
            console.log("zxzx 8", this.state.total)
        })


    }


    selectMarking(obj,title) {

        console.log("mnmnmnmnm",obj+title)

        this.setState({
            selectedmarking: obj,
            markingDiscription:title
        })



    }


    selectedName(obj) {
        this.setState({
            selectedname: obj
        })


    }


    filterData(reserch, searchKey) {
        const result = reserch.filter(
            (item) =>
                item.title.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
                item.title.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
                item.category.toLowerCase().includes(searchKey) ||
                item.category.toUpperCase().includes(searchKey)


        );

        this.setState({ markingSchemas: result });
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:8000/api/markings/get").then((res) => {

            if (res.data) {
                this.filterData(res.data.existingMarkings, searchKey);
            }
        });
    };


    getAllMarkingSchemas() {

        const url = 'http://localhost:8000/api/markings/get'

        axios.get(url).then((res) => {

            if (res.data.existingMarkings.length != 0) {

                this.setState({

                    markingSchemas: res.data.existingMarkings

                }, () => {
                    console.log("res", this.state.markingSchemas)

                })


            } else {

                alert("No Marking Schems")
            }



        })


    }

    pendingMsgHandler(id, name, researchField, status, mongoid) {

        console.log("ststzzzzz", id)

        this.setState({
       
            groupname : id})

    
        const url1 = 'http://localhost:8000/api/student/submissions/get/gropupname'
        const groupName = {
            "groupname": id
        }

        axios.post(url1, groupName).then((res) => {


            this.setState({
                submissions: res.data,
                submissionsLink: res.data.avatar
            }, () => {

                console.log("ststzzzzz", this.state.submissions)


            })
        })

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


    componentDidMount() {

        const logUser = sessionStorage.getItem('LogUserId')
        const LogUserName = sessionStorage.getItem('LogUserName')

        this.setState({
            logUser:LogUserName
        })

        this.getAllMarkingSchemas()

        this.getAssignedreserchtopic(LogUserName)


    }




    render() {
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />
                </div>
                <div className='app-body'>
                    <div className='body-wrapper' style={{ "backgroundColor": "#f8f9ssfa", "overflow": "hidden" }}>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>

                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "885px", "position": "absolute", "marginLeft": "395px", "height": "350px", "float": "right", "minHeight": "60vh", "borderRadius": "10px", "marginTop": "-10px" }}>
                                <ScrollableFeed>

                                    <div className='containerA' style={{ "backgroundColor": "rgb(47 64 80 / 15%)", "padding": "5px", "fontWeight": "500", "WebkitTextStroke": "thin", "marginBottom": "5px", "fontSize": "20px" }}>
                                        <span >Marking Schems</span>


                                        <div>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                name="searchQuery"
                                                onChange={this.handleSearchArea}
                                                style={{
                                                    width: "200px",

                                                    marginRight: "18px",
                                                    marginTop: "-30",
                                                    height: "30px",

                                                    borderColor: "rgba(6, 21, 117,0.5)",
                                                    float: "right"
                                                }}
                                            ></input>
                                        </div>


                                        {/* card for Marking Schems */}

                                        <div>

                                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "870px", "marginTop": "15px", "position": "absolute", "height": "390px", "float": "right", "minHeight": "25vh", "borderRadius": "10px" }}>

                                                <ScrollableFeed>

                                                    {this.state.markingSchemas &&


                                                        this.state.markingSchemas.map(obj =>



                                                            <div className='container' style={{ "backgroundColor": "white", "minWidth": "870px", "marginTop": "15px", "height": "390px", "float": "right", "minHeight": "25vh", "borderRadius": "10px" }} onClick={() => this.selectMarking(obj.title,obj.description)}>
                                                                <ScrollableFeed>
                                                                    <p style={{ "fontSize": "35px" }}>{obj.category}.</p>

                                                                    <p style={{ "fontSize": "25px", "marginTop": "-15px" }}>{obj.title}</p>

                                                                    <p style={{ "fontSize": "15px", "fontWeight": "400", "whiteSpace": "pre-line" }}>{obj.description}</p>
                                                                </ScrollableFeed>




                                                            </div>




                                                        )


                                                    }



                                                </ScrollableFeed>


                                                {/* <div className='containerA' style={{ "backgroundColor": "rgb(21a0 220 228)", "padding": "10px", "fontWeight": "500", "WebkitTextStroke": "thin", "marginBottom": "5px", "fontSize": "40px" }}><span ></span></div> */}






                                            </div>



                                        </div>





                                    </div>



                                </ScrollableFeed>


                            </div>


                            {/* {marking document subbmission UI} */}


                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "885px", "marginTop": "445px", "position": "absolute", "marginLeft": "395px", "height": "160px", "float": "right", "minHeight": "26vh", "borderRadius": "10px" }}>


                                {/* <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "500", "WebkitTextStroke": "thin", "marginBottom": "5px", "fontSize": "40px" }}><span >"nnnnnnnnn"</span></div> */}

                                <div style={{ "height": "190px" }}>
                                    <ScrollableFeed>


                                        <table class="table">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">MarkingScheme</th>
                                                    <th scope="col">Poor </th>
                                                    <th scope="col">Average </th>
                                                    <th scope="col">Good</th>
                                                    <th scope="col">Excellent</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-3 </td>
                                                    <td>4-5 </td>
                                                    <td>6-8</td>
                                                    <td>9-10 </td>
                                                    <td ><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="1" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-8 </td>
                                                    <td>8-14 </td>
                                                    <td>15-19 </td>
                                                    <td>20-25  </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="2" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-8 </td>
                                                    <td>8-14 </td>
                                                    <td>15-19 </td>
                                                    <td>20-25  </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="3" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-3 </td>
                                                    <td>4-5 </td>
                                                    <td>6-8</td>
                                                    <td>9-10 </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="4" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-3 </td>
                                                    <td>4-5 </td>
                                                    <td>6-8</td>
                                                    <td>9-10 </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="5" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">6</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-3 </td>
                                                    <td>4-5 </td>
                                                    <td>6-8</td>
                                                    <td>9-10 </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="6" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">7</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-1 </td>
                                                    <td>2-3 </td>
                                                    <td>4</td>
                                                    <td>5 </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="7" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">8</th>
                                                    <td>{this.state.selectedmarking} </td>
                                                    <td>0-1 </td>
                                                    <td>2-3 </td>
                                                    <td>4</td>
                                                    <td>5 </td>
                                                    <td><input style={{ "width": "80px" }} type="text" placeholder="Tot" onChange={this.creditschange} name="8" /><Button onClick={this.getTotal} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginBottom": "7px", "marginLeft": "5px" }}><BsPlusLg /></Button></td>
                                                    <td>{this.state.selectedname}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total</th>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td></td>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td>{this.state.total}</td>
                                                    <td><Button onClick={this.addEvaluation} style={{ "fontSize": "x-small", "backgroundColor": "#0d6efd", "marginLeft": "55px" }}>ADD</Button></td>

                                                </tr>
                                            </tbody>
                                        </table>





                                    </ScrollableFeed>

                                </div>



                            </div>





                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "400px", "position": "absolute", "height": "250px", "float": "left", "minHeight": "37vh", "borderRadius": "10px", "marginLeft": "-10px", "marginTop": "-10px" }}>

                                <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px" }}><span >ASSIGNED GROUPS</span></div>

                                {/* {this.state.topics.length == 0 && <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px", "marginLeft": "100px", "marginTop": "30px", "fontSize": "50", "color": "#b9cad6" }}><span >NO DATA</span></div>} */}

                                <ScrollableFeed>

                                    {

                                        this.state.approvedTopics &&

                                        this.state.approvedTopics.map((obj, index) =>


                                            <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "20px", "fontWeight": "400", "WebkitTextStroke": "thin" }} onClick={() => this.pendingMsgHandler(obj.groupName, obj.researchTopic, obj.researchField, obj.status, obj._id)}>
                                                {index + 1}{". "}Group Name:{" "}&nbsp;{"  "}{obj.groupName} <br />{" "}<span style={{ "marginLeft": "18px" }}>researchTopic:{ }&nbsp;{" "}{obj.researchTopic}</span> </p>



                                        )

                                    }



                                </ScrollableFeed>

                            </div>

                            <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "400px", "position": "absolute", "height": "370px", "float": "left", "minHeight": "35vh", "borderRadius": "10px", "marginTop": "270px", "marginLeft": "-10px" }}>
                                <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "0px", "marginTop": "10px" }}><span style={{ "marginTop": "10px" }}>GROUPS DETAILS</span></div>
                                {/* {this.state.approvedTopics.length == 0 && <div className='containerA' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "5px", "marginLeft": "100px", "marginTop": "90px", "fontSize": "50", "color": "#b9cad6" }}><span >NO DATA</span></div>} */}
                                <div style={{ "height": "320px" }}>
                                    <ScrollableFeed>
                                        <div style={{ "marginBottom": "20px" }}>

                                            <div style={{ "marginRight": "15px", "marginLeft": "15px", "marginTop": "0px" }}><table class="table table-dark">
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
                                                        <td onClick={() => this.selectedName(this.state.groupDetails.groupLeaderName)}>{this.state.groupDetails.groupLeaderName}</td>
                                                        <td>{this.state.groupDetails.groupLeaderId}</td>
                                                        <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.groupLeaderId }}><Button><BsMessenger /> </Button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>

                                                        <td onClick={() => this.selectedName(this.state.groupDetails.memberTwoName)}>{this.state.groupDetails.memberTwoName}</td>
                                                        <td>{this.state.groupDetails.memberTwoId}</td>
                                                        <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberTwoId }}><Button><BsMessenger /> </Button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td onClick={() => this.selectedName(this.state.groupDetails.memberThreeName)}>{this.state.groupDetails.memberThreeName}</td>
                                                        <td>{this.state.groupDetails.memberThreeId}</td>
                                                        <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberThreeId }}><Button><BsMessenger /> </Button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td onClick={() => this.selectedName(this.state.groupDetails.memberFourName)}>{this.state.groupDetails.memberFourName}</td>
                                                        <td>{this.state.groupDetails.memberFourId}</td>
                                                        <td><Link to={{ pathname: "/staffMsg", state: this.state.groupDetails.memberFourId }}><Button><BsMessenger /> </Button></Link></td>
                                                    </tr>
                                                </tbody>
                                            </table></div>







                                            {/* subbmission*/}




                                            <div style={{ "marginRight": "15px", "marginLeft": "15px", "marginTop": "0px" }}><table class="table table-dark">
                                                <thead>
                                                    <tr>

                                                        <th scope="col">Name</th>
                                                        <th scope="col">Submissions</th>
                                                        <th scope="col">Download</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.state.submissions &&

                                                        this.state.submissions.map((obj, index) => (


                                                            <tr>

                                                                <td>{index + 1}</td>
                                                                <td>{index + 1}{" "}subbmission</td>
                                                                <td><a style={{ "color": "white", "marginLeft": "35px" }} href={obj.avatar} target="_blank" download  ><BsFilePdfFill /> </a></td>

                                                            </tr>)

                                                        )


                                                    }


                                                </tbody>
                                            </table></div>


                                        </div>




                                    </ScrollableFeed>


                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Evaluation;