import PocketBase from 'pocketbase'
import getEnvironment from '../app/getEnvironment.config.js'

// import env, check. if local run this:
// seperate from local db to hosted db:
console.log('current environment 1: ', getEnvironment.currentEnvironment)

// const getDbLocale = () => {
//   console.log('current environment 2: ', getEnvironment.currentEnvironment)
//   console.log('current environment 3: ', process.env.NEXT_PUBLIC_POCKETBASE_URL)
//   console.log('current environment 4: ', process.env.POCKETBASE_URL)
//   if (
//     // if hosted db local:
//     getEnvironment.currentEnvironment === process.env.NEXT_PUBLIC_POCKETBASE_URL
//   ) {
//     // set url for db to local:
//     const url = process.env.NEXT_PUBLIC_POCKETBASE_URL
//     return url
//   } else {
//     // else, set url to be hosted db:
//     const url = process.env.POCKETBASE_URL
//     return url
//   }
// }

const pb = new PocketBase(getEnvironment.currentEnvironment)

export default pb
