from fastapi import APIRouter

from api.apps.volumes.views import (
    get_all_volumes_views,
    create_volume_view,
    volume_info_by_view,
    delete_volume_view,
    prune_volumes_views
)


volumes_router = APIRouter()

volumes_router.add_api_route(
    "/",
    get_all_volumes_views,
    methods=["GET"]
)
volumes_router.add_api_route(
    "/",
    create_volume_view,
    methods=["POST"]
)
volumes_router.add_api_route(
    "/prune",
    prune_volumes_views,
    methods=["POST"]
)
volumes_router.add_api_route(
    "/{volume_id}",
    volume_info_by_view,
    methods=["GET"]
)
volumes_router.add_api_route(
    "/{volume_id}",
    delete_volume_view,
    methods=["DELETE"]
)
