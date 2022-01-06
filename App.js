import React, { Component } from "react";
import { render } from "react-dom";
//import LoginBox from "./LoginBox";
import NavigationBar from "./NavigationBar";
import HomePage from "./HomePage";
import PageTemplatesPage from "./PageTemplatesPage";
import CreateTemplatePage from "./CreateTemplatePage";
import VotingPage from "./VotingPage";
import SurveysPage from "./SurveysPage";
import CreateSurveyPage from "./CreateSurveyPage";
import CreatorInfoPage from "./CreatorInfoPage";
import TagInfoPage from "./TagInfoPage";
import TagsIndexPage from "./TagsIndexPage";
import CreatorsIndexPage from "./CreatorsIndexPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";


export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <NavigationBar />
                <Switch>
                    <Route exact path="/interactive" component={HomePage} />
                    <Route path="/interactive/templates/create" component={CreateTemplatePage} />
                    <Route path="/interactive/templates" component={PageTemplatesPage} />
                    <Route path="/interactive/voting" component={VotingPage} />
                    <Route path="/interactive/surveys/create" component={CreateSurveyPage} />
                    <Route path="/interactive/surveys" component={SurveysPage} />
                    <Route path="/interactive/creator/:cid" component={CreatorInfoPage} />
                    <Route path="/interactive/tag/:tid" component={TagInfoPage} />
                    <Route path="/interactive/tags" component={TagsIndexPage} />
                    <Route path="/interactive/creators" component={CreatorsIndexPage} />
                </Switch>
            </div>
        );
    }

    
}


const appDiv = document.getElementById("app");
render(
    <Router>
        <App />
    </Router>, 
    appDiv
);

