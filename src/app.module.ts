import { Module } from '@nestjs/common';
import { ProductModule } from './products/book.module';
@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
