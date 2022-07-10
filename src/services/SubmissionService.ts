import API from "@/services/API";
import {Evaluation, Submission} from "@/helpers/types";

class SubmissionService{

    getSubmissionsForExercise(exerciseId: number) : Promise<any> {
        return API.get(`exercises/${exerciseId}/submissions`);
    }

    getSubmissionById(submissionId: number) : Promise<any> {
        return API.get(`/submissions/${submissionId}`);
    }

    getUserSubmissions(userId: number) : Promise<any> {
        return API.get(`users/${userId}/submissions`);
    }

    postSubmission(submission: Submission) : Promise<any> {
        return API.post(`/submissions`, submission);
    }

    getSubmissions(): Promise<any> {
        return API.get(`/submissions`);
    }

    getLanguages(): Promise<any> {
        return API.get(`/submissions/code/languages`);
    }

    adjustSubmission(submission: Submission): Promise<any> {
        return API.put(`/submissions`, submission);
    }

    deleteSubmission(submissionId: number): Promise<any> {
        return API.delete(`/submissions/${submissionId}`);
    }

    editEvaluation(evaluation: Evaluation): Promise<any> {
        return API.put(`/submissions/grade`, evaluation)
    }

    getCurrentSubmission(exerciseID: number): Promise<any> {
        return API.get(`/exercise/${exerciseID}/submission`)
    }
}


export default new SubmissionService();