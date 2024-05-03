from fastapi import APIRouter

from api.apps.networks.views import (
    display_networks_view,
    create_network_view,
    delete_network_view,
    prune_networks_view,
    network_info_by_id_view
)


networks_router = APIRouter()

networks_router.add_api_route(
    "/",
    display_networks_view,
    methods=["GET"]
)
networks_router.add_api_route(
    "/",
    create_network_view,
    methods=["POST"]
)
networks_router.add_api_route(
    "/prune",
    prune_networks_view,
    methods=["POST"]
)
# networks_router.add_api_route(
#     "/connect_container",
#     prune_networks_view,
#     methods=["POST"]
# )
# networks_router.add_api_route(
#     "/disconnect_container",
#     prune_networks_view,
#     methods=["POST"]
# )
networks_router.add_api_route(
    "/{network_id}",
    delete_network_view,
    methods=["DELETE"]
)
networks_router.add_api_route(
    "/{network_id}",
    network_info_by_id_view,
    methods=["GET"]
)
