export const showMessage = (message) => {
  document.getElementById('messageBox').innerHTML = message
}

export const hideMessage = () => {
  document.getElementById('messageBox').innerHTML = ''
}
