from fastapi import HTTPException
from docker.models.volumes import Volume

from api.utils.docker_utils import get_docker_client
from api.schemas.volume_schemas import VolumeCreationSchema


def volume2dict(volume: Volume) -> dict:
    return {
        "volume_id": volume.short_id,
        "name": volume.name
    }


def create_volume(volume_data: VolumeCreationSchema) -> dict:
    return volume2dict(
        get_docker_client().volumes.create(
            **volume_data.model_dump()
        )
    )


def get_all_volumes() -> dict:
    return [
        volume2dict(volume)
        for volume in get_docker_client().volumes.list()
    ]


def get_volume_info(volume_id: str) -> dict:
    return volume2dict(
        get_docker_client().volumes.get(volume_id)
    )


def remove_volume(volume_id: str):
    try:
        get_docker_client().volumes.get(volume_id).remove()
    except Exception as exc:
        raise HTTPException(
            status_code=403,
            detail=str(exc)
        ) from exc


def prune_volumes():
    get_docker_client().volumes.prune()
