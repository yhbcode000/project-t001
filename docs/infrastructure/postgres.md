# PostgreSQL

PostgreSQL is the template's durable system of record.

## Local configuration

Docker Compose starts PostgreSQL with:

- User: `postgres`
- Password: `postgres`
- Database: `hello_world`
- Port: `5432`

The API connects through `DATABASE_URL`.

## Current usage

`services/api` creates and uses a `hello_visits` table to demonstrate real persistence.

## Suitable data

Use PostgreSQL for:

- Users and accounts.
- Projects and workspaces.
- Audit logs.
- Agent memory and checkpoints.
- Billing and usage records.
- Permissions and policy decisions.

## Production checklist

- Add migrations.
- Enable backups and point-in-time recovery.
- Use least-privilege credentials.
- Enable TLS.
- Add connection pooling.
- Monitor slow queries and connection usage.
