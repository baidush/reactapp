import React, { useState, useEffect } from 'react';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);  // State to store the list of users

    useEffect(() => {
        // Function to fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/getUsers');  // Assuming your API endpoint is correct
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);  // Set the users in state
            } catch (error: any) {
                console.error('Failed to fetch users:', error.message);
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
