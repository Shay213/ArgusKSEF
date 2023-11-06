import AlertButton from './Buttons/AlertButton'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { FileEdit } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Nav = (): JSX.Element => {
  const location = useLocation()
  const currentUrl = location.pathname
  const isEditPage = currentUrl.startsWith('/edit')
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between p-2 shadow-sm">
      <div>
        <p>
          <span className="text-sm font-semibold">Wersja schematu</span>: FA 2
        </p>
      </div>
      <div className="flex items-center p-2 gap-4">
        <ThemeToggle />
        {isEditPage ? (
          <AlertButton
            dialogTitle="Jesteś absolutnie pewien?"
            dialogDescription="Wszystkie niezapisane zmiany zostaną utracone"
            handleContinue={(): void => {
              navigate('/template')
            }}
          >
            <FileEdit className="w-4 h-4 mr-2" />
            Templatka
          </AlertButton>
        ) : (
          <Link to={currentUrl !== '/template' ? '/template' : '/'}>
            <Button
              variant="outline"
              onClick={(): void => {
                if (currentUrl !== '/template') {
                  navigate('/template')
                } else {
                  navigate('/')
                  window.location.reload()
                }
              }}
            >
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
