from fastapi import APIRouter, UploadFile, File
from ..dependencies import minio_client

router = APIRouter(prefix='/files', tags=['files'])
BUCKET = 'hello-platform'


@router.post('/upload')
async def upload_file(file: UploadFile = File(...)):
    if not minio_client.bucket_exists(BUCKET):
        minio_client.make_bucket(BUCKET)
    minio_client.put_object(BUCKET, file.filename, file.file, length=-1, part_size=10 * 1024 * 1024)
    return {'bucket': BUCKET, 'object': file.filename, 'storage': 'MinIO'}
