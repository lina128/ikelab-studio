import html2canvas from 'html2canvas'

export const changeSettingAPI = (id, currentId) => {
  if (id !== currentId) {
    return Promise.resolve()
  } else {
    let mapNode = document.getElementById('ikelab_trialPane')

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
  }
}
