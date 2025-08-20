-- Limpieza previa
DELETE FROM community_integrantes;
DELETE FROM communities;

-- Inserción de comunidades
INSERT INTO communities (
    id, name, descripcion, sociabilidad, tranquilidad, compartir_espacios,
    limpieza, actividad, admin, foto_url, latitud, longitud, direccion, precio, indice_rotacion, numero_integrantes
) VALUES
(1, 'EcoRonda', 'Comunidad sostenible en Camino de Ronda',
  5, 5, 5, 5, 5, 2,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1701666, -3.631428,
  'Camino de Ronda, Granada', 250.0,0,4),

(2, 'ArteNatura', 'Comunidad creativa en el centro de Granada',
  4, 3, 4, 4, 5, 53,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1750000, -3.6000000,
  'Plaza Nueva, Granada', 300.0,0,4),

(3, 'TechZaidín', 'Comunidad joven con perfil tecnológico',
  5, 2, 5, 3, 4, 56,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1690000, -3.6150000,
  'Zaidín, Granada', 200.0,0,4),

(4, 'VerdeAlbaycin', 'Comunidad ecológica en Albaycin', 5, 4, 5, 5, 4, 10,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1800000, -3.6000000,
  'Albaycin, Granada', 270.0,0,4),

(5, 'CulturaCentro', 'Comunidad artística y cultural', 4, 3, 4, 3, 5, 11,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1780000, -3.5900000,
  'Centro, Granada', 320.0,0,4),
(6, 'La Chumbera', 'Comunidad alternativa en la zona norte de Granada',
  4, 3, 4, 5, 4, 15,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1850000, -3.6000000,
  'Norte, Granada', 220.0, 0,4),

(7, 'Convivir', 'Espacio de convivencia para jóvenes profesionales',
  5, 3, 5, 4, 5, 16,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1720000, -3.5960000,
  'Camino de Ronda, Granada', 280.0, 0,4),

(8, 'SierraViva', 'Vida tranquila cerca de la naturaleza',
  3, 5, 4, 5, 2, 17,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1600000, -3.5900000,
  'Cenes de la Vega, Granada', 240.0, 0,4),

(9, 'CoHabita', 'Piso compartido en ambiente multicultural',
  4, 4, 5, 4, 3, 18,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1670000, -3.6200000,
  'Granada Centro, Granada', 300.0, 0,4),

(10, 'ArteSur', 'Comunidad artística en el sur de la ciudad',
  5, 2, 4, 3, 5, 19,
  '/uploads/1752365753682_comunidad_1.jpg', 37.1550000, -3.6350000,
  'Zaidín, Granada', 260.0, 0,4);

INSERT INTO community_integrantes (community_id, integrante_id) VALUES
  (1, 1), -- xavi
  (1, 2), -- sofia
  (1, 6), -- laura

  (2, 4), -- maria (admin también)
  (2, 5), -- jose
  (10, 9), -- carlos

  (3, 7), -- pedro (admin)
  (3, 8), -- ana
  (4, 10), (4, 11), (4, 14),
  (5, 12), (5, 13),
  (1, 3), (6, 15), (7, 16), (8, 17), (9, 18), (10, 19);
