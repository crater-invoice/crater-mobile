export interface IProps {
    navigation: any;
    roles: Array<any>;
    dispatch(fun: object): any;
}

export interface IStates {
    search: string;
}
