import { MemberType, PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const batchMember =
  (prisma: PrismaClient) =>
  async (memberTypeIds: readonly MemberTypeId[]): Promise<MemberType[]> => {
    const mutableMemberTypeIds = memberTypeIds.map((id) => id as MemberTypeId);

    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: mutableMemberTypeIds } },
    });

    const result: MemberType[] = memberTypeIds
      .map((id) => memberTypes.find((type) => type.id === (id as string)))
      .filter((type): type is MemberType => type !== undefined);

    return result;
  };
