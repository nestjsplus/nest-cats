import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CreateCatDto } from './dto';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('CatsController', () => {
    it('create() should return create message', () => {
      expect(catsController.create(new CreateCatDto())).toBe(
        'This action adds a new cat',
      );
    });
  });
});
