import { QueryResolvers } from "../../__generated__/graphqlgen";

const availableStudyPrograms: QueryResolvers.AvailableStudyProgramsResolver = (
  _,
  args,
  { userRepository }
) => userRepository.getAvailableStudyPrograms();

export default availableStudyPrograms;
