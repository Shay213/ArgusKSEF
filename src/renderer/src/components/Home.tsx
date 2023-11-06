import DataTableXLSX from './DataTableXLSX'
import DataTableXML from './DataTableXML'

const Home = (): JSX.Element => {
  return (
    <div className="h-full flex flex-col gap-10">
      <div className="grid grid-cols-1 tableLG:grid-cols-2 gap-5 p-10">
        <DataTableXLSX />
        <DataTableXML />
      </div>
    </div>
  )
}

export default Home
