const imageBlock = (setting) => {
  if (!setting) {
    return {
      error: 'Setting is empty.'
    }
  }

  if (!setting.images) {
    return {
      error: 'Images are not fully loaded yet. Try again.'
    }
  }

  const newTrials = []
  const images = setting.images

  for (let i = 0; i < images.length; i++) {
    newTrials.push({
      type: 'IMAGE',
      setting: { image: images[i] }
    })
  }

  return {
    block: { setting:{} },
    trials: newTrials
  }
}

export default imageBlock
