import React, { useEffect, useState } from 'react';

import '../styles/Dashboard/Products.css';
import user from '../assets/user.png'
import admin from '../assets/admin.png'
import axios from 'axios';

function Users({ isSidebarOpen }) {

    
        const [users, setusers] = useState([]); 
      
        
        useEffect(() => {
          const fetchUsers = async () => {
            try {
              const response = await axios.get('http://localhost:9002/api/users');
              const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
              console.log(response)
              setusers(fetchedUsers);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
      
          fetchUsers();
        }, []);

        
          
          
    
    
  return (
  <>
  
    <span className='span-da'>
        <div class={`card-da ${isSidebarOpen ? 'open' : ''}`}>
            <div class="card-content">
                <div class="card-number">{users.length}</div>
                <div class="card-text">Users</div>
            </div>
            <div class="card-icon">
                <img src={user} alt="icon" />
            </div>
        </div>

        <div class={`card1-da ${isSidebarOpen ? 'open' : ''}`}>
            <div class="card-content">
                <div class="card-number">1</div>
                <div class="card-text"> Admin</div>
            </div>
            <div class="card-icon">
                <img src={admin} alt="icon" />
            </div>
        </div>
    </span>

    <div className={`table-container ${isSidebarOpen ? 'open' : ''}`}>
  
        <table className={`table-da ${isSidebarOpen ? 'open' : ''}`}>
            <thead>
            <tr>
                <th>USER NAME</th>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                <th>ROLE</th>
                <th>DATE OF BIRTH</th>
                {/* <th>ACTION</th> */}
                
                
            </tr>
            </thead>
            <tbody>
            {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                <tr key={index}>
                    <td style={{ //display: 'flex',
                    alignItems: 'center', width: '250px' }}>
                        <div style={{display:'flex',alignItems: 'center'}}>
                    
                    {user.userName}
                    </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    <td> {user.dateOfBirth}</td>
                    {/* <td>
                    <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                handleEdit(user); 
                            }} 
                            style={{
                                padding: '6px 10px', 
                                borderRadius: '5px', 
                                border: 'none',
                                backgroundColor: '#ffc107',
                                color: 'white',
                                cursor: 'pointer',
                                boxSizing: 'border-box', 
                            }}
                            title="Edit User Role"
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </td> */}
                    
                    
                </tr>
                ))
            ) : (
                <tr><td colSpan="8">No users available</td></tr>
            )}
            </tbody>
        </table>
        
    </div>
  </>
    
  );}


export default Users;