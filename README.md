# Aliados 360 API

API RESTful para la gestión de aliados comerciales, sus marcas, productos y contactos. Implementa autenticación JWT con control de acceso basado en roles (ADMIN, MANAGER, VIEWER) y sigue los principios de **Arquitectura Limpia** y **Domain-Driven Design**.

---

## Tecnologías

| Capa          | Tecnología                         |
| ------------- | ---------------------------------- |
| Runtime       | Node.js 24                         |
| Lenguaje      | TypeScript 5                       |
| Framework     | Express 5                          |
| Base de datos | PostgreSQL 17                      |
| Migraciones   | node-pg-migrate                    |
| Validación    | Zod                                |
| DI            | Awilix                             |
| Auth          | JWT + bcryptjs                     |
| Tests         | Vitest + Supertest                 |
| Calidad       | SonarQube                          |

---

## Estructura

```
src/
├── config/               # Configuración (DI container, env vars)
├── shared/               # Código compartido (errores, tipos)
├── domain/               # Capa de dominio (DDD)
│   ├── entities/         # Entidades del negocio
│   ├── valueObjects/     # Value objects (UUID, Email)
│   ├── enums/            # Enumeraciones (UserRole)
│   ├── interfaces/       # Contratos (repositorios, servicios, casos de uso)
│   └── errors/           # Errores de dominio
├── application/          # Capa de aplicación
│   ├── useCases/         # Casos de uso
│   └── dto/              # Data Transfer Objects
└── infrastructure/       # Capa de infraestructura
    ├── api/              # Controladores, rutas, middlewares
    ├── persistence/      # DB, migraciones, seeders, repositorios, mappers
    ├── schemas/          # Esquemas de validación Zod
    └── services/         # Servicios (auth, health)
```

---

## Endpoints

### Health
| Método | Ruta              | Auth |
| ------ | ----------------- | ---- |
| GET    | `/api/health`     | No   |

### Usuarios
| Método | Ruta                              | Auth |
| ------ | --------------------------------- | ---- |
| POST   | `/api/v1/users/register`          | No   |
| POST   | `/api/v1/users/login`             | No   |
| GET    | `/api/v1/users`                   | JWT  |
| GET    | `/api/v1/users/id/:id`            | No   |
| GET    | `/api/v1/users/email/:email`      | No   |

### Partners
| Método | Ruta                                        | Auth |
| ------ | ------------------------------------------- | ---- |
| GET    | `/api/v1/partners`                          | No   |
| GET    | `/api/v1/partners/:id`                      | No   |
| POST   | `/api/v1/partners`                          | JWT  |
| PATCH  | `/api/v1/partners/:id`                      | JWT  |
| GET    | `/api/v1/partners/:partnerId/brands`        | No   |
| POST   | `/api/v1/partners/:partnerId/brands`        | JWT  |
| GET    | `/api/v1/partners/:partnerId/contacts`      | No   |
| POST   | `/api/v1/partners/:partnerId/contacts`      | JWT  |

### Brands
| Método | Ruta                                  | Auth |
| ------ | ------------------------------------- | ---- |
| GET    | `/api/v1/brands/:id`                  | No   |
| GET    | `/api/v1/brands/:brandId/products`    | No   |
| POST   | `/api/v1/brands/:brandId/products`    | JWT  |

### Products
| Método | Ruta                     | Auth |
| ------ | ------------------------ | ---- |
| GET    | `/api/v1/products/:id`   | No   |

---

## Requisitos

- Node.js 24+
- PostgreSQL 17 (o Docker)

---

## Ejecución local

```bash
# 1. Clonar e instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes

# 3. Migraciones y seeders
npm run migrate:up
npm run seed

# 4. Iniciar servidor de desarrollo
npm run dev
```

---

## Ejecución con Docker

```bash
docker-compose up -d
```

Esto levanta PostgreSQL 17 y la API en el puerto `3000`. Las migraciones y seeders se ejecutan automáticamente al iniciar.

---

## Scripts disponibles

| Script              | Descripción                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con hot-reload    |
| `npm run build`     | Compilar TypeScript a `dist/`            |
| `npm start`         | Servidor producción                      |
| `npm run migrate:up` | Aplicar migraciones                     |
| `npm run seed`      | Poblar la base de datos                  |
| `npm run db:setup`  | Migrar + seedear                         |
| `npm test`          | Tests en modo watch                      |
| `npm run test:run`  | Tests una sola vez                       |
| `npm run test:coverage` | Tests con cobertura                  |

---

## Usuario semilla por defecto

| Email                | Contraseña      | Rol    |
| -------------------- | --------------- | ------ |
| admin@example.com    | securepassword  | ADMIN  |
| viewer@example.com   | securepassword  | VIEWER |
