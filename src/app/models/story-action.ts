import { Story } from './story';

export interface StoryAction {
  story: Story;
  action: 'replace' | 'add';
}
