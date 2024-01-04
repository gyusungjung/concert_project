import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertService } from './concert.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/common/authenticated-request.interface';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  //모든 공연 조회
  @Get()
  async findAll() {
    return await this.concertService.findAll();
  }

  //특정 공연 조회
  @Get(':concertId')
  async findOne(@Param('concertId') concertId: number) {
    return await this.concertService.findOne(concertId);
  }

  //검색하기
  @Get('search')
  async showSearch(@Query('keyword') keyword: string) {
    return await this.concertService.showSearch(keyword);
  }

  // //공연일괄생성
  // @Post('upload')
  // @Roles(Role.Admin)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new HttpException(
  //       '파일이 제공되지 않았습니다',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // 파일 처리 로직
  //   // 예: 파일을 서버의 특정 위치에 저장하고, 해당 파일의 URL을 반환합니다.
  //   const fileUrl = await this.concertService.handleFileUpload(file);

  //   return { url: fileUrl };
  // }

  //공연생성(완료)
  @Post()
  @Roles(Role.Admin)
  async createConcert(
    @Body() createConcertDto: CreateConcertDto,
    @Req() req: AuthenticatedRequest, // 현재 로그인한 사용자 정보 가져오기
  ) {
    const userId = req.user?.userId; // 현재 로그인한 사용자의 ID
    if (!userId) {
      throw new UnauthorizedException();
    }
    console.log('컨트롤러userId: ', userId);
    return this.concertService.createConcert(createConcertDto, userId);
  }

  //공연수정
  @Put(':concertId')
  @Roles(Role.Admin)
  async update(
    @Param('concertId') concertId: number,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    await this.concertService.update(concertId, updateConcertDto);
  }

  @Delete(':concertId')
  @Roles(Role.Admin)
  async delete(@Param('concertId') concertId: number) {
    await this.concertService.delete(concertId);
  }
}
