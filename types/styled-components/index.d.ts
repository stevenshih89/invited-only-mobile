import 'styled-components-react-native';

declare module 'styled-components-react-native' {
  export interface View {
    paddingHorizontal?: number | string;
    paddingVertical?: number | string;
    marginHorizontal?: number | string;
    marginVertical?: number | string;
  }
}
