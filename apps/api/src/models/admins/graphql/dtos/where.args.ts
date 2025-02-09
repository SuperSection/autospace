import { Prisma } from '@prisma/client';
import { InputType, PartialType } from '@nestjs/graphql';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';
import { VerificationListRelationFilter } from 'src/models/verifications/graphql/dtos/where.args';

@InputType()
export class AdminWhereUniqueInput {
  uid: string;
}

@InputType()
export class AdminWhereInputStrict
  implements RestrictProperties<AdminWhereInputStrict, Prisma.AdminWhereInput>
{
  uid: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  User: UserRelationFilter;
  Varifications: VerificationListRelationFilter;

  AND: AdminWhereInput[];
  OR: AdminWhereInput[];
  NOT: AdminWhereInput[];
}

@InputType()
export class AdminWhereInput extends PartialType(AdminWhereInputStrict) {}

@InputType()
export class AdminListRelationFilter {
  every?: AdminWhereInput;
  some?: AdminWhereInput;
  none?: AdminWhereInput;
}

@InputType()
export class AdminRelationFilter {
  is?: AdminWhereInput;
  isNot?: AdminWhereInput;
}
