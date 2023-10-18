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
import CreateFakturaContextProvider from './context/createFakturaContext'
import TemplateFileError from './components/TemplateFileError'
import LoadTemplate from './components/Forms/Faktury/LoadTemplate'
import ProcessXLSX from './components/Forms/Faktury/ProcessXLSX'
import FakturaPodstawowaForm from './components/Forms/Faktury/FakturaPodstawowa/FakturaPodstawowaForm'
import FakturaPodstawowaHeader from './components/Forms/Faktury/FakturaPodstawowa/FakturaPodstawowaHeader'
import FakturaError from './components/Forms/Faktury/errors/FakturaError'
import FakturaSuccess from './components/Forms/Faktury/FakturaSuccess'

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
      <Route path="/faktura-podstawowa" element={<FakturaPodstawowaHeader />}>
        <Route path="step1" element={<LoadTemplate />} />
        <Route path="step2" element={<ProcessXLSX />} />
        <Route path="step3" element={<FakturaPodstawowaForm />} />
        <Route path="error" element={<FakturaError />} />
        <Route path="success" element={<FakturaSuccess />} />
      </Route>
    </Route>
  )
)

function App(): JSX.Element {
  return (
    <>
      <CreateFakturaContextProvider>
        <RouterProvider router={router} />
      </CreateFakturaContextProvider>
    </>
  )
}

export default App
