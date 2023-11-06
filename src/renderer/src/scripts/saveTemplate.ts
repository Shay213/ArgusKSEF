import { getRandomInt } from '@renderer/lib/utils'

const saveTemplate = (content: string): Promise<ITemplate> => {
  return new Promise((resolve, reject) => {
    window.api
      .saveFile('template.json', content, true)
      .then(() => window.api.readFile('template.json', true))
      .then((data) => {
        setTimeout(
          () => {
            const dataParsed = JSON.parse(data)
            resolve(dataParsed)
          },
          getRandomInt(600, 1200)
        )
      })
      .catch((error) => reject(error))
  })
}

export default saveTemplate
