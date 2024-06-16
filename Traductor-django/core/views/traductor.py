from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def mostrar_html(request):
    return render(request, 'home.html', {
        'user': request.user,
    })
