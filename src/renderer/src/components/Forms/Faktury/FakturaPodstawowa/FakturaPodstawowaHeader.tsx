import HomeButton from '@renderer/components/Buttons/HomeButton'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import { Outlet } from 'react-router-dom'

const FakturaPodstawowaHeader = (): JSX.Element => {
  const context = useCreateFakturaContext()
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-2 pl-5">
        <h1 className="text-5xl font-semibold">Faktura Podstawowa</h1>
        <div>
          <HomeButton
            variant="outline"
            isAlert={context?.isCreatingInvoice}
            dialogDescription="Wszystkie zmiany na fakturze zostaną utracone."
            onClick={(): void => {
              if (context?.isCreatingInvoice) {
                context.setIsCreatingInvoice(false)
              }
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default FakturaPodstawowaHeader
