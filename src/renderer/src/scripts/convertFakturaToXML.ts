import { XMLBuilder } from 'fast-xml-parser'

const options = {
  ignoreAttributes: false
}
/*
  CURRENT ROOT ATTRS

  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/"
*/

const convertFakturaToXML = (obj: object, preview?: boolean): string => {
  const builder = new XMLBuilder(options)

  if (preview) {
    // return object with local attrs
    const heading = window.api.getPreviewXMLHeading()
    const output = builder.build(obj)

    return `${heading}${output}</Faktura>`.trim()
  }
  const customData = {
    Faktura: {
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      '@_xmlns': 'http://crd.gov.pl/wzor/2023/06/29/12648/',
      ...obj
    }
  }

  const output = builder.build(customData)

  return output
}

export default convertFakturaToXML
