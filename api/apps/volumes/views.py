from fastapi.responses import JSONResponse

from api.schemas.volume_schemas import VolumeCreationSchema
from api.utils.volume_utils import (
    create_volume,
    get_all_volumes,
    get_volume_info,
    remove_volume,
    prune_volumes
)


async def create_volume_view(volume_data: VolumeCreationSchema):
    return JSONResponse(
        content={
            "volume": create_volume(volume_data)
        }
    )


async def get_all_volumes_views():
    return JSONResponse(
        content={
            "volumes_list": get_all_volumes()
        }
    )


async def volume_info_by_view(volume_id: str):
    return JSONResponse(
        content={
            "volume": get_volume_info(volume_id)
        }
    )


async def delete_volume_view(volume_id: str):
    remove_volume(volume_id)
    return JSONResponse(
        content={
            "detail": "Volume deleted successfully"
        }
    )


async def prune_volumes_views():
    prune_volumes()
    return JSONResponse(
        content={
            "detail": "Unused volumes was removed"
        }
    )
