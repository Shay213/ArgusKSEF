import Nav from '@renderer/components/Nav'
import Template, { templateLoader } from '@renderer/components/Template'
import {
  Outlet,
  RouterProvider,
  createRoutesFromElements,
  createHashRouter,
  Route
} from 'react-router-dom'
import Home from '@renderer/components/Home'
import XLSXBindingsProvider from './context/XLSXBindingsProvider'
import TemplateFileError from './components/TemplateFileError'
import FakturaPodstawowaForm from './components/Forms/Faktury/FakturaPodstawowa/FakturaPodstawowaForm'

const HeaderLayout = (): JSX.Element => (
  <div className="h-full w-full flex flex-col">
    <header>
      <Nav />
    </header>
    <div className="flex-1">
      <Outlet />
    </div>
  </div>
)

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<HeaderLayout />}>
      <Route index element={<Home />} />
      <Route
        path="template"
        element={<Template />}
        loader={templateLoader}
        errorElement={<TemplateFileError />}
      />
      <Route path="edit/:filename" element={<FakturaPodstawowaForm />} />
    </Route>
  )
)

function App(): JSX.Element {
  return (
    <>
      <XLSXBindingsProvider>
        <RouterProvider router={router} />
      </XLSXBindingsProvider>
    </>
  )
}

export default App
