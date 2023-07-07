import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';


export const Roles = (...roles: string[]) => SetMetadata("roles", roles);