import PocketBase from 'pocketbase'

async function getScores() {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const records = await pb.collection('quiz').getFullList({
    sort: '-created',
    requestKey: null,
  })

  return records
}

export default getScores
