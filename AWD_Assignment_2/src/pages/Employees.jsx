import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => setEmployees(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {employees.map((emp) => (
                <div
                    key={emp.id}
                    className={`p-6 border rounded shadow-sm ${isDarkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                        }`}
                >
                    <h3 className="text-lg font-bold">{emp.name}</h3>
                    <p className="text-sm">{emp.email}</p>
                    <p className="text-sm">{emp.phone}</p>
                </div>
            ))}
        </div>
    );
}

export default Employees;