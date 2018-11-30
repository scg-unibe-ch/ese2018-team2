import {MutationResolvers} from "../../__generated__/graphqlgen";

const approveOrganization: MutationResolvers.ApproveOrganizationResolver = (
    _,
    args,
    ctx
) =>
    ctx.organizationRepository.approveOrganization(
        args.organizationId,
        ctx.session
    );

export default approveOrganization;
