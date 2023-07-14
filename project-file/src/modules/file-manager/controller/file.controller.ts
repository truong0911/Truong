import { getFileUrl } from "./../common/file-manager.constant";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    StreamableFile,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { FileRetrieveService } from "../service/file-retrieve.service";
import { AllowSsoRole } from "@common/decorator/auth.decorator";
import { SsoRole } from "@config/constant";
import { UpdateFileDto } from "../dto/update-file.dto";
import { FileUploadService } from "../service/file-upload.service";
import { ReqUser } from "@common/decorator/user.decorator";
import { JwtSsoPayload } from "@module/auth/dto/jwt-sso-payload";
import { ResponseDto } from "@common/dto/response/response.dto";
import { join } from "path";
import { createReadStream } from "fs";
import { TransformInterceptor } from "../transform.interceptor";
//import { StreamableFile } from "@nestjs/common";

@Controller("file")
@ApiTags("file")
export class FileController {
    constructor(
        private readonly fileRetrieveService: FileRetrieveService,
        private readonly fileUploadService: FileUploadService,
    ) {}

    @Put("cap-phep/:ids")
    @ApiBearerAuth()
    @AllowSsoRole(SsoRole.ADMIN)
    async capPhep(
        @ReqUser() user: JwtSsoPayload,
        @Param("ids") fileId: string,
        @Body() dto: UpdateFileDto,
    ): Promise<any> {
        const res = await this.fileUploadService.capPhep(dto, fileId);
        return ResponseDto.create(res);
    }

    @Delete("xoa-file/:idd")
    @ApiBearerAuth()
    @AllowSsoRole(SsoRole.USER)
    async xoaFile(@ReqUser() user: JwtSsoPayload, @Param("idd") fileId: string) {
        return await this.fileUploadService.xoaFile(fileId);
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async getFile() {
        return await this.fileRetrieveService.getFile();
    }

    @Get("download/:id")
    @UseInterceptors(TransformInterceptor)
    //@AllowSsoRole(SsoRole.ADMIN)
    async downloadFile(
        @Param("id") id: string,
        @ReqUser() user: JwtSsoPayload,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const name = await this.fileRetrieveService.getFileName(id);
        const file = createReadStream(join(process.cwd(), "/upload/" + name));
        res.set({
            "Content-Type": "text/plain",
            "Content-Disposition": 'attachment; filename="text.txt"',
        });
        return new StreamableFile(file);
        // res.send(file);
    }

    @Get("/views")
    async getLuotXem() {
        return await this.fileRetrieveService.getLuotXem();
    }

    @Get(":fileId")
    @UseInterceptors(TransformInterceptor)
    // @ApiBearerAuth()
    async retrieveFile(
        @Param("fileId") fileId: string,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        await this.fileRetrieveService.retrieveFile(fileId, req, res);
    }
}
