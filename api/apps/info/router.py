from fastapi import APIRouter

from api.apps.info.views import info__get_docker_info


info_router = APIRouter()

info_router.add_api_route(
    "/docker",
    info__get_docker_info,
    methods=["GET"]
)
