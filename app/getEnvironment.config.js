export const getEnvironment = () => {
  const devURL = process.env.NEXT_PUBLIC_POCKETBASE_URL
  const prodURL = process.env.POCKETBASE_URL
  const URL = process.env.NODE_ENV === 'development' ? devURL : prodURL
  return URL
}
const currentEnvironment = getEnvironment()

module.exports = {
  currentEnvironment: currentEnvironment,
}
