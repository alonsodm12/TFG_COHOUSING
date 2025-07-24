-- Limpia la tabla (opcional, solo si quieres reiniciar)
DELETE FROM user_comunidades_guardadas;
DELETE FROM users;

INSERT INTO users(
    id, username, email, password, foto_url, latitud, longitud, direccion,
    enabled, role, sociabilidad, tranquilidad, compartir_espacios,
    limpieza, actividad, id_comunidad
) VALUES
    (1, 'xavi', 'xavi@gmail.com',
    '$2a$12$8ZvkqgrikSLewA3sKupQiOnhB9S.6TaZHW7aaXn2wFt.LlIOhwxLa',
    '/uploads/1752338972556_usuario_1.jpg', 37.1701666, -3.631428,
    'Camino Ronda, Granada', true, 'buscador', 5, 5, 5, 5, 5, 1),

    (2, 'sofia', 'sofia@gmail.com',
    '$2a$12$/Z9q9D2qAGxXdM1HaMqi5erI1g879/JVsl.M68vWIfhggq/A.fpLK',
    '/uploads/1752338972556_usuario_1.jpg', 37.1734995, -3.5995337,
    'Granada', true, 'ofertante', 5, 5, 5, 5, 5, 1),

    (3, 'antonio', 'antonio@gmail.com',
    '$2a$12$wG6H3rxbFP0GdO0O6BQ7ZOo6dEl0fV8ux3ajSwXz55UOpUU5AapEO',
    '/uploads/1752338972556_usuario_1.jpg', 37.1734995, -3.5995337,
    'Granada', true, 'buscador', 5, 5, 5, 5, 5, 1),

    (4, 'maria', 'maria@gmail.com',
    '$2a$12$BLEGBHo6nTKwol5ojsKhJOhzfp3PT5A3SPYB08wYk5MekJom1jm0O',
    '/uploads/1752338972556_usuario_1.jpg', 37.1750000, -3.6000000,
    'Plaza Nueva, Granada', true, 'ofertante', 4, 3, 2, 4, 5, 2),

    (5, 'jose', 'jose@gmail.com',
    '$2a$12$KQRIFagOoQw1Hq/mfzu8zufw5PazhDHLPMyV/.YiIsnK6ETj2QpZS',
    '/uploads/1752338972556_usuario_1.jpg', 37.1780000, -3.6050000,
    'Albaycin, Granada', true, 'buscador', 3, 4, 5, 3, 2, 2),

    (6, 'laura', 'laura@gmail.com',
    '$2a$12$5AZo/R8kMA//SA.ksr.ntOV6YnE3E9ReyesUZhXo.02LDTs76d/k6',
    '/uploads/1752338972556_usuario_1.jpg', 37.1710000, -3.6100000,
    'Realejo, Granada', true, 'ofertante', 2, 2, 3, 5, 4, 1),

    (7, 'pedro', 'pedro@gmail.com',
    '$2a$12$KGtA9nt0kHbuthIBK76XR.uLQsZSS7U9c4vYha9Vd1dg1tFBD8UdK',
    '/uploads/1752338972556_usuario_1.jpg', 37.1690000, -3.6150000,
    'Zaidin, Granada', true, 'buscador', 5, 1, 4, 2, 3, 3),

    (8, 'ana', 'ana@gmail.com',
    '$2a$12$7L0EaWdxFwoGqJJsvQ9KSe235TtRy3/GsjQksjQRNj3lcsKIr12DS',
    '/uploads/1752338972556_usuario_1.jpg', 37.1720000, -3.6200000,
    'Sacromonte, Granada', true, 'buscador', 4, 4, 4, 4, 4, 1),

    (9, 'carlos', 'carlos@gmail.com',
    '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja',
    '/uploads/1752338972556_usuario_1.jpg', 37.1705000, -3.6180000,
    'Cartuja, Granada', true, 'ofertante', 3, 3, 3, 3, 3, 2),

    (10, 'marta', 'marta@gmail.com', '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja', '/uploads/1752338972556_usuario_1.jpg', 37.1600000, -3.6200000, 'Calle Elvira, Granada', true, 'buscador', 3, 4, 5, 3, 4, 1),

    (11, 'luis', 'luis@gmail.com', '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja', '/uploads/1752338972556_usuario_1.jpg', 37.1650000, -3.6100000, 'Alhambra, Granada', true, 'ofertante', 4, 3, 4, 5, 2, 2),

    (12, 'silvia', 'silvia@gmail.com', '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja', '/uploads/1752338972556_usuario_1.jpg', 37.1700000, -3.6000000, 'Realejo, Granada', true, 'buscador', 5, 5, 5, 5, 5, 3),

    (13, 'daniel', 'daniel@gmail.com', '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja', '/uploads/1752338972556_usuario_1.jpg', 37.1800000, -3.5950000, 'Centro, Granada', true, 'ofertante', 3, 2, 4, 3, 3, 3),

    (14, 'elena', 'elena@gmail.com', '$2a$12$l5MNrXPvOkAQu9ad.rgbguGglodbCSffFfTux9Y0e9ywhjzVaUAja', '/uploads/1752338972556_usuario_1.jpg', 37.1770000, -3.6050000, 'Zaidin, Granada', true, 'buscador', 4, 3, 4, 4, 4, 1),

    (15, 'ines', 'ines@gmail.com',
    '$2a$12$abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg',
    '/uploads/1752338972556_usuario_1.jpg', 37.1660000, -3.6020000,
    'Calle Recogidas, Granada', true, 'ofertante', 4, 5, 3, 5, 4, 2),

    (16, 'rafa', 'rafa@gmail.com',
    '$2a$12$abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg',
    '/uploads/1752338972556_usuario_1.jpg', 37.1680000, -3.6105000,
    'Calle San Antón, Granada', true, 'ofertante', 3, 3, 4, 4, 3, 1),

    (17, 'claudia', 'claudia@gmail.com',
    '$2a$12$abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg',
    '/uploads/1752338972556_usuario_1.jpg', 37.1708000, -3.6120000,
    'Avenida de la Constitución, Granada', true, 'ofertante', 5, 4, 5, 4, 5, 2),

    (18, 'david', 'david@gmail.com',
    '$2a$12$abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg',
    '/uploads/1752338972556_usuario_1.jpg', 37.1610000, -3.6250000,
    'Camino de Ronda, Granada', true, 'ofertante', 2, 3, 3, 3, 2, 3),

    (19, 'paula', 'paula@gmail.com',
    '$2a$12$abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg',
    '/uploads/1752338972556_usuario_1.jpg', 37.1733000, -3.6160000,
    'Paseo del Salón, Granada', true, 'ofertante', 5, 5, 5, 5, 5, 1);


