// pages/users.tsx
import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

type Props = {
    users: User[];
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/getUsers'); // Use full URL in development
        const users: User[] = await res.json();
        return { props: { users } };
    } catch (error) {
        console.error('Failed to load users:', error);
        return { props: { users: [] } };
    }
};

const UsersPage: NextPage<Props> = ({ users }) => {
    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.first_name} {user.last_name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
