import { gql } from '@apollo/client';

gql`
mutation CreateTask($data: TaskCreateInput!) {
    createTask(data: $data) {
      id
    }
  }
`;