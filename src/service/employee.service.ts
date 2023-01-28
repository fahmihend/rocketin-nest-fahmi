import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeRepository } from "src/repository/employee.repository";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeRepository)
        private readonly employeeRepository: EmployeeRepository,
        public readonly jwtTokenService: JwtService,
    ) {}
    async getAllEmp(auth: string) {
        try {
            const extractedToken = this.jwtTokenService.decode(auth.replace('Bearer ', ''));
            if (extractedToken['role'] !== 'admin') throw new Error('you are not allowed to access the data')
            return await this.employeeRepository.getAllEmp()
        } catch (e) {
            throw e;
        }
    }
}