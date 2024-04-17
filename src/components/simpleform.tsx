// components/SimpleForm.tsx
import React, { useState } from 'react';

type FormData = {
    firstname: string;
    lastname: string;
    email: string;
};

const SimpleForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.firstname,
                    last_name: formData.lastname,
                    email: formData.email
                })
            });
            const data = await response.json();
            alert('User added: ' + JSON.stringify(data));
        } catch (error: any) {
            alert('Failed to add user: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstname">Firstname:</label>
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="lastname">Lastname:</label>
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SimpleForm;
