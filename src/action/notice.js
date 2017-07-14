/** 通知Snackbar表示のアクション名 */
export const OPEN_NOTICE = 'OPEN_NOTICE';
/** 通知Snackbar非表示のアクション名 */
export const CLOSE_NOTICE = 'CLOSE_NOTICE';

/**
 * 通知Snackbar表示アクションのcreator
 * @param {string} message 
 */
export function openNotice(message){
    const passMessage = message?message:"";
    return {
        type:OPEN_NOTICE,
        payload:{
            message: passMessage
        }
    };
}
/**
 * 通知Snackbar非表示アクションのcreator
 */
export function closeNotice(){
    return {
        type:CLOSE_NOTICE
    };
}