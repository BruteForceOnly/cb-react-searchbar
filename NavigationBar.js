import React, { Component } from "react";
import render from "react-dom";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";


export default class NavigationBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav class="navbar sticky-top navbar-expand-md navbar-light bg-light">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/interactive">
                        <img src="/static/images/testpfp.png" alt="" width="30" height="30" class="d-inline-block align-text-top"></img> ConsensusBureau
                    </Link>
                    {/*<a class="navbar-brand" href="/interactive">
                        <img src="/static/images/testpfp.png" alt="" width="30" height="30" class="d-inline-block align-text-top"></img> ConsensusBureau
                    </a>*/}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav mx-auto">
                            <Link className="nav-link" to="/interactive">Home</Link>
                            <Link className="nav-link disabled" to="#">Account</Link>
                            <Link className="nav-link" to="/interactive/creators">Creators</Link>
                            <Link className="nav-link" to="/interactive/tags">Tags</Link>
                            {/*<a class="nav-link" href="/interactive/">Home</a>
                            <a class="nav-link disabled" href="#">Account</a>
                            <a class="nav-link" href="/interactive/creators">Creators</a>
                            <a class="nav-link" href="/interactive/tags">Tags</a>*/}
                        </div>
                        <form class="d-flex">
                            <SearchBox sb_id="_main" allow_redir={true} added_ph_text="creators, tags" />
                        </form>
                    </div>
                </div>
            </nav>
        );
    }


}