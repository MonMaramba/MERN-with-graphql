import { gql } from 'apollo-boost'; // To parse queries because 
                                    // Graphql is not js.


const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`


const getAuthorsQuery = gql`
{
    authors {
        name
        id
    }
}
`
// query variables are used to take the state values and inject to mutation.($(query variable)name(query variable):Varible type!(must have))
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`
//to get a single book
const getBookQuery = gql`
    query($id: ID){
        book(id:$id){
            id
            name
            genre
            author{
                name
                id
                age
                books{
                    name
                    genre
                    id
                }
            }
        }
    }
`
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };