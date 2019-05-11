import React, { Component} from 'react';
import { graphql } from 'react-apollo';   // to bind query to component 
import { getBooksQuery } from '../queries/queries'; 

class BookList extends Component {
    displayBooks(){
        let data = this.props.data;
        if(data.loading){
            return(<div>Loading books...</div>)
        } else {
            return data.books.map(book => {
                return(
                    <li key={book.id}>{ book.name }</li>
                )
            })
        }
    }
    
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList); // Binding the query to the component. Results from query will be bound to the components props.