import { gql } from '@apollo/client';

gql`
mutation UpdateTask($where: TaskWhereUniqueInput!, $data: TaskUpdateInput!){
    updateTask(data:$data, where: $where){
      id
    }
  }
`;