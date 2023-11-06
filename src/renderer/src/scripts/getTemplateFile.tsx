const getTemplateFile = (): Promise<ITemplate> => {
  return new Promise((resolve, reject) => {
    window.api
      .readFile('template.json', true)
      .then((data) => {
        const parsedTemplate = JSON.parse(data)
        resolve(parsedTemplate)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default getTemplateFile
