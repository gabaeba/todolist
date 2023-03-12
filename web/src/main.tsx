import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URI,
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
  </React.StrictMode>,
)
