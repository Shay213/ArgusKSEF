const getTemplateFile = (): Promise<ITemplate> => {
  return new Promise((resolve, reject) => {
    window.api.readFile('template.json', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      const parsedTemplate = JSON.parse(data)
      resolve(parsedTemplate)
    })
  })
}

export default getTemplateFile
