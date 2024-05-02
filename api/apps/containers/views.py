from fastapi.responses import JSONResponse

from api.utils.container_utils import (
    get_container_list,
    run_container,
    stop_container,
    start_container,
    remove_container,
    get_container_info_by_id
)

from api.schemas.container_schemas import (
    ContainersFilterSchema,
    RunContainerSchema,
    ContainerIDSchema
)


async def containers__get_containers_list(
    filters: ContainersFilterSchema | None = ContainersFilterSchema()
):
    return JSONResponse(
        content={
            "containers_list": get_container_list(filters)
        }
    )


async def containers__run_container(
    container_config: RunContainerSchema
):
    return JSONResponse(
        content={
            "container_info": run_container(container_config)
        }
    )


async def containers__stop_container(container_meta: ContainerIDSchema):
    return JSONResponse(
        content={
            "container_info": stop_container(container_meta.container_id)
        }
    )


async def containers__start_container(container_meta: ContainerIDSchema):
    return JSONResponse(
        content={
            "container_info": start_container(container_meta.container_id)
        }
    )


async def containers__remove_container(container_meta: ContainerIDSchema):
    return JSONResponse(
        content={
            "container_info": remove_container(container_meta.container_id)
        }
    )


async def containers__get_container_by_id(container_meta: ContainerIDSchema):
    return JSONResponse(
        content={
            "is_running": get_container_info_by_id(container_meta.container_id)
        }
    )
