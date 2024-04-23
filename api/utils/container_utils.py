from docker.models.containers import Container

from api.schemas.container_schemas import (
    ContainersFilterSchema,
    RunContainerSchema
)
from api.utils.docker_utils import get_docker_client


def container2dict(container: Container) -> dict:
    return {
        "container_id": container.short_id,
        "image": "', '".join(container.image.tags),
        "status": container.status,
        "ports": container.ports,
        "name": container.name
    }


def get_container_by_id(container_id: str) -> Container:
    return get_docker_client().containers.get(container_id)


def get_container_info_by_id(container_id: str) -> dict:
    return container2dict(get_container_by_id(container_id))


def get_container_list(filters: ContainersFilterSchema) -> list[dict]:
    return [
        container2dict(container_obj) for container_obj in
        get_docker_client().containers.list(
            all=True,
            filters=filters.model_dump(exclude_none=True)
        )
    ]


def run_container(container_config: RunContainerSchema) -> dict:
    return container2dict(
        get_docker_client().containers.run(
            **container_config.model_dump(exclude_none=True),
            detach=True
        )
    )


def stop_container(container_id: str) -> dict:
    container = get_container_by_id(container_id)
    container.stop()
    return container2dict(container)


def remove_container(container_id: str) -> dict:
    container = get_container_by_id(container_id)
    container.remove()
    return container2dict(container)
