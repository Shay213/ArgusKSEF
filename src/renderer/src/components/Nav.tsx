import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { FileEdit } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AlertButton from './Buttons/AlertButton'

const Nav = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const context = useCreateFakturaContext()
  const currentUrl = location.pathname
  return (
    <div className="flex items-center justify-between p-2">
      <div>
        <p>
          <span className="text-sm font-semibold">Wersja schematu</span>: FA 2
        </p>
      </div>
      <div className="flex items-center p-2 gap-4">
        <ThemeToggle />
        {context?.isCreatingInvoice ? (
          <AlertButton
            dialogTitle="Jesteś absolutnie pewien?"
            dialogDescription="Wszystkie zmiany na fakturze zostaną utracone."
            variant="outline"
            handleContinue={(): void => {
              context.setIsCreatingInvoice(false)
              navigate('/template')
            }}
          >
            <FileEdit className="w-4 h-4 mr-2" /> Templatka
          </AlertButton>
        ) : (
          <Link to={currentUrl !== '/template' ? '/template' : '/'}>
            <Button variant="outline">
              <FileEdit className="w-4 h-4 mr-2" />
              Templatka
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Nav
