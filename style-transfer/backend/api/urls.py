from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, ImageProcessingView

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process-image/', ImageProcessingView.as_view(), name='process-image'),
]
