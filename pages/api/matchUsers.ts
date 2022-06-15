import type { NextApiRequest, NextApiResponse } from 'next'
import { directus } from '../../helpers/directus';

const adminUserId = 'bfbaf8f5-e9cc-438c-9f71-164f48a7f782'
const shuffleArray = (userIds: string[]): string[] => {
  return [...userIds]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessions = await directus.items("sessions").readByQuery() as { data: any[] };
  const userIds: string[] = sessions.data.map(s => s.user_id);
  const uniqueUserIds = [...new Set(userIds)]
  let userToMatch = shuffleArray(uniqueUserIds);

  const matchPlan = uniqueUserIds.map((userId) => {
    let noSelfUserToMatch = userToMatch.filter(e => e !== userId)
    const matchedUser = !noSelfUserToMatch.length ? adminUserId : noSelfUserToMatch.pop()
    userToMatch = userToMatch.filter(item => item !== matchedUser)
    return { userId, matchedUser }
  })

  matchPlan.forEach(async (match) => {
    await directus.items("users").updateOne(match.userId, {
      matchedUser: match.matchedUser,
    });
  })

  res.status(200).json(JSON.stringify(uniqueUserIds))
}
