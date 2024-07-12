import { Story } from './story';

interface StoryActionAddOrReplace {
  story: Story;
  action: 'replace' | 'add';
}

interface StoryActionReset {
  story: '';
  action: 'reset';
}

export type StoryAction = StoryActionAddOrReplace | StoryActionReset;
