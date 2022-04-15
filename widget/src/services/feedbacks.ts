import { AxiosInstance } from 'axios'
import { Feedback } from '@/types/feedback'
import { RequestError } from '@/types/error'

type Create = {
    data: Feedback;
    errors: RequestError | null;
}

type CreatePayload = {
    apikey: string;
    device: string;
    fingerprint: string;
    page: string;
    text: string;
    type: string;
}

export interface FeedbackServiceInterface {
    create(create: CreatePayload): Promise<Create>
}

export default function FeedbackService(httpClient: AxiosInstance): FeedbackServiceInterface {

    async function create(payload: CreatePayload): Promise<Create> {

        const response = await httpClient.post<Feedback>('/feedbacks', payload)

        let errors: RequestError | null = null

        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

        return {
            data: response.data,
            errors
        }

    }

    return { create }

}
