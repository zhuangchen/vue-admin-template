import httpServie from './http-service';
import { IUser } from '@/model/user';
// 获取用户信息
const fetchUserInfo = () => {
    const axiosConfig = Object.assign({
        url: '/getUserInfo',
        method: 'get'
    });
    return new Promise<IUser>((resolve, reject) => {
        httpServie(axiosConfig).then((res) => {
            if(res.data && res.data.result){
                resolve(res.data.result);
            } else {
                reject();
            }
        }, () => {
            reject();
        });
    });
};
export {
    fetchUserInfo
};