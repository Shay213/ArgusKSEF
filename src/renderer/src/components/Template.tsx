import getTemplateFile from '@renderer/scripts/getTemplateFile'
import { useLoaderData } from 'react-router-dom'
import Naglowek from './Forms/Template/Naglowek'
import Podmiot1 from './Forms/Template/Podmiot1'
import Podmiot2 from './Forms/Template/Podmiot2'
import Podmiot3 from './Forms/Template/Podmiot3'
import PodmiotUpowazniony from './Forms/Template/PodmiotUpowazniony'
import Fa from './Forms/Template/Fa'
import Stopka from './Forms/Template/Stopka'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface TabsProps {
  template: ITemplate
}

const TABS = [
  {
    name: 'Naglowek',
    Element: (props: TabsProps): JSX.Element => <Naglowek {...props} />
  },
  { name: 'Podmiot1', Element: (props: TabsProps): JSX.Element => <Podmiot1 {...props} /> },
  { name: 'Podmiot2', Element: (props: TabsProps): JSX.Element => <Podmiot2 {...props} /> },
  { name: 'Podmiot3', Element: (props: TabsProps): JSX.Element => <Podmiot3 {...props} /> },
  {
    name: 'PodmiotUpowazniony',
    Element: (props: TabsProps): JSX.Element => <PodmiotUpowazniony {...props} />
  },
  { name: 'Fa', Element: (props: TabsProps): JSX.Element => <Fa {...props} /> },
  { name: 'Stopka', Element: (props: TabsProps): JSX.Element => <Stopka {...props} /> }
]

const Template = (): JSX.Element => {
  const template = useLoaderData() as ITemplate
  return (
    <div className="h-full flex justify-center items-center">
      <Tabs defaultValue={TABS[0].name} className="w-[90%] lg:w-[75%] xl:w-1/2">
        <TabsList className="flex items-center justify-between">
          {TABS.map((t) => (
            <TabsTrigger key={t.name} value={t.name}>
              {t.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map(({ name, Element }) => (
          <TabsContent value={name} key={name}>
            <Element template={template} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export const templateLoader = async (): Promise<ITemplate> => {
  const template = await getTemplateFile()
  return template
}

export default Template
