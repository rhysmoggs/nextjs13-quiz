import PocketBase from 'pocketbase'
import getEnvironment from '../app/getEnvironment.config.js'

const pb = new PocketBase(getEnvironment.currentEnvironment)

export default pb
