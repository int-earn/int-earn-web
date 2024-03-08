
export const handleError = (error) => {
    console.log(error);
    if (error.response.status === 403) {
        
        //callback([false, 403]);
    } else {
        //callback([false, 'others']);
    }
    
}

//export const msg403 = '세션이 만료되었습니다. 다시 로그인해주세요.';
export const msg403 = '로그인 먼저 진행해주세요.';