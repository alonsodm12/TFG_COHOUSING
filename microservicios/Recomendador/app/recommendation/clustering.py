import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from app.models.user import User
from app.models.community import CommunityBase

def preprocess_data(user: User, communities: list):
    # Extraer preferencias del usuario
    user_preferences = np.array([
        user.sociabilidad, user.tranquilidad, user.compartir_espacios,
        user.limpieza, user.actividad
    ]).reshape(1, -1)
    
    # Extraer preferencias de las comunidades
    communities_preferences = np.array([
        [c.sociabilidad, c.tranquilidad, c.compartir_espacios, c.limpieza, c.actividad]
        for c in communities
    ])
    
    # Unir todas las preferencias
    # Matriz de tamaño n_comunidades + 1 , 5
    
    all_preferences = np.vstack([user_preferences, communities_preferences])
    
    # Normalizar
    scaler = StandardScaler()
    all_preferences_scaled = scaler.fit_transform(all_preferences)
    
    # Dividir nuevamente usuario y comunidades ya escalados
    user_preferences_scaled = all_preferences_scaled[0].reshape(1, -1)
    communities_preferences_scaled = all_preferences_scaled[1:]
    
    return user_preferences_scaled, communities_preferences_scaled
