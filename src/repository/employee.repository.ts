import { Employee } from "src/entity/employee.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    async getAllEmp() {
        try {
            return await Employee.createQueryBuilder('employee').getMany()
        } catch (e) {
            throw e;
        }
    }
}