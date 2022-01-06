import React, { Component } from "react";


export default class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: "",
            tagsSearchResults: [],
            creatorsSearchResults: [],
        }
        this.delayed_search_request = null;
        this.search_text_changed = this.search_text_changed.bind(this);
        this.on_focus_lost = this.on_focus_lost.bind(this);
        this.on_focus_gained = this.on_focus_gained.bind(this);
    }


    search_text_changed(e){
        //cancel any previous search requests
        clearTimeout(this.delayed_search_request)

        const new_search_text = e.target.value;
        //don't send api request for empty string
        if(new_search_text === ""){
            this.setState({
                searchText: "",
                tagsSearchResults: [],
                creatorsSearchResults: [],
            })
            //hide the spinner
            document.getElementById('search_loading' + this.props.sb_id).hidden = true
            
            return
        }

        //show the spinner
        document.getElementById('search_loading' + this.props.sb_id).hidden = false

        //create the delayed request
        this.delayed_search_request = setTimeout(() => {
            fetch('/api/search?ctname=' + new_search_text).then(
                (response) => response.json()
            ).then(
                (data) => {
                    //hide the spinner
                    document.getElementById('search_loading' + this.props.sb_id).hidden = true
                    //update the search results
                    this.setState({
                        searchText: new_search_text,
                        tagsSearchResults: data.tags_data,
                        creatorsSearchResults: data.creators_data,
                    })
                }
            )
        }, 1000);


    }

    on_focus_lost(e){
        //console.log(e.currentTarget)
        //console.log(e.relatedTarget)
        if(!e.currentTarget.contains(e.relatedTarget)){
            document.getElementById('autocomplete' + this.props.sb_id).hidden = true
        }
    }

    on_focus_gained(){
        document.getElementById('autocomplete' + this.props.sb_id).hidden = false
    }

    get_added_placeholder_text(){
        if(this.props.added_ph_text === undefined){
            return "Search..."
        }
        else{
            return "Search " + this.props.added_ph_text + "..."
        }
    }


    render(){
        let tags_search_results_list = [];
        if(this.props.hide_tags_results === undefined){
            this.state.tagsSearchResults.forEach( (result) => {
                tags_search_results_list.push(
                    <SearchResultItem res_data={result} sresult_on_click={this.props.sresult_on_click} 
                    related_autocomplete_id={"autocomplete" + this.props.sb_id} 
                    allow_redir={this.props.allow_redir} />
                );
            });
        }

        let creators_search_results_list = [];
        if(this.props.hide_creators_results === undefined){
            this.state.creatorsSearchResults.forEach( (result) => {
                creators_search_results_list.push(
                    <SearchResultItem res_data={result} sresult_on_click={this.props.sresult_on_click} 
                    related_autocomplete_id={"autocomplete" + this.props.sb_id} 
                    allow_redir={this.props.allow_redir} />
                );
            });
        }

        //show or hide the creators/tags section headings
        let hide_tags_title_divider = tags_search_results_list.length < 1;
        let hide_creators_title_divider = creators_search_results_list.length < 1;
        //show or hide the "no results" text
        let hide_no_results = !(hide_tags_title_divider && hide_creators_title_divider);

        //define the placeholder text
        let apht = this.get_added_placeholder_text();

        return(
            <div id="searchbox_outer" onBlur={(e) => this.on_focus_lost(e)}>

                <input type="text" placeholder={apht} onChange={this.search_text_changed} 
                onFocus={this.on_focus_gained}></input>
                <div id={"autocomplete" + this.props.sb_id} class="border rounded" hidden
                style={{position:"absolute", zIndex:1000, backgroundColor:"white"}}>
                    <div class="d-flex justify-content-center border-bottom">
                        <div id={"search_loading" + this.props.sb_id} class="spinner-border" role="status" hidden>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div class="list-group list-group-flush overflow-auto" style={{maxHeight:200}}>
                        <div id="empty_results" class="list-group-item disabled" 
                        hidden={hide_no_results}>no results...</div>
                        <div id="tags_results_header" class="list-group-item list-group-item-dark py-0" 
                        hidden={hide_creators_title_divider}>Creators</div>
                        {creators_search_results_list}
                        <div id="tags_results_header" class="list-group-item list-group-item-dark py-0" 
                        hidden={hide_tags_title_divider}>Tags</div>
                        {tags_search_results_list}
                    </div>
                </div>

            </div>
        );
    }
}



class SearchResultItem extends Component{
    get_id(){
        let my_id = "";
        
        let keys = Object.keys(this.props.res_data);
        let my_id_key = keys.find(key => key.indexOf("_id") !== -1);
        my_id = this.props.res_data[my_id_key] + my_id_key;
        
        return my_id
    }

    send_result_data = (event) => {
        if(this.props.sresult_on_click !== undefined){
            this.props.sresult_on_click(event, this.props.res_data, this.props.related_autocomplete_id)
        }
    }

    get_redir_url(){
        let my_url = "#noscroll";

        if(this.props.allow_redir === true){
            let keys = Object.keys(this.props.res_data);
            let my_id_key = keys.find(key => key.indexOf("_id") !== -1);
            //take the part before "_id"
            let my_type = my_id_key.split("_id")[0];
            //get the id
            let my_id = this.props.res_data[my_id_key];
            if(my_type !== undefined){
                my_url = "/interactive/" + my_type + "/" + my_id;
            }
        }

        return my_url;
    }

    render(){
        const my_id = this.get_id();
        const my_url = this.get_redir_url();
        return(
            <a href={my_url} class="list-group-item list-group-item-action" id={my_id}
            onClick={this.send_result_data}>{this.props.res_data.name}</a>
        );
    }
}