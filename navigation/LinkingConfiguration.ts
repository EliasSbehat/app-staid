/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { UserStackParamList } from '../types';

const linking: LinkingOptions<UserStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TextPrompt: {
            screens: {
              TextPromptScreen: 'text-prompt',
            },
          },
          ImagePrompt: {
            screens: {
              ImagePromptScreen: 'image-prompt',
            },
          },
        },
      },
      DocumentListScreen: 'document-list',
      Modal: 'modal',
      NotFound: '*',
      Scanner: 'scanner',
      SignUp: 'sign-up',
      SignIn: 'sign-in',
      Welcome: 'welcome',
    },
  },
};

export default linking;
