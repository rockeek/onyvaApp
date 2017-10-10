export class Config {
    public isDev: boolean = ((<any>window)['IonicDevServer'] != undefined);

    //C9 or PROD:
    public serverUrl = this.isDev ? "/onyvaapi/" : "http://boogy.fr/onyvaapi/";
    
    public clientVersion = 1;
}