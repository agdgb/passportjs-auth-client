import React, { useEffect, useState } from "react";
import api from "../services/api";

const RoleList = ({ onRoleSelect, selectedRoles }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/api/roles");
        setRoles(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load roles");
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <p>Loading roles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleRoleToggle = (roleName) => {
    onRoleSelect(roleName);
  };

  return (
    <div className="role-list">
      <h3 className="text-lg font-semibold mb-2">Available Roles</h3>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                value={role._id}
                checked={selectedRoles.includes(role._id)}
                onChange={() => handleRoleToggle(role._id)}
              />
              {role.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
