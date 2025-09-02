import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5; // change per your need

  const navigate = useNavigate();

  // Fetch customers from backend
  useEffect(() => {
    fetch("https://customers-backend-q1tj.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setFilteredCustomers(data);
      })
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  // Handle search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = customers.filter(
        (c) =>
          c.first_name.toLowerCase().includes(lowerSearch) ||
          c.last_name.toLowerCase().includes(lowerSearch) ||
          c.phone_number.toLowerCase().includes(lowerSearch)
      );
      setFilteredCustomers(filtered);
      setCurrentPage(1); // reset to first page on search
    }
  }, [search, customers]);

  // Delete customer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await fetch(`https://customers-backend-q1tj.onrender.com/customers/${id}`, {
          method: "DELETE",
        });
        setCustomers(customers.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  // Pagination logic
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="customer-container">
      <h2>Customer List</h2>

      <div className="actions">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {/* Add new customer */}
        <Link to="/customers/new" className="add-btn">
          + Add New Customer
        </Link>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <Link to={`/customers/${customer.id}`} className="customer-link">
                    {customer.first_name}
                  </Link>
                </td>
                <td>
                  <Link to={`/customers/${customer.id}`} className="customer-link">
                    {customer.last_name}
                  </Link>
                </td>
                <td>{customer.phone_number}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(customer.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No matching customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/*  Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
