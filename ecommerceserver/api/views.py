from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .Serializer import usersSerializer,menuSerializer
from .models import users,menu


# ViewSet for all users
class usersViewSet(viewsets.ModelViewSet):
    queryset = users.objects.all()
    serializer_class = usersSerializer  
# ViewSet for all menu
class menuViewSet(viewsets.ModelViewSet):
    queryset = menu.objects.all()
    serializer_class = menuSerializer 


# APIView for getting a single user by email
class SingleUserByEmail(APIView):
    def get(self, request):
        email = request.query_params.get('email')

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = users.objects.get(email=email)
            serializer = usersSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
