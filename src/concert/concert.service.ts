import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './entities/concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async findAll(): Promise<Concert[]> {
    return await this.concertRepository.find({
      select: ['concertId', 'category', 'title'],
    });
  }

  async findOne(concertId: number) {
    return await this.verifyConcertById(concertId);
  }

  async showSearch(keyword: string) {
    if (_.isNaN(keyword)) {
      throw new BadRequestException('검색결과가 존재하지 않습니다.');
    }
    const resultConcert = await this.concertRepository
      .createQueryBuilder('concert')
      .where('concert.title LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return resultConcert;
  }

  // async handleFileUpload(file: Express.Multer.File): Promise<string> {
  //   const uploadDir = 'uploads';
  //   const fileName = `${Date.now()}-${file.originalname}`;
  //   const filePath = path.join(uploadDir, fileName);

  //   // 파일 저장
  //   fs.writeFileSync(filePath, file.buffer);

  //   // 파일 URL 반환
  //   return `${uploadDir}/${fileName}`;
  // }

  async createConcert(
    createConcertDto: CreateConcertDto,
    userId: number,
  ): Promise<Concert> {
    const newConcert = this.concertRepository.create({
      ...createConcertDto,
      user: { userId: userId },
    });
    console.log(newConcert);
    return await this.concertRepository.save(newConcert);
  }

  async update(concertId: number, updateConcertDto: UpdateConcertDto) {
    await this.verifyConcertById(concertId);
    await this.concertRepository.update({ concertId }, updateConcertDto);
  }

  async delete(concertId: number) {
    await this.verifyConcertById(concertId);
    await this.concertRepository.delete({ concertId });
  }

  private async verifyConcertById(concertId: number) {
    const concert = await this.concertRepository.findOneBy({ concertId });
    if (_.isNil(concert)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return concert;
  }
}
