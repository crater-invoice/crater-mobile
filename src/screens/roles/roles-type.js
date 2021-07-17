export interface IProps {
  navigation: any;
  locale: string;
  roles: Array<any>;
  dispatch(fun: object): any;
}

export interface IStates {
  search: string;
}
