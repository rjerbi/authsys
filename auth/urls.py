from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

# Fonction de redirection par défaut
def api_root(request):
    return redirect('/api/register')  # Modifier selon ton besoin

urlpatterns = [
    path('admin/', admin.site.urls),  # Accès à l'admin
    path('', api_root),  # Redirection automatique vers /api/register
    path('api/', include('users.urls')),  # Inclusion des routes de l'app users
]
