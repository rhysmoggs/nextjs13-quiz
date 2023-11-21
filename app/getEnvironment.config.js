export const getEnvironment = () => {
  console.log('dev = ', process.env.NEXT_PUBLIC_POCKETBASE_URL)
  console.log('production = ', process.env.POCKETBASE_URL)
  const devURL = process.env.NEXT_PUBLIC_POCKETBASE_URL
  const prodURL = process.env.POCKETBASE_URL
  const URL = process.env.NODE_ENV === 'development' ? devURL : prodURL
  return URL
}
const currentEnvironment = getEnvironment()

module.exports = {
  currentEnvironment: currentEnvironment,
}
