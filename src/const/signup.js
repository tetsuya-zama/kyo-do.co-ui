/**
* サインアップ失敗理由
*/
export const SIGNUP_FAILURE_REASONS = {
  ID_DUPLICATED : "ID_DUPLICATED", //ID重複
  SERVER_ERROR : "SERVER_ERROR", //サーバーエラー
  INVALID_CONFIRM : "INVALID_CONFIRM", //パスワード確認用不一致
  EMPTY_ID : "EMPTY_ID", //IDが空,
  EMPTY_PASSWORD:"EMPTY_PASSWORD", //パスワードが空
  EMPTY_NAME : "EMPTY_NAME", //表示名が空
  POLICY_PASSWORD : "POLICY_PASSWORD" //パスワードポリシーの要件を満たしていない
};

/**
* サインアップ失敗時のエラーメッセージ
*/
export const SIGNUP_VALIDATION_ERROR_MESSAGES = [
  {reason : SIGNUP_FAILURE_REASONS.ID_DUPLICATED, msg : "ご指定のIDはすでに使われています"},
  {reason : SIGNUP_FAILURE_REASONS.SERVER_ERROR, msg:"サーバーエラーが発生しました"},
  {reason : SIGNUP_FAILURE_REASONS.INVALID_CONFIRM, msg : "パスワードとパスワード（確認）が一致しません"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_ID, msg : "IDを入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD, msg : "パスワードを入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_NAME, msg : "名前を入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.POLICY_PASSWORD, msg : "パスワードポリシーの要件を満たしていません(8文字以上，半角英数字を1文字以上含む)"}
];
