/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sport } from './sport.model';
import { CreateSportInput } from './input/sport.input';
import { User } from '../user/user.model';
import { SportDto } from './dto/sport.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SportService {
  constructor(@InjectModel(Sport.name) private sportModel: Model<Sport>, private userService: UserService) {}

  async findAllSports(page: number, limit: number): Promise<SportDto[]> {
    const skipAmount = (page - 1) * limit;
    const sports = await this.sportModel
      .find()
      .populate('user')
      .skip(skipAmount)
      .limit(limit)
      .exec();
  
    const sportDtos = await Promise.all(sports.map((sport) => this.mapSportsToDto(sport)));
    return sportDtos;
  }
  
  private async mapSportsToDto(sport: Sport): Promise<SportDto> {
    const sportDto = new SportDto();
    sportDto._id = sport._id;
    sportDto.name = sport.name;
    sportDto.description = sport.description;
    sportDto.user = await this.userService.findUserById(sport.user.id); 
    return sportDto;
  }

  async findSport(id: string): Promise<SportDto> {
    const sport = await this.sportModel.findOne({id}).populate('user').exec();
    return this.mapSportToDto(sport);
  }

  private mapSportToDto(sport: Sport): SportDto {
    const sportDto = new SportDto();
    sportDto._id = sport._id;
    sportDto.name = sport.name;
    sportDto.description = sport.description;
    sportDto.user = sport.user; // Map user details to the user field
    return sportDto;
  }

  async create(input: CreateSportInput, user: User): Promise<SportDto> {
    const sport = new this.sportModel({
      ...input,
      user: user._id, // Assuming `user._id` is of type `ObjectId`
    });
    
    const savedSport = await sport.save();

    return {
      _id: savedSport._id,
      name: savedSport.name,
      description: savedSport.description,
      user: user, // Return the user object
    };
  } 

  async update(id: string, input: CreateSportInput, user: User): Promise<SportDto> {
    const existingSport = await this.sportModel.findById(id);
    
    if (!existingSport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    existingSport.name = input.name;
    existingSport.description = input.description;
    existingSport.user = user._id; 
    const updatedSport = await existingSport.save();

    return {
      _id: updatedSport._id,
      name: updatedSport.name,
      description: updatedSport.description,
      user: user,
    };
  }

  async deleted(id: string, user: User): Promise<SportDto> {
    const existingSport = await this.sportModel.findById(id);
    
    if (!existingSport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }
  
    if (existingSport.user.toString() !== user._id.toString()) {
      throw new UnauthorizedException(`You are not authorized to delete this sport`);
    }
  
    const deletedSport = await this.sportModel.findByIdAndDelete(id).exec();
  
    return {
      _id: deletedSport._id,
      name: deletedSport.name,
      description: deletedSport.description,
      user: deletedSport.user,
    };
  }
}
