import { Controller, Get, Patch, Body, Post, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CustomResponse } from "src/common/classes";
import { Persona } from "src/common/decorators";
import { GetPreSignedUrlQueryDto } from "src/common/dtos";
import { SupplierJwtPersona } from "src/common/interfaces";
import { SupplierProfileService } from "src/supplier/services/supplier-profile/supplier-profile.service";

@Controller('profile')
@ApiTags('supplier-profile')
export class SupplierProfileController {
  constructor(private readonly supplierProfileService: SupplierProfileService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile by the current logged in supplier' })
  @Get()
  async getProfile(@Persona() supplierJWT: SupplierJwtPersona) {
    // const supplier = await this.supplierProfileService.getProfile(supplierJWT._id);

    return new CustomResponse().success({
    //   payload: { data: supplier },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit profile by the current logged in supplier' })
  @Patch()
  async editProfile(@Persona() supplierJWT: SupplierJwtPersona, 
//   @Body() body: EditProfileDto
) {
    // const supplier = await this.supplierProfileService.editProfile(supplierJWT._id, body);

    return new CustomResponse().success({
    //   payload: { data: supplier },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload documents by the current logged in supplier' })
  @Post('document')
  async addDocuments(@Persona() supplierJWT: SupplierJwtPersona, 
//   @Body() body: AddDocumentDto
) {
    // const supplier = await this.supplierProfileService.addDocuments(supplierJWT._id, body);

    return new CustomResponse().success({
    //   payload: { data: supplier },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload profile pictrue by the current logged in supplier' })
  @Get('pre-signed-url')
  async getProfilePreSignedUrl(
    @Persona() supplierJWT: SupplierJwtPersona,
    // @Query() query: GetProfilePictureUrlQueryDto,
  ) {
    // const data = await this.supplierProfileService.getProfilePreSignedUrl(supplierJWT._id, query);

    return new CustomResponse().success({
    //   payload: { data },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get uploaded documents by the current logged in supplier' })
  @Get('document-pre-signed-url')
  async getDocumentPreSignedUrl(@Persona() supplierJWT: SupplierJwtPersona, @Query() query: GetPreSignedUrlQueryDto) {
    // const data = await this.supplierProfileService.getDocumentPreSignedUrl(supplierJWT._id, query);

    return new CustomResponse().success({
    //   payload: { data },
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'reset profile password by the current logged in supplier' })
  @Post('reset-password')
  async resetPasswordFromProfile(@Persona() supplierJWT: SupplierJwtPersona, 
//   @Body() body: ProfileResetPasswordDto
) {
    // await this.supplierProfileService.resetPasswordFromProfile(supplierJWT._id, body);

    return new CustomResponse().success({});
  }
}