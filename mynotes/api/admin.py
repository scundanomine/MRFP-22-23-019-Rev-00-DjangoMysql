from django.contrib import admin
from api.models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display=('body', 'updated', 'created')
    
admin.site.register(Note,NoteAdmin)
