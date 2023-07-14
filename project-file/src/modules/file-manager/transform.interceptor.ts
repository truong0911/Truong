import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Model } from "mongoose";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FileManagerDocument } from "./entities/file-manager.entity";
import { InjectModel } from "@nestjs/mongoose";
import { DB_FILE_MANAGER } from "@module/repository/db-collection";
export interface Response<T> {
    data: T;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(
        @InjectModel(DB_FILE_MANAGER)
        private readonly fileManagerModel: Model<FileManagerDocument>,
    ) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<Response<T>>> {
        const request = context.switchToHttp().getRequest();
        const path = request?.route?.path;
        const fileIdView = request?.params?.fileId;
        const fileIdTai = request?.params?.id;
        console.log(fileIdView);
        console.log(fileIdTai);
        console.log(path);
        if (path === "/file/:fileId" && fileIdView) {
            const file = await this.fileManagerModel.findById(fileIdView);
            file.luotXem = file.luotXem + 1;
            await this.fileManagerModel.findByIdAndUpdate(fileIdView, file);
        }
        if (path === "/file/download/:id" && fileIdTai) {
            const file = await this.fileManagerModel.findById(fileIdTai);
            file.luotTai = file.luotTai + 1;
            await this.fileManagerModel.findByIdAndUpdate(fileIdTai, file);
        }
        return next.handle().pipe(map((data) => ({ data })));
    }
}
