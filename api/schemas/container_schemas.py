from typing import Literal, TypeVar

from pydantic import BaseModel


ContainerStatus = TypeVar(
    "ContainerStatus",
    Literal["restarting", "running", "paused", "exited"],
    None
)


class ContainerIDSchema(BaseModel):
    container_id: str


class ContainersFilterSchema(BaseModel):
    exited: int | None = None
    status: ContainerStatus = None
    label: str | list | None = None
    id: str | None = None
    name: str | None = None
    ancestor: str | None = None


class RunContainerSchema(BaseModel):
    image: str
    name: str | None = None
    command: str | list | None = None
    auto_remove: bool = False
