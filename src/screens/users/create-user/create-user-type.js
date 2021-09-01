export interface IProps {
    navigation: any;
    locale: string;
    dispatch(fun: object): any;
    handleSubmit(fun: object): any;
    loading: boolean;
    initialValues: any;
    userId: number | string;
    isCreateScreen: boolean;
    isEditScreen: boolean;
    isAllowToEdit: boolean;
    isAllowToDelete: boolean;
    theme: any;
    formData: any;
    roles: Array<any>;
    fetchRoles: Function;
    formValues: any;
    userRefs: any;
}
