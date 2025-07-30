-- Borrar tablas hijas primero
DELETE FROM tarea_usuario;
DELETE FROM tarea;
DELETE FROM evento;
DELETE FROM actividad;

-- Insertar muchas actividades con tareas para las 3 comunidades

INSERT INTO actividad (id, titulo, descripcion, fecha_tope, id_comunidad, num_participantes) VALUES
-- Comunidad 1: EcoRonda
(4, 'Recolectar reciclaje', 'Separar y llevar el reciclaje a punto limpio', '2025-07-16T09:00:00', 1, 2),
(5, 'Jardinería', 'Plantar flores y limpiar el huerto comunitario', '2025-07-17T10:00:00', 1, 4),
(6, 'Revisión de paneles solares', 'Revisar estado y limpiar los paneles solares', '2025-07-18T11:00:00', 1, 3),
(7, 'Organizar taller de compostaje', 'Preparar materiales y organizar la charla', '2025-07-19T15:00:00', 1, 5),
(8, 'Reparar bicicletas comunitarias', 'Inspeccionar y reparar bicicletas', '2025-07-20T12:00:00', 1, 2),

-- Comunidad 2: ArteNatura
(9, 'Montar exposición', 'Colocar cuadros y preparar la sala de exposiciones', '2025-07-14T16:00:00', 2, 3),
(10, 'Limpiar espacio común', 'Limpiar y ordenar la sala común de la comunidad', '2025-07-15T09:00:00', 2, 3),
(11, 'Planificación evento cultural', 'Reunión para organizar el evento de arte y música', '2025-07-16T18:00:00', 2, 6),
(12, 'Compra materiales artísticos', 'Comprar pinturas, pinceles y lienzos', '2025-07-17T14:00:00', 2, 2),
(13, 'Taller de cerámica', 'Preparar espacio y materiales para el taller', '2025-07-18T11:00:00', 2, 4),

-- Comunidad 3: TechZaidín
(14, 'Actualizar software comunitario', 'Revisar y actualizar las herramientas digitales', '2025-07-13T19:00:00', 3, 3),
(15, 'Organizar hackathon', 'Preparar espacio y materiales para el evento', '2025-07-19T10:00:00', 3, 5),
(16, 'Mantenimiento impresora 3D', 'Revisar y reparar la impresora 3D comunitaria', '2025-07-20T16:00:00', 3, 2),
(17, 'Instalación de sensores IoT', 'Colocar sensores para medir temperatura y humedad', '2025-07-21T09:00:00', 3, 4),
(18, 'Revisión de red WiFi', 'Comprobar y optimizar la red inalámbrica', '2025-07-22T14:00:00', 3, 3),

(19, 'Plantación árboles', 'Plantación de árboles autóctonos en zonas comunes', '2025-07-25T09:00:00', 4, 5),
(20, 'Recolección de residuos', 'Recolectar residuos y separar reciclaje en la zona', '2025-07-26T10:00:00', 4, 3),
(21, 'Taller de pintura', 'Realizar taller de pintura para vecinos', '2025-07-27T15:00:00', 5, 4),
(22, 'Organización exposición', 'Preparar y organizar la exposición de arte mensual', '2025-07-28T16:00:00', 5, 6);


-- Insertar las tareas hijas correspondientes a las actividades (estado, duración en horas)
INSERT INTO tarea (id, estado, duracion) VALUES
(4, 'PENDIENTE', 2.0),
(5, 'PENDIENTE', 3.0),
(6, 'EN_PROGRESO', 1.5),
(7, 'PENDIENTE', 2.5),
(8, 'PENDIENTE', 1.0),

(9, 'COMPLETADA', 2.0),
(10, 'EN_PROGRESO', 1.0),
(11, 'PENDIENTE', 3.0),
(12, 'PENDIENTE', 1.5),
(13, 'EN_PROGRESO', 2.0),

(14, 'COMPLETADA', 1.0),
(15, 'PENDIENTE', 4.0),
(16, 'PENDIENTE', 2.0),
(17, 'EN_PROGRESO', 2.5),
(18, 'PENDIENTE', 1.5),

(19, 'PENDIENTE', 3.0),
(20, 'EN_PROGRESO', 2.0),
(21, 'PENDIENTE', 4.0),
(22, 'PENDIENTE', 5.0);

-- Asignar usuarios a las tareas (puedes modificar usuarios si quieres)
INSERT INTO tarea_usuario (tarea_id, usuario_id) VALUES
-- EcoRonda
(4, 1), (4, 2),
(5, 1), (5, 55), (5, 2), (5, 3),
(6, 2), (6, 55), (6, 1),
(7, 1), (7, 2), (7, 55), (7, 3), (7, 4),
(8, 55), (8, 2),

-- ArteNatura
(9, 53), (9, 54), (9, 58),
(10, 54), (10, 58), (10, 53),
(11, 53), (11, 54), (11, 58), (11, 59), (11, 60), (11, 61),
(12, 58), (12, 53),
(13, 53), (13, 54), (13, 58), (13, 59),

-- TechZaidín
(14, 56), (14, 57), (14, 58),
(15, 56), (15, 57), (15, 58), (15, 59), (15, 60),
(16, 56), (16, 57),
(17, 56), (17, 57), (17, 58), (17, 59),
(18, 57), (18, 58),

(19, 10), (19, 11), (19, 14),
(20, 10), (20, 14),
(21, 12), (21, 13),
(22, 12), (22, 13), (22, 11);
