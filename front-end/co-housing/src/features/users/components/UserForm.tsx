import { useState } from "react";
import { UpdateUserProfile, UserProfile } from "../api/types";

type UserFormProps = {
    initialData?: Partial<UserProfile>;
    onSubmit: (data : UpdateUserProfile) => void;
}

export const UserForm = ({ initialData = {}, onSubmit }: UserFormProps) => {
    const [formData, setFormData] = useState<UpdateUserProfile>({
        username: initialData.username || '',
        email: initialData.email || '',
        password: '',
        role: initialData.role || '',
        lifestyleDTO: {
            tranquilo: initialData.lifestyleDTO?.tranquilo ?? 1,
            actividad: initialData.lifestyleDTO?.actividad ?? 1,
            limpieza: initialData.lifestyleDTO?.limpieza ?? 1,
            compartirEspacios: initialData.lifestyleDTO?.compartirEspacios ?? 1,
            sociabilidad: initialData.lifestyleDTO?.sociabilidad ?? 1,
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: value}));

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Nombre" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <input name="role" value={formData.role} onChange={handleChange} placeholder="role" />
            
        </form>
    )
}