import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AdminPanel from './pages/AdminPanel'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark min-h-screen bg-background">
        <AdminPanel />
      </div>
    </QueryClientProvider>
  )
}

export default App