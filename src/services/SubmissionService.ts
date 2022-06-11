import API from "@/services/API";
import {Submission} from "@/helpers/types";

class SubmissionService{

    getSubmissionsForExercise(exerciseId: number) : Promise<any> {
        return API.get(`exercises/${exerciseId}/submissions`);
    }

    getSubmissionById(exerciseId: number, submissionId: number) : Promise<any> {
        return API.get(`exercises/${exerciseId}/submissions/${submissionId}`);
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

    adjustSubmission(submission: Submission): Promise<any> {
        return API.put(`/submissions`, submission);
    }
}


export default new SubmissionService();