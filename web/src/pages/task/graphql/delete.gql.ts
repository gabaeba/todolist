import { gql } from '@apollo/client';

gql`
mutation DeleteTask($where: TaskWhereUniqueInput!){
    deleteTask(where:$where){
      id
    }
  }
`;