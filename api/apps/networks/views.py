from fastapi.responses import JSONResponse

from api.utils.network_utils import (
    create_network,
    delete_network,
    get_all_networks,
    delete_unused_networks,
    get_network_by_id
)
from api.utils.network_utils import NetworkCreationSchema


async def display_networks_view():
    return JSONResponse(
        content={
            "networks_list": get_all_networks()
        }
    )


async def create_network_view(network_data: NetworkCreationSchema):
    return JSONResponse(
        content={
            "network": create_network(network_data)
        }
    )


async def delete_network_view(network_id: str):
    return JSONResponse(
        content={
            "network": delete_network(network_id)
        }
    )


async def prune_networks_view():
    return JSONResponse(
        content={
            "data": delete_unused_networks()
        }
    )


async def network_info_by_id_view(network_id: str):
    return JSONResponse(
        content={
            "data": get_network_by_id(network_id)
        }
    )
