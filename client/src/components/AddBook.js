import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'; // to enable multiple                                               //query bind to the component
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';



class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    displayAuthors(){
        let data = this.props.getAuthorsQuery;//attaching props to the
        if(data.loading){                      // specific query 
            return (<option disabled>Loading authors..</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{ author.name }</option>);
            })
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({ // to add props to the proper query
            variables: { // passing state to the query variables
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{query: getBooksQuery}]// to re-render page
        })                                      // with new book in list
    }
    render() {
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=> this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre: </label>
                    <input type="text" onChange={(e)=> this.setState({genre:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Author: </label>
                    <select onChange={(e)=> this.setState({authorId:e.target.value})}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

export default compose( //to bind multiple queries to one component
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),//name value can
    graphql(addBookMutation, {name:"addBookMutation"}) // be anything
)(AddBook);