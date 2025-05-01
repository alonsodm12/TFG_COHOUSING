import { useState } from "react";
import { CommunityProfile, LifestyleDTO } from "../api/type";
import { getUsernameFromToken } from "../../authUtils";

type CommunityFormProps = {
    onSubmit: (data: CommunityProfile) => void;
    initialData?: Partial<CommunityProfile>;
};

const username: string | null = getUsernameFromToken();

function buildInitialFormData(
    initialData?: Partial<CommunityProfile>,
    username?: string | null
): CommunityProfile {
    return {
        name: initialData?.name ?? '',
        descripcion: initialData?.descripcion ?? '',
        idAdmin: initialData?.idAdmin ?? username ?? '',
        lifestyleDTO: {
            tranquilo: initialData?.lifestyleDTO?.tranquilo ?? 1,
            actividad: initialData?.lifestyleDTO?.actividad ?? 1,
            limpieza: initialData?.lifestyleDTO?.limpieza ?? 1,
            compartirEspacios: initialData?.lifestyleDTO?.compartirEspacios ?? 1,
            sociabilidad: initialData?.lifestyleDTO?.sociabilidad ?? 1,
        },
    };
}

export const CommunityForm = ({ initialData, onSubmit }: CommunityFormProps) => {
    const [formData, setFormData] = useState<CommunityProfile>(
        buildInitialFormData(initialData, username)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSliderChange = (name: keyof LifestyleDTO, value: number) => {
        setFormData((prev) => ({
            ...prev,
            lifestyleDTO: {
                ...prev.lifestyleDTO,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>¿Cuál es el nombre de la comunidad?</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" />
            </div>

            <div>
                <label>¿Cómo describirías a tu comunidad?</label>
                <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
            </div>

            <div>
                <label>¿Qué tan tranquilo es tu espacio? (1 - poco, 5 - muy tranquilo)</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={formData.lifestyleDTO.tranquilo}
                    onChange={(e) => handleSliderChange("tranquilo", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label>¿Qué nivel de actividad hay en la comunidad? (1 - baja, 5 - alta)</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={formData.lifestyleDTO.actividad}
                    onChange={(e) => handleSliderChange("actividad", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label>¿Qué tan importante es la limpieza? (1 - poco, 5 - mucho)</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={formData.lifestyleDTO.limpieza}
                    onChange={(e) => handleSliderChange("limpieza", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label>¿Qué tanto comparten espacios comunes? (1 - poco, 5 - mucho)</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={formData.lifestyleDTO.compartirEspacios}
                    onChange={(e) => handleSliderChange("compartirEspacios", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label>¿Qué tan sociable es la comunidad? (1 - poco, 5 - muy sociable)</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={formData.lifestyleDTO.sociabilidad}
                    onChange={(e) => handleSliderChange("sociabilidad", parseInt(e.target.value))}
                />
            </div>

            <button type="submit">Guardar comunidad</button>
        </form>
    );
};
