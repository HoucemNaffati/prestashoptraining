import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { AppModule } from '../../app.module';
import { CatNotFoundException } from './model/exceptions';

describe('testing cats service', () => {
  let sut: CatsService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    sut = moduleFixture.get(CatsService);
    //sut = new CatsService(2, new InMemoryCatStore(), new DummyLogger());
  });
  describe('get one', () => {
    it('does not found the cat', async () => {
      await expect(
        async () => await sut.getOne('ce079c0b-5e21-42ee-9d0e-b18967a6fad1'),
      ).rejects.toThrow(CatNotFoundException);
    });
  });
});
