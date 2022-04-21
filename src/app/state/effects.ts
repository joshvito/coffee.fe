import { InitEffects } from './effects/init.effects';
import { BeanEffects } from './effects/bean.effects';
import { BrewMethodEffects } from './effects/brew-method.effects';
import { BrewEffects } from './effects/brew.effects';
import { UserEffects } from './effects/user.effects';

export const effects = [
  InitEffects,
  UserEffects,
  BeanEffects,
  BrewMethodEffects,
  BrewEffects,
];
