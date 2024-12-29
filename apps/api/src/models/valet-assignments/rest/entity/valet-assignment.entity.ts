import { ValetAssignment } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ValetAssignmentEntity
  implements RestrictProperties<ValetAssignmentEntity, ValetAssignment>
{
  bookingId: number;
  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  pickupLat: number;
  @IsOptional()
  pickupLng: number;
  @IsOptional()
  returnLat: number;
  @IsOptional()
  returnLng: number;
  @IsOptional()
  pickupValetId: string;
  @IsOptional()
  returnValetId: string;
}
