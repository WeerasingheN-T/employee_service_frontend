import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://8423-2402-d000-8104-1160-f56c-54b7-d4cd-94b6.ngrok-free.app/api/v1/employees";

class EmployeeService {

    getAuthHeaders() {

        let token="";
        if(localStorage.getItem('token')){
           token = localStorage.getItem('token'); 
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL, this.getAuthHeaders());
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee, this.getAuthHeaders());
    }

    getEmployeeById(employeeId){
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }

    updateEmployee(employee, employeeId){
        return axios.put(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, employee, this.getAuthHeaders());
    }

    deleteEmployee(employeeId){
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, this.getAuthHeaders());
    }
}

export default new EmployeeService()