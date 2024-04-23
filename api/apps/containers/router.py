from fastapi import APIRouter

from api.apps.containers.views import (
    containers__get_containers_list,
    containers__run_container,
    containers__stop_container,
    containers__remove_container,
    containers__get_container_by_id
)

containers_router = APIRouter()


containers_router.add_api_route(
    "/list",
    containers__get_containers_list,
    methods=["POST"]
)

containers_router.add_api_route(
    "/run",
    containers__run_container,
    methods=["POST"]
)

containers_router.add_api_route(
    "/stop",
    containers__stop_container,
    methods=["POST"]
)

containers_router.add_api_route(
    "/remove",
    containers__remove_container,
    methods=["DELETE"]
)

containers_router.add_api_route(
    "/info_by_id",
    containers__get_container_by_id,
    methods=["POST"]
)
