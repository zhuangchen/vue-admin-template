import httpServie from './http-service';
import { AxiosResponse } from 'axios';
const fetchUserById = (id: number) => {
    interface IBackData {
        data: any,
        support: any
    }
    const axiosConfig = Object.assign({
        url: '/api/users/' + id,
        method: 'get',
    });
    return new Promise<IBackData>((resolve, reject) => {
        httpServie(axiosConfig).then((res) => {
            resolve(res.data);
        }, () => {
            reject();
        });
    });
};
export {
    fetchUserById
};