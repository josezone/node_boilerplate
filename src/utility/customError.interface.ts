export interface CustomErrorInterface {
    statusCode: number;
    description: string;
    setInfo(statusCode: number, description: string): CustomErrorInterface;
}
