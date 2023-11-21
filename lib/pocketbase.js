import PocketBase from 'pocketbase'
import getEnvironment from '../app/getEnvironment.config.js'

// import env, check. if local run this:
// seperate from local db to hosted db:

const getDbLocale = () => {
  console.log('current environment: ', getEnvironment.currentEnvironment)
  if (
    // if hosted db local:
    getEnvironment.currentEnvironment === process.env.NEXT_PUBLIC_POCKETBASE_URL
  ) {
    // set url for db to local:
    const url = process.env.NEXT_PUBLIC_POCKETBASE_URL
    return url
  } else {
    // else, set url to be hosted db:
    const url = process.env.POCKETBASE_URL
    return url
  }
}
const pb = new PocketBase(getDbLocale())

export default pb
