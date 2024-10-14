import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';


@Module({
  imports: [SharedModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}