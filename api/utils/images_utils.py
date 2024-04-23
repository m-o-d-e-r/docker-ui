from docker.models.images import Image

from api.utils.docker_utils import get_docker_client
from api.schemas.image_schemas import PullImageSchema


def image2dict(image: Image) -> dict:
    return {
        "tags": image.tags,
        "image_id": image.short_id
    }


def get_images_list() -> list[dict]:
    return [
        image2dict(image_obj) for image_obj in
        get_docker_client().images.list(all=True,)
    ]


def pull_image(filters: PullImageSchema) -> dict:
    return image2dict(
        get_docker_client().images.pull(**filters.model_dump())
    )


def remove_image(image_id: str):
    get_docker_client().images.remove(image=image_id)


def prune_images() -> dict:
    result = get_docker_client().images.prune(
        filters={
            "dangling": True
        }
    )
    return {
        "deleted_images": [
            image2dict(image_obj) for image_obj in
            result["ImagesDeleted"]
        ],
        "space_reclaimed": result["SpaceReclaimed"]
    }
