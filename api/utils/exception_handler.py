from fastapi.responses import JSONResponse
from fastapi import Request, HTTPException


async def main_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        content={
            "hello": str(exc),
        },
        status_code=exc.status_code
    )
