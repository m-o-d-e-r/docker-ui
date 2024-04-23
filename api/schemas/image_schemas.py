from pydantic import BaseModel


class PullImageSchema(BaseModel):
    repository: str
    tag: str | None = None


class ImageIDSchema(BaseModel):
    image_id: str
