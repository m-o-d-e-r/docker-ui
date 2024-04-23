from fastapi.responses import JSONResponse

from api.utils.docker_utils import get_docker_client


async def info__get_docker_info():
    return JSONResponse(
        content={
            "info": get_docker_client().info()
        }
    )
