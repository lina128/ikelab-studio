import html2canvas from 'html2canvas'

export const takeScreenshotAPI = (id, currentId) => {
  if (id !== currentId) {
    return Promise.reject()
  } else {
    let mapNode = document.getElementById('ikelab_trialPane')
    if (mapNode) {
      return html2canvas(mapNode, { useCORS: true })
        .then(function (canvas) {
          return canvas
        },
        function (error) {
          console.log(error)
          return Promise.reject({ error: error })
        }
      )
      .catch(error => { error })
    } else {
      return Promise.reject()
    }
  }
}
