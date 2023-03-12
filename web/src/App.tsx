import { useState } from 'react'
import { useGetTaskQuery } from './pages/task/graphql/__generated__/list.gql.generated'

function App(): JSX.Element {

  const {data, loading} = useGetTaskQuery({})

  if(loading) return <p>Loading...</p>

  return (
    <>
    {data?.tasks?.map(list => {
      return (
        <div key={list.id}>
          <p>
            Id: {list.id}
          </p>
          <p>
            Description: {list.description}
          </p>
          <p>
            Completed: {list.isCompleted.toString()}
          </p>
          <p>
            Created: {list.createdAt}
          </p>
          <p>
            Updated: {list.updatedAt}
          </p>
        </div>
      )
    })}
    </>
  ) 
}

export default App
