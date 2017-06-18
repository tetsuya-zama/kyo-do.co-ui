/**
* 環境に応じてAPIのベースURLを取得する
* @return {string} APIのベースURL
*/
export function getApiBaseURL(){
    switch(process.env.NODE_ENV){
      case("debug"):
        return "http://localhost:3000/";
      default:
        return "https://api.kyo-do.co/";
    }
}
