import { gql } from '@apollo/client';

gql`
query GetTask{
    tasks{
      id
      description
      isCompleted
      createdAt
      updatedAt
    }
  }
`;