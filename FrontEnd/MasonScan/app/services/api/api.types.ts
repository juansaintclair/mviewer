import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Brother } from "../../models/brother/brother"

export interface User {
  foto: String,
  nome: String,
  cadastro: String,
  loja: String,
  situacao: String
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetBrothersResult = { kind: "ok"; brothers: Brother[] } | GeneralApiProblem
export type GetBrotherResult = { kind: "ok"; brother: Brother } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
