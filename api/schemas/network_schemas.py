from typing import Literal, TypeVar
from pydantic import BaseModel


NetworkDrivers = TypeVar(
    "NetworkDrivers",
    Literal[
        "bridge",
        "host",
        "none",
        "overlay",
        "ipvlan",
        "macvlan"
    ],
    Literal["bridge"]
)


class NetworkCreationSchema(BaseModel):
    name: str
    driver: NetworkDrivers
    internal: bool = False
    enable_ipv6: bool = False
