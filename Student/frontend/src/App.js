import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './components/pages/Home/Home';
import Group from './components/pages/Group/Group';
import MainLogin from './components/mainLogin/mainLogin';
import Login from './components/login/login';

import Profile from "./components/Profile/profile";
import UpdateStudent from "./components/UpdateStudent/updateStudent";
import ViewGroup from "./components/ViewGroup/viewGroup";
import viewTopicDetails from "./components/viewRegisteredTopicDetails/viewTopicDetails";
import viewUploadPage from "./components/UploadFile/viewPage";
import UploadFile from "./components/UploadFile/upload";

import staffRegister from './components/Staff/staffRegister'
import staffHome from "./components/Staff/StaffHome/staffHome";


import staffMsg from "./components/Staff/staffMsg";
import studentmsg from "./components/Staff/studentmsg";
import ResearchTopic from "./components/ResearchTopic/researchTopic";

import UploadSubmittion from "./components/UploadFile/editUpload";


import staffProfile from "./components/Staff/profile/staffProfile";
import staffPanel from "./components/Staff/staffPanelMember/staffPanel";
import studentsGroups from "./components/Staff/studentGroups/studentsGroups";
import staffDashboard from "./components/Staff/staffDashboard/staffDashboard";
import Evaluation from "./components/Staff/Evaluation/Evaluation";

import Template from "./components/Template/template";




function App() {

  return (
    <div>
      <Router>
        <Switch>

          {/* Student */}
          <Route exact path='/home' component={Home} />
          <Route exact path='/group' component={Group} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/mainLogin' component={MainLogin} />
          <Route exact path='/topic' component={ResearchTopic} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/viewGroups' component={ViewGroup} />
          <Route exact path='/viewRegDetails' component={viewTopicDetails} />
          <Route exact path='/editSubmission/:id' component={UploadSubmittion} />
          <Route exact path='/update' component={UpdateStudent} />
          <Route exact path='/studentmsg' component={studentmsg} />


          {/* Template */}
          <Route exact path='/template' component={Template} />




          {/* Staff */}
          <Route exact path='/Staffdashboard' component={staffHome} />
          <Route exact path='/loginRegister' component={staffRegister} />
          <Route exact path='/staffMsg' component={staffMsg} />
          <Route exact path='/staffProfile' component={staffProfile} />
          <Route exact path='/staffPanel' component={staffPanel} />
          <Route exact path='/studentGroup' component={studentsGroups} />
          <Route exact path='/studentMsg' component={studentmsg} />
          <Route exact path='/staffDashBoard' component={staffDashboard} />
          <Route exact path='/Evaluation' component={Evaluation} />











          {/*submissions */}


          <Route exact path='/submissions' component={viewUploadPage} />
          <Route exact path='/uploadfile' component={UploadFile} />


          <Redirect to='/mainLogin' component={MainLogin} />
        </Switch>

      </Router>

    </div>
  )
}

export default App;
