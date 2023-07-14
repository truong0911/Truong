import { ResponseDto } from "../../../../common/dto/response/response.dto";
import { LoginResultDto } from "../login-result.dto";

export class LoginResultResponseDto extends ResponseDto<LoginResultDto> {
    data: LoginResultDto;
}
