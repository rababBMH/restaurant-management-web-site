import { Test, TestingModule } from '@nestjs/testing';
import { MenuManageController } from './menu-manage.controller';
import { MenuManageService } from './menu-manage.service';

describe('MenuManageController', () => {
  let controller: MenuManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuManageController],
      providers: [MenuManageService],
    }).compile();

    controller = module.get<MenuManageController>(MenuManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
