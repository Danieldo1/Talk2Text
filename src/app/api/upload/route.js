import { S3Client,PutObjectCommand } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';



export async function POST(req) {
const formData = await req.formData();
const file = formData.get('file');
const {name,type} = file;
const data = await file.arrayBuffer();
const id = uniqid();

const ext = name.split('.').pop();
const newName= id+'.'+ext;

const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})



const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: newName,
    Body: data,
    ContentType: type,
    ACL: 'public-read',
})
await client.send(command);

return Response.json({name,ext,newName,id})
}