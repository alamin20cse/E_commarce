from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .Serializer import usersSerializer, menuSerializer,CartSerializer
from .models import users, menu,Cart


# ViewSet for all users
class usersViewSet(viewsets.ModelViewSet):
    queryset = users.objects.all()
    serializer_class = usersSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        # ধরলাম আপনি admin বানাতে চাইছেন
        instance.role = 'admin'
        instance.save()

        return Response({
            "message": f"{instance.name} is now admin.",
            "modifiedCount": 1
        }, status=status.HTTP_200_OK)


# ViewSet for all menu
class menuViewSet(viewsets.ModelViewSet):
    queryset = menu.objects.all()
    serializer_class = menuSerializer




from rest_framework import viewsets
from .models import Cart


class cartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        if self.action == 'list':
            email = self.request.query_params.get('email')
            if email:
                return Cart.objects.filter(email=email)
            return Cart.objects.none()
        return super().get_queryset()



# APIView for getting a single user by email
class SingleUserByEmail(APIView):
    def get(self, request):
        email = request.query_params.get('email')

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_obj = users.objects.get(email=email)
            serializer = usersSerializer(user_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)




























import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntent(APIView):
    # @permission_classes([IsAuthenticated])  # Uncomment if you want to protect this endpoint
    def post(self, request):
        try:
            # Debug print
            print("Received request to create payment intent")
            
            # Get price from request
            price = request.data.get('price')
            if not price:
                return Response({'error': 'Price is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                price = float(price)
            except ValueError:
                return Response({'error': 'Price must be a number'}, status=status.HTTP_400_BAD_REQUEST)
            
            if price <= 0:
                return Response({'error': 'Price must be greater than 0'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Convert to cents for Stripe
            amount = int(price * 100)
            
            # Create PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',  # Change currency if needed
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            
            return Response({
                'clientSecret': intent.client_secret,
                'amount': amount,
                'currency': 'usd'
            })
            
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return Response({'error': 'An unexpected error occurred'}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from .Serializer import PaymentSerializer


class SavePayment(APIView):
    def get(self, request):
        # Return all payments
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            data = request.data
            serializer = PaymentSerializer(data=data)
            if serializer.is_valid():
                payment = serializer.save()

                # Delete cart items by cartIds if provided
                cart_ids = data.get('cartIds', [])
                if cart_ids:
                    Cart.objects.filter(id__in=cart_ids).delete()

                return Response({
                    'success': True,
                    'paymentId': payment.id,
                    'message': 'Payment successfully saved'
                }, status=status.HTTP_201_CREATED)

            return Response({
                'error': 'Invalid data',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'error': 'Failed to save payment',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class GetPayments(APIView):
    # @permission_classes([IsAuthenticated])  # Uncomment if you want to protect this endpoint
    def get(self, request, email):
        try:
            payments = Payment.objects.filter(email=email)
            serializer = PaymentSerializer(payments, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)