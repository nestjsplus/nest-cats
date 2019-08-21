import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CreateCatDto } from './dto';
import { CatsService } from './cats.service';

xdescribe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('CatsController', () => {
    it('create() should create a cat', () => {
      const cat: CreateCatDto = {
        name: 'Fred',
        age: 5,
        breed: 'Alley Cat',
      };
      expect(catsController.create(cat)).toBe('This action adds a new cat');
    });

    it(' should return create message', () => {
      const cat: CreateCatDto = {
        name: 'Fred',
        age: 5,
        breed: 'Alley Cat',
      };
      catsController.create(cat);
      expect(catsController.create(new CreateCatDto())).toBe(
        'This action adds a new cat',
      );
    });
  });
});
