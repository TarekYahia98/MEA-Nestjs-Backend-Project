import { SetMetadata } from '@nestjs/common';
import { JWT_GUARD_METADATA_KEY } from '../../constants/provider-keys.constant';

export const IsPrivateAuthOrPublic = () => SetMetadata(JWT_GUARD_METADATA_KEY, true);