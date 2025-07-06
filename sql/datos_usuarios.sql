-- Limpia la tabla (opcional, solo si quieres reiniciar)
DELETE FROM users;

INSERT INTO users(
    id, username, email, password, foto_url, latitud, longitud, direccion,
    enabled, role, sociabilidad, tranquilidad, compartir_espacios,
    limpieza, actividad, id_comunidad
) VALUES
    (1, 'xavi', 'xavi@gmail.com',
    '$2a$12$8ZvkqgrikSLewA3sKupQiOnhB9S.6TaZHW7aaXn2wFt.LlIOhwxLa',
    '/uploads/1749401817648_foto-carnet.jpeg', 37.1701666, -3.631428,
    'Camino Ronda, Granada', true, 'buscador', 5, 5, 5, 5, 5, 1),

    (2, 'sofia', 'sofia@gmail.com',
    '$2a$12$/Z9q9D2qAGxXdM1HaMqi5erI1g879/JVsl.M68vWIfhggq/A.fpLK',
    '/uploads/1749401846180_faro.png', 37.1734995, -3.5995337,
    'Granada', true, 'ofertante', 5, 5, 5, 5, 5, 1),

    (52, 'antonio', 'antonio@gmail.com',
    '$2a$12$wG6H3rxbFP0GdO0O6BQ7ZOo6dEl0fV8ux3ajSwXz55UOpUU5AapEO',
    '/uploads/1750011585158_5A.png', 37.1734995, -3.5995337,
    'Granada', true, 'buscador', 5, 5, 5, 5, 5, 1),

    (53, 'maria', 'maria@gmail.com',
    '$2a$12$BLEGBHo6nTKwol5ojsKhJOhzfp3PT5A3SPYB08wYk5MekJom1jm0O',
    '/uploads/1750020000000_maria.png', 37.1750000, -3.6000000,
    'Plaza Nueva, Granada', true, 'ofertante', 4, 3, 2, 4, 5, 2),

    (54, 'jose', 'jose@gmail.com',
    '$2a$12$KQRIFagOoQw1Hq/mfzu8zufw5PazhDHLPMyV/.YiIsnK6ETj2QpZS',
    '/uploads/1750020001000_jose.png', 37.1780000, -3.6050000,
    'Albaycin, Granada', true, 'buscador', 3, 4, 5, 3, 2, 2),

    (55, 'laura', 'laura@gmail.com',
    '$2a$12$5AZo/R8kMA//SA.ksr.ntOV6YnE3E9ReyesUZhXo.02LDTs76d/k6',
    '/uploads/1750020002000_laura.png', 37.1710000, -3.6100000,
    'Realejo, Granada', true, 'ofertante', 2, 2, 3, 5, 4, 1),

    (56, 'pedro', 'pedro@gmail.com',
    '$2a$12$KGtA9nt0kHbuthIBK76XR.uLQsZSS7U9c4vYha9Vd1dg1tFBD8UdK',
    '/uploads/1750020003000_pedro.png', 37.1690000, -3.6150000,
    'Zaidin, Granada', true, 'buscador', 5, 1, 4, 2, 3, 3),

    (57, 'ana', 'ana@gmail.com',
    '$2a$12$7L0EaWdxFwoGqJJsvQ9KSe235TtRy3/GsjQksjQRNj3lcsKIr12DS',
    '/uploads/1750020004000_ana.png', 37.1720000, -3.6200000,
    'Sacromonte, Granada', true, 'buscador', 4, 4, 4, 4, 4, 1),

    (58, 'carlos', 'carlos@gmail.com',
    '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja',
    '/uploads/1750020005000_carlos.png', 37.1705000, -3.6180000,
    'Cartuja, Granada', true, 'ofertante', 3, 3, 3, 3, 3, 2);
