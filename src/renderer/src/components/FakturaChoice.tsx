import { FileBox, FileEdit, FilePlus2, FileStack } from 'lucide-react'
import { Link } from 'react-router-dom'

const FakturaChoice = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4 w-[90%] medium:w-[75%] large:w-[60%] max-w-5xl">
        <Link to="/faktura-podstawowa/step1">
          <div className="group p-4 border rounded-md cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg dark:shadow-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-32 h-32 relative rounded-full mx-auto group-hover:scale-105 transition-transform duration-300 flex justify-center items-center">
              <div className="absolute w-full h-full bg-opacity-60 bg-white dark:bg-gray-600 rounded-full group-hover:scale-105"></div>
              <FilePlus2
                className="w-20 h-20 text-gray-700 dark:text-gray-300 dark:group-hover:animate-slide-up-light group-hover:animate-slide-up-dark transform translate-y-1"
                strokeWidth="1px"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4 text-center group-hover:text-gray-900 dark:group-hover:text-gray-100">
              Faktura <br />
              Podstawowa
            </h1>
          </div>
        </Link>
        <Link to="/">
          <div className="cursor-not-allowed group p-4 border rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700 transform transition-transform duration-300">
            <div className="w-32 h-32 relative rounded-full mx-auto transition-transform duration-300 flex justify-center items-center">
              <div className="absolute w-full h-full bg-opacity-60 bg-white dark:bg-gray-600 rounded-full"></div>
              <FileStack
                className="w-20 h-20 text-gray-700 dark:text-gray-300 dark:group-hover:animate-slide-up-light transform translate-y-1"
                strokeWidth="1px"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4 text-center">
              Faktura <br />
              Zaliczkowa
            </h1>
          </div>
        </Link>
        <Link to="/">
          <div className="cursor-not-allowed group p-4 border rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700 transform transition-transform duration-300">
            <div className="w-32 h-32 relative rounded-full mx-auto transition-transform duration-300 flex justify-center items-center">
              <div className="absolute w-full h-full bg-opacity-60 bg-white dark:bg-gray-600 rounded-full"></div>
              <FileBox
                className="w-20 h-20 text-gray-700 dark:text-gray-300 dark:group-hover:animate-slide-up-light transform translate-y-1"
                strokeWidth="1px"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4 text-center">
              Faktura <br />
              Rozliczeniowa
            </h1>
          </div>
        </Link>
        <Link to="/">
          <div className="cursor-not-allowed group p-4 border rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700 transform transition-transform duration-300">
            <div className="w-32 h-32 relative rounded-full mx-auto transition-transform duration-300 flex justify-center items-center">
              <div className="absolute w-full h-full bg-opacity-60 bg-white dark:bg-gray-600 rounded-full"></div>
              <FileEdit
                className="w-20 h-20 text-gray-700 dark:text-gray-300 dark:group-hover:animate-slide-up-light transform translate-y-1"
                strokeWidth="1px"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4 text-center">
              Faktura <br />
              Korygujaca
            </h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FakturaChoice
