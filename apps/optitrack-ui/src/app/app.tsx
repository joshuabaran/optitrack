import { Header } from './components/header'
import { Dashboard } from './pages/dashboard'

export function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
