from pydantic import BaseModel


class VolumeCreationSchema(BaseModel):
    name: str
    driver: str = "local"
