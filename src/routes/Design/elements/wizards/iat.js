const iat = (setting) => {
  if (!setting) {
    return {
      error: 'Setting is empty.'
    }
  }

  if (!setting.domain1Category1 ||
      !setting.domain1Category2 ||
      !setting.domain2Category1 ||
      !setting.domain2Category2) {
    return {
      error: 'Categories are not properly filled. Please check.'
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

export default iat
