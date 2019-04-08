export class errorHandler extends Error {
	constructor(str) {
		super(str);
        this.message = str;
    }
    information(info){
        this.info = info;
        return this;
    }
}
