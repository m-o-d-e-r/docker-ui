from fastapi.responses import JSONResponse

from api.utils.images_utils import (
    get_images_list,
    pull_image,
    remove_image,
    prune_images
)
from api.schemas.image_schemas import PullImageSchema, ImageIDSchema


async def images__get_images_list():
    return JSONResponse(
        content={
            "images_list": get_images_list()
        }
    )


async def images__pull_image(pull_image_filters: PullImageSchema):
    return JSONResponse(
        content={
            "new_image": pull_image(pull_image_filters)
        }
    )


async def images__remove_image(image_meta: ImageIDSchema):
    remove_image(image_meta.image_id)
    return JSONResponse(
        content={
            "detail": "Image removed successfully"
        }
    )


async def images__prune_images():
    return JSONResponse(
        content={
            "deleted_images": prune_images()
        }
    )
