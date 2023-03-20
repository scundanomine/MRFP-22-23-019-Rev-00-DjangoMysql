from django.shortcuts import render
from api.models import Note
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.serializer import NoteSerializer
from rest_framework import status

@api_view(['GET'])
def homePage(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    noteData = Note.objects.all()
    serializeNoteData = NoteSerializer(noteData, many=True)
    return Response(serializeNoteData.data, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getNote(request, notesId):
    noteData = Note.objects.get(id=notesId)
    serializeNoteData = NoteSerializer(noteData, many=False)
    return Response(serializeNoteData.data, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def updateNote(request, notesId):
    postData = request.data
    note = Note.objects.get(id=notesId)
    serializer = NoteSerializer(instance=note, data=postData)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, notesId):
    note = Note.objects.get(id=notesId)
    note.delete()
    return Response("Note is deleted!")

@api_view(['POST'])
def createNote(request):
    postData = request.data
    #sql=f"INSERT INTO Note (body) VALUES ('{postData['body']}')"
    # noteData = Note.objects.raw(f"INSERT INTO Note (body) VALUES ('{postData['body']}')")
    noteData = Note.objects.create(body=postData['body'])
    serializeNoteData = NoteSerializer(noteData, many=False)
    return Response(serializeNoteData.data, status=status.HTTP_404_NOT_FOUND)