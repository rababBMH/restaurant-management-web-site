import { Test, TestingModule } from '@nestjs/testing';
import { MenuManageService } from './menu-manage.service';

describe('MenuManageService', () => {
  let service: MenuManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuManageService],
    }).compile();

    service = module.get<MenuManageService>(MenuManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
