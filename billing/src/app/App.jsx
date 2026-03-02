import { Route, Routes } from 'react-router-dom'
import RoutesConfig from './routes'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <RoutesConfig />
    </>
  )
}

export default App