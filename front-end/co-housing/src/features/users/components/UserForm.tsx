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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));

    };

    const handleSliderChange = (name: keyof typeof formData.lifestyleDTO, value: number) => {

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }
}