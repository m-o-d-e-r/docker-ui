from docker import DockerClient, from_env

_DOCKER_CLIENT = from_env()


def get_docker_client() -> DockerClient:
    return _DOCKER_CLIENT
