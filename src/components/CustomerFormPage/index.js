import {React , useState,useEffect} from 'react'; 
import {useNavigate, useParams} from 'react-router-dom';
import "./index.css"; 

const CustomerFormPage = () => {
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        phone_number:'',
    });
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`https://customers-backend-q1tj.onrender.com/customers/${id}`);
                const data = await response.json();
                console.log("Fetched customer data:", data);
                setFormData(data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        if (id) {
            fetchCustomerData();
        }
    }, [id]);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                const response = await fetch(`https://customers-backend-q1tj.onrender.com/customers/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    console.log("Customer updated successfully");
                    alert("Customer updated successfully");
                    navigate('/');
                } else {
                    console.error("Error updating customer");
                }
            } catch (error) {
                console.error("Error updating customer:", error);
            }
        } else {
            try {
                const response = await fetch(`https://customers-backend-q1tj.onrender.com/customers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    console.log("Customer created successfully");
                    setFormData({
                        first_name: '',
                        last_name: '',
                        phone_number: ''
                    });
                    alert("Customer created successfully");
                    navigate('/');

                } else {
                    console.error("Error creating customer");
                }
            } catch (error) {
                console.error("Error creating customer:", error);
            }
        }
    };

    return (
        <div className="customer-form">
            <h2>{id ? "Edit Customer" : "Add Customer"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                />
                <button type="submit">{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default CustomerFormPage