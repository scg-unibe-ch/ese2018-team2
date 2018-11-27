export function enforceAuth(session: Express.Session) {
  if (!session.user) {
    throw new Error("Please log in");
  }
}

export function enforceAdmin(session: Express.Session) {
  if (!session.user) {
    throw new Error("Please log in");
  }

  if (!session.user.siteAdmin) {
    throw new Error("No permisstion");
  }
}

export function isAdmin(session: Express.Session) {
  if (!session.user) {
    return false;
  }

  return session.user.admin;
}

/**
 * Returns either null or the id of a user.
 * @param session Provided session
 */
export function getUserId(session: Express.Session): string | null {
  if (!session.user) {
    return null;
  }
  return session.user.id;
}

export default enforceAuth;
