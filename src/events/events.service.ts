import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = new EventEntity();
    event.title = createEventDto.title;
    event.description = createEventDto.description;
    event.image_path = createEventDto.image_path;
    event.is_free = createEventDto.is_free;
    event.address = createEventDto.address;
    event.zip_code = createEventDto.zip_code;
    event.city = createEventDto.city;
    event.price = createEventDto.price;
    event.participants = [];

    const newEvent = await this.eventRepository.save(event);

    const author = await this.userRepository.findOne({
      where: { id: createEventDto.creator_id },
      relations: ['events_created'],
    });
    author.events_created.push(event);
    await this.userRepository.save(author);

    const category = await this.categoryRepository.findOne({
      where: { id: createEventDto.category_id },
      relations: ['events'],
    });
    category.events.push(event);
    await this.categoryRepository.save(category);

    return newEvent;
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOne(id);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }

  async participateToEvent(idEvent: number, idUser: number) {
    const event = await this.eventRepository.findOne({
      where: { id: idEvent },
      relations: ['participants'],
    });

    const user = await this.userRepository.findOne({
      where: { id: idUser },
    });

    if (event.participants.find((u) => u.id === user.id)) {
      throw new HttpException(
        "L'utilisateur participe déjà à l'évènement",
        HttpStatus.CONFLICT,
      );
    }

    event.participants.push(user);
    const updatedEvent = await this.eventRepository.save(event);

    return { event: updatedEvent };
  }
}
