import { Controller, Get, Post, UseGuards, Headers } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { response, responseError } from "src/helper/response.helper";
import { EmployeeService } from "src/service/employee.service";

@Controller('employee')
export class EmployeeController {
    constructor(
        private EmployeeService: EmployeeService
    ) {}

    @Get('view/all')
    @UseGuards(JwtAuthGuard)
    async getAllEmp(@Headers('Authorization') auth: string) {
        try {
            const result = await this.EmployeeService.getAllEmp(auth)
            return response('success', result)
        } catch (e) {
            return responseError(e.message)
        }
    }
}