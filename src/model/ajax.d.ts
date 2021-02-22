declare namespace Ajax {
   export interface AxiosResponse {
        data: AjaxResponse
    }
    export interface AjaxResponse {
        message: string
        result: null | string | Array[] | object
        status: boolean
        statusCode: string
        total?: number
    }
}
