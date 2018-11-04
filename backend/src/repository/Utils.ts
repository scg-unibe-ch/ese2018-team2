export default class Utils {
  static enforceAuth(session: Express.Session) {
    if (!session.user) {
      throw new Error("Please log in");
    }
  }
}
