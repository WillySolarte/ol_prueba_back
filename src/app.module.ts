import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { BusinessmanModule } from './businessman/businessman.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule,
    UserModule,
    AuthModule,
    MunicipalityModule,
    BusinessmanModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
