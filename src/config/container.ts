import { Container } from 'inversify';
import { HomeService } from '../services/home.service';
import TYPES from '../constants/types';

export class ContainerConfigLoader {
  public static load(): Container {
    const container = new Container();
    container.bind<HomeService>(TYPES.HomeService).to(HomeService);
    
    return container;
  }
}