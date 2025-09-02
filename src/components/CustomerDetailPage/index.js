import React, { useEffect, useState, useCallback } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "./index.css";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  // Wrap fetch in useCallback so ESLint is happy
  const fetchCustomer = useCallback(async () => {
    try {
      const res = await fetch(`https://customers-backend-q1tj.onrender.com/customers/${id}`);
      const data = await res.json();
      console.log("Customer Data:", data);
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  }, [id]);


  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]); //  dependency added

  if (!customer) return <p>Loading...</p>;

   const handleDelete = async (addressId) => {
    await fetch(`https://customers-backend-q1tj.onrender.com/addresses/${addressId}`, {
      method: "DELETE",
    });
    fetchCustomer(); // Refresh after delete
  };

  return (
    <div className="details-container">
      <h1>{customer.first_name} {customer.last_name}</h1>
      <p>Phone: {customer.phone_number}</p>

      <h2>Addresses</h2>
      <ul className="address-list">
        {customer.addresses.map((a) => (
          <li key={a.id}>
            <p>{a.address_details}</p>
            <p>{a.city}, {a.state} , {a.pin_code} </p>
            <button className="delete-btn" onClick={() => handleDelete(a.id )}>Delete</button>
            <button className="edit-btn"   onClick={() => navigate(`/customers/${customer.id}/addresses/${a.id}/edit`)}>Edit</button>
          </li>
        ))}
      </ul>
      <div className="btn-container">
            <button
                className="add-btn"
                onClick={() => navigate(`/customers/${customer.id}/addresses/new`)}
            >
                 Add New Address
            </button>
            <button onClick={()=> navigate("/")} className="back-btn">Back</button>
        </div>
    </div>
  );
};

export default CustomerDetailsPage;
