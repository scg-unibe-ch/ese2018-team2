export function enforceAuth(session: Express.Session) {
  if (!session.user) {
    throw new Error("Please log in");
  }
}

export default enforceAuth;
