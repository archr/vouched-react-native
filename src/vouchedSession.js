import { NativeModules } from 'react-native';

const VouchedSessionModule = NativeModules.VouchedSession || NativeModules.VouchedSessionModule ;

export class VouchedSession {

    constructor(apiKey) {
        VouchedSessionModule.configure(apiKey);
    }

    async postFrontId(cardDetectionResult, paramaters) {
        try {
            const res = await VouchedSessionModule.postFrontId(cardDetectionResult);
            return JSON.parse(res);
        } catch (e) {
            throw e
        }
    }
    
    async postFace(faceDetectionResult) {
        try {
            const res = await VouchedSessionModule.postFace(faceDetectionResult);
            return JSON.parse(res);
        } catch (e) {
            throw e
        }
    }
    
    async confirm() {
        try {
            const res = await VouchedSessionModule.confirm();
            return JSON.parse(res);
        } catch (e) {
            throw e
        }
    }

    async postAuthenticate(faceDetectionResult, jobId, matchId) {
        try {
            const res = await VouchedSessionModule.postAuthenticate({
                image: faceDetectionResult.image,
                jobId,
                matchId
            });
            return JSON.parse(res);
        } catch (e) {
            throw e
        }
    }
    
}