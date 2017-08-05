from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import status
from django.contrib.staticfiles.templatetags.staticfiles import static
import subprocess

@api_view(['POST'])
def filetransform(request, format=None):
    #Test extension
    if testExtension(request.data.get('name')) :
        content = {'error': 'Extension isn\'t allowed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST, )

    md5 = request.data.get('md5')
    url = generateURL(md5)

    # if exist url -> return url
    # else -> run script + save in gcs + return url
    # b = subprocess.call([static("test.py")])

    return Response({
        'url': url,
    })

def generateURL(md5):
    return 'https://fake-url/' + md5

def testExtension(name):
    extension = name.split('.')[1];
    return extension != 'csv' and extension != 'xml'
