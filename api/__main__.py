from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api.apps.containers.router import containers_router
from api.apps.info.router import info_router
from api.apps.images.router import images_router
from api.apps.networks.router import networks_router
from api.apps.volumes.router import volumes_router

from api.utils.exception_handler import main_exception_handler


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(containers_router, prefix="/containers")
app.include_router(info_router, prefix="/info")
app.include_router(images_router, prefix="/images")
app.include_router(networks_router, prefix="/networks")
app.include_router(volumes_router, prefix="/volumes")

app.add_exception_handler(Exception, main_exception_handler)


if __name__ == "__main__":
    from api.utils.config_utils import get_config

    uvicorn.run(
        "api.__main__:app",
        host=get_config().API_HOST,
        port=int(get_config().API_PORT),
        reload=bool(get_config().API_DEBUG)
    )
