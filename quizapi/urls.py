from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'hufquiz', views.HufQuizViewSet)
router.register(r'hufquizoptions', views.HufQuizOptionViewSet)
router.register(r'hufquizqn', views.HufQuizQnViewSet)
router.register(r'hufquizresult', views.HufQuizResultViewSet)
# router.register(r'hufuserans', views.HufUserAnsViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('quiztopfive/',views.getQuizTopFive,name='quiztopfive'),
    path('dashboardtopfive/',views.getDashboardTopFive, name = 'dashboardTopFive')
    # path('userAnswer', views.postUserAns, name='useranswer'),
    # path('getcorrectans/<id>',views.getCorrectAns,name='get correct ans'),

]
