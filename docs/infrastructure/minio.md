# MinIO

MinIO provides local S3-compatible object storage.

## Local configuration

| Value | Default |
| --- | --- |
| API endpoint | `localhost:9000` |
| Console | <http://localhost:9001> |
| Access key | `minioadmin` |
| Secret key | `minioadmin` |

## Current usage

`services/api` includes a file upload route that creates a bucket if needed and stores uploaded objects.

## Suitable data

Use object storage for:

- User uploads.
- Generated images or documents.
- Audio/video recordings.
- Agent artifacts.
- Exports and reports.
- Long-term logs that do not belong in PostgreSQL.

## Production checklist

- Replace local credentials.
- Add TLS.
- Add bucket policies.
- Add lifecycle and retention rules.
- Add malware scanning for uploads if needed.
- Consider managed S3-compatible storage.
