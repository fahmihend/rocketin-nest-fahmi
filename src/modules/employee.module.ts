import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "src/controller/employee.controller";
import { EmployeeRepository } from "src/repository/employee.repository";
import { EmployeeService } from "src/service/employee.service";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeRepository]), JwtModule.register({})],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})

export class EmployeeModule {}