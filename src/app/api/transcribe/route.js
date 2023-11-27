import { GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe"
import { S3Client,GetObjectCommand } from '@aws-sdk/client-s3';

const getClient = () => {
    return new TranscribeClient({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })
}

const createJob = (filename) => {
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: `${filename}_${Date.now()}`,
       OutputBucketName: process.env.BUCKET_NAME,
       OutputKey: `${filename}.transcription`,
       IdentifyLanguage: true,
       Media: {
          MediaFileUri: `s3://${process.env.BUCKET_NAME}/${filename}`
       }
    });
 };

const createTranscription = async (filename) => {
    const transcribe = getClient()
    const command =  createJob(filename)
    return transcribe.send(command)
}

const getJob = async (filename) => {
    const transcribe = getClient()
    let jobResult = null

    try {
    const jobStatusResult = new GetTranscriptionJobCommand({
        TranscriptionJobName: filename,
    })

     jobResult= await transcribe.send(jobStatusResult)

    } catch (error) {
       return jobResult 
    }

}

const streamToData = async (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}



const getTranscription = async (filename) => {
    const transcribeFile = filename + '.transcription'
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })

    const getObject = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: transcribeFile,

    })
    let response = null
    try {
        response = await client.send(getObject)
        
    } catch (error) {}
  if(response){
    return JSON.parse(
    await streamToData(response.Body)
    )}

return null

}

export const GET = async (req) => {
const url = new URL(req.url)
const searchParams = new URLSearchParams(url.searchParams)
const filename = searchParams.get('filename')

const resultFile = await getTranscription(filename)
if(resultFile){
    return Response.json({status: 'COMPLETED',
    resultFile
    })
}


const existingJob = await getJob(filename)

if(existingJob){
    return Response.json({
        status: existingJob.TranscriptionJob.TranscriptionJobStatus,
})
}

if(!existingJob){
   const newJob = await createTranscription(filename)
    Response.json({
        status: newJob.TranscriptionJob.TranscriptionJobStatus,
    })
}

return Response.json(null)
}