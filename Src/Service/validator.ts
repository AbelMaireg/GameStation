export default (format: any, content: object): boolean => {

    return format.validate(content).error == null ? true: false;

}
