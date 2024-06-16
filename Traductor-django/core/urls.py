from django.urls import path
from core.views import  account,historial,traductor,edit
app_name = "core"
urlpatterns = []
 
urlpatterns += [
    path('registrar/', account.register, name='registrar'),
    path('salir/', account.Salir, name='salir'), 
]

urlpatterns += [
        path('historial/', historial.list_historial.as_view(), name='historial'),
        path('historial/delete/<int:pk>/', historial.historial_delete, name='historial_delete'),
        path('historial/clear/', historial.clear_historial.as_view(), name='clear_historial'),
        path('historial/save_word', historial.save_word, name='save_word'),
]

urlpatterns += [
        path('inicio/', traductor.mostrar_html, name='inicio'), 
]

    
urlpatterns += [
        path('editar/', edit.edit_user, name='editar'), 
]
