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

export { getAuthorsQuery, getBooksQuery };