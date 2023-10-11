# NodeJs API Assessment

## Initial setup

1. cp .env.example .env

- Update mysql database information into .env

2. npm install 

- node: v18.12.0, npm: 8.19.2

3. create a database with same naming in .env file into mysql database

4. npm run migration:dev

Initial migration into database.

You should see 6 tables
- knex_migrations
- knex_migrations_lock
- students
- suspensions
- teacher_student
- teachers

5. npm run seed:run

- Generate seed data into database

6. apis
- `POST http://localhost:3000/api/register`
- `GET  http://localhost:3000/api/commonstudents`
- `POST http://localhost:3000/api/suspend`
- `POST http://localhost:3000/api/unsuspend`
- `POST http://localhost:3000/api/retrievefornotifications`


## Postman Collection

* Endpoint: `POST /api/register`

```json
{
    "teacher": "teacher1@gmail.com",
    "students": [
        "student20@gmail.com"
    ]
}
```

* Endpoint: `GET /api/commonstudents`
* Request example 1: `GET /api/commonstudents?teacher=teacher1%40gmail.com`
* Request example 2: `GET /api/commonstudents?teacher=teacher1%40gmail.com&teacher=teacher35%40gmail.com`


* Endpoint: `POST /api/suspend`

```json
{
    "student": "student2@gmail.com"
}
```

* Endpoint: `POST /api/unsuspend`

```json
{
    "student": "student45@gmail.com"
}
```

* Endpoint: `POST /api/retrievefornotifications`

```json
{
  "teacher":  "teacher1@gmail.com",
  "notification": "Hello students! @student1@gmail.com @student30@gmail.com"
}
```
