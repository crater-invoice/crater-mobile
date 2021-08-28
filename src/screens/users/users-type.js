export interface IProps {
    navigation: any;
    locale: string;
    users: Array<any>;
    dispatch(fun: object): any;
}

export interface IStates {
    search: string;
}
