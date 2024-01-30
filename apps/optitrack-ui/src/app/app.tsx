import { QueryClient, QueryClientProvider } from 'react-query'

import { Header } from './components/header'
import { Dashboard } from './pages/dashboard'

export function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <Header />
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}

export default App
