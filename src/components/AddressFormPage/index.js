// src/pages/AddressForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const AddressForm = () => {
  const { customerId, addressId } = useParams(); // addressId optional
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  //  If editing, fetch existing address
  useEffect(() => {
    if (addressId) {
      fetch(`https://customers-backend-q1tj.onrender.com/customers/${customerId}/addresses/${addressId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error("Error fetching address:", err));
    }
  }, [customerId, addressId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addressId) {
        // Update address
        await fetch(`https://customers-backend-q1tj.onrender.com/customers/${customerId}/addresses/${addressId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Add new address
        await fetch(`https://customers-backend-q1tj.onrender.com/customers/${customerId}/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      navigate(`/customers/${customerId}`); // redirect back to customer details
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="address-form-container">
      <h1>{addressId ? "Edit Address" : "Add New Address"}</h1>
      <form onSubmit={handleSubmit} className="address-form">
        <label>
          Address Details:
          <textarea
            name="address_details"
            value={formData.address_details}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            {addressId ? "Update Address" : "Save Address"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/customers/${customerId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
