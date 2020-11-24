import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Map: {
            screens: {
              MapScreen: "one",
            },
          },
          Browse: {
            screens: {
              BrowseScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
