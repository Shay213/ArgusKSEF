import { getRandomInt } from '@renderer/lib/utils'

const saveTemplate = (content: string): Promise<ITemplate> => {
  return new Promise((resolve, reject) => {
    window.api.saveFile('template.json', content, (err) => {
      if (err) {
        reject(err)
        return
      }
      window.api.readFile('template.json', (err, data) => {
        if (err) {
          reject(err)
          return
        }
        setTimeout(
          () => {
            const dataParsed = JSON.parse(data)
            resolve(dataParsed)
          },
          getRandomInt(600, 1200)
        )
      })
    })
  })
}

export default saveTemplate
