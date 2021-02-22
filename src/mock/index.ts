import Mock from 'mockjs';
import { userResponseData } from './data/userInfo';

// 用户信息
Mock.mock('/getUserInfo', 'get', userResponseData);
