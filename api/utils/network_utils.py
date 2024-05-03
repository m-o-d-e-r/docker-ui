from docker.models.networks import Network

from api.utils.docker_utils import get_docker_client
from api.schemas.network_schemas import NetworkCreationSchema


def network2dict(network: Network) -> dict:
    return {
        "name": network.name,
        "connected_containers": [
            container.short_id
            for container in network.containers
        ]
    }


def create_network(network_data: NetworkCreationSchema) -> dict:
    return network2dict(
        get_docker_client().networks.create(
            **network_data.model_dump()
        )
    )


def delete_network(network_id: str) -> dict:
    network_obj: Network = get_docker_client().networks.get(network_id)
    network_obj.remove()
    return network2dict(network_obj)


def get_all_networks() -> list[dict]:
    return [
        network2dict(network)
        for network in get_docker_client().networks.list()
    ]


def delete_unused_networks() -> dict:
    return get_docker_client().networks.prune()


def get_network_by_id(network_id: str) -> dict:
    return network2dict(
        get_docker_client().networks.get(network_id)
    )
