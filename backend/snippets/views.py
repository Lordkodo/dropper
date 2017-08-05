from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
import subprocess

@api_view(['POST'])
def filetransform(request, format=None):
    #Test extension
    if wrongExtension(request.data.get('name')) :
        content = {'error': 'Extension isn\'t allowed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST, )

    md5 = calcMD5(request.data.get('file'))

    src = 'src.' + request.data.get('name').split('.')[1]
    saveFile(src, request.data.get('file'), md5)
    execAndSave(md5)

    clean(src)
    return Response({
        'url': generateURL(md5),
    })

def calcMD5(data):
    return hashlib.md5(data.encode('utf-8')).hexdigest()

def generateURL(md5):
    return 'https://storage.googleapis.com/lordkodo-dropper/drop/' + md5 + '/dst.csv'

def wrongExtension(name):
    if len(name.split('.')) < 2:
        return True

    extension = name.split('.')[1]
    return extension != 'csv' and extension != 'xml'

def exportGCS(name, md5):
    subprocess.Popen(['gsutil','cp', 'dst.csv', 'gs://lordkodo-dropper/drop/' + md5 + '/' + name])

def saveFile(name, data, md5):
    f = open(name,"w+")
    f.write(data)

    # save on gcs
    exportGCS(name, md5)

def execAndSave(md5):
    subprocess.Popen(['python','-u', 'app/static/process.py'])

    #save on gcs
    exportGCS('dst.csv', md5)
    subprocess.Popen(['gsutil','acl', 'ch', '-u', 'AllUsers:R', 'gs://lordkodo-dropper/drop/' + md5 + '/' + name])

def clean(name):
    subprocess.Popen(['rm','-f', name, 'dst.csv'])
