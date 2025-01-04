import React, { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';

    function App() {
      const [items, setItems] = useState([]);
      const [itemName, setItemName] = useState('');
      const [itemType, setItemType] = useState('');
      const [employee, setEmployee] = useState('');
      const [editItemId, setEditItemId] = useState(null);

      useEffect(() => {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('inventoryItems', JSON.stringify(items));
      }, [items]);

      const handleAddItem = () => {
        if (!itemName || !itemType) return;

        const newItem = {
          id: uuidv4(),
          name: itemName,
          type: itemType,
          employee: employee,
        };

        setItems([...items, newItem]);
        setItemName('');
        setItemType('');
        setEmployee('');
      };

      const handleRemoveItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
      };

      const handleEditItem = (item) => {
        setEditItemId(item.id);
        setItemName(item.name);
        setItemType(item.type);
        setEmployee(item.employee);
      };

      const handleUpdateItem = () => {
        if (!itemName || !itemType) return;

        const updatedItems = items.map((item) =>
          item.id === editItemId
            ? { ...item, name: itemName, type: itemType, employee: employee }
            : item
        );

        setItems(updatedItems);
        setEditItemId(null);
        setItemName('');
        setItemType('');
        setEmployee('');
      };

      const handleCancelEdit = () => {
        setEditItemId(null);
        setItemName('');
        setItemType('');
        setEmployee('');
      };

      return (
        <div className="container">
          <div className="app-header">
            <h2>Medical Wisdom Africa</h2>
          </div>
          <h1>Inventory Management</h1>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Item Type</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Mouse">Mouse</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assigned Employee</label>
            <input
              type="text"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />
          </div>
          {editItemId ? (
            <div>
              <button onClick={handleUpdateItem}>Update Item</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleAddItem}>Add Item</button>
          )}
          <h2>Inventory Items</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Assigned Employee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.employee}</td>
                  <td>
                    <button onClick={() => handleEditItem(item)}>Edit</button>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default App;
