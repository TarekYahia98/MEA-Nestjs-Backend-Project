import { Injectable, Inject } from "@nestjs/common";
import { ModelNames } from "src/common/constants";
import { AppConfig } from "src/common/services";
import { ISupplierModel } from "src/supplier/schemas";

@Injectable()
export class SupplierProfileService {
  constructor(
    @Inject(ModelNames.SUPPLIER) private supplierModel: ISupplierModel,
    // private s3Service: AwsS3Service,
    private appConfig: AppConfig,
  ) {}

  async getProfile(){}

  async editProfile(){}

  async addDocuments(){}

  async getProfilePreSignedUrl(){}

  async getDocumentPreSignedUrl(){}

  async resetPasswordFromProfile(){}

}