import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, User as UserType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  uid: string;
  createdAt: Date;
  updatedAt: Date;

  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  image: string;
}

@ObjectType()
export class AuthProvider {
  uid: string;
  @Field(() => $Enums.AuthProviderType)
  type: $Enums.AuthProviderType;
}
