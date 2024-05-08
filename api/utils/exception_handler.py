from fastapi.responses import JSONResponse
from fastapi import Request


async def main_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        content={
            "detail": str(exc),
        },
        status_code=exc.status_code
    )
