from fastapi import APIRouter

from api.apps.images.views import (
    images__get_images_list,
    images__pull_image,
    images__remove_image,
    images__prune_images
)


images_router = APIRouter()

images_router.add_api_route(
    "/list",
    images__get_images_list,
    methods=["GET"]
)

images_router.add_api_route(
    "/pull",
    images__pull_image,
    methods=["POST"]
)

images_router.add_api_route(
    "/remove",
    images__remove_image,
    methods=["POST"]
)

images_router.add_api_route(
    "/prune",
    images__prune_images,
    methods=["POST"]
)
