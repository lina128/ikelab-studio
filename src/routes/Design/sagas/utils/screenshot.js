import html2canvas from 'html2canvas'

export const changeTrialSettingAPI = (id) => {
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
