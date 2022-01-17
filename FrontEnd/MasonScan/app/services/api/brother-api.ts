import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetBrothersResult } from "./api.types"


export class BrotherApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getBrother(id: string): Promise<GetBrothersResult> {
    try {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(`/brother/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    
      const brothers = response.data
      
      return { kind: "ok", brothers }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
