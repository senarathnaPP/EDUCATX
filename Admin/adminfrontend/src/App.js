import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./components/login"
import createSubmissions from './pages/createSubmissions'
import viewSubmissions from "./pages/viewSubmissions";
import editSubmissions from "./pages/editSubmissions";
import viewRoles from "./pages/viewRoles";
import createPanel from "./pages/createPannel";
import viewPanels from "./pages/viewPanels";
import createResearchTopics from "./pages/addResearchTopics";
import viewResearchTopics from "./pages/viewResearchTopics";
import editTopics from "./pages/editResearchTopics";
import editRoles from "./pages/editRoles";
import ViewMarkings from "./pages/ViewMarkings";
import CreateMarking from "./pages/Marking/CreateMarking";
import EditMarking from "./pages/EditMarking";
import editPanel from "./pages/editPanels";
import updatePanels from './pages/updatePanels'
import assignStudentGroups from "./pages/assignStudentGroups";
import assignGroups from "./pages/addGroups";
import ListRoles from "./pages/ListRoles";
import ViewSingleRole from "./pages/ViewSingleRole";
import MarkCatA from "./pages/MarkCatA";
import MarkCatB from "./pages/MarkCatB";
import MarkCatC from "./pages/MarkCatC";
import MarkCatD from "./pages/MarkCatD";
import Template from "./pages/Template";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import ViewEvaluation from "./pages/ViewEvaluation";

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/createSubmission' exact component = {createSubmissions}/>
          <Route path='/viewSubmissions' exact component = {viewSubmissions}/>
          <Route path='/edit/submissions/:id' exact component = {editSubmissions}/>

          <Route path='/viewRoles' exact component = {viewRoles}/>
          <Route path='/edit/roles/:id' exact component = {editRoles}/>
          <Route path='/createPanels' exact component = {createPanel}/>
          <Route path='/viewPanels' exact component = {viewPanels}/>
          <Route path='/edit/panels/:id' exact component = {editPanel}/>
          <Route path='/update/panel/:id' exact component={updatePanels}/>

          <Route path='/createTopics' exact component = {createResearchTopics}/>
          <Route path='/getTopics' exact component = {viewResearchTopics}/>
          <Route path='/topics/edit/:id' exact component = {editTopics}/>


          <Route path='/viewMarkings' exact component = {ViewMarkings}/>
          <Route path='/createMarking' exact component = {CreateMarking}/>
          <Route path='/edit/markings/:id' exact component = {EditMarking}/>


          <Route path='/getStudentGroups' exact component = {assignStudentGroups}/>
          <Route path='/assign/StudentGroups' exact component = {assignGroups}/>

          <Route path='/listRoles' exact component = {ListRoles}/>
          <Route path='/view/roles/:id' exact component = {ViewSingleRole}/>

          <Route path='/markingCatA' exact component = {MarkCatA}/>
          <Route path='/markingCatB' exact component = {MarkCatB}/>
          <Route path='/markingCatC' exact component = {MarkCatC}/>
          <Route path='/markingCatD' exact component = {MarkCatD}/>

          <Route path="/viewTemplates" exact component={Template} />
          <Route path="/template/add" exact component={AddTemplate} />
          <Route path="/template/edit/:id" exact component={EditTemplate} />

          <Route path='/viewEvaluation' exact component = {ViewEvaluation}/>

          <Redirect to='/login'/>
        </Switch>

      </Router>

    </div>
  )
}

export default App;
