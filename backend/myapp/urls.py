from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import CreateUserView, LoginView, TrainingPlanView, TrainingPlanPDFView, TrainingPlanUploadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from rest_framework import permissions







urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('training-plans/<str:plan_type>/', TrainingPlanView.as_view(), name='training-plan'),
    path('training-plans-pdf/<str:plan_type>/', TrainingPlanPDFView.as_view(), name='training-plan-pdf'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload-training-plan/', TrainingPlanUploadView.as_view(), name='upload-training-plan'),
    
    
    
    #re_path(r'^(?P<path>.*)$', page_not_found),
]
