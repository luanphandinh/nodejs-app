import * as DI from '@utils/DI/DI';
// tslint:disable-next-line:no-duplicate-imports
import { injectable, inject } from '@utils/DI/DI';

describe('DI', () => {
  @injectable()
  class CombatVoice {
    public voice = (name: string) => `${name} say: I'm Avenger!`;
  }

  @injectable()
  class Thor {
    @inject()
    public combatVoice: CombatVoice;

    say = () => this.combatVoice.voice('Thor');
  }

  @injectable()
  class IronMan {
    constructor(@inject() public combatVoice: CombatVoice) {}

    say = () => this.combatVoice.voice('Iron Man');
  }

  @injectable()
  class Avenger {
    constructor(
      @inject() public thor: Thor,
      @inject() public ironMan: IronMan,
    ) { }
  }

  it('should injectable class and resolve it', () => {
    const container = DI.getContainer();
    const thor = container.get<Thor>(Thor.name);
    const ironMan = container.get<IronMan>(IronMan.name);
    const avenger = container.get<Avenger>(Avenger.name);
    expect(thor.say()).toEqual("Thor say: I'm Avenger!");
    expect(ironMan.say()).toEqual("Iron Man say: I'm Avenger!");
    expect(avenger.thor.say()).toEqual("Thor say: I'm Avenger!");
    expect(avenger.ironMan.say()).toEqual("Iron Man say: I'm Avenger!");
  });
});
