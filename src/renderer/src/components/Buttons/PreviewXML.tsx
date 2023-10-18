import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import XMLViewer from 'react-xml-viewer'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Eye } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

const PreviewXML = (): JSX.Element => {
  const context = useCreateFakturaContext()
  const { toast } = useToast()
  const themeContext = useTheme()
  return (
    <>
      {!context?.ksefXML ? (
        <Button
          variant="ghost"
          onClick={(): void => {
            toast({
              title: 'Kod XML nie został wygenerowany',
              description:
                'Coś poszło nie tak podczas tworzenia kodu xml, lub wygenerowany kod nie jest prawidłowym kodem xml',
              variant: 'destructive'
            })
          }}
        >
          Podgląd XML <Eye className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              Podgląd XML <Eye className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Kod XML Faktury</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[500px]">
              <XMLViewer xml={context.ksefXML} theme={{
                textColor: themeContext.theme === 'light' ? '#374151' : '#f3f4f6',
                tagColor: themeContext.theme === 'light' ? '#ea580c' : '#fdba74'
              }} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default PreviewXML
