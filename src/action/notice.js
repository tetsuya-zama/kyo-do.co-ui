export const OPEN_NOTICE = 'OPEN_NOTICE';
export const CLOSE_NOTICE = 'CLOSE_NOTICE';

export function openNotice(message){
    return {
        type:OPEN_NOTICE,
        payload:{
            message: message
        }
    };
}

export function closeNotice(){
    return {
        type:CLOSE_NOTICE
    };
}