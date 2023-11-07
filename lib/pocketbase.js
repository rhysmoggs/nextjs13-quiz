import PocketBase from 'pocketbase'

async function getScores() {
  const pb = new PocketBase(process.env.POCKETBASE_URL)
  const records = await pb.collection('quiz').getFullList({
    sort: '-created',
    requestKey: null,
  })

  return records
}

export default getScores
