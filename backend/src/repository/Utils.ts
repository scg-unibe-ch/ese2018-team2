export function enforceAuth(session: Express.Session) {
  if (!session.user) {
    throw new Error("Please log in");
  }
}

/**
 * Returns either null or the id of a user.
 * @param session Provided session
 */
export function getUserId(session: Express.Session): string | null {
  if (!session.user) {
    return null;
  }
  return session.user.id
}

export default enforceAuth;
